"""Subtítulos automáticos con faster-whisper (libre, offline).

Transcribe el audio final a .srt. Opcional: si faster-whisper no está
instalado, devuelve None y el pipeline continúa sin subtítulos.
Instalar: pip install faster-whisper
"""
from __future__ import annotations


def _fmt_ts(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def transcribe_to_srt(audio_path: str, srt_path: str, model_size: str = "base") -> str | None:
    try:
        from faster_whisper import WhisperModel  # type: ignore
    except Exception:
        return None
    try:
        model = WhisperModel(model_size, device="cpu", compute_type="int8")
        segments, _ = model.transcribe(audio_path)
        lines = []
        for idx, seg in enumerate(segments, 1):
            lines.append(str(idx))
            lines.append(f"{_fmt_ts(seg.start)} --> {_fmt_ts(seg.end)}")
            lines.append(seg.text.strip())
            lines.append("")
        with open(srt_path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines))
        return srt_path
    except Exception:
        return None
