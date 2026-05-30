"""Narración por TTS (texto a voz), 100% libre y offline.

Orden de preferencia (primero disponible gana):
  1. Piper  (https://github.com/rhasspy/piper) — calidad alta, offline, CPU.
  2. espeak-ng — robótico pero universal y diminuto (fallback de emergencia).

Si ninguno está disponible, synthesize() devuelve False y el pipeline sigue
sin voz (avisando). Instalar Piper: ver README (engines/audio opcionales).
"""
from __future__ import annotations

import os
import shutil
import subprocess

_PIPER = shutil.which("piper")
_ESPEAK = shutil.which("espeak-ng") or shutil.which("espeak")


def available() -> str | None:
    if _PIPER:
        return "piper"
    if _ESPEAK:
        return "espeak"
    return None


def synthesize(text: str, out_wav: str, voice_model: str | None = None) -> bool:
    """Genera out_wav a partir de text. Devuelve True si lo logró."""
    text = (text or "").strip()
    if not text:
        return False
    engine = available()
    try:
        if engine == "piper":
            model = voice_model or os.environ.get("PIPER_VOICE")
            if not model or not os.path.exists(model):
                return False  # Piper necesita un archivo de voz .onnx
            with open(out_wav, "wb") as out:
                proc = subprocess.run(
                    [_PIPER, "--model", model, "--output_file", out_wav],
                    input=text.encode(), stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                )
            return proc.returncode == 0 and os.path.exists(out_wav)
        if engine == "espeak":
            proc = subprocess.run(
                [_ESPEAK, "-w", out_wav, text],
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            )
            return proc.returncode == 0 and os.path.exists(out_wav)
    except Exception:
        return False
    return False
