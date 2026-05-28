# CHANGELOG · ExecForward Video System

Versionado semántico. Cambios al sistema (`_system/`) que pueden afectar videos anteriores.

---

## [0.1.3] — 2026-05-28

### Brand · `_system/brand/` (hotfix sobre v0.1.2)

- **Bug fix viewBox horizontal:** B/D/E tenían el isotipo posicionado en `y` negativo (clipping en algunos renderers). Ahora el viewBox encierra el contenido correctamente: `0 0 ~431 87` (antes `0 0 ~431 64`).
- **Limpieza del repo:**
  - Eliminados: `uploads/Brandbook_ExecForward_v1.md`, `uploads/Brandbook_ExecForward_v1.1.md`, 7 SVGs duplicados en `uploads/`, `videos/001-hero-landing/PROMPT_COWORK_LOGOS.md` y `PROMPT_V2_FINAL.md` (prompts one-shot ya ejecutados).
  - Archivados como referencia histórica: 5 PNGs originales de Gemini → `_system/brand/_reference/` con README explicando su rol.
- **Docs actualizados:** `_system/CONTEXT.md` §2 con sistema 3×3 y pointers a brandbook v1.2.

---

## [0.1.2] — 2026-05-28

### Brand · `_system/brand/`

- **Recalibración proporcional completa de lockups** según referencias visuales del usuario:
  - **Horizontal (B/D/E):** `gap = 0.354 × cap-height` (antes era ~1.5× cap-height; el isotipo flotaba demasiado lejos). `isoH = 1.98 × cap-height` (antes ~1.5× — el isotipo ahora pesa visualmente como debe).
  - **Apilado (C):** wordmark en weight **800** (antes 700). `isoH = 3.53 × cap-height`, `vGap = 0.456 × cap-height`.
- **Una sola fuente de verdad geométrica para el isotipo** — Variante A es canónica (aspect 1.339). B, C y todas sus variantes cromáticas embeben A con un transform-scale.
- **Nuevas variantes apiladas:** `EF_logo_C_apilado_dark.svg` y `EF_logo_C_apilado_mono.svg`.
- **Nuevas variantes de isotipo solo:** `EF_logo_A_isotipo_dark.svg` y `EF_logo_A_isotipo_mono.svg` (paridad con C).
- **`textLength` agregado a todos los SVGs con texto** — bloquea el ancho del wordmark a un valor determinístico (~314 para B, ~287 para C) → posiciones del isotipo no dependen de variaciones en métricas de fuente.
- **Brandbook:** publicado `uploads/Brandbook_ExecForward_v1.2.md`.

### Compatibilidad
- Aliases (`EF_logo_horizontal_light.svg`, `EF_logo_horizontal_dark.svg`, `EF_logo_isotipo_light.svg`) actualizados → todos los videos usando estos aliases recogen las nuevas proporciones automáticamente.
- `videos/001-hero-landing/` heredará el cambio sin retoque (usa aliases).

---

## [0.1.1] — 2026-05-28

### Brand · `_system/brand/`

- **Recalibrado proporcional de logos lockup** (B, C, D). Las barras del isotipo dentro del wordmark pasan de `30×7` a `36×9` y los chevrones se compactan (offset +12px en lugar de +20px) para mantener las proporciones de Variante A. Motivo: a tamaño watermark (22-32px alto) las barras viejas casi desaparecían.
  - `EF_logo_B_horizontal.svg` — actualizado (ya estaba en proporciones nuevas)
  - `EF_logo_C_apilado.svg` — actualizado (proporciones viejas `50×10`, isotipo en `x=68`, deprecated)
  - `EF_logo_D_dark.svg` — actualizado
- **Nuevo:** `EF_logo_E_monocromo.svg` — variante a un solo color (negro `#000000`, opacidades 1.0/0.60/0.30 en chevrones) para impresión a un tono.
- **Brandbook:** publicado `uploads/Brandbook_ExecForward_v1.1.md` con sección "Identidad visual — logo" formalizada.

### Compatibilidad
- Videos producidos con v0.1.0 siguen funcionando — los archivos `EF_logo_horizontal_*.svg` (aliases) ya tenían las proporciones nuevas. Solo afecta a quien cargue B/C/D directamente.

---

## [0.1.0] — 2026-05-26

- Versión inicial del sistema. Brand kit + engine + templates + ejemplo `videos/001-hero-landing/`.
