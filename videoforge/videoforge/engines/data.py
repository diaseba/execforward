"""Motor de visualización de datos: gráfico de barras animado, on-brand.

scene.data = [{label, value}, ...]. Las barras crecen con easing escalonado.
Sin GPU. Ideal para resultados, métricas y comparativas en explainers.
"""
from __future__ import annotations

from PIL import Image, ImageDraw

from .base import Engine, RenderContext
from ..schema import Scene
from ..util import ease_out_cubic, hex_to_rgb


class DataEngine(Engine):
    name = "data"
    requires_gpu = False
    cost = 0.0

    def render(self, scene: Scene, ctx: RenderContext) -> str:
        items = scene.data or []
        if not items:
            items = [{"label": "A", "value": 30}, {"label": "B", "value": 70}]
        bg = ctx.color(scene.bg, "bg")
        fg = ctx.color(scene.fg, "white")
        max_val = max((float(it.get("value", 0)) for it in items), default=1.0) or 1.0
        colors = [hex_to_rgb(c) for c in ctx.data_colors]

        title = scene.text
        title_font = ctx.font("bold", 64)
        label_font = ctx.font("regular", 36)
        value_font = ctx.font("bold", 40)

        margin = int(ctx.w * 0.10)
        top = int(ctx.h * (0.28 if title else 0.16))
        bottom = int(ctx.h * 0.88)
        chart_h = bottom - top
        n = len(items)
        gap = int(ctx.w * 0.03)
        avail = ctx.w - 2 * margin - gap * (n - 1)
        bar_w = avail // n

        def draw(i, t, p) -> Image.Image:
            img = Image.new("RGB", (ctx.w, ctx.h), bg)
            d = ImageDraw.Draw(img)
            if title:
                tw = d.textlength(title, font=title_font)
                d.text(((ctx.w - tw) // 2, int(ctx.h * 0.12)), title,
                       font=title_font, fill=fg)
            for k, it in enumerate(items):
                val = float(it.get("value", 0))
                delay = 0.1 + k * 0.08
                gp = ease_out_cubic(max(0.0, min(1.0, (p - delay) / 0.5)))
                bh = int(chart_h * (val / max_val) * gp)
                x = margin + k * (bar_w + gap)
                col = colors[k % len(colors)]
                d.rounded_rectangle([x, bottom - bh, x + bar_w, bottom],
                                    radius=int(bar_w * 0.12), fill=col)
                # Valor encima de la barra.
                vtxt = str(it.get("value", ""))
                vw = d.textlength(vtxt, font=value_font)
                d.text((x + (bar_w - vw) // 2, bottom - bh - int(value_font.size * 1.3)),
                       vtxt, font=value_font, fill=fg)
                # Etiqueta debajo.
                lbl = str(it.get("label", ""))
                lw = d.textlength(lbl, font=label_font)
                d.text((x + (bar_w - lw) // 2, bottom + int(label_font.size * 0.3)),
                       lbl, font=label_font, fill=ctx.color(None, "muted"))
            return img

        return self.render_frames(ctx, scene, draw)
