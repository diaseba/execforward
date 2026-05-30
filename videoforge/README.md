# VideoForge

Generador de video **standalone, 100% libre, sin licencias de pago**. No depende
de Gemini, Kling, Veo, Sora ni servicios con suscripción.

Es una **app orquestadora ("director")**: describes un video en un brief (YAML) y
VideoForge enruta cada escena al mejor motor libre disponible y compone el MP4
final (concatenación + transiciones + audio + subtítulos) con FFmpeg.

## La idea (honesta)

No existe *un* motor libre que iguale a Kling/Veo en todo. Por eso VideoForge
separa dos mundos:

- **Núcleo (Fase 1) — gratis, sin GPU, corre en cualquier máquina/contenedor.**
  Motion graphics, texto cinético, datos animados, fondos abstractos
  procedurales, slideshows Ken Burns y footage de stock libre. Para intros,
  explainers, ads sociales, contenido "faceless" y b-roll de ambiente, esto
  **iguala o supera** a Kling — y es 100% on-brand y reproducible.
- **Generativo (Fase 2) — opt-in, requiere GPU (local o nube por horas).**
  Video fotorrealista / storytelling / cartoon-anime y avatares con modelos
  open-source. Se acerca a Kling pero necesita cómputo (se avisa el costo).

## Instalación

```bash
cd videoforge
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
# FFmpeg debe estar instalado en el sistema (apt install ffmpeg)
```

## Uso

```bash
./bin/videoforge engines                                   # lista motores
./bin/videoforge render examples/brief.yaml -o out/demo.mp4 --draft   # iteración rápida
./bin/videoforge render examples/brief.yaml -o out/demo.mp4           # calidad final
```

> Principio de costo mínimo: usa siempre `--draft` (media resolución, rápido)
> mientras iteras; quita el flag solo cuando el resultado esté aprobado.

## Motores (Fase 1)

| type | qué hace | GPU | costo |
|---|---|---|---|
| `text` / `title` | títulos cinéticos, lower-thirds, CTAs, quotes | no | gratis |
| `abstract` | fondos procedurales animados (shader) on-brand | no | gratis |
| `data` | gráfico de barras animado | no | gratis |
| `slideshow` | imágenes con Ken Burns (zoom/paneo) | no | gratis |
| `stock` | footage de stock libre (Pexels/Pixabay) | no | gratis* |

\* gratis con API key del tier gratuito (ver `.env.example`).

## Formato del brief

```yaml
title: "Mi video"
aspect: "16:9"        # 16:9 | 9:16 | 1:1 | 4:5
fps: 30
brand: execforward    # preset de marca (colores/tipografía)
voice: false          # narración TTS por escena (requiere piper/espeak-ng)
subtitles: false      # subtítulos auto (requiere faster-whisper)
music: ruta.mp3       # pista de fondo opcional
scenes:
  - type: text
    duration: 3.5
    text: "Hola\nmundo"
    subtitle: "subtítulo"
    bg: ink           # color de paleta o #RRGGBB
    narration: "Texto que leerá la voz"
```

## Audio y subtítulos (opcional, libre)

- **Voz (TTS):** instala [Piper](https://github.com/rhasspy/piper) (calidad alta,
  offline) y define `PIPER_VOICE` con un modelo `.onnx`; o `espeak-ng` como
  fallback. Activa con `voice: true`.
- **Subtítulos:** `pip install faster-whisper` y `subtitles: true`.

## Fase 2 — motores generativos (GPU)

Pluggable: se registran en `videoforge/engines/__init__.py` igual que los demás.
Hoja de ruta:

- `diffusion` → ComfyUI con **Wan 2.2** (TI2V-5B en 24GB, A14B en 40GB+),
  **LTX-Video** (rápido, 12–24GB) o **HunyuanVideo** (quantizado en 24GB).
- `avatar` → **LivePortrait / Hallo / SadTalker** (talking-head).
- Voz clonada → **XTTS v2** (coqui-tts).

GPU: local (p.ej. RTX 4090) o alquilada por horas (RunPod/Vast ~USD 0.30–2/hr).

## Arquitectura

```
brief.yaml → schema.Brief → Compositor → [Router → Engine.render() por escena]
           → concat + transiciones → audio (música + TTS) → subtítulos → MP4
```

Agregar un motor = una subclase de `engines/base.Engine` registrada en
`engines/__init__.py`. El router lo enruta por `scene.type` sin más cambios.
