"""Utilidades compartidas: color, fuentes, easing y encoding de frames a MP4.

Todo se apoya en FFmpeg (libre) y Pillow/numpy. Sin GPU, sin servicios de pago.
"""
from __future__ import annotations

import math
import os
import shutil
import subprocess
from PIL import ImageFont

FFMPEG = shutil.which("ffmpeg") or "ffmpeg"
FFPROBE = shutil.which("ffprobe") or "ffprobe"

# Rutas comunes de fuentes en Linux. Se buscan por nombre de familia.
_FONT_DIRS = [
    "/usr/share/fonts",
    os.path.expanduser("~/.fonts"),
    os.path.expanduser("~/.local/share/fonts"),
    os.path.join(os.path.dirname(__file__), "..", "assets", "fonts"),
]
_FONT_FALLBACK = {
    "bold": "DejaVuSans-Bold.ttf",
    "regular": "DejaVuSans.ttf",
}
_font_cache: dict = {}


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def _find_font_file(family: str) -> str | None:
    """Busca un .ttf/.otf cuyo nombre contenga la familia pedida."""
    needle = family.lower().replace(" ", "")
    for root in _FONT_DIRS:
        if not os.path.isdir(root):
            continue
        for dirpath, _, files in os.walk(root):
            for f in files:
                if not f.lower().endswith((".ttf", ".otf")):
                    continue
                if needle in f.lower().replace(" ", ""):
                    return os.path.join(dirpath, f)
    return None


def get_font(family: str, size: int, weight: str = "bold") -> ImageFont.FreeTypeFont:
    key = (family, size, weight)
    if key in _font_cache:
        return _font_cache[key]
    path = _find_font_file(family)
    if path is None:
        # Fallback garantizado (DejaVu viene con la mayoría de distros).
        fallback = _FONT_FALLBACK.get(weight, _FONT_FALLBACK["regular"])
        path = _find_font_file(fallback.replace(".ttf", "")) or _find_font_file("DejaVuSans")
    try:
        font = ImageFont.truetype(path, size) if path else ImageFont.load_default()
    except Exception:
        font = ImageFont.load_default()
    _font_cache[key] = font
    return font


# ---- Easing ---------------------------------------------------------------

def ease_out_cubic(p: float) -> float:
    return 1 - (1 - p) ** 3


def ease_in_out(p: float) -> float:
    return 0.5 * (1 - math.cos(math.pi * max(0.0, min(1.0, p))))


def edge_fade_alpha(p: float, fade: float = 0.12) -> float:
    """Alpha global (0..1) para fundido de entrada/salida en los bordes del clip.

    Permite concatenar clips con transición limpia sin grafos xfade frágiles.
    """
    if fade <= 0:
        return 1.0
    if p < fade:
        return p / fade
    if p > 1 - fade:
        return (1 - p) / fade
    return 1.0


# ---- Encoding de frames a MP4 (pipe rawvideo) -----------------------------

class VideoWriter:
    """Escribe frames PIL (RGB) a un MP4 vía pipe a FFmpeg, sin PNGs intermedios."""

    def __init__(self, path: str, w: int, h: int, fps: int, crf: int = 18,
                 preset: str = "medium"):
        self.path = path
        cmd = [
            FFMPEG, "-y", "-loglevel", "error",
            "-f", "rawvideo", "-pix_fmt", "rgb24",
            "-s", f"{w}x{h}", "-r", str(fps), "-i", "-",
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-preset", preset, "-crf", str(crf),
            "-movflags", "+faststart",
            path,
        ]
        self.proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    def write(self, img) -> None:
        if img.mode != "RGB":
            img = img.convert("RGB")
        self.proc.stdin.write(img.tobytes())  # type: ignore[union-attr]

    def close(self) -> None:
        self.proc.stdin.close()  # type: ignore[union-attr]
        ret = self.proc.wait()
        if ret != 0:
            raise RuntimeError(f"FFmpeg falló al escribir {self.path} (code {ret})")

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()


def media_duration(path: str) -> float:
    """Duración en segundos de un archivo de audio/video (vía ffprobe)."""
    try:
        out = subprocess.check_output([
            FFPROBE, "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", path,
        ]).decode().strip()
        return float(out)
    except Exception:
        return 0.0


def run_ffmpeg(args: list[str]) -> None:
    cmd = [FFMPEG, "-y", "-loglevel", "error", *args]
    subprocess.run(cmd, check=True)
