# ExecForward · Video System — Guía humana

> Si eres una persona empezando un video nuevo, lee este doc. Si eres un agente IA, lee primero `CONTEXT.md`.

## TL;DR — los 6 pasos

```
1. Brief        →  Copia _system/templates/brief.template.md → videos/NNN-slug/brief.md
2. Timeline     →  Copia timeline.template.json → videos/NNN-slug/timeline.json
3. Prototipo    →  Copia engine/_starter.html → videos/NNN-slug/prototype.html (abrir en browser)
4. Spec         →  Copia spec.template.md → videos/NNN-slug/SPEC.md
5. Assets       →  Generar clips (Veo) · VO (Gemini TTS) · música (YouTube Audio Lib)
6. Edición      →  DaVinci Resolve · render final
```

## Setup de un video nuevo · paso a paso

### Fase 1 · Brief (15-30 min de pensamiento)

```bash
# Mental: define qué historia y a quién
# Acción: copia el template y llénalo
cp _system/templates/brief.template.md videos/002-mi-video/brief.md
```

Decisiones críticas a tomar aquí (sin esto cerrado no avances):
- Audiencia exacta y estado mental al ver el video
- Promesa única (una frase)
- Hook de los primeros 3 segundos
- Punto de giro emocional
- CTA específico

### Fase 2 · Timeline (30-60 min)

```bash
cp _system/templates/timeline.template.json videos/002-mi-video/timeline.json
```

- Pone `tIn` y `tOut` para cada escena
- Respeta pausas dramáticas (1-4 segundos entre actos)
- Usa los tipos de escena disponibles: `phrase`, `stat`, `brand-reveal`, `modules`, `cta-card`
- Marca la palabra-pivote con `<em>palabra</em>` o usando `accent`

### Fase 3 · Prototipo (10 min)

```bash
cp _system/engine/_starter.html videos/002-mi-video/prototype.html
```

Abre `prototype.html` en el browser. El engine cargará automáticamente tu `timeline.json` al lado. Puedes:
- Scrubear todo el video con la barra inferior
- Saltar a cualquier escena con los chips
- Probar variantes (kinetic / editorial / caption) con Tweaks
- Cambiar logo (horizontal / isotipo)

**Itera aquí hasta que el copy y el timing se sientan bien.** Es la fase más barata para cambiar cosas.

### Fase 4 · Spec (20 min, antes de producir)

```bash
cp _system/templates/spec.template.md videos/002-mi-video/SPEC.md
```

Llena el spec con base en lo aprobado en brief + timeline. Este doc es el handoff a producción.

### Fase 5 · Assets (varias horas, parte más lenta)

Una carpeta `assets/prompts/` por video. Una vez por clip/VO/música:

```bash
cp _system/templates/prompts/veo-clip.template.md videos/002-mi-video/assets/prompts/clip-01-hook.md
cp _system/templates/prompts/voice-direction.md videos/002-mi-video/assets/prompts/voice.md
cp _system/templates/prompts/music-direction.md videos/002-mi-video/assets/prompts/music.md
```

**Producción:**
- **Clips:** Veo 3 en Gemini AI Studio. Pega el prompt en español. Itera 1-2 veces, si no, ve a stock (Pexels/Pixabay).
- **VO:** Gemini TTS (AI Studio → Generate Speech) o ElevenLabs free tier. Voz femenina latam según direction.
- **Música:** YouTube Audio Library / Pixabay Music. Busca por mood, no por género.

Resultado: en `videos/002-mi-video/assets/`
```
clips/
  01-hook.mp4
  02-insight.mp4
  ...
vo/
  master.wav
music/
  master.mp3
```

### Fase 6 · Edición en DaVinci Resolve

1. Nuevo proyecto 1920×1080 30fps (o vertical según video)
2. Importar clips al timeline en orden
3. Capa de overlay:
   - **Opción simple:** screen-record el `prototype.html` (con `hideVideo=true` para fondo negro) → blend en *Screen* o *Lighten*
   - **Opción pro:** render frame-by-frame con Puppeteer → secuencia PNG con alpha → composit limpio
4. VO en pista de audio sincronizada
5. Música en pista 2, ducking automático cuando hay VO
6. Color grading consistente entre clips (LUT base + ajustes por acto)
7. Export H.264 mp4 ~8 Mbps

## Lecciones aprendidas / pitfalls

- **No saltarte el brief.** Si el brief tiene TODOs, el video va a tener TODOs.
- **El timeline en JSON es la verdad.** Cualquier ajuste de timing/copy se hace ahí, no en el JSX del engine.
- **Brand lock estricto.** Lee `_system/CONTEXT.md` §2 y no negocies casting/voz/color.
- **Clips primero, edición después.** No empieces a editar en Resolve hasta tener todos los clips definitivos.
- **Pausas no son tiempo muerto.** Los silencios de 1-4 s entre actos son donde el mensaje aterriza.
- **Si una iteración va mal, baja al brief.** No remes en la fase 5 cuando el problema está en la fase 1.

## Estructura del sistema (referencia rápida)

Ver `_system/CONTEXT.md` §6 para el árbol completo.

## ¿Algo se rompió o falta?

Mejora directamente sobre `_system/` y anota el cambio en `_system/CHANGELOG.md` (créalo si no existe).
