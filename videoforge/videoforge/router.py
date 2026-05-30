"""Router: elige el motor para cada escena por su `type`.

Punto de extensión: cuando se agreguen motores generativos (Fase 2: diffusion,
avatar) se registran en engines.REGISTRY y el router los enruta sin más cambios.
"""
from __future__ import annotations

from .engines import REGISTRY, Engine
from .schema import Scene


class UnknownEngineError(ValueError):
    pass


def resolve(scene: Scene) -> Engine:
    engine = REGISTRY.get(scene.type)
    if engine is None:
        raise UnknownEngineError(
            f"Tipo de escena desconocido: '{scene.type}'. "
            f"Disponibles: {sorted(REGISTRY)}"
        )
    return engine
