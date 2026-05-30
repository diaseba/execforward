"""Motor de footage de stock libre (Pexels / Pixabay).

Descarga clips con licencia libre (sin IA de pago) y los ajusta al lienzo
(escala+recorte+trim). Requiere PEXELS_API_KEY o PIXABAY_API_KEY en el entorno
(ambas tienen tier gratuito). Si no hay key/red/resultado, degrada a una
tarjeta on-brand para no romper el render.
"""
from __future__ import annotations

import json
import os
import urllib.parse
import urllib.request

from PIL import Image, ImageDraw

from .base import Engine, RenderContext
from ..schema import Scene
from ..util import VideoWriter, run_ffmpeg


def _pexels_search(query: str, orientation: str) -> str | None:
    key = os.environ.get("PEXELS_API_KEY")
    if not key:
        return None
    url = ("https://api.pexels.com/videos/search?per_page=1&query="
           + urllib.parse.quote(query) + "&orientation=" + orientation)
    try:
        req = urllib.request.Request(url, headers={"Authorization": key})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode())
        files = data["videos"][0]["video_files"]
        files = sorted(files, key=lambda f: f.get("width", 0))
        # Elegir el más pequeño que cubra 1280 de ancho (suficiente, ahorra datos).
        pick = next((f for f in files if f.get("width", 0) >= 1280), files[-1])
        return pick["link"]
    except Exception:
        return None


class StockEngine(Engine):
    name = "stock"
    requires_gpu = False
    cost = 0.0  # API gratis; solo ancho de banda

    def render(self, scene: Scene, ctx: RenderContext) -> str:
        query = scene.query or scene.text or "abstract background"
        orientation = "portrait" if ctx.h > ctx.w else (
            "square" if ctx.h == ctx.w else "landscape")
        out = ctx.tmp(f"clip_{id(scene):x}_stock.mp4")

        link = _pexels_search(query, orientation)
        if link:
            src = ctx.tmp(f"stock_src_{id(scene):x}.mp4")
            try:
                urllib.request.urlretrieve(link, src)
                # Escala cubriendo + recorte centrado + trim + fundidos.
                vf = (f"scale={ctx.w}:{ctx.h}:force_original_aspect_ratio=increase,"
                      f"crop={ctx.w}:{ctx.h},fps={ctx.fps},"
                      f"fade=t=in:st=0:d=0.4,"
                      f"fade=t=out:st={max(0, scene.duration - 0.4):.2f}:d=0.4")
                run_ffmpeg(["-stream_loop", "-1", "-i", src, "-t", f"{scene.duration}",
                            "-vf", vf, "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                            "-preset", "veryfast" if ctx.draft else "medium", out])
                return out
            except Exception:
                pass

        # Degradación: tarjeta on-brand avisando que falta la fuente.
        return self._placeholder(scene, ctx, query)

    def _placeholder(self, scene: Scene, ctx: RenderContext, query: str) -> str:
        msg = f"[stock: '{query}']  — define PEXELS_API_KEY"
        font = ctx.font("regular", 38)

        def draw(i, t, p) -> Image.Image:
            img = Image.new("RGB", (ctx.w, ctx.h), ctx.color(scene.bg, "ink"))
            d = ImageDraw.Draw(img)
            tw = d.textlength(msg, font=font)
            d.text(((ctx.w - tw) // 2, ctx.h // 2), msg, font=font,
                   fill=ctx.color(None, "muted"))
            return img

        return self.render_frames(ctx, scene, draw)
