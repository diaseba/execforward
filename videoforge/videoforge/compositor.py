"""Compositor: el "director" que arma el video final.

Flujo: por cada escena -> router elige motor -> motor renderiza un clip ->
se concatenan los clips -> se construye la pista de audio (música + narración
TTS por escena) -> se mezcla -> (opcional) se queman subtítulos automáticos.

Todo con FFmpeg. Sin GPU, sin servicios de pago en el núcleo.
"""
from __future__ import annotations

import os
import subprocess
import tempfile

from . import audio as audio_pkg
from .audio import subtitles as subs_mod
from .audio import tts as tts_mod
from .brand import get_preset
from .engines import RenderContext
from .router import resolve
from .schema import Brief
from .util import FFMPEG, media_duration, run_ffmpeg


class Compositor:
    def __init__(self, brief: Brief, draft: bool = False, workdir: str | None = None):
        self.brief = brief
        self.draft = draft
        self._tmp = workdir or tempfile.mkdtemp(prefix="videoforge_")
        os.makedirs(self._tmp, exist_ok=True)

    def _context(self) -> RenderContext:
        w, h = self.brief.resolution()
        if self.draft:  # iteración rápida y barata: media resolución
            w, h = w // 2 // 2 * 2, h // 2 // 2 * 2
        preset = get_preset(self.brief.brand)
        return RenderContext(
            brief=self.brief,
            palette=preset["palette"],
            fonts=preset["fonts"],
            data_colors=preset["data_colors"],
            w=w, h=h, fps=self.brief.fps,
            workdir=self._tmp, draft=self.draft,
        )

    def build(self, output: str) -> str:
        ctx = self._context()
        log = []

        # 1) Render de cada escena -> clip, registrando offsets para el audio.
        clips: list[str] = []
        offsets: list[float] = []
        t_cursor = 0.0
        for idx, scene in enumerate(self.brief.scenes):
            engine = resolve(scene)
            clip = engine.render(scene, ctx)
            clips.append(clip)
            offsets.append(t_cursor)
            t_cursor += media_duration(clip) or scene.duration
            log.append(f"  escena {idx + 1}: {scene.type:9s} {scene.duration:>4.1f}s "
                       f"({engine.name}{' [GPU]' if engine.requires_gpu else ''})")
        total = t_cursor

        # 2) Concatenar clips (mismo códec/res/fps -> copia sin recodificar).
        silent = os.path.join(self._tmp, "video_silent.mp4")
        self._concat(clips, silent)

        # 3) Construir audio (música + narración TTS por escena).
        audio_path = self._build_audio(ctx, offsets, total)

        # 4) Muxear audio + video.
        muxed = os.path.join(self._tmp, "video_muxed.mp4")
        if audio_path:
            run_ffmpeg(["-i", silent, "-i", audio_path, "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "192k", "-shortest", muxed])
        else:
            muxed = silent

        # 5) Subtítulos automáticos (opcional, requiere faster-whisper).
        final = muxed
        if self.brief.subtitles and audio_path:
            srt = subs_mod.transcribe_to_srt(
                audio_path, os.path.join(self._tmp, "subs.srt"))
            if srt:
                final = os.path.join(self._tmp, "video_subs.mp4")
                run_ffmpeg(["-i", muxed, "-vf", f"subtitles={srt}",
                            "-c:a", "copy", final])
                log.append("  subtítulos: quemados (whisper)")
            else:
                log.append("  subtítulos: omitidos (instala faster-whisper)")

        os.makedirs(os.path.dirname(os.path.abspath(output)), exist_ok=True)
        run_ffmpeg(["-i", final, "-c", "copy", output])

        self.last_log = log
        self.last_total = total
        self.last_resolution = (ctx.w, ctx.h)
        return output

    # ---- helpers ----

    def _concat(self, clips: list[str], out: str) -> None:
        listfile = os.path.join(self._tmp, "concat.txt")
        with open(listfile, "w", encoding="utf-8") as fh:
            for c in clips:
                fh.write(f"file '{os.path.abspath(c)}'\n")
        try:
            run_ffmpeg(["-f", "concat", "-safe", "0", "-i", listfile,
                        "-c", "copy", out])
        except subprocess.CalledProcessError:
            # Fallback: recodificar si la copia directa falla.
            run_ffmpeg(["-f", "concat", "-safe", "0", "-i", listfile,
                        "-c:v", "libx264", "-pix_fmt", "yuv420p", out])

    def _build_audio(self, ctx: RenderContext, offsets: list[float],
                     total: float) -> str | None:
        inputs: list[str] = []
        filters: list[str] = []
        labels: list[str] = []
        n = 0

        # Narración TTS por escena (si voice=true y hay motor TTS).
        if self.brief.voice:
            engine = tts_mod.available()
            if engine:
                for scene, off in zip(self.brief.scenes, offsets):
                    if not scene.narration:
                        continue
                    wav = os.path.join(self._tmp, f"vo_{n}.wav")
                    if tts_mod.synthesize(scene.narration, wav):
                        inputs += ["-i", wav]
                        delay = int(off * 1000)
                        filters.append(f"[{n}:a]adelay={delay}|{delay}[a{n}]")
                        labels.append(f"[a{n}]")
                        n += 1
            else:
                self._voice_warning = True

        # Música de fondo (bed) en loop/trim, volumen reducido.
        music_idx = None
        if self.brief.music and os.path.exists(self.brief.music):
            inputs += ["-stream_loop", "-1", "-i", self.brief.music]
            music_idx = n
            filters.append(f"[{n}:a]volume={0.18 if labels else 0.6}[a{n}]")
            labels.append(f"[a{n}]")
            n += 1

        if not labels:
            return None

        out = os.path.join(self._tmp, "audio.m4a")
        if len(labels) == 1:
            fc = filters[0] + f";{labels[0]}atrim=0:{total:.2f}[mix]"
        else:
            fc = (";".join(filters)
                  + f";{''.join(labels)}amix=inputs={len(labels)}:dropout_transition=0:"
                  f"normalize=0[mx];[mx]atrim=0:{total:.2f}[mix]")
        run_ffmpeg([*inputs, "-filter_complex", fc, "-map", "[mix]",
                    "-c:a", "aac", "-b:a", "192k", out])
        return out
