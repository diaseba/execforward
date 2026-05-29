# SPEC · TODO Video name

> **Fase 4 de 6.** Handoff a producción. Este doc se genera desde `brief.md` + `timeline.json` y describe exactamente qué clips, voz, música y composición producir. Cualquier desviación se consulta antes de ejecutar.
>
> Lee primero `_system/CONTEXT.md` (brand lock, casting, voz, stack).

---

## 1 · Output específs

| Parámetro | Valor |
|---|---|
| Resolución master | TODO 1920×1080 (o 1080×1920 vertical) |
| Versiones a exportar | TODO (1920×1080 web · 1080×1920 reels · etc.) |
| Duración | TODO segundos exactos |
| Frame rate | 30 fps |
| Codec | H.264, mp4, ~8 Mbps |
| Audio | TODO (VO + música a −14 LUFS / sin audio / etc.) |
| Color space | Rec.709, sRGB |

---

## 2 · Assets a producir

### Casting / talento
*(Si aplica. Default: ver `_system/CONTEXT.md` §2 — mujer latina 40-50, ejecutiva senior. Indicar aquí solo desviaciones puntuales.)*

- TODO descripción
- **NO:** TODO

### Clips de fondo
Tabla acto×clip mapeada al timeline. Cada clip debe durar al menos la duración del acto + 1 s de cola.

| Acto / escena | Clip | Tono visual |
|---|---|---|
| TODO | TODO descripción | TODO grading |

**Specs de cada clip:** 1920×1080, 30 fps, c.lenta o movimiento mínimo, depth-of-field marcado, sin texto/UI ni objetos de terceros.

**Generación recomendada:** Veo 3 (Gemini Pro) usando los prompts en `assets/prompts/`. Fallback: Pexels/Pixabay con búsqueda específica.

### Voz en off
*(Si aplica. Default ver CONTEXT §2 — mujer latina 40-50, cálida-autoritaria.)*

Guion VO sincronizado al timeline:

| t | Línea VO |
|---|---|
| TODO | "TODO" |

**Herramienta sugerida:** Gemini TTS (AI Studio) o ElevenLabs free tier. Voz femenina latam. Prompt de dirección en `assets/prompts/voice-direction.md`.

### Música
*(Si aplica. Default: piano minimalista → build → cierre limpio.)*

- 0 → TODO s: TODO descripción
- TODO → TODO s: TODO build/cambio
- TODO → final: TODO cierre

**Fuente:** YouTube Audio Library, Pixabay Music o Free Music Archive (royalty-free). Brief musical detallado en `assets/prompts/music-direction.md`.

---

## 3 · Sistema visual

Por default usa los tokens y el motor del sistema (`_system/brand/tokens.css` + `_system/engine/overlay-base.css`). El prototipo (`prototype.html`) es la fuente de verdad visual.

**Variante de overlay:** TODO `kinetic` | `editorial` | `caption`
**Variante de logo:** TODO `horizontal` (default) | `isotipo`

### Watermark
- Logo horizontal arriba a la izquierda durante todo el video, **excepto** durante brand-reveal y CTA (el engine ya lo maneja automáticamente).
- Specs en `_system/brand/tokens.css` (`--ef-shadow-wm`).

### Scrim
Aplicar `--ef-scrim` sobre los clips de fondo. Subir hasta 0.5 durante escenas con mucho texto.

---

## 4 · Timeline maestro

*(Espejo de `timeline.json` — mantener sincronizado)*

| # | Escena | tIn | tOut | Tipo | Contenido |
|---|---|---|---|---|---|
| TODO | TODO | TODO | TODO | TODO | TODO |

### Pausas intencionadas
- TODO → TODO s: silencio antes de TODO
- (etc.)

---

## 5 · Detalle por escena

*(Una sección por escena del timeline. Para cada una:)*
- **Copy exacto** y palabra-pivote en teal
- **Comportamiento de animación** (si difiere del default del engine)
- **Clip de fondo asociado** y grading
- **Línea de VO sincronizada**
- **Música:** lo que suena por debajo

---

## 6 · Compositing en DaVinci Resolve

1. **Importar clips de fondo** a un timeline 1920×1080 30fps siguiendo el orden del §4
2. **Aplicar grading consistente** entre clips (LUT base + ajustes por acto según tabla §2)
3. **Renderizar el overlay HTML** como capa transparente:
   - Opción A · Screen-record del `prototype.html` con `dimBg=true, hideVideo=true` → blendear con modo *Screen* o *Lighten*
   - Opción B · Para mayor calidad: render frame-by-frame del prototype (Puppeteer) → secuencia PNG con alpha
4. **Watermark:** ya viene en la capa de overlay si `showWatermark=true`. Si se prefiere ajustarlo en post, exportar overlay sin watermark y agregarlo en Resolve.
5. **VO:** colocar en timeline de audio sincronizado a los `tIn` del §4
6. **Música:** sidechain ducking bajo VO (-12 dB cuando hay voz)
7. **Export:** ver §1

---

## 7 · Checklist de QA antes de publicar

- [ ] Ningún píxel de UI/subtítulos viejos
- [ ] Watermark solo donde corresponde (engine lo maneja, verificar en preview final)
- [ ] Palabras-pivote en teal `#2DD4BF` (no en blanco)
- [ ] Stats con gradiente blanco→teal
- [ ] Card CTA con backdrop-filter blur visible
- [ ] Pill teal con shadow teal sutil
- [ ] Proof line con dots `·` (no bullets, no slashes)
- [ ] CTA dura mínimo TODO s en pantalla
- [ ] VO sincronizada ±0.2 s con la entrada de cada texto
- [ ] Mezcla a −14 LUFS
- [ ] Casting cumple §2 (sin sustituciones)
- [ ] Subtítulos abiertos: TODO incluir / no incluir

---

## 8 · Aprobaciones

- [ ] Spec aprobado por: TODO · fecha
- [ ] Producción: TODO (qué herramientas, quién)
- [ ] Entrega: TODO fecha
