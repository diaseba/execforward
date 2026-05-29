# Tarea Cowork — Pasos 7 y 7b
**ExecForward · 26 may 2026 · sin preguntas abiertas**

---

## ÍNDICE

1. Paso 7 — Plantillas email confirmación LS (3 SKUs)
2. Paso 7b — Flujos de transición, upsell y cierre
3. Nuevos placeholders
4. Checklist de entrega

---

## 1. PASO 7 — Plantillas email confirmación LS

**Archivos a crear:** `src/emails/email-start.html` · `email-core.html` · `email-bundle.html`  
**Referencia:** Handoff §5B + Spec §5.2  
**Requisito técnico:** HTML limpio, sin CSS externo, compatible con el editor de emails de Lemon Squeezy. `[UUID]` y `[PASSWORD]` son variables nativas de LS — no reemplazar.

**Asunto (igual para los 3):** `Tu acceso a ExecForward está listo`

---

### email-start.html — SKU Tripwire $29

```
[Logo ExecForward]

Hola,

Tu compra está confirmada. Aquí están tus credenciales de acceso:

────────────────────────
URL de acceso: execforward.com/programa/start
ID de acceso:  [UUID]
Contraseña:    [PASSWORD]
────────────────────────

Guarda este email — es tu único acceso.

[BOTÓN: Acceder ahora → execforward.com/programa/start]

Lo que construyes en M1:
· La frase que te consigue trabajo — y que la gente recuerda
· Tu marco de diferenciadores ejecutivos
· Tu propuesta de valor afinada contra el estándar de mercado
· Test de validación real antes de salir a usarla

Es el módulo base. Sin esto claro, todo lo demás opera sin ancla.

¿Preguntas? Responde este email.

ExecForward
execforward.com
```

---

### email-core.html — SKU Core $59

```
[Logo ExecForward]

Hola,

Tu compra está confirmada. Aquí están tus credenciales de acceso:

────────────────────────
URL de acceso: execforward.com/programa/core
ID de acceso:  [UUID]
Contraseña:    [PASSWORD]
────────────────────────

Guarda este email — es tu único acceso.

[BOTÓN: Acceder ahora → execforward.com/programa/core]

Lo que construyes en este plan:
· Tu propuesta de valor ejecutiva — la frase que abre conversaciones
· Tu mercado objetivo definido donde eres el candidato más fuerte
· CV y LinkedIn que trabajan pos ti mientras no estás mirando

Tres módulos. Una base de posicionamiento completa.

¿Preguntas? Responde este email.

ExecForward
execforward.com
```

---

### email-bundle.html — SKU Bundle $89

```
[Logo ExecForward]

Hola,

Tu compra está confirmada. Aquí están tus credenciales de acceso:

────────────────────────
URL de acceso: execforward.com/programa/bundle
ID de acceso:  [UUID]
Contraseña:    [PASSWORD]
────────────────────────

Guarda este email — es tu único acceso.

[BOTÓN: Acceder ahora → execforward.com/programa/bundle]

Lo que construyes en el sistema completo:
· Tu propuesta de valor ejecutiva — la frase que abre conversaciones
· Tu mercado objetivo: exactamente dónde eres el candidato más fuerte
· CV y LinkedIn que trabajan pos ti mientras no estás mirando
· Una red activada con precisión — sin pedir favores
· Pitch, entrevista y negociación preparados para cerrar
· Un plan de ejecución que no depende de que estés inspirado ese día

Seis módulos. El sistema completo, end-to-end.

¿Preguntas? Responde este email.

ExecForward
execforward.com
```

**Nota de diseño para los 3 emails:**
- Bloque de credenciales con borde azul `#2563EB` (ver Brandbook)
- Botón CTA: fondo azul `#2563EB`, texto blanco, border-radius 6px
- Fuente: Nunito o fallback Arial/sans-serif
- Logo centrado en header, firma simple en footer

---

## 2. PASO 7b — Flujos de transición, upsell y cierre

Estos flujos reemplazan el comportamiento actual de `checkForCompletion()` y agregan pantallas nuevas. **Leer completo antes de implementar** — hay interdependencias entre los tres componentes.

---

### 2.1 Lógica maestra de flujos

Al completar cualquier módulo, el sistema evalúa en este orden:

```
¿Es el último módulo accesible del SKU?
    SÍ → ¿Hay módulo siguiente en el SKU superior?
              SÍ → Pantalla de UPSELL (ver §2.3)
              NO (ya es bundle) → ¿Todos los módulos completos?
                                       SÍ → Pantalla de CIERRE FINAL
                                       NO → Pantalla "CASI LLEGAS" (ver §2.4)
    NO → Pantalla de TRANSICIÓN al siguiente módulo (ver §2.2)
```

**Módulos accesibles por SKU:**

| SKU | Módulos accesibles | Último módulo del SKU |
|---|---|---|
| /start | M1 | M1 |
| /core | M1, M2, M3 | M3 |
| /bundle + /test | M1, M2, M3, M4, M5, M6 | M6 (cuando todos completos) |

---

### 2.2 Pantalla de transición entre módulos

**Cuándo aparece:** Al completar cualquier módulo que NO sea el último accesible del SKU.  
**Dónde:** Reemplaza el área de contenido principal. Sidebar permanece visible.

**Estructura y copy:**

```
──────────────────────────────────────────
  ✓  [Nombre del módulo] completado        ← texto muted, tamaño small

  [Entregable del módulo en 1 línea]       ← ver tabla abajo

  ─────────────────────

  A continuación

  [Número] — [Nombre del módulo siguiente]
  [Tagline del módulo siguiente]           ← de spec §2.5

  [Continuar con [MX] →]                  ← botón primario azul
  [Volver al inicio]                       ← botón secundario outline
──────────────────────────────────────────
```

**Entregable por módulo (línea que aparece en la transición):**

| Módulo completado | Línea de entregable |
|---|---|
| M1 | Construiste tu propuesta de valor ejecutiva. |
| M2 | Definiste tu mercado objetivo y el mapa de empresas target. |
| M3 | Optimizaste tu CV y LinkedIn para que trabajen por ti. |
| M4 | Activaste tu red con criterio y precisión. |
| M5 | Preparaste tu pitch, tu entrevista y tu posición de negociación. |

**Taglines por módulo siguiente** (ya en el código desde spec §2.5 — reutilizar):

| Módulo siguiente | Tagline |
|---|---|
| M2 | *Define exactamente dónde eres el candidato más fuerte.* |
| M3 | *Haz que tus materiales trabajen por ti mientras no estás mirando.* |
| M4 | *Activa tu red con precisión — sin pedir favores, sin incomodar.* |
| M5 | *Prepárate para cerrar — pitch, entrevista y negociación en un módulo.* |
| M6 | *La búsqueda es un proceso que puede durar meses. Este módulo lo hace sostenible.* |

**Notas de diseño:**
- ✓ en teal `#14B8A6`, texto del módulo completado en `#6B7280` (muted)
- Nombre del módulo siguiente en H3 Karla 600
- Tagline en cursiva, color muted
- Botón primario: azul `#2563EB`, altura 44px, border-radius 6px
- Botón secundario: outline `#E5E7EB`, mismo tamaño

---

### 2.3 Pantallas de upsell

**Cuándo aparece:** Al completar el último módulo accesible del SKU (/start después de M1, /core después de M3).

---

#### Upsell /start → Core y Bundle (se activa al completar M1)

```
──────────────────────────────────────────
  ✓  M1 completado

  Construiste tu propuesta de valor ejecutiva.

  El siguiente paso es saber exactamente a quién
  dirigirla, con qué materiales y cómo activar tu red.

  ─────────────────────

  PLAN DE POSICIONAMIENTO               $59
  M2 · Mercado Objetivo y Mercado Oculto
  M3 · CV Ejecutivo y LinkedIn
  + todo lo que ya tienes en M1

  [Acceder al Plan →]      ← [LS_URL_CORE] · botón primario azul

  ─────────────────────

  SISTEMA COMPLETO                      $60 *
  M2 · M3 · M4 · M5 · M6
  + todo lo que ya tienes en M1
  * Precio especial — descontamos tu compra de M1 ($29)

  [Acceder al Sistema →]   ← [LS_URL_BUNDLE_UPGRADE_START] · botón primario azul

  ─────────────────────

  [Quedarme con M1 por ahora]           ← texto link, sin botón
──────────────────────────────────────────
```

**Nota sobre precios:** $60 = $89 Bundle − $29 Start. Mostrar precio neto en UI. El mecanismo de descuento en LS se configura en sesión posterior — por ahora hardcodear el precio neto en el copy.

---

#### Upsell /core → Bundle (se activa al completar M3)

```
──────────────────────────────────────────
  ✓  Plan de Posicionamiento completado

  Tienes la base: propuesta de valor definida,
  mercado objetivo claro, CV y LinkedIn optimizados.

  Lo que falta es activar todo eso — tu red,
  tu pitch, tu negociación y el plan de ejecución.

  ─────────────────────

  SISTEMA COMPLETO                      $30 *
  M4 · Red de Contactos y Networking
  M5 · Pitch, Entrevista y Negociación
  M6 · Gestión del Proceso y Plan de Ejecución
  * Precio especial — descontamos tu compra anterior ($59)

  [Completar el sistema →]  ← [LS_URL_BUNDLE_UPGRADE_CORE] · botón primario azul

  ─────────────────────

  [Quedarme con el Plan por ahora]      ← texto link, sin botón
──────────────────────────────────────────
```

**Nota sobre precios:** $30 = $89 Bundle − $59 Core. Mismo criterio que arriba.

**Notas de diseño para ambas pantallas de upsell:**
- Badge de SKU en caps, Karla 700, color muted — separa visualmente cada oferta
- Precio en H2, destacado
- Línea `*` de descuento en color teal `#14B8A6` — es el argumento más fuerte
- Dos bloques de oferta separados por línea divisora `#E5E7EB`
- Botón "Quedarme con X" como texto link al pie — sin peso visual, siempre visible

---

### 2.4 Pantalla "Casi llegas" (M6 completo, módulos pendientes)

**Cuándo aparece:** Solo en /bundle y /test. El usuario completó M6 pero hay módulos anteriores sin terminar. El sistema detecta que `completedModules` no incluye todos los accesibles.

```
──────────────────────────────────────────
  Completaste M6.

  El sistema está casi listo — te faltan algunos
  módulos para que todo encaje.

  ─────────────────────

  MÓDULOS PENDIENTES

  ┌─────────────────────────────────────────┐
  │  M2 — Mercado Objetivo                  │
  │  Define exactamente dónde eres el       │
  │  candidato más fuerte.                  │
  │                                         │
  │                        [ Ir a M2 → ]   
  └─────────────────────────────────────────┘

  ┌─────────────────────────────────────────┐
  │  M4 — Red de Contactos                  │
  │  Activa tu red con precisión.           │
  │                                         │
  │                        [ Ir a M4 → ]   │
  └─────────────────────────────────────────┘

  ─────────────────────

  [Volver al inicio]
──────────────────────────────────────────
```

**Lógica dinámica:**
- La lista de cards se genera dinámicamente — solo módulos realmente pendientes
- Cada card incluye: nombre del módulo, tagline (de spec §2.5), botón `[ Ir a MX → ]`
- Al hacer click en `[ Ir a MX → ]` → navega directamente a ese módulo en el sidebar
- Cuando el usuario completa el último módulo pendiente → se activa automáticamente la pantalla de cierre final (la existente en §2.8)
- En /test esta pantalla también aparece — es parte del flujo de prueba

**Notas de diseño:**
- Cards: borde `1.5px #E5E7EB`, border-radius 10px, padding 20px
- Botón `[ Ir a MX → ]` alineado a la derecha dentro de la card, color teal `#14B8A6`, outline
- Cards apiladas verticalmente con gap 12px
- Sin badge de completado — el usuario todavía no terminó

---

### 2.5 Pantalla de cierre final — verificación

La pantalla de cierre final existente (§2.8) **no se modifica**. Solo cambia **cuándo se dispara:**

| Antes | Después |
|---|---|
| Al completar M6, independiente de los otros módulos | Solo cuando TODOS los módulos accesibles del SKU están completos |

Asegurarse de que `checkForCompletion()` en `app-utils.js` evalúe `allModulesComplete` (todos los accesibles al 100%) y no solo `lastModuleComplete`.

---

## 3. Nuevos placeholders

Agregar al sistema de find-and-replace (junto con los 3 existentes):

| Placeholder | Descripción | Precio a mostrar en UI |
|---|---|---|
| `[LS_URL_BUNDLE_UPGRADE_START]` | Checkout Bundle con descuento para compradores de Start | $60 |
| `[LS_URL_BUNDLE_UPGRADE_CORE]` | Checkout Bundle con descuento para compradores de Core | $30 |

El operador configura los productos de upgrade en LS en sesión posterior. Por ahora dejar los placeholders en el código con los precios hardcodeados en el copy.

---

## 4. Checklist de entrega

| Entregable | Archivo | Estado |
|---|---|---|
| email-start.html | `src/emails/email-start.html` | ⬜ |
| email-core.html | `src/emails/email-core.html` | ⬜ |
| email-bundle.html | `src/emails/email-bundle.html` | ⬜ |
| Pantalla de transición entre módulos | `app-utils.js` — función `showModuleTransition()` | ⬜ |
| Upsell /start → Core + Bundle | `app-utils.js` — función `showUpsellStart()` | ⬜ |
| Upsell /core → Bundle | `app-utils.js` — función `showUpsellCore()` | ⬜ |
| Pantalla "Casi llegas" | `app-utils.js` — función `showAlmostThere()` | ⬜ |
| `checkForCompletion()` corregida | `app-utils.js` — evalúa todos los módulos accesibles | ⬜ |
| Nuevos placeholders en código | `[LS_URL_BUNDLE_UPGRADE_START]` y `[LS_URL_BUNDLE_UPGRADE_CORE]` | ⬜ |
| Verificación /test sin upsell | Pantalla de cierre en /test no muestra CTA de compra | ⬜ |

**Criterio de aprobación:** el operador prueba el flujo completo en /test (M1→M6 en orden, luego M6 solo con pendientes) y en /start (M1 → upsell). Si los tres flujos funcionan correctamente → Pasos 7 y 7b aprobados.

---

*ExecForward · Tarea Cowork Pasos 7 + 7b · 26 may 2026*
