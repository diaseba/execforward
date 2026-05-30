"""Motor de fondos abstractos / ambiente (procedural, tipo shader).

Genera gradientes animados y campos de flujo con numpy mezclando colores de
marca. Reemplaza el b-roll abstracto generado por IA — gratis, sin GPU,
determinista y on-brand. Útil como fondo de hero, intros y transiciones.
"""
from __future__ import annotations

import numpy as np
from PIL import Image

from .base import Engine, RenderContext
from ..schema import Scene


class AbstractEngine(Engine):
    name = "abstract"
    requires_gpu = False
    cost = 0.0

    def render(self, scene: Scene, ctx: RenderContext) -> str:
        # Dos colores de marca para el gradiente animado.
        c1 = np.array(ctx.color(scene.bg, "ink"), dtype=np.float32)
        c2 = np.array(ctx.color(scene.accent, "primary"), dtype=np.float32)
        c3 = np.array(ctx.color(scene.fg, "accent"), dtype=np.float32)

        # Render interno a resolución reducida para velocidad; upscale suave.
        scale = 0.5 if not ctx.draft else 0.4
        iw = max(16, int(ctx.w * scale))
        ih = max(16, int(ctx.h * scale))
        yy, xx = np.meshgrid(
            np.linspace(0, 1, ih, dtype=np.float32),
            np.linspace(0, 1, iw, dtype=np.float32),
            indexing="ij",
        )
        speed = float(scene.extra.get("speed", 1.0))

        def draw(i, t, p) -> Image.Image:
            ph = t * speed
            # Campo de flujo: suma de ondas sinusoidales en distintas direcciones.
            f = (
                np.sin((xx * 3.0 + ph * 0.6)) * 0.5
                + np.sin((yy * 2.5 - ph * 0.4 + xx * 1.5)) * 0.5
                + np.sin(((xx + yy) * 2.0 + ph * 0.3)) * 0.5
            )
            f = (f - f.min()) / (f.max() - f.min() + 1e-6)  # 0..1
            g = (np.sin((yy * 4.0 + xx * 2.0 - ph * 0.5)) * 0.5 + 0.5)

            f = f[..., None]
            g = g[..., None]
            # Mezcla de 3 colores según los dos campos.
            base = c1 * (1 - f) + c2 * f
            img = base * (1 - g * 0.45) + c3 * (g * 0.45)
            arr = np.clip(img, 0, 255).astype(np.uint8)
            frame = Image.fromarray(arr, "RGB").resize((ctx.w, ctx.h), Image.BILINEAR)
            return frame

        return self.render_frames(ctx, scene, draw)
