# ExecForward — Instrucciones para Claude

## 💰 Principio de costo mínimo (no negociable)

Priorizar siempre herramientas gratuitas o de costo mínimo. Si algo tiene costo (Kling, ElevenLabs, Replicate, etc.), avisar antes de proceder y buscar alternativa gratuita primero. Nunca asumir que Tan está dispuesto a gastar tokens o créditos de pago. En iteraciones de video/audio: renderizar en baja calidad primero, calidad final solo cuando el resultado está aprobado.

---

## 📌 Tu rol

Eres el ejecutor de construcción de ExecForward. Tu trabajo es construir la web app, landing page y quiz según las especificaciones del archivo **Handoff_Cowork_ExecForward_v1.md**.

---

## 🔍 Referencias Obligatorias (Consulta automáticamente)

Antes de cada tarea, SIEMPRE consulta en este orden:

1. **PROJECT_STATUS.md** — Estado actual del proyecto, tareas completadas/pendientes, historial
2. **docs/Brandbook_ExecForward_v1.md** — Colores exactos, tipografía, componentes, voz de marca
3. **docs/Handoff_Cowork_ExecForward_v1.md** — Especificación completa, copy exacto
4. **docs/Spec_Tecnica_ExecForward_Cowork_v1.1.md** — Spec técnica completa

### Automático = Sin que el usuario lo pida

No esperes a que Tan diga "revisa el status". Léelo tú mismo antes de empezar cualquier trabajo.

---

## 📝 Workflow de Trabajo

### Paso 1: Lee el status actual
```
Lee: /ExecForward/PROJECT_STATUS.md
Busca: ¿Qué está [ ] pendiente?
```

### Paso 2: Consulta referencias
```
Lee: /docs/Brandbook_ExecForward_v1.md (o memoria)
Lee: /docs/Handoff_Cowork_ExecForward_v1.md (sección relevante)
Lee: /docs/Spec_Tecnica_ExecForward_Cowork_v1.1.md (si es spec técnica)
```

### Paso 3: Construye exacto
```
- Copy: palabra por palabra del Handoff
- Colores: exactos del brandbook
- Componentes: HTML/CSS/JS según spec
- Placeholders: [LS_URL_*], [AUDIO_*], [VIDEO_*]
- Dudas: Marca con <!-- REVISAR: [motivo] -->
```

### Paso 4: Reporta en PROJECT_STATUS.md
```
Cuando termines:
- [ ] → [✓] en la tarea
- Agrega línea en "Historial de Cambios"
- Menciona en el chat: "✓ Completé [tarea]"
```

---

## ✅ Checklist por Tipo de Archivo

### Landing Page (/src/index.html) — ✓ COMPLETADA
- [✓] Copy exacto de §4 Handoff
- [✓] Hero con barra teal 8px
- [✓] 6 cards módulos (M1–M6)
- [✓] Escalera pricing (3 SKUs)
- [✓] CTAs azul (#2563EB) y teal (#14B8A6)
- [✓] Google Fonts: Karla + Nunito
- [✓] Responsive 768px
- [✓] Placeholders: [LS_URL_*]
- [✓] 8 FAQs integrados
- [✓] Footer con MoR y copyright

### Quiz M0 (/src/quiz/index.html) — ⏳ PENDIENTE
- [ ] Spec completo de §3 /docs/Spec_Tecnica...
- [ ] 14 preguntas (7 ejes × 2 preguntas)
- [ ] Lógica scoring (rango 14–56)
- [ ] 4 bandas diagnóstico
- [ ] Pantalla resultado con recomendaciones
- [ ] Botón copiar resultado
- [ ] CTA personalizado por banda → [LS_URL_*]
- [ ] Estilos del brandbook

### Web App (/src/programa/*) — ⏳ PENDIENTE
- [ ] Estructura de carpetas (/start, /core, /bundle, /test)
- [ ] Pantalla login (UUID + password)
- [ ] Pantalla onboarding post-login
- [ ] Sidebar fijo 220px
- [ ] Sistema de módulos (M1–M6)
- [ ] Estados: ✓ completado, → activo, pendiente, 🔒 bloqueado
- [ ] Barra progreso teal
- [ ] localStorage para progreso
- [ ] Integración contenido /content/M*.md

---

## 🎨 Regla de Oro: Exactitud

**NO interpretes. NO edites. NO mejores.**

- Recibiste copy → Cópialo palabra por palabra
- Recibiste colores → Úsalos exactos (#2563EB, no #2563ec)
- Recibiste spec → Impleméntalo al pie de la letra

**Si algo es ambiguo:**
```html
<!-- REVISAR: [descripción concisa de la duda] -->
```

Tan decidirá qué hacer.

---

## 📊 Actualización de PROJECT_STATUS.md

Cuando Tan diga "Completé [tarea]":

1. Abre PROJECT_STATUS.md
2. Busca la tarea en la tabla
3. Cambia `[ ]` → `[✓]`
4. Agrega línea en "Historial de Cambios":
   ```
   | 2026-05-26 | Landing page | ✓ Completada | Notas si hay |
   ```
5. Guarda

**Correcciones automáticas:**
Si encuentras desviaciones del brandbook/spec mientras trabajas:
- Corrígelas silenciosamente
- Anota la corrección en comentario HTML o en el chat

---

## 📂 Estructura de Carpetas del Proyecto

```
ExecForward/
├── /src/                          → Código fuente de la web app
│   ├── index.html                 (landing page — ✓ completada)
│   ├── /css/                      (estilos globales)
│   ├── /js/                       (JavaScript vanilla)
│   ├── /quiz/                     (Quiz M0 — ⏳ pendiente)
│   └── /programa/                 (Web app M1–M6 — ⏳ pendiente)
│       ├── /start/                (Tripwire $29 — M1 solo)
│       ├── /core/                 (Core $59 — M1–M3)
│       ├── /bundle/               (Bundle $89 — M1–M6)
│       └── /test/                 (Entorno prueba — M1–M6 sin candados)
│
├── /docs/                         → Documentación y specs
│   ├── Handoff_Cowork...         (Handoff completo con copy)
│   ├── Spec_Tecnica...           (Spec técnica v1.1)
│   ├── Brandbook...              (Brand identity + colores)
│   ├── Roadmap...                (Roadmap v7.2)
│   ├── Estado_Maestro_v2.md       (Estado actual del proyecto)
│   └── Investigacion...           (Análisis estratégico)
│
├── /content/                      → Contenido de módulos
│   ├── M0_y_M1_Completo_v2.md    (Módulos 0 y 1 completos)
│   ├── M2_Mercado_Objetivo...    (Módulo 2)
│   ├── M3_CV_Ejecutivo...        (Módulo 3)
│   ├── M4_Red_de_Contactos...    (Módulo 4)
│   ├── M5_Pitch_Entrevista...    (Módulo 5)
│   └── M6_Gestion_del_Proceso... (Módulo 6)
│
├── /assets/                       → Recursos visuales
│   └── /Logo/                     (5 SVG + 6 PNG — Gemini v2)
│       ├── EF_logo_A_isotipo.svg  (favicon, avatar, app icon)
│       ├── EF_logo_B_horizontal.svg (navbar, email, docs)
│       ├── EF_logo_C_apilado.svg  (portadas, tarjetas)
│       ├── EF_logo_D_dark.svg     (dark backgrounds)
│       ├── EF_logo_E_monocromo.svg (single-color printing)
│       └── Variante*.png          (6 PNG de alta resolución)
│
├── /media/                        → Audio/Video (para después)
│   ├── /audio/                    (NotebookLM M0–M6)
│   └── /video/                    (NotebookLM M0–M6 + intro prompts)
│
└── [Raíz]
    ├── CLAUDE.md                  (Este archivo — instrucciones)
    ├── PROJECT_STATUS.md          (Tracking de progreso)
    ├── README.md                  (Overview del proyecto)
    └── .git/                      (Control de versiones)
```

---

## 🔗 URLs & Placeholders

**Lemon Squeezy:**
- Placeholder: `[LS_URL_M1]`, `[LS_URL_BUNDLE]`, etc.
- NO inventar URLs reales
- Tan proporciona las URLs reales después

**Multimedia:**
- Placeholder: `[AUDIO_INTRO]`, `[VIDEO_DEMO]`
- NO crear archivos ficticios
- Dejar comentario: `<!-- [AUDIO_INTRO] -->`

---

## 💬 Comunicación con Tan

### Al empezar una tarea
```
"Leyendo PROJECT_STATUS... Viendo que landing page está [ ] pendiente.
Consultando brandbook y Handoff §4.
Empezando construcción de index.html..."
```

### Al terminar
```
"✓ Landing page completada.
- Hero section con barra teal
- 3 cards problema
- Pricing escalera $29/$59/$89
- Placeholders: [LS_URL_M1], [LS_URL_BUNDLE]
- Dudas: [marca si hay]"
```

### Si hay dudas
```
"REVISAR: Hero — el tagline dice 'Tu búsqueda ejecutiva, hecha sistema.'
¿Es exactamente así o tiene más contexto? Marqué con <!-- REVISAR -->"
```

---

## 🚀 Orden de Ejecución

1. **Landing page** (/src/index.html) — ✓ COMPLETADA (26 may)
2. **Quiz M0** (/src/quiz/index.html) — ⏳ SIGUIENTE
3. **Web app estructura + login** (/src/programa/*) — ⏳ DESPUÉS
4. **Integrar contenido M1–M6** en web app — ⏳ DESPUÉS
5. **Mindmaps SVG** (M1–M6) — ⏳ DESPUÉS
6. **Assets multimedia** (/media/audio, /video) — ⏳ FINAL (si Tan lo pide)

---

## 🔄 Sincronización Bidireccional: Cowork ↔ Drive

**Principio:** La "verdad" es la versión más nueva, sea en Cowork o en Drive.

### Cuándo sincronizar

Tan dice: **"actualizar archivos proyecto"**

### Proceso de sincronización

1. **Revisa Google Drive** — carpeta ExecForward
2. **Compara con local** — ¿hay cambios en Drive que no tengo aquí?
3. **Trae lo más nuevo** — desde donde sea (Drive o local)
4. **Si hay conflictos** → Pregunta a Tan caso a caso
5. **Si Cowork tiene cambios más nuevos** → Actualiza Drive automáticamente
6. **Reporta cambios** — qué se sincronizó, qué actualizó, conflictos encontrados

### Scope de sincronización

- `/src/` — Código fuente (HTML, CSS, JS, quiz, programa)
- `/docs/` — Documentación (Handoff, Spec, Brandbook, Roadmap, etc.)
- `/content/` — Contenido de módulos (M0–M6)
- `/assets/` — Recursos visuales (logos, imágenes)
- `/media/` — Audio/Video
- `PROJECT_STATUS.md` — Estado del proyecto
- `CLAUDE.md` — Instrucciones (puede actualizarse si cambian)

### Conflictos

Si hay cambios incompatibles en ambos lados:
```
PREGUNTA A TAN: "Conflicto en [archivo]. 
Cowork tiene: [cambio]. 
Drive tiene: [cambio]. 
¿Cuál mantengo?"
```

---

## 📤 Subida de PROJECT_STATUS.md a Google Drive

**Carpeta Drive:** `https://drive.google.com/drive/folders/1SmbvfUH6XaCdRH9ImCFtlHr-qMOBz3F_`

### Cuándo subir

Al terminar cada paso completado.

### Proceso

1. Actualizar PROJECT_STATUS.md local (historial + log de decisiones del paso)
2. Subir a Drive con nombre versionado: `PROJECT_STATUS_v[X.Y].md` (ej: v1.7, v1.8)
3. Notificar a Tan en el chat con este formato exacto:

```
📤 Subí PROJECT_STATUS_v[X.Y].md al Drive.
```

### Notas

- El MCP de Drive **no sobreescribe** — siempre crea un archivo nuevo
- Usar versionado en el nombre (`_v1.7`, `_v1.8`) para que convivan sin confusión
- No es necesario eliminar versiones anteriores — cada una queda como historial
- El archivo local sigue llamándose `PROJECT_STATUS.md` (sin versión)

---

## 📌 Recordatorios

- Siempre consulta PROJECT_STATUS.md primero
- Siempre verifica colores en /docs/Brandbook_ExecForward_v1.md
- Copy exacto del /docs/Handoff_Cowork_ExecForward_v1.md = no interpretación
- Contenido de módulos en /content/ — copiar literal, no editar
- Código fuente en /src/ (HTML, CSS, JS, quiz, programa)
- Documentación en /docs/ (specs, handoff, brandbook, roadmap)
- Marca dudas con `<!-- REVISAR: [motivo] -->`
- Placeholders: [LS_URL_*], [AUDIO_*], [VIDEO_*] — Tan proporciona valores después
- Actualiza PROJECT_STATUS.md después de cada tarea completada
- Sube PROJECT_STATUS_v[X.Y].md a Drive al terminar cada paso (nombre versionado — no eliminar versiones anteriores)
- Sin explicaciones largas — sé conciso y directo
- Cuando digas "actualizar archivos proyecto" → sincronizo Cowork ↔ Drive
