"""CLI de VideoForge.

Uso:
  videoforge render BRIEF.yaml -o salida.mp4 [--draft]
  videoforge engines           # lista los motores y si requieren GPU/costo
"""
from __future__ import annotations

import argparse
import sys
import time

from .compositor import Compositor
from .engines import REGISTRY
from .schema import Brief


def _cmd_render(args) -> int:
    brief = Brief.load(args.brief)
    print(f"VideoForge · '{brief.title}'  [{brief.aspect} @ {brief.fps}fps · marca={brief.brand}]"
          + ("  (DRAFT)" if args.draft else ""))
    comp = Compositor(brief, draft=args.draft)
    t0 = time.time()
    out = comp.build(args.output)
    dt = time.time() - t0
    print("\n".join(comp.last_log))
    if getattr(comp, "_voice_warning", False):
        print("  ⚠ voice=true pero no hay motor TTS (instala piper o espeak-ng) → sin voz")
    w, h = comp.last_resolution
    print(f"\n✓ {out}  ({comp.last_total:.1f}s · {w}x{h} · render {dt:.1f}s)")
    return 0


def _cmd_engines(_args) -> int:
    print("Motores registrados:")
    for name, eng in sorted(REGISTRY.items()):
        gpu = "GPU" if eng.requires_gpu else "CPU"
        cost = "gratis" if eng.cost == 0 else f"~${eng.cost}"
        print(f"  {name:11s} [{gpu}] {cost}")
    return 0


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(prog="videoforge",
                                     description="Generador de video libre (sin licencias de pago).")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_render = sub.add_parser("render", help="Renderiza un brief a MP4")
    p_render.add_argument("brief", help="Ruta al brief YAML/JSON")
    p_render.add_argument("-o", "--output", default="out.mp4", help="MP4 de salida")
    p_render.add_argument("--draft", action="store_true",
                          help="Render rápido a media resolución (iteración barata)")
    p_render.set_defaults(func=_cmd_render)

    p_eng = sub.add_parser("engines", help="Lista los motores disponibles")
    p_eng.set_defaults(func=_cmd_engines)

    args = parser.parse_args(argv)
    try:
        return args.func(args)
    except Exception as e:  # noqa: BLE001
        print(f"✗ Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
