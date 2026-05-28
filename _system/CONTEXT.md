# ExecForward · Video System — CONTEXT (read me first)

> **Para agentes (Claude/GPT/Gemini):** este doc es tu único entrypoint. Léelo completo antes de proponer o ejecutar nada. Los pointers al final te dicen qué profundizar según la tarea.

---

## 1 · Qué es esto

Un sistema reutilizable para producir videos de **ExecForward** con identidad consistente, mínima fricción y costo cero más allá de las suscripciones existentes (Claude Pro · ChatGPT Pro · Gemini Pro · Google Workspace).

Cada video vive en `videos/NNN-slug/`. El sistema (`_system/`) provee marca, motor de overlay, plantillas y prompts.

---

## 2 · Marca · datos no-negociables

- **Producto:** ExecForward — *El sistema de posicionamiento ejecutivo*.
- **Público objetivo:** mujeres ejecutivas latinoamericanas, 40-55, buscando próximo salto (C-suite, board, transición).
- **Tono:** cercano-confiado, par-a-par, nunca vendedor. Inspiración: TED Talks femeninas latam, Bloomberg Línea, MasterClass.
- **Idioma default:** español-latam neutro (no caribeño marcado, no rioplatense marcado).

### Tokens visuales (ver `_system/brand/tokens.css`)
- **Color acento único:** teal `#2DD4BF` para palabra-pivote y números; teal `#14B8A6` para CTA. No introducir otros acentos.
- **Tipografía:** Karla (700/800) para titulares; Nunito (600/700) para eyebrows y proof.
- **Logo:** sistema 3×3 (forma × paleta) en `_system/brand/`:
  - Formas: **A** isotipo solo · **B** horizontal · **C** apilado.
  - Paletas: **light** (default · fondos claros) · **dark** (fondos oscuros) · **mono** (impresión un tono).
  - Para uso general en videos: `EF_logo_horizontal_light.svg` (default), `EF_logo_horizontal_dark.svg` (sobre fondo oscuro), `EF_logo_isotipo_light.svg` (cuando no hay espacio horizontal).
  - Specs proporcionales y fórmulas en `uploads/Brandbook_ExecForward_v1.2.md` §2. Verificación visual en `_system/brand/_logo-verification-v1.2.html`.

### Casting (cuando hay protagonista on-camera)
- Mujer latina, 40-50 años máximo. Ejecutiva senior, no junior.
- Look editorial (referencia: *Forbes Mujer*, *Bloomberg Línea*). Neutros (camel, navy, off-white, gris carbón).
- **NO:** hombre, joven <35, look startup-casual, estética publicitaria genérica.

### Voz (cuando hay VO)
- Mujer latina 40-50, voz grave-media, cálida-autoritaria. Pausada, confía en silencios.
- **NO:** voz juvenil, locutora de comercial, doblaje plano, hombre.

---

## 3 · Stack de producción (lo que SÍ usamos)

| Necesidad | Herramienta | Notas |
|---|---|---|
| Brief + script + dirección creativa | **Claude (este chat)** | Output: brief.md + timeline.json |
| Prototipo de overlay/timing | **Overlay engine HTML** (`_system/engine/`) | Corre en navegador, scrubable, exporta como referencia |
| Clips de video (b-roll, talento) | **Veo 3** (Gemini Pro, en aistudio.google.com) | Fallback: Pexels/Pixabay stock |
| Voz en off | **Gemini TTS** (AI Studio) o **ElevenLabs free tier** | Voz femenina latina, ver §2 |
| Música | **YouTube Audio Library** · **Pixabay Music** · **Free Music Archive** | Royalty-free, sin atribución requerida |
| Edición / compositing | **DaVinci Resolve** (gratis) | Renderizar overlay HTML como capa con alpha o screen-record y multiplicar/screen |
| Subtítulos (LinkedIn, vertical) | DaVinci Resolve (auto-captions) o **CapCut** | `.srt` aparte del master |

**No usar:** servicios pagos adicionales (Synthesia, Descript, Runway pago, Artlist, etc.) salvo que el usuario lo autorice explícitamente.

---

## 4 · Workflow estándar (6 fases)

1. **Brief** → `videos/NNN-slug/brief.md` (copia de `_system/templates/brief.template.md`)
2. **Timeline** → `videos/NNN-slug/timeline.json` (escenas con tIn/tOut/copy)
3. **Prototipo** → `videos/NNN-slug/prototype.html` (carga engine + timeline.json, scrubable en browser)
4. **Spec** → `videos/NNN-slug/SPEC.md` (handoff a producción, generado desde brief+timeline)
5. **Producción de assets** → carpeta `assets/` del video: clips Veo, VO, música. Cada uno con su prompt-doc al lado.
6. **Compositing** → DaVinci Resolve project (`project.drp` exportado, opcional commitear)

Cada fase tiene su template en `_system/templates/`. **No saltar fases.** El error más caro es generar clips/VO antes de tener el timeline cerrado.

---

## 5 · Reglas para agentes (lecciones aprendidas)

1. **Brand lock estricto.** Cualquier desviación de §2 se consulta antes de ejecutar. Nada de "decidí yo que el protagonista fuera hombre porque…".
2. **El timeline es la verdad.** Si un clip o VO no calza con el `tIn/tOut`, repetir/loopear o ajustar el timeline — nunca inventar escenas fuera de guion.
3. **Token economy.** Antes de leer archivos grandes, mira la tabla de §7. Lee solo lo que la tarea pide.
4. **No reinventar el motor.** El overlay engine (`_system/engine/overlay-engine.jsx`) es data-driven: cambia el `timeline.json`, no el JSX.
5. **Tres variantes de overlay disponibles** (kinetic/editorial/caption). Por default usar **kinetic** para hero, **caption** para vertical/social. Editorial solo si el usuario lo pide.
6. **Idioma:** español-latam siempre, salvo brief que indique lo contrario.
7. **Si dudas, pregunta.** Mejor 2 preguntas focalizadas que 1 hora de regenerar.

---

## 6 · Estructura del repo

```
_system/                            ← INFRA · no modificar sin razón
├── CONTEXT.md                      ← este archivo (entrypoint)
├── README.md                       ← guía humana, paso-a-paso
├── brand/
│   ├── tokens.css                  ← colores + tipos + spacing (single source of truth)
│   ├── EF_logo_*.svg               ← todas las variantes
│   └── README.md
├── engine/
│   ├── overlay-engine.jsx          ← motor React data-driven
│   ├── overlay-base.css            ← estilos de las 3 variantes
│   ├── tweaks-panel.jsx            ← panel de tweaks reutilizable
│   └── _starter.html               ← HTML mínimo que carga engine + timeline.json
└── templates/
    ├── brief.template.md           ← fase 1
    ├── timeline.template.json      ← fase 2
    ├── spec.template.md            ← fase 4
    └── prompts/
        ├── veo-clip.template.md    ← un prompt por clip de video
        ├── voice-direction.md      ← dirección para VO (Gemini TTS / ElevenLabs)
        └── music-direction.md      ← brief musical

videos/                             ← UN FOLDER POR VIDEO
├── 001-hero-landing/               ← ejemplo trabajado
│   ├── brief.md
│   ├── timeline.json
│   ├── prototype.html
│   ├── SPEC.md
│   └── assets/
│       ├── clips/                  ← .mp4 generados por Veo o stock
│       ├── vo/                     ← .wav/.mp3 de VO
│       └── music/                  ← .mp3 de música
└── NNN-slug/                       ← próximos videos
```

---

## 7 · Pointers · qué leer según la tarea

| Si te piden... | Lee primero |
|---|---|
| Concebir un video nuevo | `_system/templates/brief.template.md` + este CONTEXT |
| Escribir timeline | `_system/templates/timeline.template.json` + `videos/001-hero-landing/timeline.json` (ejemplo) |
| Prototipar | `_system/engine/_starter.html` + el timeline del video |
| Generar prompts de Veo | `_system/templates/prompts/veo-clip.template.md` |
| Generar dirección de VO | `_system/templates/prompts/voice-direction.md` |
| Spec final / handoff producción | `_system/templates/spec.template.md` + `videos/001-hero-landing/SPEC.md` |
| Editar/modificar el motor | `_system/engine/overlay-engine.jsx` (rara vez necesario) |

---

## 8 · Versionado

- `_system/` cambia con versionado semántico en `_system/CHANGELOG.md` cuando se publique.
- Cada video carpeta es inmutable una vez producido. Versiones nuevas: `001-hero-landing-v2/`.
- El `prototype.html` de cada video debe seguir funcionando aunque `_system/` evolucione (importa por path relativo `../../_system/...`).
