"""Interfaz común de motor + contexto de render.

Cada motor implementa render(scene, ctx) -> ruta a clip .mp4 y declara si
necesita GPU y su costo aproximado por render. El router elige el motor por
scene.type. Agregar un motor nuevo = una subclase nueva.
"""
from __future__ import annotations

import os
from dataclasses import dataclass
from PIL import Image

from ..schema import Brief, Scene
from ..util import VideoWriter, edge_fade_alpha, get_font, hex_to_rgb


@dataclass
class RenderContext:
    brief: Brief
    palette: dict
    fonts: dict
    data_colors: list
    w: int
    h: int
    fps: int
    workdir: str
    draft: bool = False

    # ---- helpers de color/fuente ----
    def color(self, value: str | None, default_key: str) -> tuple[int, int, int]:
        """Resuelve un color: hex #RRGGBB, nombre de paleta, o default de paleta."""
        if value is None:
            value = self.palette[default_key]
        elif value in self.palette:
            value = self.palette[value]
        return hex_to_rgb(value)

    def font(self, weight: str, size: int):
        family = self.fonts.get(weight, "DejaVu Sans")
        return get_font(family, self._scaled(size), weight)

    def _scaled(self, base_for_1080: int) -> int:
        """Escala un tamaño pensado para 1080p de alto a la resolución actual."""
        return max(8, round(base_for_1080 * self.h / 1080))

    def tmp(self, name: str) -> str:
        return os.path.join(self.workdir, name)


class Engine:
    name: str = "base"
    requires_gpu: bool = False
    cost: float = 0.0  # USD aprox por render (0 = gratis)

    def render(self, scene: Scene, ctx: RenderContext) -> str:
        raise NotImplementedError

    # Utilidad compartida: renderiza N frames con una función draw(i, t, p)->Image
    # y aplica fundido de bordes para transiciones limpias por concatenación.
    def render_frames(self, ctx: RenderContext, scene: Scene, draw) -> str:
        n = max(1, int(round(scene.duration * ctx.fps)))
        out = ctx.tmp(f"clip_{id(scene):x}_{self.name}.mp4")
        fade = 0.0 if scene.transition == "none" else 0.12
        crf = 26 if ctx.draft else 18
        preset = "veryfast" if ctx.draft else "medium"
        with VideoWriter(out, ctx.w, ctx.h, ctx.fps, crf=crf, preset=preset) as vw:
            for i in range(n):
                t = i / ctx.fps
                p = i / max(1, n - 1)
                img = draw(i, t, p)
                a = edge_fade_alpha(p, fade)
                if a < 1.0:
                    img = self._fade_to_black(img, a)
                vw.write(img)
        return out

    @staticmethod
    def _fade_to_black(img: Image.Image, alpha: float) -> Image.Image:
        black = Image.new(img.mode, img.size, (0, 0, 0))
        return Image.blend(black, img, alpha)
