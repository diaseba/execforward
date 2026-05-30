"""Esquema de guion (brief) y escenas.

Un video se describe en YAML/JSON: metadatos globales + lista de escenas.
Cada escena tiene un `type` que el router mapea a un motor.
"""
from __future__ import annotations

from dataclasses import dataclass, field, fields
from typing import Any
import yaml

# Resoluciones por relación de aspecto (alto base; draft escala hacia abajo).
ASPECTS = {
    "16:9": (1920, 1080),
    "9:16": (1080, 1920),
    "1:1": (1080, 1080),
    "4:5": (1080, 1350),
}


@dataclass
class Scene:
    type: str = "text"               # text|abstract|data|slideshow|stock
    duration: float = 4.0            # segundos
    # Texto / títulos
    text: str | None = None
    subtitle: str | None = None
    # Estilo / color (nombre de paleta de marca o hex #RRGGBB)
    style: str = "default"
    bg: str | None = None            # color o None -> usa marca
    fg: str | None = None
    accent: str | None = None
    transition: str = "fade"         # fade|none
    align: str = "center"            # left|center
    # Audio
    narration: str | None = None     # texto para TTS (si voice=true)
    # Específicos por tipo
    data: list[dict] | None = None   # data: [{label, value}]
    images: list[str] | None = None  # slideshow: rutas/URLs
    query: str | None = None         # stock: término de búsqueda
    extra: dict[str, Any] = field(default_factory=dict)

    @classmethod
    def from_dict(cls, d: dict) -> "Scene":
        known = {f.name for f in fields(cls)}
        kwargs = {k: v for k, v in d.items() if k in known}
        extra = {k: v for k, v in d.items() if k not in known}
        scene = cls(**kwargs)
        scene.extra.update(extra)
        return scene


@dataclass
class Brief:
    title: str = "Untitled"
    aspect: str = "16:9"
    fps: int = 30
    brand: str = "execforward"
    music: str | None = None         # ruta a pista de música (opcional)
    voice: bool = False              # generar narración TTS por escena
    subtitles: bool = False          # quemar subtítulos automáticos (whisper)
    scenes: list[Scene] = field(default_factory=list)

    @classmethod
    def from_dict(cls, d: dict) -> "Brief":
        scenes = [Scene.from_dict(s) for s in d.get("scenes", [])]
        meta = {k: v for k, v in d.items() if k != "scenes"}
        return cls(scenes=scenes, **meta)

    @classmethod
    def load(cls, path: str) -> "Brief":
        with open(path, "r", encoding="utf-8") as fh:
            data = yaml.safe_load(fh)
        if not isinstance(data, dict):
            raise ValueError(f"Brief inválido en {path}: se esperaba un mapeo YAML")
        return cls.from_dict(data)

    def resolution(self) -> tuple[int, int]:
        if self.aspect not in ASPECTS:
            raise ValueError(f"aspect '{self.aspect}' no soportado. Opciones: {list(ASPECTS)}")
        return ASPECTS[self.aspect]
