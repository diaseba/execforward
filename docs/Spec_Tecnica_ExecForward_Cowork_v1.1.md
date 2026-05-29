# SPEC TÉCNICA EXECFORWARD — PARA COWORK
**versión 1.1 · 25 may 2026 · sin preguntas abiertas**

---

## ÍNDICE

1. Arquitectura general y stack
2. Web app M1–M6 — spec completa
3. Quiz M0 landing — spec completa
4. Landing page — spec completa
5. Email de score — spec completa
6. Seguridad, acceso y entorno de prueba
7. Assets que Cowork recibe / que Cowork produce

---

## 1. ARQUITECTURA GENERAL Y STACK

### Dominio y hosting

| Componente | Valor |
|---|---|
| Dominio | execforward.com (registrado en Cloudflare) |
| Hosting | Cloudflare Pages (gratuito, global CDN) |
| Repositorio | Git — Cowork gestiona localmente |
| Despliegue | Push a main → Cloudflare Pages auto-deploy |

### Stack técnico por pieza

| Pieza | Stack |
|---|---|
| Web app M1–M6 | HTML + CSS + JavaScript vanilla. Sin frameworks. Sin backend. Sin base de datos. |
| Quiz M0 | HTML + JS vanilla embebible via `<iframe>` en landing. Alternativa: Tally.so. Cowork prueba HTML primero — si el scoring es limpio, se queda en HTML. |
| Landing page | HTML + CSS. Misma base Cloudflare Pages. |
| Email de score | Plantilla HTML copiable — no sistema de envío automático. El quiz genera el texto; el usuario lo copia y pega en su cliente de correo. |
| Mindmaps | SVG generados por Cowork, uno por módulo. Embebidos como `<img>` o inline SVG. |
| Audio NotebookLM | `<audio controls src="[URL]">` HTML estándar. Cowork deja slots con URL placeholder. |
| Video NotebookLM | `<video controls>` o `<iframe>` YouTube/Vimeo. Cowork deja slots con URL placeholder. |
| Progreso | localStorage por SKU-URL. Aceptado para v1. |
| Seguridad de acceso | UUID + password por SKU. Hardcoded en JS del lado cliente. Ver Sección 6. |

### URLs del sistema

| Página | URL |
|---|---|
| Landing + quiz M0 | execforward.com/ |
| Quiz standalone (opcional) | execforward.com/quiz |
| Tripwire $29 | execforward.com/programa/start |
| Core $59 | execforward.com/programa/core |
| Bundle $89 | execforward.com/programa/bundle |
| **Entorno de prueba** | **execforward.com/programa/test** |

### Integración con Lemon Squeezy — HUECO PLANIFICADO

LS es únicamente el procesador de pago. Toca un solo punto de conexión: el botón CTA que sale de landing/quiz, y el redirect que llega a `/programa/[sku]`. Todo lo demás es independiente.

```
[Landing + quiz]  →  [LS checkout]  →  [Web app M1–M6]
  ✅ construible       HUECO            ✅ construible
  ✅ testeable      (≤48h post-         ✅ testeable
                    aprobación)
```

**Instrucción para Cowork:** Dejar todos los botones de CTA que dirigen a pago con placeholders explícitos en el código:

```html
<!-- PENDIENTE: reemplazar con URL real de LS post-aprobación -->
<a href="[LS_URL_START]">Empezar con M1 — $29</a>
<a href="[LS_URL_CORE]">Plan de posicionamiento — $59</a>
<a href="[LS_URL_BUNDLE]">Sistema completo — $89</a>
```

Cuando llegue la aprobación de LS, el operador hace find-and-replace de los tres placeholders. Tiempo estimado: < 30 minutos. Los placeholders aplican en: landing (§4.6), quiz resultado (§3.9), sidebar candados (§2.4) y pantalla de cierre (§2.8).

---

## 2. WEB APP M1–M6

### 2.1 Flujo de acceso

```
Usuario llega a /programa/[sku]
    └── Pantalla de login (UUID + password)
            └── Validación correcta
                    └── Pantalla de onboarding
                            └── Sidebar + contenido de módulos
```

### 2.2 Pantalla de login

**Diseño:** Minimalista. Logo ExecForward centrado. Dos campos: `ID de acceso` (UUID) + `Contraseña`. Botón "Acceder". Mensaje de error si falla: *"Credenciales incorrectas. Revisa el email de confirmación."*

**Lógica:** Las credenciales por SKU están hardcoded en el JS de cada URL. Cowork genera los hashes y entrega la tabla al operador antes del lanzamiento (ver §6).

---

### 2.3 Pantalla de onboarding (post-login)

**Cuándo aparece:** Primera vez que el usuario accede. Se guarda en localStorage como vista. Sidebar muestra botón "Ver bienvenida de nuevo" para revisitar.

**Contenido — texto aprobado (no modificar):**

---

*Llegaste al lugar correcto.*

*Tengo una hipótesis sobre ti: eres bueno en lo que haces. Quizás muy bueno. Pero nadie te enseñó a buscar trabajo ejecutivo — porque mientras estabas trabajando, no lo necesitabas.*

*Eso está a punto de cambiar.*

*Este programa tiene un solo objetivo: que termines con un sistema que trabaje por ti. No una lista de consejos — un sistema. Cuando salgas de aquí vas a tener:*

- *Tu propuesta de valor ejecutiva: la frase que abre conversaciones y que la gente recuerda*
- *Tu mercado objetivo definido con criterios reales, no aspiraciones*
- *Tu CV y LinkedIn trabajando activamente para que te encuentren*
- *Tu red activada de forma estratégica — sin pedir favores, sin incomodar*
- *Tu pitch, tu narrativa de entrevista y tu posición de negociación preparados*
- *Un plan de ejecución que no depende de que estés inspirado ese día*

*Y una ventaja que pocos candidatos tienen: la IA como copiloto en cada paso. No para hacer el trabajo por ti — para que el trabajo que ya hiciste llegue más lejos.*

*Una pregunta antes de empezar:*

*¿Hiciste el diagnóstico M0 antes de comprar?*

---

**Después de la pregunta de score:** El usuario selecciona su banda. El sistema personaliza el orden recomendado en el sidebar:

| Banda | Score M0 | Orden recomendado en sidebar |
|---|---|---|
| Base | 14–26 | M1 → M2 → M3 → M4 → M5 → M6 |
| Operativo | 27–38 | M1 → módulo de eje débil → resto |
| Competitivo | 39–49 | Módulo de eje débil → M1 → resto |
| Diferenciado | 50–56 | M1 → módulo de eje débil → afinar y acelerar |
| No hice el quiz | — | Orden estándar sin personalización |

**Eje débil = eje con score 2–3 sobre 8.** Se entrega al usuario como dato informativo adicional, no define el orden principal.

**Implementación:** El sidebar reordena visualmente los módulos según la banda seleccionada. Etiqueta en parte superior del sidebar: *"Orden recomendado para tu score"*. El usuario puede navegar libremente ignorando el orden.

---

### 2.4 Layout general de la web app

```
┌─────────────────────────────────────────────┐
│  HEADER: Logo ExecForward + progreso global │
├──────────────┬──────────────────────────────┤
│              │                              │
│   SIDEBAR    │    ÁREA DE CONTENIDO         │
│  (fijo izq)  │    (scroll vertical)         │
│              │                              │
│  M1 ██░░░   │                              │
│  M2 ░░░░░   │                              │
│  M3 ░░░░░   │  [contenido del módulo       │
│  M4 🔒       │   activo]                    │
│  M5 🔒       │                              │
│  M6 🔒       │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

**Sidebar — reglas:**
- Solo títulos de módulo. Sin descripciones.
- Indicador de progreso por módulo: barra o % completado.
- Checkmark al completar todos los componentes de un módulo.
- Módulos no incluidos en el SKU: visibles con candado 🔒 + texto *"Incluido en el plan completo"* + enlace `[LS_URL_BUNDLE]`.
- Módulo activo: resaltado.
- Módulos completados: visualmente distinguibles (check + color diferente).

**Sidebar por SKU:**

| SKU | Visible y accesible | Visible con candado |
|---|---|---|
| /start ($29) | M1 | M2, M3, M4, M5, M6 |
| /core ($59) | M1, M2, M3 | M4, M5, M6 |
| /bundle ($89) | M1–M6 | — |
| /test | M1–M6 | — |

**Header:**
- Logo ExecForward (izquierda)
- Barra de progreso global (% total de componentes completados)
- Botón "Ver bienvenida" (derecha)

---

### 2.5 Pantalla de inicio de cada módulo

Cada módulo tiene una pantalla de inicio antes de mostrar el contenido. Estructura fija:

```
[TAGLINE del módulo]
[MINDMAP — imagen SVG]
[DESCRIPCIÓN — 2-3 líneas]
[COMPONENTES — lista de lo que contiene]
[BOTÓN CTA — "Empezar M[X]"]
```

**Taglines por módulo:**

| Módulo | Tagline |
|---|---|
| M1 — Propuesta de Valor Ejecutiva | *La frase que te consigue trabajo. Todo lo demás es consecuencia.* |
| M2 — Mercado Objetivo y el Mercado Oculto | *El 70% de los cargos ejecutivos nunca se publican. Este módulo te lleva ahí.* |
| M3 — CV Ejecutivo y LinkedIn | *Tus materiales trabajan por ti mientras duermes — o no trabajan. Este módulo decide cuál.* |
| M4 — Red de Contactos y Networking Ejecutivo | *La red no es pedir favores. Es saber a quién, con qué mensaje, en qué orden.* |
| M5 — Pitch, Entrevista y Negociación | *Puedes llegar a la conversación final y perderla. Este módulo cierra.* |
| M6 — Gestión del Proceso y Plan de Ejecución | *La búsqueda es un proceso que puede durar meses. Este módulo lo hace sostenible.* |

**Descripción y componentes por módulo:**

| Módulo | Descripción | Componentes |
|---|---|---|
| M1 | Construyes la frase que define quién eres como ejecutivo. La que funciona en un asado, en una entrevista, en un elevator pitch. Sin esto, todo lo demás es ruido. | Pre-etapa: Define tu target · C1: Marco de diferenciadores · C2: Fórmula de PV · C3: Mapa de evidencias · C4: Test de mercado |
| M2 | Defines exactamente dónde eres el candidato más fuerte — y dejas de competir donde estás en desventaja. Acceso al mercado oculto: el 70% de cargos que nunca se publican. | Pre-etapa: ¿Dónde estás buscando hoy? · C1: Define tu mercado objetivo real · C2: El mercado oculto · C3: Tu filtro de oportunidades |
| M3 | Tu CV y tu LinkedIn dejan de ser documentos estáticos y empiezan a trabajar por ti. ATS, keywords, estructura ejecutiva y visibilidad para reclutadores. | Pre-etapa: ¿Tus materiales están trabajando por ti? · C1: CV ejecutivo con IA · C2: LinkedIn que te encuentra · C3: El sistema de adaptación rápida |
| M4 | Construyes el mapa de quién puede moverte la aguja, el mensaje correcto para cada uno, y el orden de activación. Sin pedir favores. Sin incomodar. | Pre-etapa: ¿Cómo está tu red hoy? · C1: Mapa de contactos de alto impacto · C2: El mensaje que abre puertas · C3: Sistema de seguimiento |
| M5 | Preparas los tres momentos que definen si consigues el trabajo: el pitch informal, la entrevista estructurada y la negociación de compensación. | Pre-etapa: ¿Estás listo para cerrar? · C1: El pitch que genera conversación · C2: La entrevista ejecutiva · C3: Negociación de compensación |
| M6 | Conviertes la búsqueda en un proceso sostenible — con métricas, ritmo, estado anímico y un plan de 90 días que no depende de inspiración. | Pre-etapa: ¿Cómo estás manejando el proceso? · C1: Sistema de seguimiento de procesos · C2: Gestión del estado anímico · C3: Plan de 90 días |

---

### 2.6 Estructura de contenido dentro de cada módulo

Cowork integra el contenido de los archivos MD tal cual. Estructura de secciones por módulo:

```
[PRE-ETAPA]
    · Instrucción introductoria
    · Preguntas diagnósticas (checkboxes / selección)
    · Lectura personalizada por respuesta (feedback condicional)
    · Prompt copiable (si aplica)

[COMPONENTE 1]
    · Título
    · Explicación conceptual
    · Ejemplo mal hecho ❌
    · Ejemplo bien hecho ✅
    · Ejercicio / tabla completable
    · Prompt copiable
    · Entregable esperado
    · [Audio NbLM — player embebido]
    · [Video NbLM — player embebido]

[COMPONENTE 2]  (misma estructura)

[COMPONENTE 3]  (misma estructura)

[COMPONENTE 4 — solo M1]  (misma estructura, sin prompt en formato Markdown)

[COMPLETAR MÓDULO — botón]
    · Al hacer clic: checkmark en sidebar + progreso actualizado
```

---

### 2.7 Elementos interactivos — spec detallada

#### A. Prompts copiables

**Diseño:** Caja con fondo diferenciado (gris oscuro o color de marca). Texto en monospace o sans-serif claro. Botón "Copiar" en esquina superior derecha.

**Comportamiento:**
- Clic → `navigator.clipboard.writeText(promptText)`
- Botón cambia a "✓ Copiado" por 2 segundos → vuelve a "Copiar"
- Los corchetes `[TEXTO EN MAYÚSCULAS]` son placeholders que el usuario reemplaza manualmente en su IA. Son texto estático en v1 — no campos editables.

---

#### B. Preguntas interactivas con feedback condicional

**Tipo A — Selección de una opción (4 alternativas):**
- Clic en opción → aparece inmediatamente la "Lectura de tu respuesta" correspondiente
- Las otras opciones se atenúan pero siguen visibles
- El usuario puede cambiar de respuesta

**Tipo B — Tabla de porcentajes (M2 Pre-etapa P1):**
- Campos numéricos que suman 100%
- Sin lógica automática — el usuario llena y lee la tabla estática

**Tipo C — Tabla completable (ejercicios dentro de componentes):**
- Celdas editables inline
- Datos guardados en localStorage durante la sesión

**Implementación:** Event listeners en inputs → mostrar/ocultar bloques de texto correspondientes.

---

#### C. Audio NotebookLM

```html
<!-- Slot de audio — reemplazar src cuando el operador entregue los archivos -->
<p class="media-label">Audio complementario — IP del operador</p>
<audio controls src="[AUDIO_M1_URL]"></audio>
```

Posición: al final de cada componente, antes del botón de completar. Los archivos los produce el operador y los sube a Cloudflare Pages en `/audio/`. Cowork deja slots con URL placeholder por módulo y componente.

---

#### D. Video NotebookLM

```html
<!-- Slot de video — reemplazar src cuando el operador entregue los archivos -->
<p class="media-label">Video complementario</p>
<video controls src="[VIDEO_M1_URL]"></video>
<!-- Alternativa iframe si el operador usa YouTube/Vimeo:
<iframe src="[VIDEO_EMBED_URL]" allowfullscreen></iframe> -->
```

Cowork deja slot con ambas opciones comentadas. El operador elige cuál usar al integrar.

---

#### E. Video de introducción a prompts

Aparece **una sola vez**, tras la primera interacción del usuario con cualquier prompt copiable.

```javascript
if (!localStorage.getItem('promptIntroSeen')) {
    showPromptIntroModal();
    localStorage.setItem('promptIntroSeen', 'true');
}
```

**Formato:** Modal o banner no intrusivo encima del área de contenido. Slot de video con URL placeholder `[VIDEO_INTRO_PROMPTS_URL]`. El operador graba el video y lo entrega en S3a.

---

#### F. Progreso

| Elemento | Implementación |
|---|---|
| Progreso por módulo | Barra o % que avanza al hacer clic en "Completar [Componente X]" |
| Progreso global (header) | % de componentes completados sobre total del SKU |
| Checkmark de módulo | Aparece en sidebar cuando todos los componentes del módulo están marcados |
| Persistencia | localStorage |

---

### 2.8 Pantalla de cierre — al completar el último módulo del SKU

Aparece automáticamente al marcar como completado el último componente del último módulo disponible en el SKU del usuario.

**Contenido — texto aprobado (no modificar):**

---

*Llegaste al final.*

*No al final del proceso — al final de la preparación. Lo que viene ahora es diferente: es ejecutar con un sistema que ya construiste.*

*Pocos ejecutivos hacen esto. La mayoría improvisa, aplica sin criterio, espera que el mercado responda. Tú ya no estás en esa categoría.*

*Lo que tienes ahora:*

- *Una propuesta de valor que la gente recuerda*
- *Un mercado objetivo definido donde eres el candidato más fuerte*
- *Materiales que trabajan por ti mientras no estás mirando*
- *Una red que puedes activar con precisión*
- *Un pitch, una narrativa y una posición de negociación preparados*
- *Un plan de ejecución que no depende de que estés inspirado ese día*

*El trabajo ahora es salir.*

*Una última cosa: si algo de este programa cambió cómo estás viendo tu búsqueda, compártelo con alguien que lo necesite. No porque te lo pidamos — porque el ejecutivo que está en el mismo punto donde estabas tú hace unas semanas lo agradecerá.*

*Suerte. Aunque con esto, ya no dependes tanto de ella.*

---

**Elementos adicionales en pantalla de cierre:**

| Elemento | Contenido |
|---|---|
| Badge de completado | Ícono visual + "Programa completado" |
| Botón "Volver al inicio" | Regresa a M1 para revisitar |
| CTA upgrade (solo /start y /core) | *"¿Listo para el siguiente nivel?"* + `[LS_URL_BUNDLE]` |
| CTA compartir | Texto pre-redactado para copiar + compartir en LinkedIn (sin automatización) |

---

## 3. QUIZ M0 LANDING

### 3.1 Decisión de implementación

**Primera opción (preferida):** HTML + JS vanilla. El quiz vive en execforward.com/quiz y se embebe en la landing via `<iframe>`. Cowork evalúa — si Tally.so resulta más limpio para la lógica de scoring y el texto copiable, puede usarlo.

---

### 3.2 Score M0 — modelo de datos

| Elemento | Detalle |
|---|---|
| Ejes | 7 |
| Preguntas por eje | 2 |
| Total preguntas | 14 |
| Opciones por pregunta | A = 1 · B = 2 · C = 3 · D = 4 |
| Score global | Suma de 14 respuestas → rango **14–56** |
| Score por eje | Suma de 2 preguntas → rango **2–8** (uso interno) |

```javascript
// Lógica de scoring
const opciones = { A: 1, B: 2, C: 3, D: 4 };
const scoreGlobal = respuestas.reduce((sum, r) => sum + opciones[r], 0); // 14–56
const scorePorEje = ejes.map(eje =>
    eje.preguntas.reduce((sum, r) => sum + opciones[r], 0) // 2–8 por eje
);
const ejeDebil = scorePorEje.findIndex(s => s <= 3); // eje con score 2–3
```

### 3.3 Bandas de diagnóstico

| Banda | Score global | Nombre |
|---|---|---|
| 1 | 14–26 | Base |
| 2 | 27–38 | Operativo |
| 3 | 39–49 | Competitivo |
| 4 | 50–56 | Diferenciado |

---

### 3.4 Flujo del quiz

```
Pantalla de inicio del quiz
    └── Instrucción + botón "Empezar diagnóstico"
            └── 14 preguntas (una por pantalla — ver §3.5)
                    └── Pantalla de resultado
                            └── Score + banda + diagnóstico + eje débil
                                    └── Texto copiable con resultado
                                            └── CTA personalizado al SKU correcto
```

---

### 3.5 Pantalla de inicio del quiz

**Título:** *Diagnóstico de posicionamiento ejecutivo*

**Subtítulo:** *14 preguntas · 5 minutos · resultado inmediato*

**Instrucción:** *Selecciona la opción que mejor describe tu situación actual — no la que quisieras que fuera. El diagnóstico es útil solo si es honesto.*

**Botón:** *Empezar diagnóstico*

---

### 3.6 Presentación de preguntas

**Formato recomendado:** Una pregunta por pantalla con botones grandes A/B/C/D. Barra de progreso en parte superior (Pregunta X de 14). "Siguiente" aparece al seleccionar una opción. Cowork elige la presentación que garantice mejor experiencia móvil.

---

### 3.7 Contenido de las preguntas

Las 14 preguntas con sus 4 opciones cada una están en el archivo `Resumen_1___Estructura_completa_M0_y_M1.md`, secciones E1 a E7. Cowork las integra tal cual, sin modificar el texto.

**Mapeo eje → módulo** (para identificar el eje débil y su módulo correspondiente):

| Eje | Módulo relacionado |
|---|---|
| E1 — ¿Sabes por qué te contratan a ti? | M1 |
| E2 — Tu mercado objetivo | M2 |
| E3 — Tu CV ejecutivo | M3 |
| E4 — LinkedIn para ejecutivos | M3 |
| E5 — Del pitch a la negociación | M5 |
| E6 — Red de contactos | M4 |
| E7 — Lo que nadie te dice | M6 |

---

### 3.8 Pantalla de resultado

| Elemento | Contenido |
|---|---|
| Score numérico | Grande, centrado. Formato: "Tu score: **X / 56**" |
| Banda | Badge visual con nombre: BASE / OPERATIVO / COMPETITIVO / DIFERENCIADO |
| Diagnóstico de banda | Texto correspondiente a la banda (ver archivos M0 — adaptar nombres de banda al nuevo sistema) |
| Eje débil | "Tu eje más bajo: [nombre del eje] ([score]/8)" — solo si algún eje tiene score 2–3 |
| Recomendación | Tabla de prioridades y señal de avance del nivel correspondiente |

---

### 3.9 Texto con resultado copiable

**Botón:** *"Copiar mi resultado para guardarlo"*

**Texto generado dinámicamente y copiado al clipboard:**

```
MI DIAGNÓSTICO EXECFORWARD
──────────────────────────
Fecha: [fecha automática]
Score total: [X] / 56
Banda: [NOMBRE DE BANDA]

[DIAGNÓSTICO DE LA BANDA]

MIS RESULTADOS POR EJE:
E1 — ¿Sabes por qué te contratan a ti?: [X]/8
E2 — Tu mercado objetivo: [X]/8
E3 — Tu CV ejecutivo: [X]/8
E4 — LinkedIn para ejecutivos: [X]/8
E5 — Del pitch a la negociación: [X]/8
E6 — Red de contactos: [X]/8
E7 — Lo que nadie te dice: [X]/8

[Si hay eje débil:]
⚠ Eje más bajo: [NOMBRE EJE] — [X]/8

PRÓXIMO PASO:
[RECOMENDACIÓN DE LA BANDA]

──────────────────────────
execforward.com
```

**Implementación:** `navigator.clipboard.writeText(resultText)` — mismo patrón que los prompts.

---

### 3.10 CTA personalizado por banda → SKU correcto

| Banda | Score | Copy CTA | SKU destino | Placeholder |
|---|---|---|---|---|
| Base | 14–26 | *"Necesitas construir el sistema desde el inicio. El plan completo te da los 6 módulos en orden."* | Bundle $89 | `[LS_URL_BUNDLE]` |
| Operativo | 27–38 | *"Tienes materia prima. El plan completo te ayuda a identificar el eslabón que frena todo."* | Bundle $89 | `[LS_URL_BUNDLE]` |
| Competitivo | 39–49 | *"Estás cerca. El módulo de propuesta de valor es donde empieza el trabajo fino."* | Mostrar Tripwire primero + Bundle segundo | `[LS_URL_START]` / `[LS_URL_BUNDLE]` |
| Diferenciado | 50–56 | *"Tu posicionamiento es sólido. El trabajo ahora es distribución y velocidad."* | Tripwire $29 | `[LS_URL_START]` |

---

## 4. LANDING PAGE

### 4.1 Estructura de secciones

```
[HERO]
[QUIZ M0 — embebido]
[PROBLEMA — 3 bloques]
[SOLUCIÓN — módulos como argumento]
[ESCALERA DE SKUs + CTA]
[FOOTER]
```

---

### 4.2 Hero

**Headline:** *El sistema que usan los ejecutivos que consiguen el trabajo que buscan.*

**Subheadline:** *Propuesta de valor · Mercado objetivo · CV y LinkedIn · Networking estratégico · Pitch y negociación · Plan de ejecución. En un solo programa. A tu ritmo. Con IA como copiloto.*

**CTA hero:** *[Empezar con el diagnóstico gratuito ↓]* — ancora al quiz M0 más abajo

**Texto bajo CTA:** *Diagnóstico gratuito · Sin registro · Resultado inmediato*

---

### 4.3 Quiz M0 embebido

**Posición:** Justo debajo del hero — primer punto de conversión.

**Label encima:** *Primero, un diagnóstico honesto. 5 minutos. 14 preguntas.*

**Implementación:** `<iframe src="execforward.com/quiz">` con altura suficiente para mostrar el quiz sin scroll interno.

---

### 4.4 Sección Problema

**Encabezado:** *¿Por qué la búsqueda ejecutiva no funciona como debería?*

| # | Título | Copy |
|---|---|---|
| 1 | *Mandar 60 CVs no es una estrategia.* | El volumen sin foco es ruido. El problema no eres tú — es que nadie te enseñó las reglas del juego. Mientras estabas trabajando, no las necesitabas. |
| 2 | *El 70% de los cargos ejecutivos nunca se publican.* | Estás compitiendo en el 30% del mercado con el 100% de los candidatos activos. El mercado oculto no funciona con postulaciones — funciona con posicionamiento. |
| 3 | *El eslabón más débil define el resultado — no el promedio.* | Puedes tener un CV excelente y perder en la entrevista. Puedes llegar a la oferta y perder en la negociación. El sistema tiene que funcionar completo. |

---

### 4.5 Sección Solución — módulos como argumento

**Encabezado:** *Seis módulos. Un sistema completo. Tu ritmo.*

Para cada módulo, tarjeta con:

| Campo | Contenido |
|---|---|
| Número | M1 / M2 / M3 / M4 / M5 / M6 |
| Título | Nombre del módulo |
| Tagline | Ver tabla §2.5 |
| Qué construyes | Beneficio en 1 frase (ver tabla abajo) |
| Qué incluye | Pre-etapa + N componentes + prompts copiables + audio + video + mindmap |

**Qué construyes — por módulo:**

| Módulo | Beneficio 1 frase |
|---|---|
| M1 | La frase que abre conversaciones y que la gente recuerda |
| M2 | El mapa exacto de dónde eres el candidato más fuerte |
| M3 | CV y LinkedIn que trabajan por ti mientras no estás mirando |
| M4 | Una red activada con precisión — sin pedir favores |
| M5 | Pitch, entrevista y negociación preparados para cerrar |
| M6 | Un plan de 90 días que no depende de que estés inspirado |

---

### 4.6 Escalera de SKUs + CTA

**Encabezado:** *Elige tu punto de entrada.*

| SKU | Precio | Incluye | Promesa | Botón | Placeholder |
|---|---:|---|---|---|---|
| Tripwire | **$29** | M1 | La base de todo. Si no tienes claro por qué te contratan a ti, nada más funciona. | Empezar con M1 — $29 | `[LS_URL_START]` |
| Core | **$59** | M1 + M2 + M3 | Posicionamiento completo: propuesta de valor, mercado objetivo, CV y LinkedIn. | Plan de posicionamiento — $59 | `[LS_URL_CORE]` |
| Bundle | **$89** | M1 a M6 | El sistema completo, end-to-end. Desde la propuesta de valor hasta el plan de 90 días. | Sistema completo — $89 | `[LS_URL_BUNDLE]` |

**Visual:** Bundle con borde destacado o badge *"Más completo"*. Los tres precios visibles simultáneamente.

**Texto bajo la escalera:** *Acceso inmediato. Sin suscripción. Progresa a tu ritmo.*

---

### 4.7 Footer

| Elemento | Contenido |
|---|---|
| Logo | ExecForward |
| Links | Política de privacidad · Términos de uso (placeholders — el operador genera con LS o Termly) |
| Merchant of Record | *"Las transacciones son procesadas por Lemon Squeezy, Merchant of Record."* |
| Copyright | *© 2026 ExecForward. Todos los derechos reservados.* |

---

## 5. EMAIL DE SCORE

### 5.1 Resultado copiable del quiz

Ya documentado en §3.9. El usuario copia el texto desde la pantalla de resultado del quiz y se lo envía a sí mismo. No hay sistema de envío automático.

---

### 5.2 Plantilla email de confirmación post-compra (para Lemon Squeezy)

Cowork entrega esta plantilla en HTML limpio compatible con el editor de emails de LS. El operador la carga en LS para cada SKU con las variables correspondientes.

**Asunto:** *Tu acceso a ExecForward está listo*

**Cuerpo:**

```
[Logo ExecForward]

Hola,

Tu compra está confirmada. Aquí están tus credenciales de acceso:

────────────────────────
URL de acceso: execforward.com/programa/[SKU_SLUG]
ID de acceso: [UUID]
Contraseña: [PASSWORD]
────────────────────────

Guarda este email — es tu único acceso.

[BOTÓN: Acceder ahora → execforward.com/programa/[SKU_SLUG]]

Lo que construyes en este programa:
[lista de 3-4 bullets según el SKU — ver §2.5]

¿Preguntas? Responde este email.

ExecForward
execforward.com
```

**Nota para Cowork:** Entregar una versión de la plantilla por SKU (start / core / bundle), con los bullets de beneficios ajustados a los módulos incluidos en cada uno.

---

## 6. SEGURIDAD, ACCESO Y ENTORNO DE PRUEBA

### 6.1 Modelo de seguridad v1

| Capa | Implementación |
|---|---|
| Control de acceso | Login con UUID + password hardcoded en JS por SKU-URL |
| SKU isolation | Cada URL tiene su propio JS con credenciales y módulos visibles propios |
| Protección de contenido | El contenido de módulos se carga dinámicamente via JS solo después de login correcto. El HTML estático no expone el contenido al DOM antes de autenticación. |
| Indexación | Verificar que el contenido de módulos no sea indexable por Google (robots.txt + noindex en páginas /programa/*) |
| Sesión | localStorage con flag `authenticated:true` · duración: 7 días |
| Timeout | Al expirar, vuelve a pedir credenciales |

---

### 6.2 Entorno de prueba — /programa/test

**URL:** execforward.com/programa/test

**Propósito:** Testing interno del operador y círculo de prueba (early users del círculo cercano) antes del lanzamiento.

**Características:**
- Acceso a M1–M6 completos, sin candados
- Credenciales de prueba separadas de los SKUs de producción
- Banner visible en la interfaz: *"Versión de prueba — no compartir"*
- Se desactiva (o protege con nuevas credenciales) antes del lanzamiento público

**Credenciales de prueba:** Cowork genera junto con las credenciales de producción y las incluye en la tabla de §6.3.

---

### 6.3 Tabla de credenciales — entrega de Cowork al operador

| SKU | URL | UUID | Password | Tipo |
|---|---|---|---|---|
| Tripwire | /programa/start | [generado] | [generado] | Producción |
| Core | /programa/core | [generado] | [generado] | Producción |
| Bundle | /programa/bundle | [generado] | [generado] | Producción |
| Test | /programa/test | [generado] | [generado] | Prueba — desactivar antes de lanzamiento |

**Formato UUID sugerido:** `ef-[sku]-[8 chars alfanuméricos]` · ejemplo: `ef-start-x7k2m9pq`

---

### 6.4 Gate S3 — dos sub-gates

| Sub-gate | Condición | Depende de |
|---|---|---|
| S3-A | Producto completo funcional y probado por círculo del operador vía /programa/test | Cowork termina la build |
| S3-B | LS aprobado → URLs `[LS_URL_*]` insertadas → compra real de prueba end-to-end | S3-A + aprobación LS (≤48h) |

S3-A no depende de LS. S3-B toma < 30 min de integración + espera de aprobación. Pueden correr en paralelo: mientras LS evalúa, el operador corre las pruebas de S3-A.

---

## 7. ASSETS — ENTRADAS Y SALIDAS DE COWORK

### Lo que el operador entrega a Cowork antes de que empiece

| Asset | Estado | Notas |
|---|---|---|
| Contenido M0–M6 completo | ✅ Listo | Archivos MD del proyecto — Cowork lee directamente |
| Texto onboarding | ✅ Aprobado | Sección 2.3 de esta spec — copiar literal |
| Texto cierre M6 | ✅ Aprobado | Sección 2.8 de esta spec — copiar literal |
| Logo ExecForward | ✅ Listo | Gemini_logo_y_avatar.png en archivos del proyecto |
| URLs de checkout LS por SKU | ⏳ Bloqueado hasta aprobación LS | Usar placeholders `[LS_URL_*]` · el operador hace find-and-replace post-aprobación |
| URLs de audio NbLM por módulo | ⏳ Pendiente — operador produce en S3a | Cowork deja slots — integra cuando lleguen |
| URLs de video NbLM por módulo | ⏳ Pendiente — operador produce en S3a | Idem |
| URL video intro prompts | ⏳ Pendiente — operador produce en S3a | Idem |

### Lo que Cowork entrega al operador

| Entregable | Descripción |
|---|---|
| Web app M1–M6 — 4 versiones | /start · /core · /bundle · /test — con slots marcados para audio/video/URLs de pago |
| Quiz M0 funcional | Embebible vía iframe + standalone · scoring 14–56 · bandas · resultado copiable · CTA por banda |
| Landing page completa | Hero + quiz embebido + problema + módulos + escalera de SKUs con placeholders LS |
| Plantilla email confirmación LS | HTML limpio · una versión por SKU (3 en total) |
| Tabla de credenciales | UUID + password para los 4 entornos (3 producción + 1 prueba) |
| Mindmaps SVG | Uno por módulo M1–M6 — diseño a criterio de Cowork dentro de identidad ExecForward |
| Instrucciones de deploy | Cómo subir a Cloudflare Pages + conectar dominio |
| Instrucciones de integración NbLM | Dónde pegar las URLs cuando el operador las entregue |
| Instrucciones de integración LS | Cómo hacer find-and-replace de los 3 placeholders post-aprobación |

---

*ExecForward · Spec técnica Cowork v1.1 · 25 may 2026*