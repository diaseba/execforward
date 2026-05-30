"""Motor de slideshow con efecto Ken Burns (zoom/paneo suave).

scene.images = [rutas locales o URLs]. Cada imagen ocupa un tramo igual de la
duración con zoom-in lento. Si una imagen no carga, se omite. Sin GPU.
"""
from __future__ import annotations

import io
import os
import urllib.request

from PIL import Image, ImageDraw

from .base import Engine, RenderContext
from ..schema import Scene
from ..util import ease_in_out


def _load_image(src: str) -> Image.Image | None:
    try:
        if src.startswith(("http://", "https://")):
            with urllib.request.urlopen(src, timeout=20) as r:
                data = r.read()
            return Image.open(io.BytesIO(data)).convert("RGB")
        if os.path.exists(src):
            return Image.open(src).convert("RGB")
    except Exception:
        return None
    return None


def _cover(img: Image.Image, w: int, h: int) -> Image.Image:
    """Escala cubriendo el lienzo (sin barras), recorte centrado."""
    iw, ih = img.size
    scale = max(w / iw, h / ih)
    img = img.resize((int(iw * scale), int(ih * scale)), Image.LANCZOS)
    iw, ih = img.size
    left = (iw - w) // 2
    top = (ih - h) // 2
    return img.crop((left, top, left + w, top + h))


class SlideshowEngine(Engine):
    name = "slideshow"
    requires_gpu = False
    cost = 0.0

    def render(self, scene: Scene, ctx: RenderContext) -> str:
        sources = scene.images or []
        loaded = [im for im in (_load_image(s) for s in sources) if im is not None]

        if not loaded:
            # Sin imágenes válidas: placeholder on-brand para no romper el render.
            placeholder = Image.new("RGB", (ctx.w, ctx.h), ctx.color(scene.bg, "bg"))
            d = ImageDraw.Draw(placeholder)
            msg = "[slideshow: sin imágenes]"
            font = ctx.font("regular", 40)
            tw = d.textlength(msg, font=font)
            d.text(((ctx.w - tw) // 2, ctx.h // 2), msg, font=font,
                   fill=ctx.color(None, "muted"))
            loaded = [placeholder]

        # Pre-escalar con margen para permitir zoom (Ken Burns).
        zoom_max = 1.12
        bigs = [_cover(im, int(ctx.w * zoom_max), int(ctx.h * zoom_max)) for im in loaded]
        per = scene.duration / len(bigs)

        def draw(i, t, p) -> Image.Image:
            idx = min(len(bigs) - 1, int(t / per))
            local = (t - idx * per) / per  # 0..1 dentro de la imagen
            big = bigs[idx]
            z = 1.0 + (zoom_max - 1.0) * ease_in_out(local)
            cw, ch = int(ctx.w / z * zoom_max), int(ctx.h / z * zoom_max)
            bw, bh = big.size
            left = (bw - cw) // 2
            top = (bh - ch) // 2
            crop = big.crop((left, top, left + cw, top + ch)).resize(
                (ctx.w, ctx.h), Image.BILINEAR)
            return crop

        return self.render_frames(ctx, scene, draw)
