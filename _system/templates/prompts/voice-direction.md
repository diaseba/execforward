# Voice Direction · TODO Video name

> Dirección de voz en off para producir con **Gemini TTS** (AI Studio · prompt-to-speech) o **ElevenLabs free tier**. Si grabarás voz humana, usa este mismo doc como brief para la locutora.

---

## 1 · Perfil de voz (default brand)

*(Solo escribir aquí lo que difiera de `_system/CONTEXT.md` §2 — el default ya es el correcto para ExecForward.)*

- **Género:** mujer
- **Edad percibida:** 40-50 años
- **Acento:** español-latam neutro con presencia. **NO:** caribeño marcado, rioplatense marcado, doblaje plano de mexicano-neutro.
- **Timbre:** grave-media, cálida-autoritaria
- **Estilo:** ejecutiva senior dando una keynote íntima — no locutora de comercial, no voz juvenil-energética
- **Ritmo:** pausado, con espacio entre frases. Confía en los silencios del timeline.
- **Energía emocional:**
  - **Hook (acto 1):** comprensiva, casi cómplice. Como si te conociera.
  - **Insight (acto 2):** firme, dato sobre la mesa.
  - **Pivote (acto 3):** suave, esperanzadora. Apertura.
  - **Producto + CTA (acto 4-5):** segura, directiva pero no agresiva. Invitación, no orden.

---

## 2 · Guion VO (sincronizado al timeline)

> Cada línea con timestamp absoluto (segundo en que debe iniciar la voz). Las pausas largas entre líneas son **intencionadas** — respetar.

| t (seg) | Línea VO | Énfasis / nota |
|---|---|---|
| TODO | "TODO línea" | TODO (énfasis en TODO palabra, pausa antes de TODO, etc.) |

---

## 3 · Cómo pedirlo a Gemini TTS / ElevenLabs

### Gemini TTS (AI Studio)
1. Ir a aistudio.google.com → **Generate Speech**
2. Seleccionar voz: probar **"Aoede"** o **"Despina"** (femeninas, tonos cálidos). Si no funciona, ver Sección 4.
3. Idioma: Spanish (Latin America)
4. Pegar el guion completo con marcas de pausa: usa `,` para pausa corta, `…` para pausa larga, párrafos separados por línea en blanco.
5. Generar y descargar como `.wav`
6. Si una frase suena rara, regenerar SOLO esa línea y empalmar en DaVinci

### ElevenLabs (free tier)
1. Ir a elevenlabs.io → **Speech Synthesis**
2. Voice: filtrar **female · Spanish · mature** o cargar una voz custom (free tier permite clonar 1 voz desde 1 min de audio)
3. Stability: 50-60 (no muy bajo, sino se vuelve dramática)
4. Similarity: 75
5. Pegar el guion completo. Limite free tier ~10k chars/mes → suficiente para 4-5 videos cortos.

### Locutora humana (si lo presupuestas puntualmente)
- **Brief:** este doc completo
- **Referencias auditivas:** mandar 2-3 clips de YouTube de ejecutivas latam en TED / Bloomberg Línea
- **Entrega:** WAV 48kHz, mono, sin procesar (sin compresión, sin reverb, normalizado a -16 dBFS)

---

## 4 · Variantes a probar si la primera voz no convence

- [ ] Cambiar voz preset (Gemini: Aoede → Despina / Sulafat / Erinome)
- [ ] Bajar el ritmo añadiendo más `,` y `…` en el guion
- [ ] Romper líneas largas en frases más cortas
- [ ] Subir/bajar pitch global en post (DaVinci → Fairlight)

---

## 5 · Mezcla y entrega

- Loudness target: **−14 LUFS** integrado (consistencia con plataformas)
- Sidechain ducking de música cuando hay voz: música a **−12 dB** bajo VO
- Sin reverb (voz íntima cercana)
- Compresión suave: threshold -20 dB, ratio 3:1, attack 10ms, release 100ms
- De-esser leve si la voz tiene sibilantes marcadas
- Export final: `assets/vo/master.wav` (48kHz, mono)
