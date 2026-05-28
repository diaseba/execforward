# Prompt de continuidad · Sistema de Video ExecForward

> Copia este prompt entero al iniciar una nueva conversación cuando quieras retomar el trabajo sobre el **sistema** (no sobre un video específico). Está diseñado para cargar contexto en mínimos tokens.

---

## 🟢 Pega esto en el chat nuevo

Estoy retomando el trabajo sobre el **sistema reutilizable de video** para ExecForward. Ya tenemos una v0 construida en este proyecto. Antes de proponer cambios:

1. **Lee `_system/CONTEXT.md` completo.** Es el entrypoint del sistema y trae brand lock, stack, workflow y reglas.
2. **Lee `_system/README.md`** (guía humana paso-a-paso).
3. **Da un vistazo a `videos/001-hero-landing/`** como ejemplo trabajado (brief, timeline.json, prototype.html, SPEC.md).
4. **No leas todo el código del engine** salvo que sea necesario para la tarea — confía en la tabla de pointers de `CONTEXT.md` §7.

### Contexto rápido (ya decidido, no preguntar de nuevo)

- **Proyecto:** ExecForward — sistema de posicionamiento ejecutivo para mujeres ejecutivas latinas senior (40-55)
- **Marca:** teal `#2DD4BF` único acento + Karla/Nunito · ver `_system/brand/tokens.css`
- **Stack:** Claude Pro · ChatGPT Pro · Gemini Pro · Google Workspace. **No** suscripciones nuevas pagas.
- **Producción:** Veo 3 (clips) + Gemini TTS o ElevenLabs free (VO) + YouTube Audio Library (música) + DaVinci Resolve (edición)
- **Formatos:** 16:9 (hero/landing) + 9:16 (LinkedIn/Reels). 1:1 y 4:5 si se requieren.
- **Brand lock:** estricto en hero/landing, flexible en social
- **Volumen:** ~12 videos / 6 meses
- **Idioma default:** español-latam neutro
- **Automatización deseada:** media — plantillas guiadas, yo lleno paso a paso con tu asistencia

### Lo que ya está construido (v0)

```
_system/
├── CONTEXT.md              · entrypoint para agentes
├── README.md               · guía humana
├── brand/                  · tokens.css + logos SVG
├── engine/                 · overlay-engine.jsx data-driven + overlay-base.css
│   ├── overlay-engine.jsx  · 3 variantes (kinetic/editorial/caption), 5 tipos de escena
│   ├── overlay-base.css    · estilos compartidos
│   ├── tweaks-panel.jsx    · panel de tweaks reutilizable
│   └── _starter.html       · skeleton que cada video copia
└── templates/
    ├── brief.template.md
    ├── timeline.template.json
    ├── spec.template.md
    └── prompts/
        ├── veo-clip.template.md
        ├── voice-direction.md
        └── music-direction.md

videos/001-hero-landing/    · ejemplo trabajado (hero V2 del landing, aprobado)
```

### Lo que FALTA / decisiones abiertas para el sistema

*(Si tienes ideas claras, llégale directo. Si no, pregúntame antes de implementar.)*

- [ ] **Workflow vertical 9:16** — engine ya soporta `aspect: '9:16'` vía `data-aspect`, pero no hay plantillas específicas (modules en columna, captions full-bleed, etc.). Cuando hagamos el primer video vertical, derivar el patrón.
- [ ] **Render-a-mp4 desde el prototipo** — actualmente el prototipo es solo preview. Pendiente decidir si invertimos en captura frame-by-frame con Puppeteer/Playwright o si screen-record + DaVinci es suficiente.
- [ ] **Variantes de escena adicionales** — si surge necesidad: split-screen, picture-in-picture, full-bleed image, testimonio con quote. Agregar al engine + base.css cuando aparezcan, no antes.
- [ ] **CHANGELOG semántico** — crear `_system/CHANGELOG.md` al primer cambio de versión del sistema.
- [ ] **Templates específicos por tipo de video** — hoy hay un brief genérico; podríamos derivar variantes para *short-vertical*, *testimonial*, *ad-promo* cuando hagamos uno de cada.
- [ ] **Automatización end-to-end** — workflow donde un brief.md genera el timeline.json + spec.md + prompts de Veo automáticamente. Decidir si vale la complejidad.
- [ ] **Métrica de calidad** — checklist QA del SPEC se cumple manualmente. ¿Vale automatizar con script?

### Lecciones aprendidas (ya documentadas en CONTEXT.md §5)

1. Brand lock estricto: no negociar casting/voz/color
2. El timeline es la verdad: si un clip no calza, ajustar el timeline o repetir clip, NO inventar planos
3. Token economy: usar la tabla de pointers de §7 antes de leer archivos grandes
4. No reinventar el engine: cambia `timeline.json`, no el JSX
5. Si dudas, pregunta: 2 preguntas focalizadas mejor que 1h de regenerar

### Mi pregunta concreta para hoy

[TODO: aquí escribe qué quieres trabajar exactamente del sistema. Ejemplos:]

- "Quiero agregar soporte para 9:16 y hacer el primer video vertical"
- "Necesito un workflow para render-a-mp4 automatizado"
- "El SPEC se siente largo, quiero versión condensada para videos cortos"
- "Quiero plantilla específica para testimonios"
- "Vamos a producir el video 002 — `XXXX`"

---

**Importante:** este prompt va con la pregunta concreta arriba. Si solo lo pegas sin pregunta, te pediré qué parte del sistema quieres tocar.
