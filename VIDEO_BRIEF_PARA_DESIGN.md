# ExecForward — Brief de Video para Iteración de Diseño

**Fecha:** 2026-05-27  
**Para:** Claude Design  
**De:** Tan (Sebastian Selle) via Claude Code  

---

## Contexto del proyecto

ExecForward es un programa ejecutivo digital de búsqueda de empleo. Se necesitan dos videos de marketing:

- **V1_hero_final.mp4** — Video principal (landing page) — 75 segundos
- **V2_prequiz_final.mp4** — Video pre-quiz — 49 segundos (en pausa, ver abajo)

---

## Identidad de marca

```
Primario:    #2563EB  (azul)
Secundario:  #14B8A6  (teal)
Texto:       #1F2937
Tipografía:  Karla Bold (headings) / Nunito (body)
             → En video se usa Arial Bold como fallback (Karla no está disponible como fuente de sistema en Windows)
```

Logos disponibles en `C:\Users\sebas\OneDrive\IA\ExecForward\assets\Logo\`:
- `EF_logo_A_isotipo.svg` — isotipo solo (chevrons)
- `EF_logo_B_horizontal.svg` — wordmark horizontal (texto oscuro, fondo blanco)
- `EF_logo_D_dark.svg` — versión dark mode (texto blanco + ícono azul/teal)
- PNGs equivalentes en la misma carpeta (con fondo sólido — no sirven directamente como overlay transparente)

**Importante:** Los PNGs existentes tienen fondo sólido. Para overlays de video se genera un PNG con fondo transparente usando PIL desde las specs del SVG.

---

## Herramienta de ensamblado

**Archivo principal:** `C:\Users\sebas\OneDrive\IA\ExecForward\assemble_videos.py`

Pipeline: **PIL/Pillow** (genera PNGs de textos y logo) + **ffmpeg 8.1.1** (compositing, audio mix, render final).

- Render de revisión rápida (640p): agregar `-vf scale=640:360 -crf 35 -preset ultrafast` al comando ffmpeg
- Render final: 1280×720, H.264, CRF 20, preset medium

**Rutas de assets:**
```
Videos:  C:\Users\sebas\OneDrive\IA\ExecForward\media\video\
Audio:   C:\Users\sebas\OneDrive\IA\ExecForward\media\audio\
Output:  C:\Users\sebas\OneDrive\IA\ExecForward\media\
Logos:   C:\Users\sebas\OneDrive\IA\ExecForward\assets\Logo\
Quiz:    C:\Users\sebas\OneDrive\IA\ExecForward\media\quiz_pregunta.png
```

Para revisar sin abrir el video completo, extraer frames puntuales:
```bash
ffmpeg -ss 69 -i media/V1_hero_final.mp4 -frames:v 1 -q:v 2 frame_t69.png
```

---

## Estado actual de V1

**Archivo:** `media\V1_hero_final.mp4` — 75 segundos — 12.2 MB

### Clips de video (en orden)
| # | Archivo | Duración ajustada |
|---|---------|-------------------|
| 1 | V1_01__Hook_Esfuerzo_Tracci_n_.mp4 | 15.04s |
| 2 | V1_02__Mercado_Abstract_.mp4 | 15.04s |
| 3 | V1_03__Giro_.mp4 | 15.04s |
| 4 | V1_04__Producto_Abstract_.mp4 | 15.04s |
| 5 | V1_05__CTA_.mp4 | 14.83s |

### Audio
- VO: `vo_v1_hero.mp3` (74.89s) — volumen 100%
- Música: `music_v1.mp3` — volumen 12%, fade out en t=73s

### Textos y timing actuales
```
t= 2- 6s  "Mandaste 60 CVs. Nada."                            blanco, 36pt, y=85%
t= 8-13s  "El problema no eres tu."                            blanco, 32pt, y=85%
t=16-21s  "El 70% de los cargos ejecutivos nunca se publican." blanco, 28pt, y=85%
t=23-28s  "Si estas solo en el 30% visible, ya perdiste."      blanco, 28pt, y=85%
t=33-37s  "No necesitas mas esfuerzo."                         blanco, 36pt, y=85%
t=38-42s  "Necesitas un sistema."                              blanco, 40pt, y=85%
t=46-52s  "ExecForward"                                        azul #2563EB, 48pt, y=40%
t=53-57s  "Propuesta de valor - Mercado - CV - Red - Pitch"    blanco, 22pt, y=85%
t=60-65s  "Diagnostico gratuito - 5 min - Resultado inmediato" teal #14B8A6, 26pt, y=85%
t=67-73s  "Haz el diagnostico ->"                              blanco, 32pt, y=72%
```

Todos los textos: caja negra semitransparente (alpha=127) centrada detrás del texto.

### Overlays de imagen
```
t=59-65s  quiz_pregunta.png   55% ancho del video, centrado, y=25%, opacidad 85%
t=67-75s  logo ExecForward    420px ancho, centrado, y=30%
           (generado con PIL: fondo oscuro semitransparente + texto blanco + ícono)
```

### Fixes ya aplicados en esta versión
- **Logo corregido**: el PNG original era la hoja de referencia completa del brandbook (error). Ahora se genera con PIL desde las specs del SVG dark mode.
- **Audio corregido**: el VO duraba 74.89s pero el video estaba cortado en 74s. Extendido a 75s.
- **Overlap eliminado**: quiz screenshot termina en t=65, logo aparece en t=67 (2s de pausa limpia). Antes los tres elementos (screenshot + logo + texto) se superponían en t=67-72.

---

## Lo que Tan no le gustó — pendiente de iteración

Tan indicó los siguientes problemas generales (algunos ya corregidos arriba, otros pendientes de revisión en la nueva versión):

1. **Diseño de los textos** — Cómo aparecen: tipografía, caja, posición, tamaño. No especificó exactamente qué cambiar — requiere revisión del video corregido y feedback puntual.

2. **Logo** — Corregido (ver arriba). Revisar si el tamaño/posición del logo en la escena CTA (t=67-75) es correcto.

3. **Elementos que se superponían** — Corregido (ver arriba).

4. **Audio de V1 cortado** — Corregido (ver arriba).

---

## V2 — En pausa (clips a rehacer)

**Situación:** Los 6 clips de V2 fueron generados por Claude Haiku con errores de continuidad/diseño y hay que rehacerlos. El script de ensamblado V2 está listo en `assemble_videos.py` (función `build_v2()`), solo faltan los clips correctos.

**Clips necesarios para V2:**
```
V2_01__Hook_.mp4
V2_02__CV_.mp4
V2_03__Abstract_.mp4
V2_04__Quiz_.mp4
V2_05__Diagn_stico_.mp4
V2_06__CTA_.mp4
```

**Alternativa a Kling AI:** Probar Gemini Veo 2/3 primero (Tan tiene cuenta Gemini Pro). Si la calidad no es suficiente, recurrir a Kling AI. Importante: validar calidad con render de prueba en baja resolución antes del render final.

**Especificaciones técnicas de V2 (cuando se retome):**
- Target: 49 segundos
- 6 clips: Hook, CV, Abstract, Quiz, Diagnóstico, CTA
- VO: `vo_v2_prequiz.mp3`
- Música: `music_v2.mp3` (12% vol, fade out en t=47s)
- Quiz screenshots: `quiz_pregunta.png` (t=22-32s) + `quiz_resultado.png` (t=34-41s)
- Logo: mismo formato que V1 (PIL-generated, dark mode)

---

## Workflow de revisión eficiente

Para no gastar tokens de Kling ni tiempo en renders completos:

1. Extraer frames en timestamps clave con ffmpeg → revisar en chat
2. Ajustar parámetros en `assemble_videos.py`
3. Render preview 640p (~20s de render) para confirmar visualmente
4. Render final solo cuando el resultado está aprobado

Comando de preview rápido (agregar a run_ffmpeg o como variante del script):
```
-vf scale=640:360 -crf 35 -preset ultrafast
```

---

## Principio de costo (no negociable)

- Priorizar herramientas gratuitas o incluidas en suscripciones existentes
- Kling AI y ElevenLabs tienen costo — avisar antes de usar
- Iterar siempre en baja calidad primero, calidad final solo cuando está aprobado
