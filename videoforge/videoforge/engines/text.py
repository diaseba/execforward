"""Motor de texto / títulos cinéticos (motion graphics).

Calidad broadcast, on-brand, sin GPU. Render: tarjeta con barra de acento
(estilo hero del brandbook), título con fundido + subida suave, y subtítulo
opcional. Cubre intros, lower-thirds, quotes, CTAs.
"""
from __future__ import annotations

from PIL import Image, ImageDraw

from .base import Engine, RenderContext
from ..schema import Scene
from ..util import ease_out_cubic


def _wrap(draw: ImageDraw.ImageDraw, text: str, font, max_w: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        words = paragraph.split(" ")
        cur = ""
        for w in words:
            test = (cur + " " + w).strip()
            if draw.textlength(test, font=font) <= max_w or not cur:
                cur = test
            else:
                lines.append(cur)
                cur = w
        lines.append(cur)
    return lines


class TextEngine(Engine):
    name = "text"
    requires_gpu = False
    cost = 0.0

    def render(self, scene: Scene, ctx: RenderContext) -> str:
        bg = ctx.color(scene.bg, "bg")
        fg = ctx.color(scene.fg, "white")
        accent = ctx.color(scene.accent, "accent")
        title = scene.text or scene.extra.get("title") or ""
        subtitle = scene.subtitle

        title_font = ctx.font("bold", scene.extra.get("size", 96))
        sub_font = ctx.font("regular", scene.extra.get("subsize", 44))

        margin = int(ctx.w * 0.10)
        max_w = ctx.w - 2 * margin

        # Pre-cálculo de líneas (sobre un canvas dummy).
        dummy = ImageDraw.Draw(Image.new("RGB", (ctx.w, ctx.h)))
        title_lines = _wrap(dummy, title, title_font, max_w) if title else []
        sub_lines = _wrap(dummy, subtitle, sub_font, max_w) if subtitle else []

        line_h = int(title_font.size * 1.18)
        sub_line_h = int(sub_font.size * 1.3)
        block_h = len(title_lines) * line_h + (
            len(sub_lines) * sub_line_h + int(line_h * 0.5) if sub_lines else 0)
        y0 = (ctx.h - block_h) // 2

        left_align = scene.align == "left"
        bar_w = int(ctx.w * 0.045)
        bar_h = int(ctx.h * 0.008)  # barra 8px @1080 -> teal

        def draw(i, t, p) -> Image.Image:
            img = Image.new("RGB", (ctx.w, ctx.h), bg)
            d = ImageDraw.Draw(img)

            # Barra de acento (teal) — aparece primero.
            bar_p = ease_out_cubic(min(1.0, p / 0.35))
            bar_x = margin if left_align else (ctx.w - bar_w) // 2
            d.rectangle(
                [bar_x, y0 - int(line_h * 0.55),
                 bar_x + int(bar_w * bar_p), y0 - int(line_h * 0.55) + bar_h],
                fill=accent,
            )

            # Título: fundido + subida suave, escalonado por línea.
            y = y0
            for li, line in enumerate(title_lines):
                delay = 0.10 + li * 0.06
                lp = ease_out_cubic(max(0.0, min(1.0, (p - delay) / 0.45)))
                rise = int((1 - lp) * line_h * 0.5)
                col = tuple(int(c * lp) + int(bg[k] * (1 - lp)) for k, c in enumerate(fg))
                tw = d.textlength(line, font=title_font)
                x = margin if left_align else (ctx.w - tw) // 2
                d.text((x, y + rise), line, font=title_font, fill=col)
                y += line_h

            # Subtítulo: aparece después del título.
            if sub_lines:
                y += int(line_h * 0.5)
                for li, line in enumerate(sub_lines):
                    delay = 0.45 + li * 0.05
                    lp = ease_out_cubic(max(0.0, min(1.0, (p - delay) / 0.4)))
                    muted = ctx.color(None, "muted")
                    col = tuple(int(muted[k] * lp) + int(bg[k] * (1 - lp)) for k in range(3))
                    tw = d.textlength(line, font=sub_font)
                    x = margin if left_align else (ctx.w - tw) // 2
                    d.text((x, y), line, font=sub_font, fill=col)
                    y += sub_line_h
            return img

        return self.render_frames(ctx, scene, draw)
