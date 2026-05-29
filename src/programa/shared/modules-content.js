/* ===================================================================
   ExecForward — modules-content.js · Paso 4
   Contenido completo M1–M6: pre-etapas, componentes, prompts.
   Fuente: M0_y_M1_Completo_v2.md + M2–M6 archivos MD.
   Cargado ANTES de app-utils.js en cada index.html.
=================================================================== */

window.EF = window.EF || {};

/* -------------------------------------------------------------------
   TEXTOS DE PROMPTS (copiables)
   Almacenados como strings separados para evitar problemas de escaping
   en HTML. Se acceden vía copyPromptById(key, btn).
------------------------------------------------------------------- */
window.EF.PROMPTS = {

M1_PRE: `Necesito entender el estándar de mercado para el siguiente perfil ejecutivo:

— Cargo: [CARGO]
— Tipo de empresa: [TIPO DE EMPRESA]
— Industria: [INDUSTRIA]
— Mercado: [PAÍS O REGIÓN]

Necesito que me respondas tres cosas con precisión y sin adornos:

1. ¿Qué se espera como mínimo de alguien en este cargo en este tipo de empresa? Lo que no puede faltar para ser considerado candidato viable.

2. ¿Qué distingue a los ejecutivos top en este cargo — los que consiguen los mejores roles — de los que tienen el mismo título pero quedan en el promedio?

3. ¿Qué señales en el perfil o trayectoria generan desconfianza o dudas inmediatas en quien contrata para este cargo?

Sé específico, directo y realista. No me des la versión oficial — dame la versión que usaría un headhunter experimentado.`,

M1_C1: `Soy un ejecutivo en transición laboral buscando el cargo de [CARGO] en [TIPO DE EMPRESA] en el sector de [INDUSTRIA].

Estoy construyendo mi propuesta de valor y necesito que me ayudes a formular mis diferenciadores de forma clara, específica y memorable.

Estos son mis diferenciadores en bruto:

Diferenciador 1: En el contexto de [CONTEXTO 1], logré [RESULTADO 1], y lo que me hace distinto es [FORMA DE OPERAR 1].

Diferenciador 2: En el contexto de [CONTEXTO 2], logré [RESULTADO 2], y lo que me hace distinto es [FORMA DE OPERAR 2].

Diferenciador 3: En el contexto de [CONTEXTO 3], logré [RESULTADO 3], y lo que me hace distinto es [FORMA DE OPERAR 3].

Con esta información necesito que:
1. Reformules cada diferenciador en una sola oración — específica, cuantificada y verificable
2. Me digas cuál es el más poderoso y por qué
3. Me indiques si alguno no es realmente un diferenciador — y por qué
4. Me sugieras cómo ordenarlos para que el conjunto cuente una historia coherente

Tono: directo, ejecutivo, sin adornos.

Entrega el resultado en formato Markdown con esta estructura:
— Título: "Mis diferenciadores ejecutivos"
— Una sección por diferenciador con: versión reformulada / por qué funciona / señal de alerta si aplica
— Tabla resumen: Diferenciador / Potencia (Alta-Media-Baja) / Orden recomendado
— Sección final: "El diferenciador más poderoso y por qué"`,

M1_C2: `Soy un ejecutivo en transición laboral buscando el cargo de [CARGO] en [TIPO DE EMPRESA] en el sector de [INDUSTRIA].

Estos son mis diferenciadores validados del paso anterior:
— [DIFERENCIADOR 1]
— [DIFERENCIADOR 2]
— [DIFERENCIADOR 3]

Y esta es mi materia prima para construir mi propuesta de valor:
— El tipo de organización a la que ayudo: [TU RESPUESTA]
— El problema que resuelvo: [TU RESPUESTA]
— Cómo lo hago: [TU RESPUESTA]
— El resultado concreto que produzco: [TU RESPUESTA]
— Lo que me diferencia de otros con mi mismo cargo: [TU RESPUESTA]

Con esta información necesito que:
1. Construyas mi propuesta de valor ejecutiva en máximo 3 frases — clara, específica y memorable
2. Me des una versión corta — máximo 2 líneas — para usar en conversaciones informales
3. Me des una versión larga — máximo un párrafo — para usar como resumen en mi CV y about de LinkedIn
4. Me indiques qué parte de la PV es más débil y cómo fortalecerla

Tono: directo, ejecutivo, sin adornos. El cliente al que me dirijo es un gerente de selección o un CEO — no un lector de blog.

Entrega el resultado en formato Markdown con esta estructura:
— Título: "Mi propuesta de valor ejecutiva"
— Versión corta — etiquetada: "Para conversaciones informales"
— Versión larga — etiquetada: "Para CV y LinkedIn"
— Sección: "El elemento más débil de tu PV y cómo fortalecerlo"
— Sección final: "Cómo probar si tu PV funciona — 3 señales concretas"`,

M1_C3: `Soy un ejecutivo en transición laboral buscando el cargo de [CARGO].

Estos son mis diferenciadores validados y sus evidencias:

Diferenciador 1: [DIFERENCIADOR 1]
Evidencia: [EVIDENCIA 1]

Diferenciador 2: [DIFERENCIADOR 2]
Evidencia: [EVIDENCIA 2]

Diferenciador 3: [DIFERENCIADOR 3]
Evidencia: [EVIDENCIA 3]

Con esta información necesito que:
1. Evalúes si cada evidencia es suficientemente sólida para respaldar el diferenciador en una entrevista ejecutiva
2. Me indiques cuál evidencia es la más débil y cómo fortalecerla
3. Me sugieras qué pregunta de entrevista podría hacerme temblar con cada diferenciador — y cómo preparar la respuesta
4. Me digas si el conjunto de evidencias cuenta una historia coherente o si hay contradicciones

Tono: directo, sin condescendencia. Actúa como un headhunter senior que está evaluando si este candidato puede defender su perfil bajo presión.

Entrega el resultado en formato Markdown con esta estructura:
— Título: "Mi mapa de evidencias"
— Una sección por diferenciador con: evaluación de la evidencia / nivel de solidez (Sólida-Mejorable-Débil) / cómo fortalecerla
— Tabla resumen: Diferenciador / Evidencia / Solidez / Acción
— Sección: "Las 3 preguntas de entrevista que debes preparar"
— Sección final: "¿Tu conjunto de evidencias cuenta una historia coherente?" — sí o no, y por qué`,

M1_C4: `Soy un ejecutivo en transición laboral buscando el cargo de [CARGO] en [TIPO DE EMPRESA] en el sector de [INDUSTRIA].

Esta es mi propuesta de valor ejecutiva:
Versión corta: [TU VERSIÓN CORTA — Componente 2]
Versión larga: [TU VERSIÓN LARGA — Componente 2]

Estos son mis diferenciadores validados: [DIFERENCIADORES — Componente 1]

Y este es mi mapa de evidencias: [EVIDENCIAS — Componente 3]

Necesito que evalúes mi PV contra estos 5 criterios:
1. Especificidad — ¿otro ejecutivo con mi mismo título podría decir lo mismo?
2. Verificabilidad — ¿hay evidencia concreta detrás de cada afirmación?
3. Relevancia — ¿resuelve un problema real para el tipo de organización a la que apunto?
4. Memorabilidad — ¿quien la escucha hoy la recuerda mañana?
5. Accionabilidad — ¿quien la escucha sabe exactamente cómo y a quién referirme?

Sé brutalmente honesto. No me digas lo que quiero escuchar — dime lo que necesito corregir.

Respóndeme de forma directa y conversacional:
— Para cada criterio que no cumpla: dime exactamente qué falla y qué cambiar
— Al final: un veredicto claro — ¿está lista para salir o necesita ajuste?
— Si necesita ajuste: máximo 3 acciones concretas ordenadas por prioridad

Sin formato de documento, sin títulos, sin tablas. Solo la respuesta directa de alguien que sabe lo que está mirando.`,

M2_C1: `Soy un ejecutivo en transición laboral. Estos son mis diferenciadores validados:

— [DIFERENCIADOR 1]
— [DIFERENCIADOR 2]
— [DIFERENCIADOR 3]

Y este es mi mercado objetivo preliminar:
— Cargo: [TU RESPUESTA]
— Tipo de empresa: [TU RESPUESTA]
— Industria: [TU RESPUESTA]
— Geografía: [TU RESPUESTA]
— Situación que debe estar viviendo la empresa: [TU RESPUESTA]

Necesito que evalúes mi mercado objetivo contra mis diferenciadores y me respondas:
1. ¿Hay coherencia entre mis diferenciadores y el mercado que estoy apuntando — o hay una mejor intersección que no estoy viendo?
2. ¿En qué tipo de empresa y situación mis diferenciadores valen más que los del candidato promedio?
3. ¿Hay un sub-segmento más específico donde sería el candidato obvio en vez de uno más entre varios?
4. ¿Qué señales concretas debo buscar en una oferta o empresa para saber que es mi mercado — y cuáles son señales de que no lo es?

Sé directo. No me des una lista de industrias genéricas — dame la intersección específica donde tengo ventaja real.

Entrega el resultado en formato Markdown con esta estructura:
— Título: "Mi mercado objetivo ejecutivo"
— Evaluación de coherencia diferenciadores / mercado
— Mercado objetivo ajustado (las 4 dimensiones + situación)
— Señales de que una oportunidad ES mi mercado (checklist de 5)
— Señales de que una oportunidad NO es mi mercado (checklist de 5)`,

M2_C2A: `Soy un ejecutivo buscando el cargo de [CARGO] en [TIPO DE EMPRESA] en el sector de [INDUSTRIA] en [GEOGRAFÍA].

Mi situación ideal es una empresa que [SITUACIÓN QUE DEBE ESTAR VIVIENDO].

Necesito que me ayudes a construir mi lista de empresas target:
1. Dame 15–20 empresas concretas — con nombre — que cumplan exactamente este perfil en [GEOGRAFÍA]
2. Para cada una, dime qué señal específica indica que podrían necesitar a alguien como yo ahora o en los próximos 6 meses
3. Identifica cuáles tienen mayor probabilidad de tener el rol activo o en proceso de creación — y por qué
4. Dime cuáles 5 priorizarías para contacto inmediato y en qué orden

No me des categorías genéricas — dame nombres reales con razonamiento específico por empresa.

Entrega el resultado en formato Markdown con:
— Tabla: Empresa / País / Por qué calza / Señal de necesidad / Prioridad (Alta-Media)
— Sección: "Las 5 para contactar primero — orden y justificación"`,

M2_C2B: `Soy un ejecutivo buscando el cargo de [CARGO] en [TIPO DE EMPRESA] en el sector de [INDUSTRIA] en [GEOGRAFÍA].

Necesito que me des una lista de los headhunters y firmas de executive search más relevantes para mi perfil:
1. Dame entre 10 y 20 firmas concretas — con nombre — activas en [GEOGRAFÍA] que trabajen perfiles de mi nivel y sector
2. Para cada una: nombre de la firma, especialización principal, nivel de cargos que maneja, y cómo postular (web, email, LinkedIn)
3. Dime cuáles 5 priorizarías para contactar primero y por qué

No me des categorías genéricas — dame nombres reales con instrucciones concretas de cómo llegar a cada una.

Entrega el resultado en formato Markdown con:
— Tabla: Firma / Especialización / Nivel de cargos / Cómo postular
— Sección: "Las 5 para contactar primero — orden y justificación"`,

M2_C3: `Soy un ejecutivo buscando [CARGO] con estos diferenciadores: [DIFERENCIADORES] y este mercado objetivo: [MERCADO OBJETIVO — Componente 1].

Voy a compartirte una oferta laboral o descripción de empresa. Necesito que la evalúes contra mis criterios y me des un veredicto en menos de 5 minutos:

Oferta / empresa: [PEGA EL TEXTO DE LA OFERTA O DESCRIBE LA EMPRESA]

Evalúa:
1. Fit de cargo — ¿el rol requiere lo que mejor hago o es un título similar con contenido diferente?
2. Fit de empresa — ¿tipo y etapa coinciden con donde he demostrado rendir?
3. Fit de situación — ¿están viviendo el desafío que yo sé resolver?
4. Fit de compensación — ¿el rango es compatible? (si no está explícito, estima basado en tipo de empresa y cargo)
5. Fit de geografía / modelo — ¿es viable para mí sin restricciones ocultas?

Al final: veredicto claro — APLICAR / NO APLICAR / INVESTIGAR ANTES.
Si es INVESTIGAR: dime exactamente qué verificar y cómo.

Sin preámbulos. Solo el análisis y el veredicto.`,

M3_C1: `Voy a compartirte mi CV. Necesito que lo evalúes como lo haría un headhunter senior con 30 segundos para decidir si sigue leyendo o no.

CV: [PEGA TU CV COMPLETO]

Cargo al que estoy postulando: [CARGO]
Tipo de empresa: [TIPO DE EMPRESA]
Oferta específica (si tienes una): [PEGA EL TEXTO DE LA OFERTA]

Evalúa:
1. ¿El CV pasaría un filtro ATS para este cargo — tiene las keywords correctas?
2. ¿Los logros son suficientemente específicos y cuantificados — o son descripciones de responsabilidades?
3. ¿El resumen ejecutivo refleja una propuesta de valor clara o es genérico?
4. ¿El formato es limpio y legible por sistemas automáticos?
5. ¿Qué cambiarías en los primeros 10 segundos de lectura?

Al final: las 3 acciones prioritarias para mejorar este CV para esta oportunidad específica.

Sin preámbulos. Solo el diagnóstico y las acciones.`,

M3_C2: `Voy a compartirte mi perfil de LinkedIn actual. Necesito que lo evalúes como lo haría un reclutador que busca [CARGO] en [INDUSTRIA] en [GEOGRAFÍA].

Mi perfil actual:
— Título: [TU TÍTULO ACTUAL]
— About: [TU ABOUT ACTUAL]
— Experiencia reciente: [ÚLTIMOS 2–3 CARGOS CON DESCRIPCIÓN]
— Skills listadas: [TUS SKILLS ACTUALES]

Mi propuesta de valor validada: [PV — Componente 2 de M1]
Mi mercado objetivo: [MERCADO OBJETIVO — M2]

Necesito que:
1. Evalúes si aparecería en las búsquedas correctas para mi perfil — y qué keywords faltan
2. Reescribas mi título profesional para que refleje mi PV y aparezca en búsquedas relevantes
3. Reescribas mi About como propuesta de valor directa — máximo 3 párrafos
4. Identifiques las 10 skills que debo tener validadas para mi mercado
5. Me digas qué cambiarías en los primeros 30 segundos de lectura

Entrega el resultado en formato Markdown con:
— Título reescrito
— About reescrito
— Lista de 10 skills prioritarias
— Las 3 acciones de mayor impacto inmediato`,

M3_C3A: `Tengo mi CV base y voy a postular a una oportunidad específica. Necesito que adaptes mi CV para esta oferta sin inventar nada — solo reorganizando, reformulando y ajustando el lenguaje.

Mi CV base: [PEGA TU CV COMPLETO]

La oferta a la que postulo: [PEGA EL TEXTO COMPLETO DE LA OFERTA]

Necesito que:
1. Identifiques las 8–10 keywords principales de la oferta que debo tener en mi CV
2. Verifiques cuáles de esas keywords ya están en mi CV y cuáles faltan
3. Adaptes mi resumen ejecutivo para que resuene con el lenguaje y prioridades de esta oferta
4. Reformules los 2–3 logros más relevantes para este cargo — mismo contenido, lenguaje alineado
5. Me des una versión final del CV adaptada lista para usar

Regla: no inventes nada. Si una keyword no tiene respaldo en mi experiencia real, dímelo en vez de inventar.

Entrega:
— Lista de keywords: presentes / ausentes
— Resumen ejecutivo adaptado
— Logros reformulados
— CV completo adaptado en formato limpio`,

M3_C3B: `Voy a tener un proceso con [EMPRESA] para el cargo de [CARGO]. Antes de que revisen mi LinkedIn, quiero asegurarme de que el perfil está alineado con lo que buscan.

Mi perfil actual:
— Título: [TU TÍTULO]
— About: [TU ABOUT]

La oferta o descripción de la empresa: [PEGA EL TEXTO]

Necesito que:
1. Identifiques si mi título actual aparecería en búsquedas para este cargo en esta empresa
2. Sugieras ajustes mínimos al título y about para alinearse con esta oportunidad específica
3. Me digas si hay algo en mi perfil que podría generar dudas para este cargo en particular

Cambios mínimos — no quiero reconstruir el perfil para cada oportunidad, quiero afinarlo.`,

M4_C1: `Soy un ejecutivo buscando el cargo de [CARGO] en [TIPO DE EMPRESA] en [INDUSTRIA] en [GEOGRAFÍA].

Voy a compartirte una lista de contactos de mi red. Necesito que me ayudes a priorizarlos para mi búsqueda.

Lista de contactos:
— [NOMBRE · CARGO · EMPRESA]
— [NOMBRE · CARGO · EMPRESA]
— [NOMBRE · CARGO · EMPRESA]

Para cada contacto necesito que evalúes:
1. ¿Tiene acceso directo o indirecto a oportunidades en mi mercado objetivo?
2. ¿Es contacto de acceso directo, segundo grado o multiplicador?
3. ¿Cuál es su nivel de prioridad para esta búsqueda — y por qué?

Al final: los 10 contactos que activarías primero, en orden, con justificación.

Entrega en formato Markdown con:
— Tabla: Nombre / Tipo / Prioridad / Por qué
— Sección: "Los 10 primeros — orden y justificación"`,

M4_C2: `Necesito escribirle a [NOMBRE], quien es [CARGO] en [EMPRESA]. Nuestra relación es [DESCRIBE LA RELACIÓN: ex colega, conocido de industria, contacto de LinkedIn, etc.] y el último contacto fue hace [TIEMPO].

Lo que busco con esta conversación: [DESCRIBE EL OBJETIVO: una introducción, una conversación exploratoria, su perspectiva sobre el mercado, etc.]

Mi propuesta de valor: [PV — M1]
Mi mercado objetivo: [MERCADO — M2]

Necesito que redactes un mensaje para [CANAL: LinkedIn / email / WhatsApp] que:
1. Sea breve — máximo 5 líneas
2. No pida trabajo directamente
3. Genere interés en tener una conversación
4. Sea natural para el tipo de relación que tenemos

Tono: directo, sin adornos, sin exageraciones. Que suene a mí — no a una plantilla.`,

M4_C3: `Voy a tener una conversación de networking con [NOMBRE], quien es [CARGO] en [EMPRESA].

Lo que sé de su situación: [DESCRIBE LO QUE SABES DE LA EMPRESA, EL SECTOR, O LA PERSONA]

Mi propuesta de valor: [PV — M1]
Mi mercado objetivo: [MERCADO — M2]
Lo que quiero lograr con esta conversación: [OBJETIVO CONCRETO]

Necesito que me prepares para esta conversación:
1. Las 3 preguntas que debería hacerle para entender su perspectiva del mercado — y que generen una conversación real
2. Cómo presentar lo que estoy buscando en máximo 2 frases — natural, no de manual
3. La pregunta de cierre para generar un siguiente paso concreto
4. Qué señales debo leer durante la conversación para saber hacia dónde llevarla

Tono: conversación entre pares, no entrevista. Directo y natural.`,

M5_C1: `Soy un ejecutivo en transición laboral. Esta es mi propuesta de valor validada: [PV — M1]

Y estos son mis diferenciadores: [DIFERENCIADORES — M1]

Necesito que construyas mi pitch ejecutivo — lo que digo cuando alguien me pregunta a qué me dedico o qué estoy buscando.

Requisitos:
1. Máximo 2 frases — no más
2. Tiene que generar una pregunta de vuelta — no cerrar la conversación
3. Tiene que sonar natural — no como un discurso preparado
4. Tiene que funcionar en cualquier contexto: asado, entrevista, LinkedIn

Dame 3 versiones distintas del pitch — mismo contenido, tono diferente — y dime cuál es más fuerte y por qué.

Entrega en formato Markdown con:
— Versión 1 / Versión 2 / Versión 3
— Análisis: cuál es más fuerte y por qué
— Qué pregunta debería generar cada versión`,

M5_C2: `Voy a tener una entrevista para el cargo de [CARGO] en [EMPRESA].

Lo que sé de la empresa y el rol: [DESCRIBE LO QUE SABES]

Mis diferenciadores validados: [DIFERENCIADORES — M1]
Mi mapa de evidencias: [EVIDENCIAS — M1]

Necesito que me prepares para esta entrevista:
1. Las 5 preguntas más probables para este cargo en este tipo de empresa — y cómo responderlas con mis evidencias específicas
2. Las 2 preguntas difíciles que me pueden hacer temblar — y cómo prepararlas sin mentir
3. Las 3 preguntas que yo debería hacerle al entrevistador para posicionarme como candidato de nivel ejecutivo
4. Cómo abrir la entrevista en los primeros 2 minutos para establecer tono de par a par
5. Qué señales debo leer durante la entrevista para saber cómo está yendo realmente

Tono: directo, ejecutivo. No quiero respuestas de manual — quiero respuestas que suenen a mí.

Entrega en formato Markdown con:
— Pregunta / Respuesta recomendada con evidencia / Por qué funciona
— Sección: "Las 2 preguntas difíciles y cómo prepararlas"
— Sección: "Las 3 preguntas que tú haces — y qué demuestran"`,

M5_C3: `Voy a negociar la compensación para el cargo de [CARGO] en [TIPO DE EMPRESA] en [GEOGRAFÍA].

La oferta que recibí es: [DESCRIBE LA OFERTA COMPLETA — sueldo, bono, beneficios, otros]

Mi sueldo objetivo es [TU NÚMERO] y mi mínimo aceptable es [TU MÍNIMO].

Necesito que me prepares para esta negociación:
1. ¿Es esta oferta competitiva para este cargo en este mercado — o está por debajo del rango?
2. ¿Cuál es el argumento más sólido para justificar mi contrapropuesta en base a mercado?
3. ¿Cómo presento mi contrapropuesta sin generar tensión innecesaria?
4. Si el sueldo no se mueve, ¿qué otros elementos del paquete debería negociar?
5. ¿Cuál es la señal de que debo aceptar — y cuál es la señal de que debo retirarme?

Tono: directo, técnico, sin drama. Esto es una conversación de negocios.

Entrega en formato Markdown con:
— Evaluación de la oferta vs. mercado
— Contrapropuesta recomendada con argumentos
— Script de cómo presentar la contrapropuesta
— Plan B si el sueldo no se mueve
— Señales de aceptar vs. retirarse`,

M6_C1: `Voy a compartirte el estado actual de mi búsqueda. Necesito que me ayudes a diagnosticar dónde están los cuellos de botella y qué ajustar.

Estado actual:
— Procesos activos: [LISTA CON ETAPA DE CADA UNO]
— Contactos activados: [CUÁNTOS Y EN QUÉ ETAPA]
— CVs enviados en el último mes: [NÚMERO]
— Primeras conversaciones generadas: [NÚMERO]
— Procesos que avanzaron a segunda instancia: [NÚMERO]
— Procesos donde llegué a finalista: [NÚMERO]
— Ofertas recibidas: [NÚMERO]

Mi mercado objetivo: [MERCADO — M2]

Analiza mis tasas de conversión entre etapas y dime:
1. ¿En qué etapa se está cortando la mayoría de mis procesos?
2. ¿Qué indica ese punto de corte sobre dónde está el problema real?
3. ¿Qué ajustaría primero — y por qué?
4. ¿Hay algo en el volumen o mix de actividades que esté desbalanceado?

Sin preámbulos. Solo el diagnóstico y las acciones.`,

M6_C2: `Llevo [TIEMPO] en búsqueda activa para el cargo de [CARGO]. Mi situación actual es: [DESCRIBE BREVEMENTE DÓNDE ESTÁS — procesos activos, conversaciones, resultados hasta ahora].

Lo que más me está afectando en este momento es: [DESCRIBE LA FUENTE DE DESGASTE PRINCIPAL].

Necesito que me ayudes a:
1. Evaluar si mi ritmo de avance es normal para este tipo de búsqueda — o si hay algo que ajustar
2. Identificar si el desgaste que siento está afectando cómo llevo las conversaciones — y cómo corregirlo
3. Prepararme para explicarle a mi entorno cercano cómo funciona este proceso — en términos que reduzcan su ansiedad y la mía
4. Definir una rutina mínima que me mantenga en movimiento sin consumirme

Sé directo. No necesito motivación — necesito claridad sobre qué está pasando y qué hacer.`,

M6_C3: `Soy un ejecutivo en transición laboral buscando [CARGO] en [MERCADO OBJETIVO — M2]. Llevo [TIEMPO] en búsqueda activa y este es mi estado actual: [DESCRIBE BREVEMENTE DÓNDE ESTÁS — qué tienes listo, qué procesos activos, qué métricas].

Necesito que me construyas un plan de ejecución de 30/60/90/120 días:
1. Para cada etapa: foco principal, acciones concretas ordenadas por prioridad e hito de validación
2. Los criterios de ajuste en cada etapa — cómo saber si algo no está funcionando y qué cambiar
3. La compuerta del día 120 — cómo evaluar si la estrategia necesita revisión de fondo
4. Una rutina semanal realista — que avance la búsqueda sin consumir más de 2–3 horas al día

Considera mis restricciones: [DESCRIBE RESTRICCIONES RELEVANTES — tiempo disponible, situación financiera, entorno familiar, etc.]

Entrega en formato Markdown con:
— Tabla por etapa: Foco / Acciones / Hito de validación / Señal de ajuste
— Sección: "Rutina semanal recomendada"
— Sección: "La compuerta del día 120 — criterios de decisión"`

}; // end EF.PROMPTS

/* -------------------------------------------------------------------
   CONTENIDO DE MÓDULOS
   Estructura: preEtapa + components[]
   Cada component tiene: title, body, malHecho, bienHecho, ejercicio, promptKeys[], entregable
------------------------------------------------------------------- */
window.EF.CONTENT = {

/* ======= M1 ======= */
M1: {
  preEtapa: {
    title: 'Pre-etapa: Define tu target',
    intro: 'Antes de construir tu propuesta de valor, necesitas saber contra qué estándar te vas a medir.',
    questions: [
      {
        type: 'text',
        label: '¿Cuál es el cargo al que estás apuntando?',
        id: 'm1-pre-q1',
        placeholder: 'Ej: VP Comercial, Gerente General, Country Manager...'
      },
      {
        type: 'checkbox',
        label: '¿En qué tipo de empresa?',
        id: 'm1-pre-q2',
        options: [
          'Multinacional / empresa global con operaciones locales',
          'Empresa local grande — facturación alta, estructura consolidada',
          'Empresa mediana en crecimiento — entre 50 y 500 personas',
          'Startup o scaleup — alto crecimiento, estructura dinámica',
          'Otra'
        ]
      },
      {
        type: 'text',
        label: '¿En qué industria o sector? (máximo dos)',
        id: 'm1-pre-q3',
        placeholder: 'Ej: Tecnología B2B, Retail, Banca...'
      },
      {
        type: 'checkbox',
        label: '¿En qué país o región estás buscando?',
        id: 'm1-pre-q4',
        options: [
          'País específico',
          'Regional — varios países',
          'Abierto / remoto global'
        ]
      }
    ],
    promptKey: 'M1_PRE',
    postPrompt: 'Lee la respuesta completa antes de seguir. Es el espejo contra el que vas a construir tus diferenciadores.'
  },
  components: [
    {
      title: 'Componente 1 — Marco de diferenciadores',
      body: '<p><strong>¿Qué es un diferenciador ejecutivo?</strong></p><p>Un diferenciador no es lo que haces — es lo que haces tú que otro ejecutivo con perfil similar no puede replicar fácilmente. La prueba: si otro ejecutivo con tu mismo título y años de experiencia pudiera decir exactamente lo mismo, no es un diferenciador — es una descripción.</p>',
      malHecho: '"Tengo amplia experiencia liderando equipos comerciales en empresas de tecnología, con foco en resultados y orientación al cliente."',
      malHechoNote: 'Cualquier gerente comercial de tecnología podría firmar esto.',
      bienHecho: '"He liderado tres procesos de expansión comercial en mercados latinoamericanos desde cero — Brasil, Colombia y México — en empresas SaaS B2B de entre 50 y 200 personas, pasando de $0 a $2M ARR en menos de 18 meses en cada caso. Lo hago construyendo el equipo local antes de escalar, no después."',
      bienHechoNote: 'Específico, cuantificado, contextualizado y con forma de operar diferenciada.',
      ejercicio: {
        intro: 'Identifica entre 3 y 4 diferenciadores. Menos de 3 es insuficiente. Más de 4 empieza a diluirse.',
        headers: ['#', '¿En qué contexto lo hiciste?', '¿Qué resultado concreto lograste?', '¿Cómo lo hiciste — qué te hace distinto?'],
        rows: 4,
        rowNumbers: true
      },
      promptKeys: ['M1_C1'],
      promptLabels: ['Prompt copiable — Diferenciadores'],
      entregable: 'Tus 3–4 diferenciadores reformulados, priorizados y validados.'
    },
    {
      title: 'Componente 2 — Fórmula de propuesta de valor',
      body: '<p><strong>¿Qué es una propuesta de valor ejecutiva?</strong></p><p>Es la síntesis de todo lo que construiste en el componente anterior — en un formato que puedes usar en cualquier situación: el resumen de tu CV, el about de LinkedIn, la respuesta a "¿por qué tú?", o la primera frase de una conversación importante.</p><p class="formula-box"><strong>La fórmula:</strong> Yo ayudo a [TIPO DE ORGANIZACIÓN] a [PROBLEMA O DESAFÍO QUE RESUELVES] a través de [TU FORMA DE OPERAR], logrando [RESULTADO CONCRETO]. Lo que me diferencia de otros [TU CARGO] es [TU DIFERENCIADOR PRINCIPAL].</p>',
      malHecho: '"Soy un ejecutivo comercial con más de 15 años de experiencia en empresas de tecnología, orientado a resultados, con habilidades de liderazgo y gestión de equipos de alto rendimiento."',
      malHechoNote: 'No dice nada que otro ejecutivo no pueda decir.',
      bienHecho: '"Ayudo a empresas SaaS B2B en etapa de expansión latinoamericana a construir operaciones comerciales desde cero en mercados nuevos — sin depender de estructuras heredadas de otras regiones. Lo hago construyendo primero el equipo local y luego escalando el modelo, lo que me ha permitido llegar a $2M ARR en menos de 18 meses en tres mercados distintos. Lo que me diferencia de otros VP Comerciales es que no llego a gestionar una operación existente — llego a crear una donde no había nada."',
      bienHechoNote: 'Claro, específico, memorable.',
      ejercicio: {
        intro: 'Tu turno — construye tu PV en bruto:',
        headers: ['Variable', 'Tu respuesta'],
        rowsFixed: [
          'Tipo de organización a la que ayudas',
          'Problema o desafío que resuelves',
          'Tu forma de operar — cómo lo haces',
          'Resultado concreto que produces',
          'Tu diferenciador principal vs. perfil similar'
        ]
      },
      promptKeys: ['M1_C2'],
      promptLabels: ['Prompt copiable — Fórmula de PV'],
      entregable: 'Tres versiones de tu PV listas para usar — conversación informal, CV y LinkedIn.'
    },
    {
      title: 'Componente 3 — Mapa de evidencias',
      body: '<p><strong>¿Qué es el mapa de evidencias?</strong></p><p>Tu PV no vale nada si no puedes respaldarla. El mapa de evidencias es la lista de pruebas concretas que demuestran que tus diferenciadores son reales.</p><p><strong>La regla de oro:</strong> cada diferenciador necesita al menos una evidencia verificable. Si no puedes evidenciarlo, no es un diferenciador — es una aspiración.</p>',
      malHecho: 'Diferenciador: "Liderazgo de equipos de alto rendimiento" → Evidencia: "Siempre he tenido equipos muy comprometidos y motivados"',
      malHechoNote: 'No es verificable. Cualquiera puede decir lo mismo.',
      bienHecho: 'Diferenciador: "Expansión comercial en mercados nuevos desde cero" → Evidencia: "Lancé operación en Brasil en 2021 — de $0 a $1.8M ARR en 14 meses. Equipo de 6 personas construido localmente. Referencia disponible: nombre del CEO."',
      bienHechoNote: 'Específico, cuantificado, con fecha, con referencia posible.',
      ejercicio: {
        intro: 'Si marcaste No en alguna fila: ese diferenciador necesita ser reformulado o reemplazado.',
        headers: ['Diferenciador', 'Evidencia concreta', '¿Es verificable?', 'Referencia posible'],
        rows: 4,
        rowNumbers: false
      },
      promptKeys: ['M1_C3'],
      promptLabels: ['Prompt copiable — Mapa de evidencias'],
      entregable: 'Tu mapa de evidencias validado — con fortalezas, debilidades identificadas y las preguntas difíciles que debes preparar.'
    },
    {
      title: 'Componente 4 — Test de mercado',
      body: '<p><strong>¿Qué es el test de mercado?</strong></p><p>Construiste tu PV, la respaldaste con evidencias. Ahora viene la pregunta más incómoda: ¿funciona en el mundo real?</p><p><strong>Los 5 criterios de una PV que funciona:</strong></p><table class="static-table"><thead><tr><th>#</th><th>Criterio</th><th>La pregunta que debes hacerte</th></tr></thead><tbody><tr><td>1</td><td><strong>Especificidad</strong></td><td>¿Otro ejecutivo con mi mismo título podría decir exactamente lo mismo?</td></tr><tr><td>2</td><td><strong>Verificabilidad</strong></td><td>¿Hay al menos una evidencia concreta detrás de cada afirmación?</td></tr><tr><td>3</td><td><strong>Relevancia</strong></td><td>¿Resuelve un problema real para el tipo de organización a la que apunto?</td></tr><tr><td>4</td><td><strong>Memorabilidad</strong></td><td>¿Si alguien la escucha hoy, la recuerda mañana cuando aparece una oportunidad?</td></tr><tr><td>5</td><td><strong>Accionabilidad</strong></td><td>¿Quien la escucha sabe exactamente cómo referirme y a quién?</td></tr></tbody></table><p class="reading-note"><strong>Lectura del resultado:</strong> 5 Sí → tu PV está lista para salir. 3–4 Sí → ajuste menor antes de activar. 1–2 Sí → vuelve al Componente 2 antes de seguir.</p>',
      ejercicio: {
        intro: 'Aplica el checklist:',
        headers: ['Criterio', '¿La cumple?', 'Observación'],
        rowsFixed: [
          'Especificidad',
          'Verificabilidad',
          'Relevancia',
          'Memorabilidad',
          'Accionabilidad'
        ]
      },
      promptKeys: ['M1_C4'],
      promptLabels: ['Prompt copiable — Test de mercado'],
      entregable: 'El veredicto sobre tu PV — qué funciona, qué corregir y si estás listo para activar tu búsqueda.',
      noMalBien: true
    }
  ]
},

/* ======= M2 ======= */
M2: {
  preEtapa: {
    title: 'Pre-etapa: ¿Dónde estás buscando hoy?',
    intro: 'Antes de definir tu mercado objetivo, necesitas hacer un diagnóstico honesto de tus fuentes actuales de oportunidades.',
    questions: [
      {
        type: 'table-input',
        id: 'm2-pre-q1',
        label: '¿Qué porcentaje de tu tiempo de búsqueda estás dedicando a cada canal?',
        tableHeaders: ['Canal', '% estimado de tu tiempo'],
        tableRows: [
          'Portales de empleo (LinkedIn Jobs, Indeed, etc.)',
          'Postulaciones directas a ofertas publicadas',
          'Contacto activo con tu red',
          'Contacto con headhunters / executive search',
          'Otro'
        ],
        feedbackTitle: 'Lectura de tu respuesta — Contacto activo con tu red:',
        feedbackRows: [
          { condition: '≥50%', text: 'Estás donde debe estar el foco. La red es el canal principal en búsqueda ejecutiva — el 70–80% de los cargos a este nivel se cubren sin publicarse.' },
          { condition: '30–49%', text: 'Vas bien pero hay espacio para redirigir energía. Cada hora que dedicas a portales es una hora que no estás en el canal que más convierte.' },
          { condition: '<30%', text: 'Aquí está el problema. Estás compitiendo en el 20–30% del mercado con el 100% de los candidatos activos. M4 de este programa trabaja exactamente esto.' }
        ]
      },
      {
        type: 'radio',
        id: 'm2-pre-q2',
        text: '¿Tienes criterios escritos — no en tu cabeza — para decidir a qué oportunidades aplicas y a cuáles no?',
        options: [
          'Sí, tengo criterios claros y los aplico consistentemente',
          'Tengo criterios aproximados pero los flexibilizo según el momento',
          'Evalúo caso a caso sin criterios fijos',
          'Aplico a todo lo que parece interesante para no perder oportunidades'
        ],
        feedback: {
          A: 'Bien. El Componente 3 de este módulo te ayuda a formalizar y probar esos criterios.',
          B: 'El criterio que se flexibiliza según el momento no es un criterio — es una preferencia. Cuando llega una oportunidad tentadora, la preferencia cede. El Componente 3 trabaja esto.',
          C: 'Volumen no es estrategia. Aplicar a todo lo que parece interesante consume energía, genera inconsistencia y pone al ejecutivo en competencia donde no tiene ventaja. La búsqueda ejecutiva funciona como láser, no como escopeta — el Componente 3 construye ese filtro.',
          D: 'Volumen no es estrategia. Aplicar a todo lo que parece interesante consume energía, genera inconsistencia y pone al ejecutivo en competencia donde no tiene ventaja. La búsqueda ejecutiva funciona como láser, no como escopeta — el Componente 3 construye ese filtro.'
        }
      },
      {
        type: 'radio',
        id: 'm2-pre-q3',
        text: 'En los últimos 3 meses, ¿cuántas oportunidades rechazaste conscientemente porque no cumplían tus criterios?',
        options: [
          'Ninguna — no he tenido el lujo de rechazar',
          '1–3',
          '4 o más',
          'No apliqué a nada — estoy en fase de preparación'
        ],
        feedback: {
          A: 'Rechazar no es un lujo — es una señal de claridad. Si no has descartado nada, probablemente los criterios no están definidos todavía. Eso es exactamente lo que construyes en este módulo.',
          B: 'Bien. Rechazar conscientemente es evidencia de que tienes un mercado objetivo definido. El trabajo ahora es afinar esos criterios para que sean más rápidos y reproducibles.',
          C: 'Bien. Rechazar conscientemente es evidencia de que tienes un mercado objetivo definido. El trabajo ahora es afinar esos criterios para que sean más rápidos y reproducibles.',
          D: 'Momento ideal para construir los criterios antes de activar la búsqueda — es mucho más costoso corregirlos en medio del proceso.'
        }
      }
    ],
    promptKey: null
  },
  components: [
    {
      title: 'Componente 1 — Define tu mercado objetivo real',
      body: '<p><strong>¿Qué es el mercado objetivo ejecutivo?</strong></p><p>No es la industria donde has trabajado — es la intersección específica donde tus diferenciadores valen más que los del candidato promedio. Un mercado objetivo ejecutivo tiene cuatro dimensiones: tipo de cargo, tipo de empresa, industria y geografía. Sin las cuatro definidas, tu búsqueda es dispersa por diseño.</p><p><strong>Por qué importa definirlo:</strong> Un reclutador revisa entre 50 y 150 CVs por oportunidad. Si no tienes claro dónde eres el candidato más fuerte, terminas siendo el candidato promedio en muchos lugares en vez del candidato obvio en uno.</p>',
      malHecho: '"Estoy abierto a roles de gerencia general o dirección en empresas medianas o grandes de cualquier industria, preferentemente en Chile o con opción remota."',
      malHechoNote: 'No hay foco. Esta descripción aplica a miles de ejecutivos. No ayuda a quien quiere referirte — no sabe a quién presentarte.',
      bienHecho: '"Busco roles de Country Manager o VP Comercial en empresas de tecnología B2B en etapa de expansión latinoamericana, con operación ya establecida en al menos un mercado y necesidad de abrir 2–3 mercados nuevos. Tamaño: 100–500 personas, con respaldo de PE o Serie B en adelante. Geografía: Chile, Colombia o Perú con reporte a casa matriz en USA o Europa."',
      bienHechoNote: 'Quien lee esto sabe exactamente a quién referirte y cuándo. Eso es accionable.',
      ejercicio: {
        intro: 'Construye tu mercado objetivo:',
        headers: ['Dimensión', 'Tu respuesta'],
        rowsFixed: [
          'Cargo o función objetivo (máximo 2 títulos)',
          'Tipo de empresa (tamaño, estructura, etapa)',
          'Industria o sector (máximo 2)',
          'Geografía (país / región / remoto)',
          'Qué situación o desafío debe estar viviendo esa empresa para necesitarte'
        ]
      },
      promptKeys: ['M2_C1'],
      promptLabels: ['Prompt copiable — Mercado objetivo'],
      entregable: 'Tu mercado objetivo definido en 4 dimensiones + checklist de fit/no-fit para evaluar oportunidades.'
    },
    {
      title: 'Componente 2 — El mercado oculto',
      body: '<p><strong>¿Qué es el mercado oculto?</strong></p><p>El 70–80% de los cargos ejecutivos se cubren sin publicarse. No porque las empresas quieran ocultarlos — sino porque a ese nivel el proceso empieza por referidos y headhunters antes de llegar a un portal. Si estás buscando principalmente en ofertas publicadas, estás compitiendo en el 20–30% del mercado con el 100% de los candidatos activos.</p><table class="static-table"><thead><tr><th>Fuente</th><th>Cómo funciona</th><th>Cómo acceder</th></tr></thead><tbody><tr><td><strong>Red de contactos directa</strong></td><td>Alguien que te conoce sabe de una necesidad antes de que se publique</td><td>Activación sistemática de contactos clave (→ M4)</td></tr><tr><td><strong>Empresas target</strong></td><td>Necesidades que existen pero no tienen presupuesto aprobado todavía</td><td>Contacto directo a decisores antes de que el proceso exista</td></tr><tr><td><strong>Headhunters</strong></td><td>Manejan mandatos exclusivos pero son canal complementario</td><td>Mapear las firmas activas en tu nicho y registrar tu perfil</td></tr></tbody></table>',
      malHecho: 'Aplicar a 40 ofertas de LinkedIn Jobs en un mes, sin contacto previo con nadie en esas empresas.',
      malHechoNote: 'Estás en el 20–30% del mercado, compitiendo contra todos, sin ventaja de referido, esperando que el ATS te filtre hacia arriba.',
      bienHecho: 'Identificar 15 empresas target que coinciden con mi mercado objetivo. Para cada una: mapear quién es el decisor del rol que busco, encontrar un contacto de segundo grado que pueda hacer la introducción, y solicitar una conversación exploratoria — antes de que exista una oferta.',
      bienHechoNote: 'Estás en el mercado oculto, con ventaja de referido, antes de que empiece la competencia.',
      ejercicio: {
        intro: 'Identifica entre 10 y 20 empresas target. La tabla es el punto de partida — el mapeo completo se trabaja en M4.',
        headers: ['#', 'Empresa target', 'Por qué calza con mi mercado', 'Contacto directo', 'Contacto 2° grado', 'Acción siguiente'],
        rows: 5,
        rowNumbers: true
      },
      promptKeys: ['M2_C2A', 'M2_C2B'],
      promptLabels: ['Prompt copiable — Empresas target', 'Prompt copiable — Headhunters por perfil'],
      entregable: 'Lista de 15–20 empresas target priorizadas con señales de necesidad y orden de contacto + lista de headhunters relevantes para tu perfil.'
    },
    {
      title: 'Componente 3 — Criterios de filtro',
      body: '<p><strong>¿Para qué sirve un criterio de filtro?</strong></p><p>Sin criterios claros, cada oferta que parece interesante se convierte en una decisión nueva. Eso consume energía, genera inconsistencia y lleva a aplicar a oportunidades que no son tu mercado. Con criterios definidos, la decisión tarda 5 minutos y es reproducible.</p><table class="static-table"><thead><tr><th>#</th><th>Criterio</th><th>Pregunta de evaluación</th></tr></thead><tbody><tr><td>1</td><td><strong>Fit de cargo</strong></td><td>¿El rol requiere exactamente lo que mejor hago — o es un cargo distinto con un título similar?</td></tr><tr><td>2</td><td><strong>Fit de empresa</strong></td><td>¿El tipo y etapa de empresa coincide con donde he demostrado rendir mejor?</td></tr><tr><td>3</td><td><strong>Fit de situación</strong></td><td>¿La empresa está viviendo el desafío que yo sé resolver — o es una operación estable sin ese problema?</td></tr><tr><td>4</td><td><strong>Fit de compensación</strong></td><td>¿El rango es compatible con lo que busco — o voy a negociar desde una posición incómoda?</td></tr><tr><td>5</td><td><strong>Fit de geografía / modelo</strong></td><td>¿La ubicación y modalidad son realmente viables para mí — o hay una restricción que voy a descubrir tarde?</td></tr></tbody></table><p class="reading-note">Si una oportunidad no cumple al menos 4 de 5, el tiempo que inviertes en postular es tiempo que no estás dedicando a las oportunidades donde eres el candidato más fuerte.</p>',
      ejercicio: {
        intro: 'Define tus criterios:',
        headers: ['Criterio', 'Mi estándar mínimo para aplicar', 'Mi estándar ideal'],
        rowsFixed: [
          'Fit de cargo',
          'Fit de empresa',
          'Fit de situación',
          'Fit de compensación',
          'Fit de geografía / modelo'
        ]
      },
      promptKeys: ['M2_C3'],
      promptLabels: ['Prompt copiable — Evaluación de oportunidad'],
      entregable: 'Tus criterios de filtro definidos + prompt reutilizable para evaluar cualquier oportunidad en 5 minutos.',
      noMalBien: true
    }
  ]
},

/* ======= M3 ======= */
M3: {
  preEtapa: {
    title: 'Pre-etapa: ¿Tus materiales están trabajando por ti?',
    intro: 'Antes de optimizar tu CV y LinkedIn, necesitas saber desde dónde estás partiendo. Responde con honestidad — no hay respuesta correcta, hay diagnóstico útil.',
    questions: [
      {
        type: 'radio',
        id: 'm3-pre-q1',
        text: '¿Cuándo fue la última vez que actualizaste tu CV?',
        options: [
          'Lo actualicé específicamente para mi búsqueda actual',
          'Lo actualicé hace menos de un año pero no para esta búsqueda',
          'Lo actualicé hace más de un año',
          'No recuerdo'
        ],
        feedback: {
          A: 'Buen punto de partida. El trabajo en este módulo es afinar, no reconstruir.',
          B: 'Un CV desactualizado no es un CV malo — es un CV que no está hablando de quién eres hoy. Los reclutadores leen el CV más reciente, no el mejor de tu carrera.',
          C: 'El CV es el primer filtro. Si no está actualizado y alineado con lo que buscas hoy, estás compitiendo con una herramienta que no representa tu perfil actual. Este módulo lo resuelve.',
          D: 'El CV es el primer filtro. Si no está actualizado y alineado con lo que buscas hoy, estás compitiendo con una herramienta que no representa tu perfil actual. Este módulo lo resuelve.'
        }
      },
      {
        type: 'radio',
        id: 'm3-pre-q2',
        text: 'Cuando postulas a una oportunidad, ¿qué haces con tu CV?',
        options: [
          'Mando el mismo CV a todas las oportunidades',
          'Hago ajustes menores pero básicamente es el mismo documento',
          'Lo adapto según el cargo, aunque el proceso me toma mucho tiempo',
          'Tengo una versión base que ajusto sistemáticamente — keywords, foco, orden'
        ],
        feedback: {
          A: 'Un CV genérico compite contra CVs adaptados. Los sistemas ATS filtran por keywords específicas de cada oferta — si tu CV no las tiene, no llega a ojos humanos. El Componente 3 resuelve esto con IA como copiloto.',
          B: 'Un CV genérico compite contra CVs adaptados. Los sistemas ATS filtran por keywords específicas de cada oferta — si tu CV no las tiene, no llega a ojos humanos. El Componente 3 resuelve esto con IA como copiloto.',
          C: 'Vas bien en intención pero mal en eficiencia. Adaptar un CV no debiera tomar más de 15 minutos si tienes el sistema correcto. El Componente 3 construye ese sistema.',
          D: 'Estás haciendo lo correcto. El trabajo aquí es verificar que la adaptación está funcionando — que realmente estás pasando los filtros.'
        }
      },
      {
        type: 'radio',
        id: 'm3-pre-q3',
        text: '¿Qué ha pasado con tu LinkedIn en los últimos 6 meses en términos de oportunidades?',
        options: [
          'Nada relevante — no me ha llegado nada por ahí',
          'Algún contacto ocasional pero nada concreto',
          'Contactos de reclutadores, aunque no siempre para lo que busco',
          'Me han contactado reclutadores para roles relevantes'
        ],
        feedback: {
          A: 'LinkedIn no está trabajando por ti. Puede ser visibilidad — no apareces cuando buscan tu perfil — o puede ser que el perfil no convence cuando llegan. El Componente 2 diagnostica cuál es el problema.',
          B: 'Hay visibilidad pero el perfil no está filtrando bien. Estás apareciendo en búsquedas que no son las tuyas — señal de que el posicionamiento no está claro.',
          C: 'Cerca. El perfil tiene visibilidad pero el mercado objetivo no está suficientemente definido en él. Ajuste fino, no reconstrucción.',
          D: 'LinkedIn está funcionando como canal. El trabajo es mantenerlo y asegurarse de que los contactos que llegan sean cada vez más relevantes.'
        }
      }
    ],
    promptKey: null
  },
  components: [
    {
      title: 'Componente 1 — El CV ejecutivo que pasa filtros y convence personas',
      body: '<p><strong>¿Para qué sirve realmente el CV a nivel ejecutivo?</strong></p><p>El CV tiene dos trabajos distintos y secuenciales: primero pasar filtros automáticos (ATS), después convencer a una persona. La mayoría de los ejecutivos escribe el CV pensando solo en el segundo — y no llega nunca a él porque falla en el primero.</p><table class="static-table"><thead><tr><th>Error</th><th>Por qué elimina</th></tr></thead><tbody><tr><td><strong>Responsabilidades en vez de logros</strong></td><td>Describe lo que se supone que debías hacer, no lo que realmente lograste. Cualquier candidato puede copiar una descripción de cargo.</td></tr><tr><td><strong>Logros sin números</strong></td><td>"Mejoré las ventas" no dice nada. "Crecí las ventas 40% en 12 meses" es verificable y memorable.</td></tr><tr><td><strong>CV genérico para todas las oportunidades</strong></td><td>Sin keywords de la oferta específica, el ATS lo filtra antes de que llegue a ojos humanos.</td></tr><tr><td><strong>Formato que confunde al ATS</strong></td><td>Tablas, columnas, headers con gráficos — el ATS los lee como basura. Formato limpio, lineal, sin adornos.</td></tr></tbody></table>',
      malHecho: '"Responsable de liderar el equipo comercial, gestionar relaciones con clientes clave y desarrollar estrategias de crecimiento para la región."',
      malHechoNote: 'Es una descripción de cargo, no un logro. Cualquier gerente comercial podría firmar esto.',
      bienHecho: '"Lideré la expansión comercial en 3 mercados nuevos (Brasil, Colombia, México) en 18 meses, creciendo de $0 a $2M ARR en cada mercado. Construí equipos locales de 6–8 personas desde cero antes de escalar el modelo."',
      bienHechoNote: 'Específico, cuantificado, contextualizado. Nadie más puede decir exactamente esto.',
      ejercicio: {
        intro: 'Audita tu CV actual:',
        headers: ['Criterio', '¿Lo cumple tu CV?', 'Acción'],
        rowsFixed: [
          'Cada cargo tiene al menos 2 logros cuantificados',
          'El lenguaje coincide con el de las ofertas a las que postulas',
          'El formato es limpio y legible por ATS (sin tablas ni columnas)',
          'El resumen ejecutivo refleja tu PV — no una descripción genérica',
          'Los últimos 3 cargos tienen métricas concretas'
        ]
      },
      promptKeys: ['M3_C1'],
      promptLabels: ['Prompt copiable — Auditoría de CV'],
      entregable: 'Auditoría de tu CV actual con las 3 acciones prioritarias para esta búsqueda.'
    },
    {
      title: 'Componente 2 — LinkedIn como canal de entrada',
      body: '<p><strong>¿Cómo busca realmente un reclutador en LinkedIn?</strong></p><p>Un reclutador no navega perfiles — hace búsquedas con filtros. Título del cargo, industria, ubicación, keywords específicas. Si tu perfil no tiene las palabras exactas que el reclutador está usando, no apareces. Da lo mismo lo bueno que sea tu perfil si no aparece en la búsqueda correcta.</p><table class="static-table"><thead><tr><th>Sección</th><th>Por qué importa</th></tr></thead><tbody><tr><td><strong>Título profesional</strong></td><td>Es lo primero que ve el reclutador. Si dice solo tu cargo anterior, estás compitiendo como uno más.</td></tr><tr><td><strong>About / Resumen</strong></td><td>Es tu propuesta de valor en formato LinkedIn. La mayoría lo deja vacío o pone un resumen de CV.</td></tr><tr><td><strong>Experiencia</strong></td><td>Mismo principio que el CV — logros cuantificados, no responsabilidades.</td></tr><tr><td><strong>Skills</strong></td><td>LinkedIn usa las skills para búsquedas. Si no tienes las skills correctas validadas, no apareces en ciertos filtros.</td></tr><tr><td><strong>Actividad reciente</strong></td><td>Un perfil sin actividad reciente genera dudas. No requiere publicar contenido — basta con interacciones estratégicas.</td></tr></tbody></table>',
      malHecho: '"Gerente General en Empresa XYZ"',
      malHechoNote: 'Describe tu pasado, no tu valor. Desaparece en búsquedas cuando el reclutador filtra por algo más específico.',
      bienHecho: '"Country Manager / VP Comercial · Expansión B2B en Latam · Tecnología y SaaS"',
      bienHechoNote: 'Aparece en búsquedas de reclutadores que buscan exactamente ese perfil. En 10 segundos el reclutador sabe qué haces y para qué tipo de empresa.',
      ejercicio: {
        intro: 'Audita tu LinkedIn:',
        headers: ['Sección', 'Estado actual', 'Acción'],
        rowsFixed: [
          'Título refleja tu PV y keywords de tu mercado',
          'About tiene tu propuesta de valor — no es copia del CV',
          'Experiencia tiene logros cuantificados — no responsabilidades',
          'Skills incluyen las keywords de tu mercado objetivo',
          'Foto y banner son profesionales y coherentes con tu perfil'
        ]
      },
      promptKeys: ['M3_C2'],
      promptLabels: ['Prompt copiable — Optimización de LinkedIn'],
      entregable: 'Tu título y About reescritos + lista de skills prioritarias + plan de optimización de 3 acciones.'
    },
    {
      title: 'Componente 3 — La IA como copiloto: adaptar CV y LinkedIn por oportunidad',
      body: '<p><strong>¿Qué significa usar la IA como copiloto?</strong></p><p>No es que la IA escriba tu CV — es que tú tienes la materia prima y la IA te ayuda a adaptarla para cada oportunidad en minutos, no en horas. La diferencia entre un CV genérico y un CV adaptado es tiempo y sistema.</p><table class="static-table"><thead><tr><th>Paso</th><th>Qué haces</th><th>Tiempo</th></tr></thead><tbody><tr><td>1</td><td>Tienes tu CV base con todos tus logros cuantificados — el documento maestro</td><td>Una vez</td></tr><tr><td>2</td><td>Pegas la oferta específica en la IA y le pides que identifique keywords</td><td>2 minutos</td></tr><tr><td>3</td><td>Le pides que adapte tu CV base a esa oferta — mismo contenido, lenguaje alineado</td><td>5–10 minutos</td></tr></tbody></table>',
      noMalBien: true,
      ejercicio: {
        intro: 'Sistema de adaptación — registro de oportunidades:',
        headers: ['Empresa / Cargo', 'Keywords identificadas', 'Keywords presentes en CV', 'Keywords a agregar', 'Estado'],
        rows: 3,
        rowNumbers: false
      },
      promptKeys: ['M3_C3A', 'M3_C3B'],
      promptLabels: ['Prompt copiable — Adaptación de CV por oportunidad', 'Prompt copiable — Adaptación de LinkedIn por oportunidad'],
      entregable: 'Sistema de adaptación de CV y LinkedIn por oportunidad — proceso de 15 minutos replicable para cualquier postulación.'
    }
  ]
},

/* ======= M4 ======= */
M4: {
  preEtapa: {
    title: 'Pre-etapa: ¿Cómo está tu red hoy?',
    intro: 'Antes de activar tu red, necesitas saber con qué estás trabajando. Responde con honestidad — el diagnóstico es el punto de partida, no un juicio.',
    questions: [
      {
        type: 'radio',
        id: 'm4-pre-q1',
        text: 'Si tuvieras que activar tu red mañana, ¿cuántos contactos podrías identificar que tienen acceso real a oportunidades en tu mercado objetivo?',
        options: [
          'Ninguno — no sé quiénes son los contactos relevantes para lo que busco',
          'Entre 1 y 5 — tengo algunos pero no sé bien cómo aproximarme',
          'Entre 6 y 15 — tengo contactos relevantes aunque no los he activado',
          'Más de 15 — tengo clara la lista y el orden de activación'
        ],
        feedback: {
          A: 'El problema no es la red — es el mapa. Probablemente tienes más contactos relevantes de los que crees, pero sin el mercado objetivo definido no puedes identificarlos. El Componente 1 construye ese mapa.',
          B: 'Tienes el punto de partida. El trabajo es entender cómo aproximarte a cada uno — el Componente 2 y 3 lo resuelven.',
          C: 'Buena base. El trabajo es priorizar y activar en el orden correcto — no todos al mismo tiempo.',
          D: 'Estás listo para activar. El trabajo aquí es asegurarte de que el mensaje es el correcto antes de salir.'
        }
      },
      {
        type: 'radio',
        id: 'm4-pre-q2',
        text: '¿Cuándo fue la última vez que tuviste contacto con alguien de tu red profesional — sin que fuera para pedir algo?',
        options: [
          'En los últimos 30 días',
          'Entre 1 y 6 meses',
          'Hace más de 6 meses',
          'No mantengo contacto activo con mi red fuera de momentos de necesidad'
        ],
        feedback: {
          A: 'Tu red está activa. Activarla para tu búsqueda es una conversación natural, no una aparición después de años de silencio.',
          B: 'Hay algo de distancia pero es recuperable. Una reactivación bien hecha no genera incomodidad — genera conversación.',
          C: 'Aquí hay que ser honesto: aparecer después de mucho tiempo pidiendo ayuda genera fricción. No es imposible — pero requiere más cuidado en cómo se hace. El Componente 2 trabaja exactamente esto.',
          D: 'Aquí hay que ser honesto: aparecer después de mucho tiempo pidiendo ayuda genera fricción. No es imposible — pero requiere más cuidado en cómo se hace. El Componente 2 trabaja exactamente esto.'
        }
      },
      {
        type: 'radio',
        id: 'm4-pre-q3',
        text: 'Cuando contactas a alguien de tu red para hablar de tu búsqueda, ¿qué pasa normalmente?',
        options: [
          'Me cuesta dar el primer paso — no quiero incomodar ni parecer que estoy pidiendo un favor',
          'Lo hago pero no sé bien qué pedirle ni cómo enfocar la conversación',
          'Tengo claro cómo aproximarme aunque los resultados son irregulares',
          'Tengo un mensaje claro y las conversaciones que se dan suelen ser productivas'
        ],
        feedback: {
          A: 'El freno no es la red — eres tú. Y es completamente normal. El networking ejecutivo se siente incómodo cuando no tienes claro qué estás pidiendo ni por qué esa persona debiera ayudarte. Cuando tienes el mensaje correcto, la incomodidad desaparece.',
          B: 'El problema es la falta de estructura en la conversación — no la relación. El Componente 3 construye esa estructura.',
          C: 'Vas bien en ejecución pero mal en consistencia. Probablemente estás activando contactos sin un criterio claro de priorización.',
          D: 'El sistema funciona. El trabajo es escalarlo sin perder calidad.'
        }
      }
    ],
    promptKey: null
  },
  components: [
    {
      title: 'Componente 1 — Mapeo y priorización de contactos',
      body: '<p><strong>¿Por qué mapear antes de activar?</strong></p><p>Activar la red sin un mapa previo es el error más común — y el más costoso. No porque las conversaciones sean malas, sino porque se activan los contactos equivocados en el orden equivocado. El resultado es una red de frustración: muchas reuniones, muchas buenas intenciones, pocos resultados concretos.</p><table class="static-table"><thead><tr><th>Tipo</th><th>Quiénes son</th><th>Para qué sirven</th></tr></thead><tbody><tr><td><strong>Contactos de acceso directo</strong></td><td>Decisores que pueden crearte o referirte a una oportunidad directamente</td><td>El contacto de mayor valor. Una conversación puede generar una oportunidad antes de que exista el proceso.</td></tr><tr><td><strong>Contactos de segundo grado</strong></td><td>Personas que no tienen el cargo pero conocen a quien lo tiene — y pueden hacer la introducción</td><td>El puente hacia el mercado oculto. Un referido de alguien de confianza vale más que diez CVs enviados en frío.</td></tr><tr><td><strong>Multiplicadores</strong></td><td>Headhunters, coaches ejecutivos, directores de asociaciones gremiales</td><td>No generan oportunidades directas pero amplían el alcance de tu red de forma sistemática.</td></tr></tbody></table><p class="reading-note"><strong>La regla de priorización:</strong> No se activa por cercanía afectiva — se activa por relevancia para el mercado objetivo.</p>',
      noMalBien: true,
      ejercicio: {
        intro: 'Identifica entre 20 y 30 contactos. Prioriza los 10 de mayor acceso a tu mercado objetivo — esos son los primeros a activar.',
        headers: ['#', 'Nombre', 'Tipo', 'Empresa / Cargo', 'Conexión con mi mercado', 'Prioridad', 'Estado'],
        rows: 5,
        rowNumbers: true
      },
      promptKeys: ['M4_C1'],
      promptLabels: ['Prompt copiable — Mapa de contactos'],
      entregable: 'Mapa de 20–30 contactos priorizados con los 10 primeros a activar en orden.'
    },
    {
      title: 'Componente 2 — Cómo activar la red sin pedir trabajo',
      body: '<p><strong>¿Qué significa activar la red correctamente?</strong></p><p>Activar la red no es salir a pedir trabajo — es retomar o iniciar conversaciones donde tú aportas valor y en el proceso quedas en la mente del otro. La oportunidad llega como consecuencia de la conversación, no como objetivo declarado de ella.</p><table class="static-table"><thead><tr><th>Error</th><th>Por qué no funciona</th></tr></thead><tbody><tr><td><strong>Salir antes de tener el mensaje listo</strong></td><td>Quemas oportunidades con un mensaje que no es el correcto. Una vez que alguien te ve sin claridad, es muy difícil reposicionarte con esa persona.</td></tr><tr><td><strong>Activar por cercanía en vez de por relevancia</strong></td><td>Los contactos más cercanos afectivamente no son necesariamente los más relevantes para tu mercado. Generas una red de frustración.</td></tr><tr><td><strong>Pedir trabajo directamente</strong></td><td>Pone a la otra persona en una posición incómoda si no tiene nada para ofrecerte. Y cambia el tono de toda la conversación — de intercambio a favor.</td></tr></tbody></table><p><strong>El momento correcto para activar:</strong> antes de contactar a nadie, necesitas: (1) tu propuesta de valor clara, (2) tu mercado objetivo definido, (3) tu mensaje afinado — practicado con personas de confianza.</p>',
      noMalBien: true,
      ejercicio: {
        intro: 'Prepara tu activación:',
        headers: ['Contacto', '¿Relación activa o inactiva?', 'Primer paso de reactivación (si inactiva)', 'Mensaje inicial'],
        rows: 5,
        rowNumbers: false
      },
      promptKeys: ['M4_C2'],
      promptLabels: ['Prompt copiable — Mensaje de activación'],
      entregable: 'Mensajes de activación listos para los 10 contactos prioritarios de tu mapa.'
    },
    {
      title: 'Componente 3 — La conversación de networking ejecutivo',
      body: '<p><strong>¿Qué es una conversación de networking ejecutivo?</strong></p><p>No es una entrevista informal ni una reunión para pedir favores — es una conversación entre pares donde tú aportas perspectiva y en el proceso quedas posicionado en la mente del otro. El objetivo no es salir con una oferta — es salir con un siguiente paso concreto: un contacto, una introducción, una reunión con alguien específico.</p><table class="static-table"><thead><tr><th>Momento</th><th>Qué haces</th><th>Qué no haces</th></tr></thead><tbody><tr><td><strong>Apertura</strong></td><td>Agradeces el tiempo, estableces el contexto en una frase</td><td>No empiezas explicando toda tu trayectoria</td></tr><tr><td><strong>Intercambio</strong></td><td>Preguntas por su perspectiva del mercado, cómo ve el sector</td><td>No conviertes la reunión en un monólogo sobre ti</td></tr><tr><td><strong>Tu posicionamiento</strong></td><td>En el momento natural, compartes qué estás buscando y por qué</td><td>No listas todo lo que puedes hacer</td></tr><tr><td><strong>El cierre</strong></td><td>Preguntas si conoce a alguien con quien valga la pena que hables — específico, no genérico</td><td>No preguntas "¿sabes de algo para mí?"</td></tr></tbody></table>',
      noMalBien: true,
      ejercicio: {
        intro: 'Prepara tus conversaciones:',
        headers: ['Contacto', 'Qué sé de su situación actual', 'Qué perspectiva puedo aportarle', 'Qué quiero lograr al final de la conversación'],
        rows: 5,
        rowNumbers: false
      },
      promptKeys: ['M4_C3'],
      promptLabels: ['Prompt copiable — Preparación de conversación'],
      entregable: 'Preparación completa para cada conversación de tu lista de 10 contactos prioritarios.'
    }
  ]
},

/* ======= M5 ======= */
M5: {
  preEtapa: {
    title: 'Pre-etapa: ¿Estás listo para cerrar?',
    intro: 'El pitch, la entrevista y la negociación son tres momentos distintos del mismo proceso. Antes de trabajarlos, necesitas saber en cuál estás fallando — porque el punto de quiebre define qué trabajar primero.',
    questions: [
      {
        type: 'radio',
        id: 'm5-pre-q1',
        text: 'Piensa en la última conversación importante sobre tu carrera — una entrevista, un café con un contacto, una reunión con un potencial empleador. ¿Cómo saliste?',
        options: [
          'Sentí que no logré transmitir bien lo que valgo — la conversación no fluyó como esperaba',
          'Creo que me fue bien, aunque salí con la sensación de que pude haber dicho cosas mejor',
          'La conversación fue buena pero no sé si logré dejar una impresión diferenciada',
          'Salí con la conversación encaminada hacia algo concreto — un siguiente paso, un contacto, o una oferta'
        ],
        feedback: {
          A: 'El problema está en el pitch — en cómo abres y transmites tu valor desde el primer minuto. El Componente 1 trabaja esto.',
          B: 'Llegas bien pero no cierras con precisión. Hay materia prima pero falta estructura para convertir una buena conversación en un paso concreto.',
          C: 'El problema es diferenciación — suenas como un buen candidato, no como el candidato obvio. El trabajo está en afinar el mensaje, no en la forma de entregarlo.',
          D: 'El sistema funciona. El trabajo es hacerlo consistente — que no dependa del día o del interlocutor.'
        }
      },
      {
        type: 'radio',
        id: 'm5-pre-q2',
        text: '¿En qué etapa se han cortado la mayoría de tus procesos en esta búsqueda?',
        options: [
          'No llego a la primera conversación — envío CVs pero no me llaman',
          'Llego a la primera conversación pero no avanzo a etapas siguientes',
          'Avanzo en los procesos pero no llego a la oferta final',
          'Llego a ofertas pero no logro cerrar en los términos que busco'
        ],
        feedback: {
          A: 'El problema está antes de este módulo — en el CV, LinkedIn o mercado objetivo. Revisa M2 y M3 antes de seguir.',
          B: 'El pitch no está convenciendo en los primeros minutos. El Componente 1 es tu prioridad.',
          C: 'Dos posibles causas: la entrevista no está convirtiendo (Componente 2), o estás yendo a oportunidades que no son realmente tu mercado. Lo crítico es llegar a ser uno de los 3–5 finalistas. Si no estás llegando consistentemente a esa instancia, revisa M2 antes de seguir trabajando la entrevista.',
          D: 'El cuello de botella es la negociación. El Componente 3 es tu prioridad.'
        }
      },
      {
        type: 'radio',
        id: 'm5-pre-q3',
        text: 'Cuando en un proceso llega el momento de hablar de compensación, ¿qué pasa?',
        options: [
          'Me incomoda — no sé bien cómo manejarlo sin quedar mal',
          'Tengo una cifra en mente pero me cuesta defenderla si me preguntan por qué',
          'Sé lo que quiero pedir y puedo justificarlo, aunque la negociación me genera tensión',
          'Lo veo como parte del proceso — tengo clara mi cifra, sé cómo argumentarla y no me desestabiliza una contrapropuesta'
        ],
        feedback: {
          A: 'La incomodidad con la compensación no es un tema de personalidad — es falta de preparación y de datos. Con los argumentos correctos y el número bien fundamentado, la conversación cambia completamente. El Componente 3 construye eso.',
          B: 'La incomodidad con la compensación no es un tema de personalidad — es falta de preparación y de datos. Con los argumentos correctos y el número bien fundamentado, la conversación cambia completamente. El Componente 3 construye eso.',
          C: 'Vas bien en concepto pero la tensión te puede jugar en contra en el momento crítico. El trabajo es convertir el conocimiento en automatismo — que la negociación no dependa de tu estado emocional ese día.',
          D: 'Estás donde debes estar. El trabajo es asegurarte de que tu cifra está bien fundamentada en datos de mercado reales — no solo en lo que crees que mereces.'
        }
      }
    ],
    promptKey: null
  },
  components: [
    {
      title: 'Componente 1 — El pitch ejecutivo: cómo abrir cualquier conversación',
      body: '<p><strong>¿Qué es el pitch ejecutivo?</strong></p><p>No es un discurso preparado — es la capacidad de explicar en dos frases qué haces, para quién y por qué tú, en cualquier contexto y con cualquier interlocutor. En un asado, en un ascensor, en los primeros treinta segundos de una entrevista. Si necesitas más de dos frases para explicar lo que buscas, el pitch no está listo.</p><p class="formula-box"><strong>La estructura del pitch que funciona:</strong> Lo que mejor hago es [QUÉ HACES] para [TIPO DE ORGANIZACIÓN] en contextos de [SITUACIÓN ESPECÍFICA]. Lo que me diferencia es [DIFERENCIADOR PRINCIPAL EN UNA FRASE].</p><table class="static-table"><thead><tr><th>Error</th><th>Por qué no funciona</th></tr></thead><tbody><tr><td><strong>Contar toda la trayectoria</strong></td><td>La otra persona no preguntó tu historia — preguntó qué haces. Más información no es más claridad.</td></tr><tr><td><strong>Ser demasiado modesto</strong></td><td>"Estoy viendo opciones" — no dice nada y no genera interés.</td></tr><tr><td><strong>Adaptar el mensaje según la audiencia</strong></td><td>Si el pitch cambia según la audiencia, no es un pitch — es improvisación. Y se nota.</td></tr></tbody></table>',
      malHecho: '"Tengo más de quince años de experiencia en empresas de tecnología, he liderado equipos comerciales grandes y estoy buscando mi próximo desafío como gerente general o director comercial en una empresa que quiera crecer."',
      malHechoNote: 'No dice nada específico. Cualquier ejecutivo comercial de tecnología podría decir lo mismo.',
      bienHecho: '"Lo que mejor hago es construir operaciones comerciales desde cero en mercados latinoamericanos nuevos — el momento en que una empresa SaaS decide expandirse y no tiene nada montado todavía. Lo que me diferencia es que llego a crear, no a gestionar lo que ya existe."',
      bienHechoNote: 'En dos frases queda claro qué hace, en qué contexto, y por qué es distinto. Eso genera preguntas.',
      ejercicio: {
        intro: 'Construye tu pitch:',
        headers: ['Elemento', 'Tu respuesta'],
        rowsFixed: [
          'Lo que mejor hago',
          'Para qué tipo de organización',
          'En qué contexto o situación específica',
          'Lo que me diferencia en una frase'
        ]
      },
      promptKeys: ['M5_C1'],
      promptLabels: ['Prompt copiable — Pitch ejecutivo'],
      entregable: 'Tu pitch ejecutivo en 3 versiones — listo para cualquier contexto.'
    },
    {
      title: 'Componente 2 — La entrevista ejecutiva: cómo convertir conversación en oferta',
      body: '<p><strong>¿Qué es una entrevista ejecutiva?</strong></p><p>A nivel ejecutivo, una entrevista no es un interrogatorio — es una conversación entre pares donde ambos lados están evaluando si hay fit. El error más común es olvidar que tú también estás entrevistando a la empresa.</p><table class="static-table"><thead><tr><th>Etapa</th><th>Qué está pasando realmente</th><th>Qué debes lograr</th></tr></thead><tbody><tr><td><strong>Apertura</strong></td><td>El entrevistador está formando su primera impresión — en los primeros 5 minutos decide si eres candidato serio</td><td>Establecer credibilidad y tono de par a par desde el inicio</td></tr><tr><td><strong>Desarrollo</strong></td><td>El entrevistador está verificando si tus diferenciadores son reales — busca evidencia concreta</td><td>Respaldar cada afirmación con evidencia específica y verificable</td></tr><tr><td><strong>Cierre</strong></td><td>El entrevistador está evaluando tu nivel de interés real y capacidad de pensar estratégicamente</td><td>Hacer las preguntas correctas — las que demuestran que entiendes el negocio</td></tr></tbody></table><p class="reading-note"><strong>Las preguntas que demuestran nivel ejecutivo:</strong> "¿Cuál es el mayor desafío que enfrenta quien ocupe este cargo en los primeros 90 días?" — "¿Cuál es la decisión más importante que deberá tomar quien ocupe este cargo en el primer año?" — "¿Qué no está funcionando hoy que esperan que esta persona resuelva?"</p>',
      noMalBien: true,
      ejercicio: {
        intro: 'Prepara tu entrevista:',
        headers: ['Pregunta probable', 'Tu respuesta con evidencia concreta', 'Diferenciador que demuestra'],
        rowsFixed: [
          '¿Por qué te interesa este cargo?',
          '¿Cuál ha sido tu mayor logro profesional?',
          '¿Cuál es tu mayor debilidad?',
          '¿Por qué dejaste tu último cargo?',
          '¿Dónde te ves en 5 años?'
        ]
      },
      promptKeys: ['M5_C2'],
      promptLabels: ['Prompt copiable — Preparación de entrevista'],
      entregable: 'Preparación completa para cualquier entrevista ejecutiva — preguntas probables, respuestas con evidencia y preguntas estratégicas para hacer.'
    },
    {
      title: 'Componente 3 — La negociación de compensación: cómo cerrar bien',
      body: '<p><strong>¿Qué es la negociación de compensación a nivel ejecutivo?</strong></p><p>No es un momento incómodo al final del proceso — es la última etapa de una venta donde ya demostraste tu valor. Si llegaste hasta aquí, la empresa ya decidió que te quiere. El poder en la negociación no está del lado de la empresa — está del lado del candidato que sabe lo que vale y puede argumentarlo.</p><table class="static-table"><thead><tr><th>Principio</th><th>Qué significa en práctica</th></tr></thead><tbody><tr><td><strong>Nunca des el primer número si puedes evitarlo</strong></td><td>Quien da el primer número ancla la negociación. Si te preguntan cuánto quieres, devuelve la pregunta: ¿cuál es el rango que tienen definido para este cargo?</td></tr><tr><td><strong>Tu cifra tiene que estar fundamentada — no aspirada</strong></td><td>La diferencia entre pedir $X y defender $X es tener datos de mercado reales que respalden el número.</td></tr><tr><td><strong>El paquete es más que el sueldo</strong></td><td>Bono, beneficios, equity, flexibilidad, título, scope del rol — todo es negociable.</td></tr></tbody></table>',
      noMalBien: true,
      ejercicio: {
        intro: 'Prepara tu negociación:',
        headers: ['Variable', 'Tu número / respuesta'],
        rowsFixed: [
          'Sueldo mínimo aceptable',
          'Sueldo objetivo',
          'Sueldo aspiracional',
          'Elementos del paquete que son negociables para ti',
          'Elementos del paquete que son no negociables'
        ]
      },
      promptKeys: ['M5_C3'],
      promptLabels: ['Prompt copiable — Preparación de negociación'],
      entregable: 'Preparación completa para la negociación — cifra fundamentada, argumentos de mercado y plan B listo.'
    }
  ]
},

/* ======= M6 ======= */
M6: {
  preEtapa: {
    title: 'Pre-etapa: ¿Cómo estás manejando el proceso?',
    intro: 'La búsqueda ejecutiva es un proceso que puede durar meses. Antes de trabajar cómo organizarlo, necesitas saber cómo te está afectando — porque el estado en que llevas el proceso impacta directamente tu desempeño en cada conversación e instancia.',
    questions: [
      {
        type: 'radio',
        id: 'm6-pre-q1',
        text: '¿Cómo describirías tu estado anímico en relación a tu búsqueda en este momento?',
        options: [
          'Es difícil — hay días en que me cuesta mantener el ritmo y la motivación',
          'Voy tirando, aunque la incertidumbre me afecta más de lo que quisiera admitir',
          'Estoy bien en general, aunque hay momentos puntuales en que la presión me pesa',
          'Tengo altos y bajos como cualquiera, pero tengo formas de reponerme — no dejo que un mal día defina la semana'
        ],
        feedback: {
          A: 'El estado anímico no es un tema blando — afecta directamente tu desempeño en entrevistas y conversaciones. El entrevistador detecta el estrés. Antes de seguir activando la búsqueda, el Componente 2 es tu prioridad.',
          B: 'Estás funcionando pero en modo de desgaste. El problema con esto es que es invisible desde afuera — crees que estás bien, pero se nota en cómo llevas las conversaciones.',
          C: 'Es el estado más común en una búsqueda bien llevada. El trabajo es identificar qué momentos específicos generan más presión y tener un sistema para manejarlos.',
          D: 'Estás en el estado correcto para una búsqueda de largo aliento. El trabajo es mantenerlo — especialmente cuando el proceso se alarga más de lo esperado.'
        }
      },
      {
        type: 'radio',
        id: 'm6-pre-q2',
        text: '¿Tienes un sistema para organizar tu búsqueda — con qué está pasando en cada proceso, a quién contactaste y cuándo, qué sigue?',
        options: [
          'No — lo llevo en la cabeza o de forma muy informal',
          'Tengo algo básico pero no lo actualizo consistentemente',
          'Tengo un sistema pero no estoy seguro de que esté midiendo lo correcto',
          'Sí — tengo visibilidad clara de cada proceso, cada contacto y cada siguiente paso'
        ],
        feedback: {
          A: 'Sin sistema, la búsqueda se gestiona por urgencia — respondes lo que aparece en vez de avanzar lo que importa. El Componente 1 construye ese sistema.',
          B: 'Un sistema que no se actualiza no es un sistema — es una lista que genera culpa. El problema no es la herramienta, es la rutina.',
          C: 'Vas bien en disciplina. El ajuste es en los indicadores — medir actividad no es lo mismo que medir avance real.',
          D: 'Estás operando con claridad. El trabajo es asegurarte de que el sistema evoluciona con el proceso — lo que mides en el mes 1 no es lo mismo que en el mes 3.'
        }
      },
      {
        type: 'radio',
        id: 'm6-pre-q3',
        text: '¿Cómo está manejando tu entorno cercano — pareja, familia — el hecho de que estés en búsqueda?',
        options: [
          'Es una fuente de presión adicional — siento que esperan resultados y eso me pesa',
          'Me apoyan, aunque no siempre entienden bien cómo funciona este proceso',
          'Están de mi lado y lo entienden bastante bien, aunque la incertidumbre los afecta también',
          'Tenemos una conversación abierta sobre el proceso — saben qué esperar y eso me quita presión'
        ],
        feedback: {
          A: 'El entorno no alineado es una fuente de estrés que se acumula silenciosamente y termina afectando el desempeño en entrevistas. No es un tema personal — es un tema operativo. El Componente 2 trabaja cómo manejarlo.',
          B: 'El entorno no alineado es una fuente de estrés que se acumula silenciosamente y termina afectando el desempeño en entrevistas. No es un tema personal — es un tema operativo. El Componente 2 trabaja cómo manejarlo.',
          C: 'Cerca. El trabajo es convertir el apoyo general en comprensión específica del proceso — que sepan qué esperar en cada etapa, no solo que te apoyan en general.',
          D: 'El entorno alineado es una ventaja competitiva real en una búsqueda larga. Mantén esa conversación abierta — especialmente cuando el proceso se alarga.'
        }
      }
    ],
    promptKey: null
  },
  components: [
    {
      title: 'Componente 1 — Gestión del proceso: cómo organizar la búsqueda sin que te consuma',
      body: '<p><strong>¿Por qué necesitas un sistema?</strong></p><p>Una búsqueda ejecutiva puede tener simultáneamente 5 procesos activos, 15 contactos en distintas etapas de activación y 10 empresas target en seguimiento. Sin un sistema, todo eso vive en la cabeza — y lo que vive en la cabeza se gestiona por urgencia, no por estrategia.</p><table class="static-table"><thead><tr><th>Métrica</th><th>Por qué importa</th></tr></thead><tbody><tr><td>CVs enviados → primera conversación</td><td>Si la tasa es baja, el problema está en CV, LinkedIn o mercado objetivo</td></tr><tr><td>Primera conversación → segunda instancia</td><td>Si la tasa es baja, el problema está en el pitch o la entrevista inicial</td></tr><tr><td>Segunda instancia → finalista</td><td>Si la tasa es baja, el problema está en la entrevista ejecutiva</td></tr><tr><td>Finalista → oferta</td><td>Si la tasa es baja, el problema está en el cierre o la negociación</td></tr></tbody></table><p class="reading-note"><strong>Regla de portales:</strong> una vez a la semana, en el bloque semanal, no más. Revisar portales todos los días no acelera la búsqueda — genera ansiedad y consume tiempo que debería ir a activación de red y seguimiento de procesos activos.</p>',
      noMalBien: true,
      ejercicio: {
        intro: 'Construye tu sistema de seguimiento:',
        headers: ['Proceso / Contacto / Empresa', 'Etapa actual', 'Último contacto', 'Siguiente paso', 'Fecha límite'],
        rows: 5,
        rowNumbers: false
      },
      promptKeys: ['M6_C1'],
      promptLabels: ['Prompt copiable — Diagnóstico del sistema'],
      entregable: 'Sistema de gestión de búsqueda activo con métricas de conversión por etapa.'
    },
    {
      title: 'Componente 2 — Estado anímico: cómo mantener el rendimiento cuando el proceso se alarga',
      body: '<p><strong>¿Por qué el estado anímico es un tema operativo y no personal?</strong></p><p>Una búsqueda ejecutiva puede tomar entre 6 y 12 meses dependiendo del mercado, la industria y el momento. No es una señal de que algo está mal — es la duración normal del proceso a ese nivel. El estado anímico no es un tema blando. Afecta directamente el desempeño en entrevistas y conversaciones — el entrevistador detecta el estrés, la ansiedad y la desesperación aunque el candidato crea que lo está ocultando bien.</p><table class="static-table"><thead><tr><th>Fuente de desgaste</th><th>Cómo se manifiesta</th><th>Cómo se maneja</th></tr></thead><tbody><tr><td><strong>El silencio</strong></td><td>Procesos que no responden, contactos que desaparecen, semanas sin novedades</td><td>Entender que el silencio es normal — no es un juicio sobre ti. Los tiempos del mercado no son los tuyos.</td></tr><tr><td><strong>La comparación</strong></td><td>Ver a otros encontrar trabajo más rápido</td><td>Cada búsqueda es distinta. El cargo correcto toma el tiempo que toma — no el tiempo que quisieras.</td></tr><tr><td><strong>La presión del entorno</strong></td><td>Familia que espera resultados, preguntas incómodas</td><td>Alinear al entorno desde el inicio — que sepan qué esperar en cada etapa.</td></tr></tbody></table>',
      noMalBien: true,
      ejercicio: {
        intro: 'Diagnóstico de estado:',
        headers: ['Pregunta', 'Tu respuesta'],
        rowsFixed: [
          '¿Cuánto tiempo llevas en búsqueda activa?',
          '¿Cuál es la fuente de desgaste que más te está afectando?',
          '¿Tu entorno sabe exactamente qué esperar del proceso — o solo sabe que estás buscando?',
          '¿Tienes una forma concreta de reponerte cuando un proceso cae o un contacto desaparece?'
        ]
      },
      promptKeys: ['M6_C2'],
      promptLabels: ['Prompt copiable — Gestión del estado anímico'],
      entregable: 'Diagnóstico de tu estado actual + conversación con el entorno preparada + rutina mínima de mantenimiento.'
    },
    {
      title: 'Componente 3 — Plan de 30/60/90/120 días',
      body: '<p><strong>¿Para qué sirve el plan por etapas?</strong></p><p>Una búsqueda ejecutiva sin un plan por etapas se gestiona por urgencia. El plan de 30/60/90/120 días convierte una búsqueda abierta en un proceso con hitos claros, ajustes programados y criterios de decisión definidos antes de que llegue la presión.</p><table class="static-table"><thead><tr><th>Etapa</th><th>Foco principal</th><th>Lo que debes tener al cierre</th></tr></thead><tbody><tr><td><strong>30 días</strong></td><td>Construir la base</td><td>PV validada, CV y LinkedIn optimizados, lista de empresas target, mapa de contactos, primeras conversaciones iniciadas</td></tr><tr><td><strong>60 días</strong></td><td>Activar y medir</td><td>Red activada, primeros procesos en curso, métricas de conversión identificadas</td></tr><tr><td><strong>90 días</strong></td><td>Ajustar y acelerar</td><td>Ajustes aplicados en base a métricas, motor de contactos funcionando, al menos 2–3 procesos activos simultáneos</td></tr><tr><td><strong>120 días</strong></td><td>Evaluar y decidir</td><td>Diagnóstico honesto del proceso — si hay tracción real o si hay que revisar mercado objetivo, mensaje o estrategia completa</td></tr></tbody></table><p class="reading-note"><strong>La compuerta del día 120:</strong> Si no hay tracción medible, la respuesta no es esforzarse más — es revisar la estrategia desde la base.</p>',
      noMalBien: true,
      ejercicio: {
        intro: 'Construye tu plan:',
        headers: ['Etapa', 'Qué quiero tener al cierre', 'Acciones concretas esta etapa', 'Cómo sabré que pasé el hito'],
        rowsFixed: [
          '30 días',
          '60 días',
          '90 días',
          '120 días'
        ]
      },
      promptKeys: ['M6_C3'],
      promptLabels: ['Prompt copiable — Plan de ejecución'],
      entregable: 'Tu plan de 30/60/90/120 días con hitos de validación, criterios de ajuste y rutina semanal.'
    }
  ]
}

}; // end EF.CONTENT
