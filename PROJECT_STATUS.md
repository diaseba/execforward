# ExecForward — Project Status & Build Log

**Última actualización:** 2026-05-28  
**Versión:** 2.1 (Brand v1.2 sincronizado — _system/ creado, logos canónicos v1.2)
**Estado general:** ✅ Pasos 1–7b completos · Brand v1.2 sincronizado desde Design sandbox

---

## 📋 Estructura del Proyecto

```
/ExecForward/
├── /css/                          [  ] Creada
├── /js/                           [  ] Creada
├── /quiz/                         [  ] Creada
│   └── index.html                 [✓] Quiz M0
├── /programa/
│   ├── /start/                    [✓] Creada
│   ├── /core/                     [✓] Creada
│   ├── /bundle/                   [✓] Creada
│   └── /test/                     [✓] Creada
├── /audio/                        [✓] Creada
├── /video/                        [✓] Creada
├── index.html                     [✓] Landing page
├── execforward_brandbook.html     [✓] Completo
└── PROJECT_STATUS.md              [✓] Este archivo
```

---

## 🎯 Tareas Principales

### 1. Landing Page
- **Estado:** ✅ Completada
- **Archivo:** `index.html`
- **Referencia:** §4 del Handoff_Cowork_ExecForward_v1.md
- **Contenido requerido:**
  - Hero section con barra teal
  - 3 cards de problema (70%, 1, 0)
  - Escalera de pricing (M1 $29, M1+M2+M3 $59, Bundle $89)
  - CTAs en azul (#2563EB) y teal (#14B8A6)
- **Placeholders:**
  - [LS_URL_*] para URLs de Lemon Squeezy
  - [AUDIO_*] y [VIDEO_*] para multimedia
- **Notas:**
  - Usar copy exacto del Handoff sin ediciones editoriales
  - Marcar dudas editoriales con `<!-- REVISAR: [motivo] -->`

### 2. Quiz M0
- **Estado:** ✅ Completado
- **Archivo:** `/quiz/index.html`
- **Referencia:** §3 del Spec Técnico
- **Spec:** [Completa en Handoff]
- **Placeholders:**
  - [LS_URL_*] para checkout post-quiz
  - [AUDIO_*] si aplica

### 3. Web App — Estructura Base
- **Estado:** ✅ Completada
- **Rutas requeridas:**
  - `/programa/start/` — Onboarding/entrada
  - `/programa/core/` — Módulos M1–M6
  - `/programa/bundle/` — Vista de suscripción
  - `/programa/test/` — Testing interno

### 4. Assets Multimedia
- **Estado:** 🔲 Pendiente creación
- **Audio:** `/audio/` — voiceovers, ambientes
- **Video:** `/video/` — demostraciones, intros
- **Placeholders:** Usar [AUDIO_*] y [VIDEO_*] en todos los archivos

---

## 🎨 Estándares de Implementación

### Colores (del Brandbook)
```
Primario:       #2563EB
Primario hover: #1D4ED8
Secundario:     #14B8A6
Secundario h:   #0F766E
Texto:          #1F2937
Muted:          #6B7280
Fondo:          #FFFFFF
Sutil:          #F9FAFB
Borde:          #E5E7EB
```

### Tipografía
```
Headings: Karla (Google Fonts)
Body:     Nunito (Google Fonts)
```

### Grid & Spacing
```
Base:           8px
Border-radius:  6px (sm), 10px (md), 16px (lg)
Padding desktop: 40–56px lateral
Padding mobile:  24px lateral
Breakpoint:     768px
```

### Componentes
```
Botones: Height 44px, padding 0 24px, radius 6px
Cards:   Padding 24px, radius 10px, borde 1.5px #E5E7EB
Inputs:  Height 44px, padding 0 16px, radius 6px, borde 1.5px
```

---

## 📝 Convenciones de Código

### HTML
- Copy exacto del Handoff (sin paráfrasis)
- Placeholders: `[LS_URL_*]`, `[AUDIO_*]`, `[VIDEO_*]`
- Dudas editoriales: `<!-- REVISAR: [motivo] -->`
- Usar semántica HTML5 (header, main, section, footer)

### CSS
- Variables CSS para colores: `--primary: #2563EB`, etc.
- Mobile-first approach
- Responsive en 768px
- Usar Flexbox/Grid (no float)

### JS
- Vanilla JS (sin frameworks por ahora)
- Event delegation donde sea posible
- No inline event handlers
- Comentarios para lógica compleja

---

## 🔄 Workflow de Actualización

**Al terminar cada paso:**

1. ✏️ Actualizo PROJECT_STATUS.md local (historial + log de decisiones)
2. 📤 Subo la versión nueva a Google Drive (carpeta ExecForward)
3. 💬 Notifico en el chat: **"Subí PROJECT_STATUS.md al Drive. Podés eliminar la versión anterior: [nombre del archivo anterior con su ID o fecha]"**
4. 🗑️ Tan elimina la versión anterior en Drive manualmente
5. ✅ Solo queda la versión nueva en la carpeta

**Nota para Tan:** Cuando veas la notificación, ve a drive.google.com → carpeta ExecForward → elimina el archivo indicado. El nuevo ya está disponible.

---

## 📅 Historial de Cambios

| Fecha | Tarea | Estado | Notas |
|-------|-------|--------|-------|
| 2026-05-26 | Brandbook | ✓ Guardado | Archivo HTML + memoria |
| 2026-05-26 | PROJECT_STATUS.md | ✓ Creado | Archivo maestro |
| 2026-05-26 | Landing page | ✓ Completada | /src/index.html — §4 Handoff |
| 2026-05-26 | Quiz M0 | ✓ Completado | /src/quiz/index.html — 14 preguntas, 4 bandas, scoring |
| 2026-05-26 | Web app estructura | ✓ Completada | /start /core /bundle /test + login + SKU isolation |
| 2026-05-26 | Paso 3 — CSS + JS compartido | ✓ Completado | app.css + app-utils.js |
| 2026-05-26 | Paso 4 — Contenido M1–M6 | ✓ Completado | modules-content.js, renderizado completo, cierre §2.8 |
| 2026-05-26 | Paso 5 — Mindmaps SVG | ✓ Completado | 6 SVG en /shared/mindmaps/, integrados en app |
| 2026-05-26 | Paso 6 — Onboarding y cierre | ✓ Completado | Pre-fill banda, reordenamiento sidebar, copy cierre fix |
| 2026-05-26 | Paso 7 — Emails LS | ✓ Completado | 3 plantillas HTML en /src/emails/ — start, core, bundle |
| 2026-05-26 | Paso 7b — Flujos transición/upsell/cierre | ✓ Completado | checkForCompletion nueva lógica, 4 pantallas nuevas, 2 placeholders |
| 2026-05-27 | SVGs logos + Brandbook v1.1 | ✓ Completado | 4 SVGs recalibrados (B, C, D, E), Brandbook actualizado con specs logo |
| 2026-05-28 | Brand v1.2 sync desde Design sandbox | ✓ Completado | _system/ creado (brand+engine+templates), 12 SVGs canónicos v1.2, Brandbook v1.2, v1.0→_archive |
| 2026-05-26 | Corrección 7b — 4 bugs navegación | ✓ Completado | app-utils.js: Bug1 siguiente incompleto, Bug2 regreso M6, Bug3 sidebar resume, Bug4 M6 reset |

---

## 🚀 Próximo paso: Validación visual

Verificar render de logos a tamaño watermark (22-32px) y en contexto real (landing + app).

---

## 📋 Log de sesiones y decisiones de alcance

### Paso 7 + 7b — Emails LS y flujos de transición (2026-05-26)

**Archivos creados/modificados:**
- `src/emails/email-start.html` — Tripwire $29: credenciales + 4 bullets M1 + CTA azul
- `src/emails/email-core.html` — Core $59: credenciales + 3 bullets M1–M3 + CTA azul
- `src/emails/email-bundle.html` — Bundle $89: credenciales + 6 bullets M1–M6 + CTA azul
- `src/programa/shared/app-utils.js` — funciones nuevas:
  - `checkForCompletion()` — lógica maestra completa (reemplazó versión simple)
  - `showModuleTransition()` — pantalla inter-módulo con entregable + tagline siguiente
  - `showUpsellStart()` — upsell /start → Core ($59) y Bundle ($60 neto)
  - `showUpsellCore()` — upsell /core → Bundle ($30 neto)
  - `showAlmostThere()` — cards dinámicas de módulos pendientes (bundle/test)
  - `showClosingScreen()` — pantalla final §2.8 sin upgrade CTA (movido a upsell)
  - `copyShareText()` — copia texto LinkedIn al portapapeles
  - `showUpgradeMessage()` — tooltip temporal en módulos bloqueados
  - Constantes: `MODULE_ENTREGABLES`, `TRANSITION_TAGLINES`, `_allModulesComplete()`
- `src/programa/shared/app.css` — clases para `.transition-screen`, `.upsell-screen`, `.almost-there-screen`, `.closing-screen`

**Nuevos placeholders:**
- `[LS_URL_BUNDLE_UPGRADE_START]` — checkout Bundle con descuento para Start ($60 neto)
- `[LS_URL_BUNDLE_UPGRADE_CORE]` — checkout Bundle con descuento para Core ($30 neto)

**Decisiones de alcance:**
- `showClosingScreen()` ya no incluye CTA de upgrade — ese flujo se maneja en `showUpsellStart/Core()` antes de llegar al cierre
- `/test` no muestra upsell (sku !== 'start' y sku !== 'core') → va directo a cierre o "casi llegas"
- Texto LinkedIn en `showClosingScreen()` marcado `<!-- REVISAR -->` — no estaba en spec §2.8
- Problema técnico: Edit tool no persistía cambios al disco en esta sesión → se usó Python para escribir el archivo directamente

**Verificación:**
- `node --check app-utils.js` → ✓ SYNTAX OK
- Todas las funciones presentes: `showModuleTransition`, `showUpsellStart`, `showUpsellCore`, `showAlmostThere`, `showClosingScreen`, `copyShareText`, `showUpgradeMessage`
- Ambos placeholders de upgrade presentes en el código
- 3 archivos de email creados con `[UUID]` y `[PASSWORD]` como variables nativas LS

---

### Paso 6 — Onboarding y cierre (2026-05-26)

**Scope pre-evaluado:** Se revisaron Handoff §2, Spec §2.3 y §2.8, y los archivos existentes antes de ejecutar.

**Estado encontrado al iniciar Paso 6:**
- Pantalla onboarding con texto verbatim §2.3: ✅ ya construida en Paso 3
- Selección de banda (5 opciones): ✅ ya construida
- "Ver bienvenida de nuevo" sidebar: ✅ ya construido
- Pantalla de cierre con texto verbatim §2.8: ✅ ya construida en Paso 4
- Badge "Programa completado", upgrade CTA, share CTA: ✅ ya construidos
- `checkForCompletion()` trigger al último módulo: ✅ ya construido

**Gaps identificados y resueltos:**

1. **Copy incorrecto en pantalla de cierre** — El upgrade CTA decía `"¿Querés acceder a los módulos que no completaste?"`. Spec §2.8 dice `"¿Listo para el siguiente nivel?"`. Corregido en `showClosingScreen()`.

2. **Sidebar reordenamiento — solo etiqueta, sin lógica real** — Había un `TODO` comment desde Paso 3. Se implementó `getSidebarOrder(accessibleModules, band, weakMod)` con lógica completa:
   - `base` / `none` → orden estándar M1→M6
   - `operativo` / `diferenciado` → M1, weakMod, resto
   - `competitivo` → weakMod, M1, resto
   - Si weakMod no existe o no está en accesibles → orden estándar
   - Módulos bloqueados siempre al final

3. **Quiz no guardaba nada en localStorage** — `mostrarResultado()` calculaba scores pero no los persistía. Se agregó:
   - `localStorage.setItem('ef_score_band', bandaKey)` — banda de resultado
   - `localStorage.setItem('ef_weak_module', ejeDebilModulo)` — módulo del eje más débil
   - `localStorage.setItem('ef_score_global', scoreGlobal)` — score numérico
   - Mapeo eje→módulo hardcoded: `['M1','M2','M3','M3','M5','M4','M6']` (índices 0–6)
   - Envuelto en try/catch para modo privado y testing cross-origin local

4. **Onboarding no usaba datos del quiz** — Si el usuario hizo el quiz antes de comprar, llegaba a la onboarding con la banda en localStorage pero tenía que seleccionarla de nuevo. Se agregó pre-fill automático en `setupBandOptions()`: lee `ef_score_band`, pre-selecciona el radio y muestra nota visual "✓ Banda pre-seleccionada desde tu diagnóstico M0." con estilo `.quiz-prefill-note`.

**Archivos modificados:**
- `src/programa/shared/app-utils.js` — nueva función `getSidebarOrder()`, `renderSidebar()` refactorizado, `renderApp()` usa orden personalizado, `setupBandOptions()` con pre-fill, `showClosingScreen()` copy fix
- `src/programa/shared/app.css` — clase `.quiz-prefill-note` (teal, fondo sutil)
- `src/quiz/index.html` — `mostrarResultado()` con localStorage saves

**Decisión de alcance:**
El spec §2.3 menciona "módulo de eje débil" para el reordenamiento pero el onboarding solo captura la banda. La solución v1 usa el eje débil del quiz (cuando existe en localStorage) o fallback a orden estándar. No se agregó pregunta adicional en onboarding porque el flujo natural es quiz → compra → programa.

---

## ❓ Referencias

- **Spec completo:** docs/Handoff_Cowork_ExecForward_v1.md
- **Spec técnica:** docs/Spec_Tecnica_ExecForward_Cowork_v1.1.md
- **Brandbook:** docs/Brandbook_ExecForward_v1.md (pendiente aplicar en brandbook pass)
- **Email:** sebastianselle@gmail.com
- **Instrucciones Cowork:** CLAUDE.md
