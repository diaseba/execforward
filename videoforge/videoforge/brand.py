"""Presets de marca: paleta y tipografía.

Los colores de ExecForward se tomaron literal del Brandbook
(docs/Brandbook_ExecForward_v1.md). No interpretar: usar exactos.
"""
from __future__ import annotations

PRESETS: dict[str, dict] = {
    "execforward": {
        "palette": {
            "primary": "#2563EB",   # azul principal (CTA)
            "ink": "#0F172A",       # tinta / fondo oscuro
            "accent": "#14B8A6",    # teal (barra hero, acentos)
            "white": "#FFFFFF",
            "bg": "#0F172A",        # fondo por defecto de escenas
            "surface": "#F8FAFC",   # fondo claro
            "muted": "#64748B",     # texto secundario
            "border": "#E2E8F0",
            "sky": "#0EA5E9",
            "success": "#10B981",
            "danger": "#EF4444",
            "warning": "#F59E0B",
        },
        # Fuentes de marca (Google Fonts). Si no están instaladas localmente,
        # util.get_font() cae a DejaVu automáticamente.
        "fonts": {"bold": "Nunito", "regular": "Karla"},
        "data_colors": ["#2563EB", "#14B8A6", "#0EA5E9", "#10B981", "#F59E0B"],
    },
    "default": {
        "palette": {
            "primary": "#3B82F6",
            "ink": "#111827",
            "accent": "#10B981",
            "white": "#FFFFFF",
            "bg": "#111827",
            "surface": "#F9FAFB",
            "muted": "#9CA3AF",
            "border": "#E5E7EB",
            "sky": "#0EA5E9",
            "success": "#22C55E",
            "danger": "#EF4444",
            "warning": "#F59E0B",
        },
        "fonts": {"bold": "DejaVu Sans", "regular": "DejaVu Sans"},
        "data_colors": ["#3B82F6", "#10B981", "#0EA5E9", "#22C55E", "#F59E0B"],
    },
}


def get_preset(name: str) -> dict:
    return PRESETS.get(name, PRESETS["default"])
