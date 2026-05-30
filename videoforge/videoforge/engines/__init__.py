"""Registro de motores. Agregar un motor = registrarlo aquí."""
from __future__ import annotations

from .base import Engine, RenderContext
from .text import TextEngine
from .abstract import AbstractEngine
from .data import DataEngine
from .slideshow import SlideshowEngine
from .stock import StockEngine

# Mapa type -> instancia de motor (Fase 1: todos gratis, sin GPU).
REGISTRY: dict[str, Engine] = {
    "text": TextEngine(),
    "title": TextEngine(),      # alias
    "abstract": AbstractEngine(),
    "data": DataEngine(),
    "slideshow": SlideshowEngine(),
    "stock": StockEngine(),
}

__all__ = ["Engine", "RenderContext", "REGISTRY"]
