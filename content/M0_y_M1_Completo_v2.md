# ExecForward — Documentación completa M0 y M1
**versión 2 · scoring corregido v6 · 25 may 2026**

---

## DECISIONES ESTRUCTURALES

| Decisión | Resolución |
|---|---|
| Formato de respuesta M0 | Selección múltiple con 4 alternativas (A/B/C/D) — el cliente no escribe, selecciona |
| Metodología de score M0 | Híbrida — preguntas de comportamiento indirecto → score emerge → descriptor aparece como espejo |
| Preguntas por eje | 2 preguntas por eje |
| Principio de diseño de preguntas | Indirectas — miden comportamiento sin revelar qué se está evaluando |
| Scoring | A=1 · B=2 · C=3 · D=4 · score global 14–56 · score por eje 2–8 |
| Bandas de diagnóstico | Base (14–26) · Operativo (27–38) · Competitivo (39–49) · Diferenciado (50–56) |
| Formato de entregables M1 | Prompts copiables con corchetes que el cliente reemplaza manualmente — automatización queda para Fase 2 |
| Output de prompts M1 | Markdown estructurado — cada componente tiene su propia estructura de entregable adaptada |
| Excepción | Test de mercado (Componente 4) no genera entregable Markdown — respuesta directa y conversacional |
| Contenido de profundidad | Cada componente de M1 tiene audio NotebookLM + video NotebookLM con IP del operador |
| Automatización de prompts | Marcado como mejora Fase 2 |
| M0 | Cuestionario puro — sin prompts ni entregables |

---

## M0 — DIAGNÓSTICO DE POSICIONAMIENTO

### Estructura

7 ejes · 2 preguntas por eje · A=1 B=2 C=3 D=4 · score global 14–56 · score por eje 2–8

### 7 ejes finales validados

| # | Título |
|---|---|
| E1 | ¿Sabes por qué te contratan a ti? |
| E2 | Tu mercado objetivo: ¿estás apuntando bien? |
| E3 | Tu CV ejecutivo: ATS, keywords y la IA como copiloto |
| E4 | LinkedIn para ejecutivos: lo que los reclutadores realmente buscan |
| E5 | Del pitch a la negociación: ¿estás listo para cerrar? |
| E6 | Red de contactos: lo que realmente sirve |
| E7 | Lo que nadie te dice: buscar sin quemarte |

### Decisiones clave

- E1 = construir la PV · E5 = ejecutarla bajo presión incluyendo entrevistas y negociación
- E5 cubre tres niveles: conversación informal + entrevista estructurada + negociación de oferta
- Entrevistas y negociación se diagnostican en E5 — módulos M3 y M4 como upsells futuros
- E7 menciona negociación como señal de que existe módulo posterior
- Dato de redes confirmado: 85%

### Mapeo eje → módulo

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

### Preguntas finales por eje

#### E1 — ¿Sabes por qué te contratan a ti?

**P1:** Última vez que alguien te preguntó a qué te dedicas o qué estás buscando, ¿qué pasó?
- A) Hablé varios minutos explicando mi trayectoria
- B) Di una respuesta general — algo como "estoy viendo opciones en mi industria"
- C) Expliqué bien mi perfil pero la conversación no derivó en nada concreto
- D) La persona me pidió más información, me ofreció un contacto, o tomó alguna acción

**P2:** Cuando alguien de tu red te ha querido recomendar o referir, ¿qué ha pasado?
- A) No me han referido — no sé si saben bien qué busco
- B) Me han referido pero a oportunidades que no eran lo que buscaba
- C) Me han referido a cosas relevantes, aunque no siempre saben exactamente qué me diferencia
- D) Me han referido con precisión — saben exactamente a quién conectarme y por qué

---

#### E2 — Tu mercado objetivo: ¿estás apuntando bien?

**P1:** En los últimos meses, ¿cómo ha sido tu relación con las oportunidades laborales que han aparecido?
- A) He aplicado a todo lo que parecía interesante — no quiero perder ninguna oportunidad
- B) He aplicado bastante, aunque reconozco que algunas no eran realmente lo mío
- C) He sido selectivo, pero a veces me cuesta justificar por qué descarto algunas
- D) Me ha pasado de ver una oferta atractiva, pensarla, y decidir no seguir — tenía claro que no era lo que buscaba aunque costara descartarla

**P2:** Si alguien te pidiera ahora mismo que le describieras el trabajo ideal para ti, ¿qué pasaría?
- A) Le daría varias opciones distintas — no quiero cerrar puertas
- B) Le describiría un perfil general, algo como "una gerencia en una empresa establecida"
- C) Le daría una descripción bastante clara del rol, aunque me costaría precisar el tipo exacto de empresa o industria
- D) Podría describir exactamente el rol, la industria y el tipo de empresa — aunque a veces me preocupa que ser tan específico me cierre demasiadas puertas

---

#### E3 — Tu CV ejecutivo: ATS, keywords y la IA como copiloto

**P1:** Cuando postulas a una oportunidad, ¿qué haces con tu CV?
- A) Mando el mismo CV a todas las oportunidades — es bueno y refleja bien mi trayectoria
- B) A veces hago algún ajuste menor, pero básicamente es el mismo documento
- C) Lo adapto según el cargo, aunque el proceso me toma bastante tiempo y no siempre sé si lo estoy haciendo bien
- D) Tengo una versión base y la ajusto para cada oportunidad — keywords, foco, orden — aunque no siempre estoy seguro de si está pasando los filtros automáticos

**P2:** Cuando describes tu experiencia en el CV, ¿cómo lo haces normalmente?
- A) Escribo un resumen de mis responsabilidades en cada cargo — explico bien lo que hacía
- B) Intento destacar algunos logros, aunque no siempre sé cómo cuantificarlos
- C) Uso logros con números cuando puedo, aunque no reviso si las palabras que uso coinciden con lo que piden las ofertas a las que postulo
- D) Escribo logros cuantificados y ajusto el lenguaje según las palabras que aparecen en cada oferta — aunque me toma tiempo hacerlo bien

---

#### E4 — LinkedIn para ejecutivos: lo que los reclutadores realmente buscan

**P1:** ¿Cómo describirías tu perfil de LinkedIn hoy?
- A) Es básicamente mi CV en formato digital — tiene toda mi trayectoria
- B) Está completo y actualizado, aunque no he pensado mucho en cómo lo lee un reclutador
- C) Lo he optimizado en algunos aspectos, pero no tengo claridad de si aparezco cuando alguien busca perfiles como el mío
- D) Lo he trabajado pensando en cómo buscan los reclutadores, aunque no sé con certeza si está funcionando

**P2:** En los últimos seis meses, ¿qué ha pasado con tu LinkedIn en términos de oportunidades?
- A) Nada relevante — no me ha llegado nada por ahí
- B) Algún contacto ocasional, pero nada que haya derivado en algo concreto
- C) He tenido contactos de reclutadores, aunque no siempre para lo que busco
- D) Me han contactado reclutadores para roles relevantes — aunque no dependo de eso como canal principal

---

#### E5 — Del pitch a la negociación: ¿estás listo para cerrar?

**P1:** Piensa en la última vez que tuviste una conversación importante sobre tu carrera — una entrevista, un café con un contacto, o una reunión con un potencial empleador. ¿Cómo saliste?
- A) Sentí que no logré transmitir bien lo que valgo — la conversación no fluyó como esperaba
- B) Creo que me fue bien, aunque salí con la sensación de que pude haber dicho cosas mejor
- C) La conversación fue buena, pero no sé si logré dejar una impresión diferenciada o si soy uno más entre los que entrevistaron
- D) Salí con la conversación encaminada hacia algo concreto — un siguiente paso, un contacto, o una oferta

**P2:** Cuando en un proceso llega el momento de hablar de compensación, ¿qué pasa?
- A) Me incomoda — no sé bien cómo manejarlo sin quedar mal
- B) Tengo una cifra en mente pero me cuesta defenderla si me preguntan por qué
- C) Sé lo que quiero pedir y puedo justificarlo, aunque la negociación me genera tensión
- D) Lo veo como parte del proceso — tengo clara mi cifra, sé cómo argumentarla y no me desestabiliza si hay contrapropuesta

---

#### E6 — Red de contactos: lo que realmente sirve

**P1:** Cuando decides contactar a alguien de tu red para hablar de tu búsqueda, ¿qué pasa normalmente?
- A) Me cuesta dar el primer paso — no quiero incomodar ni parecer que estoy pidiendo un favor
- B) Lo hago, pero no siempre sé bien qué pedirle ni cómo enfocar la conversación
- C) Tengo claro cómo aproximarme, aunque los resultados son irregulares — algunos contactos responden y otros desaparecen
- D) Tengo un mensaje claro y sé a quién contactar primero — aunque no todos responden, las conversaciones que se dan suelen ser productivas

**P2:** Si miras tu red de contactos hoy, ¿cómo la describirías en relación a lo que estás buscando?
- A) Tengo muchos contactos pero no sé bien cuáles son realmente útiles para lo que busco
- B) Identifico algunos contactos clave, aunque no he hecho nada concreto con ellos todavía
- C) Tengo claro quiénes pueden ayudarme, aunque me cuesta priorizar a quién activar primero
- D) Tengo identificados los contactos que más pueden mover mi búsqueda y tengo un orden para activarlos — aunque sé que algunos no van a responder

---

#### E7 — Lo que nadie te dice: buscar sin quemarte

**P1:** ¿Cómo describirías tu estado anímico en relación a tu búsqueda laboral en este momento?
- A) Es difícil — hay días en que me cuesta mantener el ritmo y la motivación
- B) Voy tirando, aunque noto que la incertidumbre me afecta más de lo que quisiera admitir
- C) Estoy bien en general, aunque hay momentos puntuales en que la presión o el silencio de algunos contactos me pesa
- D) Tengo altos y bajos como cualquiera, pero tengo formas de reponerme — no dejo que un mal día defina la semana

**P2:** ¿Cómo está manejando tu entorno cercano — pareja, familia — el hecho de que estés en búsqueda?
- A) Es una fuente de presión adicional — siento que esperan resultados y eso me pesa
- B) Me apoyan, aunque no siempre entienden bien cómo funciona este proceso y eso genera tensión
- C) Están de mi lado y lo entienden bastante bien, aunque hay momentos en que la incertidumbre los afecta también
- D) Tenemos una conversación abierta sobre el proceso — saben qué esperar y eso me quita presión en vez de agregarla

---

### Score global M0

| Score | Banda | Diagnóstico |
|---|---|---|
| 14–26 | Base | Tu búsqueda está en punto de partida. No es un juicio — es el estado más común entre ejecutivos que nunca han tenido que buscar trabajo de forma activa. La buena noticia: los fundamentos se construyen rápido cuando se trabajan en orden. |
| 27–38 | Operativo | Tienes materia prima valiosa pero sin estructura consistente. Algunos ejes funcionan, otros no. El problema es que en una búsqueda ejecutiva, el eslabón más débil define el resultado — no el promedio. |
| 39–49 | Competitivo | Estás por encima del candidato promedio. Tu búsqueda tiene dirección, pero hay uno o dos ejes que están frenando tu velocidad de avance. Identificarlos y trabajarlos es la diferencia entre una búsqueda de 3 meses y una de 8. |
| 50–56 | Diferenciado | Tu posicionamiento es sólido. El trabajo ahora no es construir — es afinar y acelerar. Foco en distribución: que las personas correctas te encuentren o te recuerden en el momento correcto. |

---

### Lectura por eje

| Score en un eje | Qué significa |
|---|---|
| 2–3 en E1 o E2 | Prioridad absoluta — sin propuesta de valor clara ni mercado definido, todo lo demás es ruido |
| 2–3 en E3 o E4 | Tus materiales no están trabajando por ti — estás perdiendo oportunidades antes de que alguien te vea |
| 2–3 en E5 | Puedes llegar a la conversación final y perderla — el cierre es tan importante como la apertura |
| 2–3 en E6 | Estás dependiendo de canales que tienen menos del 15% de efectividad en búsqueda ejecutiva |
| 2–3 en E7 | El estado anímico no es un tema blando — afecta directamente tu desempeño en entrevistas y conversaciones |

> Score por eje: suma de 2 preguntas (A=1, B=2, C=3, D=4) → rango 2–8. Eje débil = score 2–3.

---

### Output de recomendación por banda

#### BANDA BASE — Score 14–26

**Lo que está pasando:**
Tu búsqueda no tiene aún una base estructurada. Es probable que estés aplicando a oportunidades de forma reactiva, con un mensaje que varía según el contexto y materiales que no están trabajando por ti. No es falta de valor — es falta de sistema.

| Prioridad | Acción |
|---|---|
| 1 | Construir tu propuesta de valor (E1) — todo lo demás se apoya en esto |
| 2 | Definir tu mercado objetivo con criterios reales, no aspiracionales (E2) |
| 3 | Recién después: CV, LinkedIn, red y narrativa |

**Señal de avance:** Sabrás que estás progresando cuando puedas explicar en dos frases qué buscas, para qué tipo de organización, y por qué tú — y la respuesta sea la misma en cualquier contexto.

---

#### BANDA OPERATIVO — Score 27–38

**Lo que está pasando:**
Tienes dirección pero no consistencia. Algunos ejes funcionan bien, otros tienen fisuras que no siempre son visibles — hasta que un proceso avanzado se cae sin explicación clara. En búsqueda ejecutiva, la inconsistencia entre ejes es más costosa que la debilidad pareja.

| Prioridad | Acción |
|---|---|
| 1 | Revisar los ejes donde marcaste 2 o 3 — ahí está el freno real |
| 2 | Verificar que E1 y E2 estén alineados — si el mensaje y el mercado no coinciden, todo lo demás falla |
| 3 | Consolidar antes de escalar actividad |

**Señal de avance:** Sabrás que estás progresando cuando los procesos que inicias empiecen a tener continuidad — menos silencios sin explicación, más conversaciones que derivan en pasos concretos.

---

#### BANDA COMPETITIVO — Score 39–49

**Lo que está pasando:**
Estás por encima del candidato promedio. Tu búsqueda tiene estructura y dirección. El problema a este nivel no es lo que falta — es lo que frena.

| Prioridad | Acción |
|---|---|
| 1 | Analizar en qué etapa se cortan los procesos — ¿en el primer contacto, en la entrevista, en la oferta? |
| 2 | Ese punto de corte te dice qué eje trabajar — E3/E4 si no llegas a conversación, E5 si llegas pero no cierras, E6 si no estás generando suficientes entradas |
| 3 | Mantener el ritmo en los ejes que ya funcionan mientras ajustas el que frena |

**Señal de avance:** Sabrás que estás progresando cuando la tasa de conversión entre etapas mejore — más conversaciones que derivan en entrevistas, más entrevistas que derivan en ofertas.

---

#### BANDA DIFERENCIADO — Score 50–56

**Lo que está pasando:**
Tu posicionamiento es sólido. Tienes claridad de propuesta de valor, mercado definido, materiales que funcionan y una red que se puede activar.

| Prioridad | Acción |
|---|---|
| 1 | Activar sistemáticamente los contactos que pueden referirte con precisión |
| 2 | Asegurarte de que tu mensaje esté circulando por canales que no dependen de tu actividad diaria |
| 3 | Mantener el estado anímico (E7) — a este nivel el riesgo es la sobreconfianza o la impaciencia |

**Señal de avance:** Sabrás que estás progresando cuando empieces a recibir contactos que no iniciaste tú — oportunidades que llegan porque alguien te recordó en el momento correcto.

---

## M1 — PROPUESTA DE VALOR EJECUTIVA

### Estructura

Pre-etapa + 4 componentes · explicación + ejemplos bien/mal hechos + ejercicio + prompt copiable con formato Markdown específico + entregable

---

### Pre-etapa: Define tu target

**Instrucción:** Antes de construir tu propuesta de valor, necesitas saber contra qué estándar te vas a medir.

**Pregunta 1:** ¿Cuál es el cargo al que estás apuntando?
`Tu respuesta:` _______________

**Pregunta 2:** ¿En qué tipo de empresa?
- [ ] Multinacional / empresa global con operaciones locales
- [ ] Empresa local grande — facturación alta, estructura consolidada
- [ ] Empresa mediana en crecimiento — entre 50 y 500 personas
- [ ] Startup o scaleup — alto crecimiento, estructura dinámica
- [ ] Otra: _______________

**Pregunta 3:** ¿En qué industria o sector? (máximo dos)
`Tu respuesta:` _______________

**Pregunta 4:** ¿En qué país o región estás buscando?
- [ ] País específico: _______________
- [ ] Regional — varios países
- [ ] Abierto / remoto global

**Prompt copiable — Pre-etapa:**

> *Necesito entender el estándar de mercado para el siguiente perfil ejecutivo:*
>
> *— Cargo: **[PREGUNTA 1]***
> *— Tipo de empresa: **[PREGUNTA 2]***
> *— Industria: **[PREGUNTA 3]***
> *— Mercado: **[PREGUNTA 4]***
>
> *Necesito que me respondas tres cosas con precisión y sin adornos:*
>
> *1. ¿Qué se espera como mínimo de alguien en este cargo en este tipo de empresa? Lo que no puede faltar para ser considerado candidato viable.*
>
> *2. ¿Qué distingue a los ejecutivos top en este cargo — los que consiguen los mejores roles — de los que tienen el mismo título pero quedan en el promedio?*
>
> *3. ¿Qué señales en el perfil o trayectoria generan desconfianza o dudas inmediatas en quien contrata para este cargo?*
>
> *Sé específico, directo y realista. No me des la versión oficial — dame la versión que usaría un headhunter experimentado.*

**Lee la respuesta completa antes de seguir.** Es el espejo contra el que vas a construir tus diferenciadores.

---

### Componente 1 — Marco de diferenciadores

**¿Qué es un diferenciador ejecutivo?**
Un diferenciador no es lo que haces — es lo que haces tú que otro ejecutivo con perfil similar no puede replicar fácilmente. La prueba: si otro ejecutivo con tu mismo título y años de experiencia pudiera decir exactamente lo mismo, no es un diferenciador — es una descripción.

**Ejemplo — mal hecho:**
> *"Tengo amplia experiencia liderando equipos comerciales en empresas de tecnología, con foco en resultados y orientación al cliente."*
❌ Cualquier gerente comercial de tecnología podría firmar esto.

**Ejemplo — bien hecho:**
> *"He liderado tres procesos de expansión comercial en mercados latinoamericanos desde cero — Brasil, Colombia y México — en empresas SaaS B2B de entre 50 y 200 personas, pasando de $0 a $2M ARR en menos de 18 meses en cada caso. Lo hago construyendo el equipo local antes de escalar, no después."*
✅ Específico, cuantificado, contextualizado y con forma de operar diferenciada.

**Tu turno — captura tu materia prima:**

| # | ¿En qué contexto lo hiciste? | ¿Qué resultado concreto lograste? | ¿Cómo lo hiciste — qué te hace distinto? |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

Instrucción: identifica entre 3 y 4 diferenciadores. Menos de 3 es insuficiente. Más de 4 empieza a diluirse.

**Prompt copiable — Diferenciadores:**

> *Soy un ejecutivo en transición laboral buscando el cargo de **[PREGUNTA 1 DE LA PRE-ETAPA]** en **[PREGUNTA 2 DE LA PRE-ETAPA]** en el sector de **[PREGUNTA 3 DE LA PRE-ETAPA]**.*
>
> *Estoy construyendo mi propuesta de valor y necesito que me ayudes a formular mis diferenciadores de forma clara, específica y memorable.*
>
> *Estos son mis diferenciadores en bruto:*
>
> *Diferenciador 1: En el contexto de **[CONTEXTO 1]**, logré **[RESULTADO 1]**, y lo que me hace distinto es **[FORMA DE OPERAR 1]**.*
>
> *Diferenciador 2: En el contexto de **[CONTEXTO 2]**, logré **[RESULTADO 2]**, y lo que me hace distinto es **[FORMA DE OPERAR 2]**.*
>
> *Diferenciador 3: En el contexto de **[CONTEXTO 3]**, logré **[RESULTADO 3]**, y lo que me hace distinto es **[FORMA DE OPERAR 3]**.*
>
> *Con esta información necesito que:*
> *1. Reformules cada diferenciador en una sola oración — específica, cuantificada y verificable*
> *2. Me digas cuál es el más poderoso y por qué*
> *3. Me indiques si alguno no es realmente un diferenciador — y por qué*
> *4. Me sugieras cómo ordenarlos para que el conjunto cuente una historia coherente*
>
> *Tono: directo, ejecutivo, sin adornos.*
>
> *Entrega el resultado en formato Markdown con esta estructura:*
> *— Título: "Mis diferenciadores ejecutivos"*
> *— Una sección por diferenciador con: versión reformulada / por qué funciona / señal de alerta si aplica*
> *— Tabla resumen: Diferenciador / Potencia (Alta-Media-Baja) / Orden recomendado*
> *— Sección final: "El diferenciador más poderoso y por qué"*

**Entregable 1:** Tus 3–4 diferenciadores reformulados, priorizados y validados.

---

### Componente 2 — Fórmula de PV

**¿Qué es una propuesta de valor ejecutiva?**
Es la síntesis de todo lo que construiste en el componente anterior — en un formato que puedes usar en cualquier situación: el resumen de tu CV, el about de LinkedIn, la respuesta a "¿por qué tú?", o la primera frase de una conversación importante.

**La fórmula:**
> *Yo ayudo a [TIPO DE ORGANIZACIÓN] a [PROBLEMA O DESAFÍO QUE RESUELVES] a través de [TU FORMA DE OPERAR], logrando [RESULTADO CONCRETO]. Lo que me diferencia de otros [TU CARGO] es [TU DIFERENCIADOR PRINCIPAL].*

**Ejemplo — mal hecho:**
> *"Soy un ejecutivo comercial con más de 15 años de experiencia en empresas de tecnología, orientado a resultados, con habilidades de liderazgo y gestión de equipos de alto rendimiento."*
❌ No dice nada que otro ejecutivo no pueda decir.

**Ejemplo — bien hecho:**
> *"Ayudo a empresas SaaS B2B en etapa de expansión latinoamericana a construir operaciones comerciales desde cero en mercados nuevos — sin depender de estructuras heredadas de otras regiones. Lo hago construyendo primero el equipo local y luego escalando el modelo, lo que me ha permitido llegar a $2M ARR en menos de 18 meses en tres mercados distintos. Lo que me diferencia de otros VP Comerciales es que no llego a gestionar una operación existente — llego a crear una donde no había nada."*
✅ Claro, específico, memorable.

**Tu turno — construye tu PV en bruto:**

| Variable | Tu respuesta |
|---|---|
| Tipo de organización a la que ayudas | |
| Problema o desafío que resuelves | |
| Tu forma de operar — cómo lo haces | |
| Resultado concreto que produces | |
| Tu diferenciador principal vs. perfil similar | |

**Prompt copiable — Fórmula de PV:**

> *Soy un ejecutivo en transición laboral buscando el cargo de **[PREGUNTA 1 DE LA PRE-ETAPA]** en **[PREGUNTA 2 DE LA PRE-ETAPA]** en el sector de **[PREGUNTA 3 DE LA PRE-ETAPA]**.*
>
> *Estos son mis diferenciadores validados del paso anterior:*
> *— **[DIFERENCIADOR 1]***
> *— **[DIFERENCIADOR 2]***
> *— **[DIFERENCIADOR 3]***
>
> *Y esta es mi materia prima para construir mi propuesta de valor:*
> *— El tipo de organización a la que ayudo: **[TU RESPUESTA]***
> *— El problema que resuelvo: **[TU RESPUESTA]***
> *— Cómo lo hago: **[TU RESPUESTA]***
> *— El resultado concreto que produzco: **[TU RESPUESTA]***
> *— Lo que me diferencia de otros con mi mismo cargo: **[TU RESPUESTA]***
>
> *Con esta información necesito que:*
> *1. Construyas mi propuesta de valor ejecutiva en máximo 3 frases — clara, específica y memorable*
> *2. Me des una versión corta — máximo 2 líneas — para usar en conversaciones informales*
> *3. Me des una versión larga — máximo un párrafo — para usar como resumen en mi CV y about de LinkedIn*
> *4. Me indiques qué parte de la PV es más débil y cómo fortalecerla*
>
> *Tono: directo, ejecutivo, sin adornos. El cliente al que me dirijo es un gerente de selección o un CEO — no un lector de blog.*
>
> *Entrega el resultado en formato Markdown con esta estructura:*
> *— Título: "Mi propuesta de valor ejecutiva"*
> *— Versión corta — etiquetada: "Para conversaciones informales"*
> *— Versión larga — etiquetada: "Para CV y LinkedIn"*
> *— Sección: "El elemento más débil de tu PV y cómo fortalecerlo"*
> *— Sección final: "Cómo probar si tu PV funciona — 3 señales concretas"*

**Entregable 2:** Tres versiones de tu PV listas para usar — conversación informal, CV y LinkedIn.

---

### Componente 3 — Mapa de evidencias

**¿Qué es el mapa de evidencias?**
Tu PV no vale nada si no puedes respaldarla. El mapa de evidencias es la lista de pruebas concretas que demuestran que tus diferenciadores son reales.

La regla de oro: cada diferenciador necesita al menos una evidencia verificable. Si no puedes evidenciarlo, no es un diferenciador — es una aspiración.

**Ejemplo — mal hecho:**

| Diferenciador | Evidencia |
|---|---|
| Liderazgo de equipos de alto rendimiento | Siempre he tenido equipos muy comprometidos y motivados |

❌ No es verificable. Cualquiera puede decir lo mismo.

**Ejemplo — bien hecho:**

| Diferenciador | Evidencia |
|---|---|
| Expansión comercial en mercados nuevos desde cero | Lancé operación en Brasil en 2021 — de $0 a $1.8M ARR en 14 meses. Equipo de 6 personas construido localmente. Referencia disponible: nombre del CEO. |

✅ Específico, cuantificado, con fecha, con referencia posible.

**Tu turno — construye tu mapa:**

| Diferenciador | Evidencia concreta | ¿Es verificable? | Referencia posible |
|---|---|---|---|
| 1 | | Sí / No | |
| 2 | | Sí / No | |
| 3 | | Sí / No | |
| 4 | | Sí / No | |

Si marcaste No en alguna fila: ese diferenciador necesita ser reformulado o reemplazado.

**Prompt copiable — Mapa de evidencias:**

> *Soy un ejecutivo en transición laboral buscando el cargo de **[PREGUNTA 1 DE LA PRE-ETAPA]**.*
>
> *Estos son mis diferenciadores validados y sus evidencias:*
>
> *Diferenciador 1: **[DIFERENCIADOR 1]***
> *Evidencia: **[EVIDENCIA 1]***
>
> *Diferenciador 2: **[DIFERENCIADOR 2]***
> *Evidencia: **[EVIDENCIA 2]***
>
> *Diferenciador 3: **[DIFERENCIADOR 3]***
> *Evidencia: **[EVIDENCIA 3]***
>
> *Con esta información necesito que:*
> *1. Evalúes si cada evidencia es suficientemente sólida para respaldar el diferenciador en una entrevista ejecutiva*
> *2. Me indiques cuál evidencia es la más débil y cómo fortalecerla*
> *3. Me sugieras qué pregunta de entrevista podría hacerme temblar con cada diferenciador — y cómo preparar la respuesta*
> *4. Me digas si el conjunto de evidencias cuenta una historia coherente o si hay contradicciones*
>
> *Tono: directo, sin condescendencia. Actúa como un headhunter senior que está evaluando si este candidato puede defender su perfil bajo presión.*
>
> *Entrega el resultado en formato Markdown con esta estructura:*
> *— Título: "Mi mapa de evidencias"*
> *— Una sección por diferenciador con: evaluación de la evidencia / nivel de solidez (Sólida-Mejorable-Débil) / cómo fortalecerla*
> *— Tabla resumen: Diferenciador / Evidencia / Solidez / Acción*
> *— Sección: "Las 3 preguntas de entrevista que debes preparar"*
> *— Sección final: "¿Tu conjunto de evidencias cuenta una historia coherente?" — sí o no, y por qué*

**Entregable 3:** Tu mapa de evidencias validado — con fortalezas, debilidades identificadas y las preguntas difíciles que debes preparar.

---

### Componente 4 — Test de mercado

**¿Qué es el test de mercado?**
Construiste tu PV, la respaldaste con evidencias. Ahora viene la pregunta más incómoda: ¿funciona en el mundo real?

**Los 5 criterios de una PV que funciona:**

| # | Criterio | La pregunta que debes hacerte |
|---|---|---|
| 1 | Especificidad | ¿Otro ejecutivo con mi mismo título podría decir exactamente lo mismo? |
| 2 | Verificabilidad | ¿Hay al menos una evidencia concreta detrás de cada afirmación? |
| 3 | Relevancia | ¿Resuelve un problema real para el tipo de organización a la que apunto? |
| 4 | Memorabilidad | ¿Si alguien la escucha hoy, la recuerda mañana cuando aparece una oportunidad? |
| 5 | Accionabilidad | ¿Quien la escucha sabe exactamente cómo referirme y a quién? |

**Tu turno — aplica el checklist:**

| Criterio | ¿La cumple? | Observación |
|---|---|---|
| Especificidad | Sí / Parcial / No | |
| Verificabilidad | Sí / Parcial / No | |
| Relevancia | Sí / Parcial / No | |
| Memorabilidad | Sí / Parcial / No | |
| Accionabilidad | Sí / Parcial / No | |

**Lectura del resultado:**
- 5 Sí → tu PV está lista para salir
- 3–4 Sí → ajuste menor antes de activar
- 1–2 Sí → vuelve al Componente 2 antes de seguir

**Prompt copiable — Test de mercado:**

> *Soy un ejecutivo en transición laboral buscando el cargo de **[PREGUNTA 1 DE LA PRE-ETAPA]** en **[PREGUNTA 2 DE LA PRE-ETAPA]** en el sector de **[PREGUNTA 3 DE LA PRE-ETAPA]**.*
>
> *Esta es mi propuesta de valor ejecutiva:*
> *Versión corta: **[TU VERSIÓN CORTA — Componente 2]***
> *Versión larga: **[TU VERSIÓN LARGA — Componente 2]***
>
> *Estos son mis diferenciadores validados: **[DIFERENCIADORES — Componente 1]***
>
> *Y este es mi mapa de evidencias: **[EVIDENCIAS — Componente 3]***
>
> *Necesito que evalúes mi PV contra estos 5 criterios:*
> *1. Especificidad — ¿otro ejecutivo con mi mismo título podría decir lo mismo?*
> *2. Verificabilidad — ¿hay evidencia concreta detrás de cada afirmación?*
> *3. Relevancia — ¿resuelve un problema real para el tipo de organización a la que apunto?*
> *4. Memorabilidad — ¿quien la escucha hoy la recuerda mañana?*
> *5. Accionabilidad — ¿quien la escucha sabe exactamente cómo y a quién referirme?*
>
> *Sé brutalmente honesto. No me digas lo que quiero escuchar — dime lo que necesito corregir.*
>
> *Respóndeme de forma directa y conversacional:*
> *— Para cada criterio que no cumpla: dime exactamente qué falla y qué cambiar*
> *— Al final: un veredicto claro — ¿está lista para salir o necesita ajuste?*
> *— Si necesita ajuste: máximo 3 acciones concretas ordenadas por prioridad*
>
> *Sin formato de documento, sin títulos, sin tablas. Solo la respuesta directa de alguien que sabe lo que está mirando.*

**Entregable 4:** El veredicto sobre tu PV — qué funciona, qué corregir y si estás listo para activar tu búsqueda.

---

## CONTENIDO DE PROFUNDIDAD M1 — IP DEL OPERADOR

*(Material para audio NotebookLM + video NotebookLM por componente)*

---

### PRE-ETAPA + CONTEXTO GENERAL

**Mensaje central:**
El volumen de CVs no es estrategia. Mandar 60 CVs sin foco es ruido, no búsqueda. El problema no eres tú — es la mecánica. Buscar trabajo ejecutivo se aprende como cualquier cosa: es práctica y entender las reglas del juego.

**El marco mental correcto:**
No es postular para ver si quedas — es encontrar oportunidades donde el trabajo calce para ti y tú para el trabajo. Como buscar pareja: tiene que haber cuadre por ambos lados. Lo que hay que entender es a dónde le estás mandando tus CVs, qué hay en tu CV, y si realmente estás apuntando donde tienes que apuntar.

**La regla de oro:**
Nunca vas a estar 100% listo. No esperes estarlo. Lo que necesitas no es estar listo — es ser tú mismo y tener conversaciones naturales.

---

### COMPONENTE 1 — MARCO DE DIFERENCIADORES

**Bloque 1 — No es lo que sabes hacer, es en qué eres superior**
Por mucho que seas bueno en muchas cosas, hay muchos otros ejecutivos que también lo son. Acá no va en listar todo lo que sabes — va en identificar en qué eres superior al resto. Puede ser experiencia profunda en una industria específica, haber pasado por situaciones únicas como M&A, o una capacidad particular que está por encima del promedio. Acá, menos es más.

**Bloque 2 — Segmentación no es limitación**
Igual que una estrategia de marketing: tienes que enfocarte donde tus características valen más que las del resto. No es cerrarte — es apuntar donde vas a quedar por encima de los otros candidatos. El reclutador revisa entre 50 y 150 CVs por oportunidad. Si entras como uno más, ya perdiste. Hay que entender en qué eres potente y enfocerse en las oportunidades donde tus características son mejores que las del resto.

**Bloque 3 — Cómo encontrar tu diferenciador real**
- Recorrer la carrera cargo por cargo — ¿dónde destacaste? ¿qué hiciste diferente cada año?
- Hablar con ex jefes, clientes, colaboradores, incluso personas de la vida personal — ellos lo ven más fácil que tú
- La vida personal también da señales: si siempre organizas los viajes o resuelves crisis en el momento, eso dice algo
- Dos, tres, máximo cuatro características van a aparecer de forma consistente

**Bloque 4 — Cómo validar que no te estás engañando**
Primero: honestidad radical contigo mismo. Si sabes que no dabas el 100% en algo, no es tu diferenciador. Si estás eligiendo algo porque es sexy en el mercado pero no es donde realmente rindes, estás apuntando al cargo equivocado. Segundo: tu círculo cercano — incluso ese jefe que no te gustó, porque esos son los más transparentes. Confía en el feedback de las personas que te conocen de verdad.

**El mensaje que lo cambia todo:**
El foco tiene que ser tener tan claro tu diferencial que en un asado, en un elevator pitch, en la calle, en donde sea que te cruces con la persona que te puede conseguir trabajo — puedas decirlo en short and sweet, en una o dos frases, QUÉ HACES. No decirle todas las cosas que puedes hacer. El mensaje que le va a quedar grabado, como le quedaría grabado un producto. Que esa persona, aunque no te conozca profundamente, si alguien le pregunta que necesita alguien capaz de hacer eso — te salte en la cabeza antes que cualquier otra persona.

---

### COMPONENTE 2 — FÓRMULA DE PV

**Bloque 1 — Construir desde la vida real, no desde una lista de atributos**
Toma tus diferenciadores y encuentra una situación concreta donde ya los aplicaste. Ejemplo: si eres estructurado, bueno con números y sabes transmitir ideas — busca el momento en tu carrera donde eso se combinó y produjo un resultado real. Ejemplo concreto: estabas con un equipo lanzando un producto, el equipo apuntaba para varios lados al mismo tiempo. Tú te pusiste al centro, sin ser el líder formal, y dijiste "en base a los números, si apuntamos acá vamos a sacar mayor rentabilidad". De ahí se construye la frase: "Lo que mejor hago es llevar a los equipos o proyectos a lograr sus objetivos con foco y estructura." De ahí sale la frase natural — no el discurso preparado.

**Bloque 2 — La IA como copiloto para sintetizar**
Hoy tienes la tecnología que te puede ayudar a construir esto. Teniendo ya tus diferenciadores, puedes usar la inteligencia artificial para que te ayude a construir esa frase. El cliente alimenta la materia prima, la IA ayuda a destilarlo en algo con su tono y su forma.

**Bloque 3 — Cómo validar que funciona**
- Primero contigo mismo — be yourself. Si la frase no eres tú, no funciona. Esto es en cualquier conversación — tienes que ser tú mismo
- Después con tu círculo cercano — ¿qué se quedan ellos cuando la escuchan?
- La señal de que funciona: genera preguntas. Si la persona quiere saber más, lograste el objetivo. Eso significa que dejaste el mensaje y que la persona quiere entender más detalles — ahí empieza la conversación real

**Bloque 4 — Una sola frase que abre conversaciones**
No necesitas una versión por audiencia — necesitas una frase tan bien construida que abra conversación con cualquiera. No eres la persona que está ahí para hablar de ti o porque estás desesperado. En cualquier contexto — asado, elevator pitch, entrevista — si la frase está bien construida va a generar conversación. Es un abridor de conversación, no la palabra final. Durante la conversación capturas hacia dónde llevarla, según lo que le interesa a esa persona.

---

### COMPONENTE 3 — MAPA DE EVIDENCIAS

**Bloque 1 — No hables de todo — habla de lo que el otro quiere escuchar**
Igual que vender un producto o buscar pareja: el 5-20% de tu experiencia que tiene mayor impacto para ese cargo, esa industria, esa persona. El entrevistador muchas veces te revela en sus preguntas lo que quiere escuchar. Un cargo de VP en logística no requiere las mismas evidencias que uno en banca — aunque el título sea el mismo. Muchas veces la parte más potente de tu experiencia ni siquiera el comprador sabe que la quiere — por eso tienes que hablar lo que al que está al frente le interesa escuchar.

**Bloque 2 — Sin el número exacto igual funciona**
Si no tienes la métrica precisa, no la inventes. El cómo lograste las cosas vale más que el número concreto. Las habilidades blandas pesan más que la cifra exacta. Lo que importa es que puedas contarlo con naturalidad porque lo viviste. El entrevistador detecta cuando alguien maneja algo de verdad versus cuando lo está diciendo sin haberlo vivido realmente.

**Bloque 3 — Si te pillan en un punto débil — sé real**
Decir que algo no es tu fuerte no te elimina — elimina fingir que sí lo es. Si eres bueno para las ideas pero no para el detalle, dilo — y explica cómo lo compensaste: un par, un asistente, un equipo. Tú mismo tienes que ser la persona que más honestamente puede reconocer sus puntos débiles. No te sirve de nada engañarte porque finalmente vas a seguir rebotando. Si ese punto débil es crítico para el cargo, esa oportunidad no es para ti — y entrar igual va a terminar mal para los dos lados.

---

### COMPONENTE 4 — TEST DE MERCADO

**Bloque 1 — Nunca vas a estar 100% listo — y está bien**
Igual que cualquier situación nueva en la vida: una relación, un trabajo nuevo, una experiencia. Nunca tienes que esperar estar realmente listo. Lo que necesitas no es estar listo — es saber a dónde vas, tener claro tus diferenciales reales, y apuntar a oportunidades que realmente cuadran contigo. Si sientes que tu PV no está afinada, frena y revisa antes de quemar oportunidades importantes.

**Bloque 2 — Cómo leer las señales del mercado**
Regla simple: si no llegas ni a la primera conversación consistentemente, algo en la construcción o el foco está mal — hay que reformular. Si llegas a la lista de los 5 finalistas, ya entraron otros factores. Tienes que llegar a ese listado de las cinco personas. Si no llegas es porque hay algo en la construcción o en tu foco que no está bien hecho. El primer filtro es el más diagnóstico.

**Bloque 3 — El mercado tiene sus tiempos**
Un cargo ejecutivo puede tomar 6 meses, puede tomar un año. Depende del mercado, la industria, el momento. Hay que leer el mercado, entender los tiempos normales para tu tipo de cargo, y tener una estrategia que se adapte si el tiempo se alarga: primero apunto a los roles que más quiero, si no funciona en X tiempo, abro el criterio. Y tener a la familia alineada con esa estrategia desde el inicio — porque la ansiedad que se acumula cuando el proceso se alarga afecta directamente el desempeño en entrevistas. El entrevistador detecta el estrés.

**Bloque 4 — El mensaje final — sé tú mismo**
Más importante que cualquier otra cosa: sé honesto contigo mismo. No apuntes al cargo más sexy — apunta donde puedes dar lo mejor de ti. Eso es bueno para la empresa y bueno para ti. Mientras más transparente y más tú mismo seas, más fácil va a ser que todo funcione. Tienes mucha experiencia y eso es precisamente lo que vas a poder mostrar. Mientras más seas tú mismo, más relajado vas a estar, y eso se nota — en las conversaciones, en las entrevistas, en todo el proceso.

---

## PENDIENTES FASE 2

| Pendiente | Descripción |
|---|---|
| Automatización de prompts | Web app que inserta respuestas automáticamente en el prompt — el cliente completa preguntas y el sistema construye el prompt listo para copiar |
| Grabación contenido de profundidad | El operador alimenta NotebookLM con el contenido de cada componente → genera audio + video |

---

*ExecForward · M0 y M1 completo · versión 2 · 25 may 2026*