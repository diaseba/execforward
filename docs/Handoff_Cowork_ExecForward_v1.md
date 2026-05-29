# HANDOFF COWORK — EXECFORWARD
**versión 1.0 · 25 may 2026 · documento completo sin preguntas abiertas**

---

## ÍNDICE

1. Instrucciones de uso de este documento
2. Orden de ejecución
3. Assets disponibles
4. Copy landing page — ES master (T2.3)
5. Diseño email score y confirmación post-compra (T2.4)
6. FAQ landing page
7. Checklist de entrega

---

## 1. INSTRUCCIONES DE USO

Este documento es el único que Cowork necesita leer para arrancar. Contiene todo el copy y las decisiones editoriales. Para las decisiones técnicas (stack, URLs, seguridad, interactividad), leer en paralelo:

- **`Spec_Tecnica_ExecForward_Cowork_v1_1.md`** — spec completa de arquitectura y funcionalidad. No modificar nada de lo que está en la spec sin aprobación del operador.

Regla general: **si hay duda editorial, marcar en el código como `<!-- REVISAR: [motivo] -->` y el operador decide. No tomar decisiones de copy de forma autónoma.**

---

## 2. ORDEN DE EJECUCIÓN

| Paso | Tarea | Depende de | Prioridad |
|---:|---|---|---|
| 1 | Estructura vacía de web app M1–M6 (4 versiones: /start /core /bundle /test) | Nada | 🔴 Primero |
| 2 | Quiz M0 funcional (HTML + JS o Tally) con scoring, bandas, texto copiable y CTA por banda | Paso 1 | 🔴 Primero |
| 3 | Landing page con copy de este documento (§4) y quiz embebido | Paso 2 | 🔴 Primero |
| 4 | Integrar contenido M0–M6 en web app (textos, preguntas, prompts, ejercicios) | Paso 1 | 🟡 Segundo |
| 5 | Mindmaps SVG — uno por módulo M1–M6 | Paso 4 | 🟡 Segundo |
| 6 | Pantallas onboarding y cierre (textos en spec §2.3 y §2.8) | Paso 4 | 🟡 Segundo |
| 7 | Plantillas email confirmación LS — 3 versiones (copy en §5B de este documento) | Independiente | 🟡 Segundo |
| 8 | Slots de audio/video con URL placeholder por módulo y componente | Paso 4 | 🟢 Tercero |
| 9 | Variantes PT / EN / FR de landing y web app | Todo lo anterior | 🟢 Tercero |
| 10 | Instrucciones de deploy Cloudflare Pages + integración NbLM + find-and-replace LS | Todo lo anterior | 🟢 Tercero |

**Criterio de /test:** el entorno `/programa/test` debe estar operativo con M1–M6 completos antes de que el operador pueda ejecutar S3-A (prueba de círculo). Es el hito más importante de la entrega.

---

## 3. ASSETS DISPONIBLES

### Lo que está listo para usar

| Asset | Ubicación | Notas |
|---|---|---|
| Contenido M0–M6 completo (ES) | Archivos MD del proyecto | Integrar literal — no editar |
| Texto onboarding post-login | Spec §2.3 | Copiar literal — aprobado |
| Texto pantalla de cierre M6 | Spec §2.8 | Copiar literal — aprobado |
| Copy landing ES completo | §4 de este documento | Texto final listo para pegar |
| Copy email score (quiz resultado) | §5A de este documento | Dinámico — ver tablas |
| Copy email confirmación post-compra | §5B de este documento | 3 versiones por SKU |
| FAQ landing | §6 de este documento | 7 preguntas, texto final |
| Logo ExecForward | `Gemini_logo_y_avatar.png` en archivos del proyecto | Usar en header y emails |
| Taglines por módulo | Spec §2.5 | Tabla completa |
| Descripciones y componentes por módulo | Spec §2.5 | Tabla completa |

### Lo que llega después (dejar slots con placeholder)

| Asset | Placeholder a usar | Cuándo llega |
|---|---|---|
| URLs checkout Lemon Squeezy | `[LS_URL_START]` / `[LS_URL_CORE]` / `[LS_URL_BUNDLE]` | Post-aprobación LS (≤48h post S3-A) |
| Audio NotebookLM por módulo | `[AUDIO_M1_URL]` … `[AUDIO_M6_URL]` | El operador produce en S3a |
| Video NotebookLM por módulo | `[VIDEO_M1_URL]` … `[VIDEO_M6_URL]` | El operador produce en S3a |
| Video intro prompts | `[VIDEO_INTRO_PROMPTS_URL]` | El operador produce en S3a |

---

## 4. COPY LANDING PAGE — ES MASTER (T2.3)

### 4.1 Hero

**Headline**
El sistema que usan los ejecutivos que consiguen el trabajo que buscan.

**Subheadline**
Propuesta de valor · Mercado objetivo · CV y LinkedIn · Networking estratégico · Pitch y negociación · Plan de ejecución. En un solo programa. A tu ritmo. Con IA como copiloto.

**CTA hero**
[Empezar con el diagnóstico gratuito ↓]
*(ancla scroll a sección quiz M0 — `id="quiz"` o equivalente)*

**Texto bajo CTA**
Diagnóstico gratuito · Sin registro · Resultado inmediato

---

### 4.2 Problema

*(Sección corta — 3 líneas + puente al quiz. Sin títulos de bloque, sin desarrollo.)*

Mandar 60 CVs no es una estrategia. El 70% de los cargos ejecutivos nunca se publican. Y el eslabón más débil define el resultado — no el promedio.

*El diagnóstico tarda 5 minutos y te dice exactamente dónde estás.*

---

### 4.3 Quiz M0 embebido

**Label encima del iframe**
Primero, un diagnóstico honesto. 5 minutos. 14 preguntas.

*(iframe: `<iframe src="execforward.com/quiz">` — altura suficiente para mostrar sin scroll interno)*

---

### 4.4 Solución — módulos como argumento

**Encabezado de sección**
Seis módulos. Un sistema completo. Tu ritmo.

*(6 tarjetas — una por módulo. Formato: número + título + tagline en cursiva + "Qué construyes" + lista de componentes incluidos)*

---

**M1 — Propuesta de Valor Ejecutiva**

*La frase que te consigue trabajo. Todo lo demás es consecuencia.*

**Qué construyes:** La frase que abre conversaciones y que la gente recuerda.

Incluye:
- Pre-etapa de diagnóstico
- Marco de diferenciadores
- Fórmula de propuesta de valor
- Mapa de evidencias
- Test de mercado
- Prompts copiables para IA
- Audio complementario
- Video complementario
- Mindmap del módulo

---

**M2 — Mercado Objetivo y el Mercado Oculto**

*El 70% de los cargos ejecutivos nunca se publican. Este módulo te lleva ahí.*

**Qué construyes:** El mapa exacto de dónde eres el candidato más fuerte.

Incluye:
- Pre-etapa de diagnóstico
- Definición de mercado objetivo real
- Metodología de acceso al mercado oculto
- Filtro de oportunidades
- Prompts copiables para IA
- Audio complementario
- Video complementario
- Mindmap del módulo

---

**M3 — CV Ejecutivo y LinkedIn**

*Tus materiales trabajan por ti mientras duermes — o no trabajan. Este módulo decide cuál.*

**Qué construyes:** CV y LinkedIn que trabajan por ti mientras no estás mirando.

Incluye:
- Pre-etapa de diagnóstico
- CV ejecutivo construido con IA
- LinkedIn optimizado para que te encuentren
- Sistema de adaptación rápida por oportunidad
- Prompts copiables para IA
- Audio complementario
- Video complementario
- Mindmap del módulo

---

**M4 — Red de Contactos y Networking Ejecutivo**

*La red no es pedir favores. Es saber a quién, con qué mensaje, en qué orden.*

**Qué construyes:** Una red activada con precisión — sin pedir favores.

Incluye:
- Pre-etapa de diagnóstico
- Mapa de contactos de alto impacto
- El mensaje que abre puertas
- Sistema de seguimiento de red
- Prompts copiables para IA
- Audio complementario
- Video complementario
- Mindmap del módulo

---

**M5 — Pitch, Entrevista y Negociación**

*Puedes llegar a la conversación final y perderla. Este módulo cierra.*

**Qué construyes:** Pitch, entrevista y negociación preparados para cerrar.

Incluye:
- Pre-etapa de diagnóstico
- El pitch que genera conversación
- La entrevista ejecutiva
- Negociación de compensación
- Prompts copiables para IA
- Audio complementario
- Video complementario
- Mindmap del módulo

---

**M6 — Gestión del Proceso y Plan de Ejecución**

*La búsqueda es un proceso que puede durar meses. Este módulo lo hace sostenible.*

**Qué construyes:** Un plan de 90 días que no depende de que estés inspirado.

Incluye:
- Pre-etapa de diagnóstico
- Sistema de seguimiento de procesos
- Gestión del estado anímico
- Plan de 90 días
- Prompts copiables para IA
- Audio complementario
- Video complementario
- Mindmap del módulo

---

### 4.5 Social proof

*(Sección placeholder — el operador entrega el contenido post S3-A. Cowork deja la sección estructurada con el layout correcto y el texto de placeholder visible solo en el código: `<!-- PENDIENTE: testimonios del círculo de prueba -->`. En producción la sección no se muestra hasta que el operador la active con contenido real.)*

---

### 4.6 Escalera de SKUs + garantía

**Encabezado de sección**
Elige tu punto de entrada.

---

**SKU 1 — Tripwire**

M1 · Propuesta de Valor Ejecutiva
**$29**

La base de todo. Si no tienes claro por qué te contratan a ti, nada más funciona.

[Empezar con M1 — $29] → `[LS_URL_START]`

---

**SKU 2 — Core**

M1 + M2 + M3 · Posicionamiento completo
**$59**

Propuesta de valor, mercado objetivo, CV y LinkedIn. Los tres módulos que definen cómo te ven antes de que abras la boca.

[Plan de posicionamiento — $59] → `[LS_URL_CORE]`

---

**SKU 3 — Bundle** *(badge: "Más completo" · borde destacado)*

M1 a M6 · Sistema completo
**$89**

End-to-end. Desde la propuesta de valor hasta el plan de ejecución de 90 días. Todos los módulos, todos los prompts, todo el sistema.

[Sistema completo — $89] → `[LS_URL_BUNDLE]`

---

**Texto bajo los tres precios**
Acceso inmediato · Sin suscripción · Progresa a tu ritmo

**Bloque de garantía** *(inmediatamente bajo los botones)*
Si completás al menos un módulo y sentís que no valió lo que pagaste, te devolvemos el dinero. Sin preguntas. 30 días desde la compra.

---

### 4.7 FAQ

*(Ver §6 de este documento — integrar como sección expandible / acordeón.)*

---

### 4.8 Footer

| Elemento | Texto |
|---|---|
| Logo | ExecForward |
| Link 1 | Política de privacidad *(placeholder — operador genera)* |
| Link 2 | Términos de uso *(placeholder — operador genera)* |
| Merchant of Record | Las transacciones son procesadas por Lemon Squeezy, Merchant of Record. |
| Copyright | © 2026 ExecForward. Todos los derechos reservados. |

---

## 5. DISEÑO EMAIL SCORE Y CONFIRMACIÓN (T2.4)

### 5A — Pantalla de resultado del quiz

#### Elementos fijos (siempre presentes)

| Elemento | Copy |
|---|---|
| Score numérico | **Tu score: X / 56** *(grande, centrado)* |
| Badge de banda | `BASE` / `OPERATIVO` / `COMPETITIVO` / `DIFERENCIADO` |
| Eje débil *(solo si score de eje = 2 o 3)* | **Tu eje más bajo:** [nombre del eje] — [X]/8 |
| Botón | **Copiar mi resultado para guardarlo** |

---

#### Diagnóstico por banda *(texto a mostrar en pantalla)*

**BANDA BASE — Score 14–26**

Lo que está pasando:

Tu búsqueda no tiene aún una base estructurada. Es probable que estés aplicando a oportunidades de forma reactiva, con un mensaje que varía según el contexto y materiales que no están trabajando por ti. No es falta de valor — es falta de sistema.

Por dónde empezar:

| Prioridad | Acción |
|---|---|
| 1 | Construir tu propuesta de valor — todo lo demás se apoya en esto |
| 2 | Definir tu mercado objetivo con criterios reales, no aspiracionales |
| 3 | Recién después: CV, LinkedIn, red y narrativa |

Señal de avance: Sabrás que estás progresando cuando puedas explicar en dos frases qué buscas, para qué tipo de organización, y por qué tú — y la respuesta sea la misma en cualquier contexto.

---

**BANDA OPERATIVO — Score 27–38**

Lo que está pasando:

Tienes materia prima valiosa pero sin estructura consistente. Algunos ejes funcionan, otros tienen fisuras que no siempre son visibles — hasta que un proceso avanzado se cae sin explicación clara. En búsqueda ejecutiva, la inconsistencia entre ejes es más costosa que la debilidad pareja.

Por dónde empezar:

| Prioridad | Acción |
|---|---|
| 1 | Revisar los ejes donde marcaste más bajo — ahí está el freno real |
| 2 | Verificar que tu mensaje y tu mercado objetivo estén alineados — si no coinciden, todo lo demás falla |
| 3 | Consolidar antes de escalar actividad |

Señal de avance: Sabrás que estás progresando cuando los procesos que inicias empiecen a tener continuidad — menos silencios sin explicación, más conversaciones que derivan en pasos concretos.

---

**BANDA COMPETITIVO — Score 39–49**

Lo que está pasando:

Estás por encima del candidato promedio. Tu búsqueda tiene estructura y dirección. El problema a este nivel no es lo que falta — es lo que frena. Uno o dos ejes están limitando tu velocidad de avance. Identificarlos y trabajarlos es la diferencia entre una búsqueda de 3 meses y una de 8.

Por dónde empezar:

| Prioridad | Acción |
|---|---|
| 1 | Analizar en qué etapa se cortan los procesos: ¿en el primer contacto, en la entrevista, en la oferta? |
| 2 | Ese punto de corte te dice qué eje trabajar — si no llegás a conversación es el CV/LinkedIn; si llegás pero no cerrás es el pitch y la negociación |
| 3 | Mantener el ritmo en los ejes que ya funcionan mientras ajustás el que frena |

Señal de avance: Sabrás que estás progresando cuando la tasa de conversión entre etapas mejore — más conversaciones que derivan en entrevistas, más entrevistas que derivan en ofertas.

---

**BANDA DIFERENCIADO — Score 50–56**

Lo que está pasando:

Tu posicionamiento es sólido. Tenés claridad de propuesta de valor, mercado definido, materiales que funcionan y una red que se puede activar. El trabajo ahora no es construir — es afinar y acelerar. Foco en distribución: que las personas correctas te encuentren o te recuerden en el momento correcto.

Por dónde empezar:

| Prioridad | Acción |
|---|---|
| 1 | Activar sistemáticamente los contactos que pueden referirte con precisión |
| 2 | Asegurarte de que tu mensaje circule por canales que no dependen de tu actividad diaria |
| 3 | Mantener el estado anímico — a este nivel el riesgo es la sobreconfianza o la impaciencia |

Señal de avance: Sabrás que estás progresando cuando empieces a recibir contactos que no iniciaste vos — oportunidades que llegan porque alguien te recordó en el momento correcto.

---

#### CTA personalizado por banda

| Banda | Texto introductorio | Botón principal | Botón secundario |
|---|---|---|---|
| Base (14–26) | Necesitas construir el sistema desde el inicio. El plan completo te da los 6 módulos en orden. | **Sistema completo — $89** → `[LS_URL_BUNDLE]` | — |
| Operativo (27–38) | Tienes materia prima. El plan completo te ayuda a identificar el eslabón que frena todo y a trabajarlo en orden. | **Sistema completo — $89** → `[LS_URL_BUNDLE]` | — |
| Competitivo (39–49) | Estás cerca. El módulo de propuesta de valor es donde empieza el trabajo fino. | **Empezar con M1 — $29** → `[LS_URL_START]` | **O el sistema completo — $89** → `[LS_URL_BUNDLE]` |
| Diferenciado (50–56) | Tu posicionamiento es sólido. El módulo de propuesta de valor te ayuda a afinar el mensaje hasta que no haya fricción. | **Empezar con M1 — $29** → `[LS_URL_START]` | — |

---

#### Texto copiable — generado dinámicamente

*(Se copia al portapapeles con `navigator.clipboard.writeText()`. Construir concatenando los fragmentos de las tablas abajo.)*

```
MI DIAGNÓSTICO EXECFORWARD
──────────────────────────
Fecha: [fecha automática]
Score total: [X] / 56
Banda: [NOMBRE DE BANDA]

[DIAGNÓSTICO DE BANDA — 1 línea, ver tabla abajo]

MIS RESULTADOS POR EJE:
E1 — ¿Sabes por qué te contratan a ti?:     [X]/8
E2 — Tu mercado objetivo:                    [X]/8
E3 — Tu CV ejecutivo:                        [X]/8
E4 — LinkedIn para ejecutivos:               [X]/8
E5 — Del pitch a la negociación:             [X]/8
E6 — Red de contactos:                       [X]/8
E7 — Lo que nadie te dice:                   [X]/8

[Si hay eje débil (score 2–3):]
⚠ Eje más bajo: [NOMBRE EJE] — [X]/8 · [LECTURA DEL EJE, ver tabla abajo]

PRÓXIMO PASO:
[RECOMENDACIÓN CORTA DE LA BANDA, ver tabla abajo]

──────────────────────────
execforward.com
```

**Fragmentos dinámicos para el texto copiable:**

| Campo | Base | Operativo | Competitivo | Diferenciado |
|---|---|---|---|---|
| Diagnóstico 1 línea | Tu búsqueda está en punto de partida. Los fundamentos se construyen rápido cuando se trabajan en orden. | Tienes materia prima valiosa pero sin estructura consistente. El eslabón más débil define el resultado — no el promedio. | Estás por encima del candidato promedio. Uno o dos ejes están limitando tu velocidad de avance. | Tu posicionamiento es sólido. El trabajo ahora es afinar y acelerar. |
| Recomendación corta | Empieza por construir tu propuesta de valor. Sin eso, todo lo demás opera sin ancla. → execforward.com | Identificá el eje débil y trabajalo primero. Consolidar antes de escalar. → execforward.com | Analizá en qué etapa se cortan los procesos. Ese punto te dice qué trabajar. → execforward.com | Activá sistemáticamente los contactos que pueden referirte con precisión. → execforward.com |

**Lecturas de eje débil:**

| Eje | Lectura si score 2–3 |
|---|---|
| E1 — ¿Sabes por qué te contratan a ti? | Prioridad absoluta — sin propuesta de valor clara, todo lo demás es ruido |
| E2 — Tu mercado objetivo | Sin mercado definido con criterios reales, el esfuerzo se dispersa |
| E3 — Tu CV ejecutivo | Tus materiales no están trabajando por ti — estás perdiendo oportunidades antes de que alguien te vea |
| E4 — LinkedIn para ejecutivos | Invisible para los reclutadores — dependiendo de canales de menor efectividad |
| E5 — Del pitch a la negociación | Podés llegar a la conversación final y perderla — el cierre es tan importante como la apertura |
| E6 — Red de contactos | Estás dependiendo de canales que tienen menos del 15% de efectividad en búsqueda ejecutiva |
| E7 — Lo que nadie te dice | El estado anímico afecta directamente tu desempeño en entrevistas y conversaciones |

---

### 5B — Emails de confirmación post-compra (para Lemon Squeezy)

**Instrucción:** Entregar 3 archivos HTML limpios: `email-start.html`, `email-core.html`, `email-bundle.html`. El operador los carga en LS. `[UUID]` y `[PASSWORD]` son variables nativas de LS — no reemplazar manualmente.

**Asunto (igual para los 3):**
Tu acceso a ExecForward está listo

---

**email-start.html — SKU Tripwire $29**

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

**email-core.html — SKU Core $59**

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

Lo que construyes en M1–M3:
· La frase que te consigue trabajo — y que la gente recuerda (M1)
· El mapa exacto de dónde eres el candidato más fuerte (M2)
· CV y LinkedIn que trabajan por ti mientras no estás mirando (M3)

Posicionamiento completo. Los tres módulos que definen cómo te ven
antes de que abras la boca.

¿Preguntas? Responde este email.

ExecForward
execforward.com
```

---

**email-bundle.html — SKU Bundle $89**

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

Lo que construyes en M1–M6:
· La frase que te consigue trabajo — y que la gente recuerda (M1)
· El mapa exacto de dónde eres el candidato más fuerte (M2)
· CV y LinkedIn que trabajan por ti mientras no estás mirando (M3)
· Una red activada con precisión — sin pedir favores (M4)
· Pitch, entrevista y negociación preparados para cerrar (M5)
· Un plan de 90 días que no depende de que estés inspirado (M6)

El sistema completo, end-to-end. A tu ritmo.

¿Preguntas? Responde este email.

ExecForward
execforward.com
```

---

## 6. FAQ LANDING PAGE

*(Implementar como acordeón expandible. Orden exacto como figura aquí.)*

---

**¿Para quién es ExecForward exactamente?**

Para ejecutivos y directivos con carrera establecida — gerencias, VP, C-level — que están en búsqueda activa o explorando un cambio, y que nunca han tenido que buscar trabajo de forma sistemática porque mientras trabajaban, no lo necesitaban. No es para quienes están empezando su carrera ni para quienes buscan empleo de nivel operativo.

---

**¿Cuánto tiempo requiere?**

Cada módulo está diseñado para trabajarse en sesiones de 45–60 minutos. No hay agenda fija — avanzás cuando podés, volvés cuando querés. El programa completo está pensado para completarse en 2–3 semanas a ritmo normal, o más rápido si la situación lo requiere. Tu progreso se guarda automáticamente.

---

**¿Funciona si todavía estoy empleado y solo estoy explorando?**

Es el momento ideal para usarlo. El posicionamiento ejecutivo se construye mejor sin urgencia — cuando tenés tiempo para trabajar la propuesta de valor, el mercado objetivo y los materiales sin presión. Los ejecutivos que llegan a la búsqueda activa ya preparados tienen búsquedas significativamente más cortas.

---

**¿En qué se diferencia de un coach ejecutivo o de un curso genérico de empleo?**

Un coach ejecutivo te da acompañamiento personalizado a $200–500 por hora y requiere tu tiempo y el suyo en horario coordinado. Un curso genérico de empleo está construido para cualquiera. ExecForward es un sistema de metodología ejecutiva — sin la cara de un consultor, sin horarios, sin precio de coaching — que podés trabajar a tu ritmo con IA como copiloto en cada paso. No reemplaza a un coach si necesitás acompañamiento intensivo; es la alternativa para quien no lo necesita o no lo quiere.

---

**¿Esto garantiza que voy a conseguir trabajo?**

No. Ningún programa serio garantiza eso — depende de variables que están fuera del sistema: el mercado, el timing, las oportunidades disponibles. Lo que sí construís es un sistema que maximiza tus probabilidades en cada punto del proceso: que te encuentren, que te convoquen, que avancés en los procesos, que cerrés bien. El resultado depende de vos. El sistema es lo que ExecForward pone sobre la mesa.

---

**¿Qué pasa si lo compro y siento que no valió lo que pagué?**

Si completás al menos un módulo y sentís que no valió lo que pagaste, te devolvemos el dinero. Sin preguntas. Tenés 30 días desde la compra para pedirlo — respondé el email de confirmación o escribinos a [email de contacto].

---

**¿Cómo accedo después de comprar?**

Inmediatamente después de la compra recibís un email con tu URL de acceso, tu ID y tu contraseña. Entrás, registrás tu score del diagnóstico M0 si ya lo hiciste, y el programa te recomienda por dónde empezar. Sin apps, sin instalaciones, funciona en cualquier dispositivo con navegador.

---

## 7. CHECKLIST DE ENTREGA

Lo que Cowork entrega al operador antes de S3-A:

| Entregable | Descripción | Estado |
|---|---|---|
| Web app M1–M6 — 4 versiones | /start · /core · /bundle · /test | ⬜ |
| Quiz M0 funcional | Standalone + embebible · scoring · bandas · copiable · CTA por banda | ⬜ |
| Landing page completa ES | Hero + problema + quiz + módulos + social proof placeholder + SKUs + garantía + FAQ + footer | ⬜ |
| Plantillas email confirmación LS | 3 archivos HTML — start / core / bundle | ⬜ |
| Tabla de credenciales | UUID + password para 4 entornos (3 producción + 1 prueba) | ⬜ |
| Mindmaps SVG | Uno por módulo M1–M6 | ⬜ |
| Instrucciones de deploy | Cloudflare Pages + conexión de dominio | ⬜ |
| Instrucciones integración NbLM | Dónde pegar las URLs de audio/video cuando el operador las entregue | ⬜ |
| Instrucciones find-and-replace LS | Cómo reemplazar los 3 placeholders `[LS_URL_*]` post-aprobación | ⬜ |

**Criterio S3-A:** `/programa/test` operativo con M1–M6 completos, sin candados, con banner "versión de prueba". Todo lo demás puede estar en progreso.

---

*ExecForward · Handoff Cowork v1.0 · 25 may 2026*
