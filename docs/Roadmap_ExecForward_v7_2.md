# Roadmap de ejecución — ExecForward  
**versión 7.2 · actualizado 26 may 2026**  

Un solo activo, arquitectura web interactiva, distribución automatizada.  

| Campo | Valor |  
|---|---:|  
| Horizonte ajustado | 7 semanas |  
| Meta escalón 1 | $1.000/mes |  
| Inversión tope | < $100 |  
| Fecha de inicio | 19 may 2026 |  
| Estado actual | S3a en curso · Logo ✅ · Brandbook ✅ · T3.5 y T3.6 pendientes Cowork |  

**Ejecutores:** Tú · Cónyuge · Claude · Cowork  

---  

## 1. Decisiones cerradas  

No se reabren salvo solicitud explícita.  

### Decisiones fundacionales (desde v1)  

| # | Decisión | Estado |  
|---:|---|---|  
| 1 | **Plataforma:** Lemon Squeezy — MoR + afiliados self-serve. Tienda creada. | ✅ |  
| 2 | **Nicho:** Mid-management / VP en transición. Cuña PT+ES primero, EN segundo, FR tercero. | ✅ |  
| 3 | **Marca:** ExecForward — execforward.com registrado en Cloudflare. Logo v2 creado con brandbook. | ✅ |  
| 4 | **Contenido:** M0–M6 completos en español. IP del operador documentada. | ✅ |  

### Decisiones de producto (cerradas)  

| # | Decisión |  
|---:|---|  
| 5 | **Formato:** web app interactiva en execforward.com — no PDF. |  
| 6 | **M0:** quiz gratuito en landing page como funnel de conversión. No es parte del producto pagado. |  
| 7 | **Producto pagado = M1–M6** como web app con sidebar, progreso, preguntas interactivas, prompts copiables, audio/video/mindmap embebidos. |  
| 8 | **Navegación:** sidebar visible + orden recomendado + libertad de saltar + progreso por módulo (patrón LinkedIn Learning). |  
| 9 | **Onboarding:** pantalla inicial "¿cuál fue tu score?" → personaliza orden del sidebar + mensaje motivacional por banda de score. |  
| 10 | **Acceso post-compra:** redirect LS → execforward.com/programa/[SKU] · seguridad UUID + password por SKU en email de confirmación. Login real → v2. |  
| 11 | **Quiz M0 landing:** HTML estático · score → texto copiable → CTA personalizado al SKU correcto. |  
| 12 | **Stack de contenido por módulo:** audio NotebookLM + video NotebookLM + mindmap (Cowork) + 1 video intro uso de prompts. |  
| 13 | **Video walkthrough de prompts:** descartado. |  
| 14 | **Pantalla de bienvenida (onboarding):** texto aprobado — validación emocional + 6 resultados concretos + IA como copiloto + pregunta de score integrada. Post-compra, no en landing. |  
| 15 | **Sidebar:** solo títulos de módulo + indicador de progreso. Sin descripciones. |  
| 16 | **Inicio de cada módulo:** tagline + mindmap + descripción 2-3 líneas + componentes + CTA "Empezar". |  
| 17 | **Cierre (pantalla final M6):** texto aprobado — aparece al completar M6. |  
| 18 | **Introducción original (texto largo):** reclasificada como material para landing page. No vive en el producto. |  
| 19 | **Landing page:** construcción separada en S2. Quiz M0 embebido + copy venta ES + módulos como argumento de venta + CTA por SKU. |  
| 20 | **Score M0:** suma directa de 14 preguntas → rango 14–56 global · rango 2–8 por eje. |  
| 21 | **Bandas de diagnóstico M0:** Base (14–26) · Operativo (27–38) · Competitivo (39–49) · Diferenciado (50–56). |  
| 22 | **Integración LS:** LS es únicamente el procesador de pago. Toca un solo punto: botón CTA + redirect a /programa/[sku]. Todo lo demás es independiente. |  
| 23 | **Aprobación LS:** LS requiere ver web y producto antes de aprobar. Cowork construye todo sin LS. Post-aprobación (≤48h): find-and-replace de 3 placeholders `[LS_URL_*]` en `app-utils.js` < 30 min. |  
| 24 | **Entorno de prueba:** execforward.com/programa/test — M1–M6 sin candados, credenciales separadas, banner "versión de prueba". Se desactiva antes del lanzamiento público. |  
| 25 | **Gate S3 dividido:** S3-A = producto funcional probado por círculo del operador vía /test (sin LS). S3-B = LS aprobado → URLs insertadas → compra real end-to-end. S3-A y S3-B corren en paralelo. |  
| 26 | **Brandbook:** aprobado y cerrado. Paleta azul #2563EB + teal #14B8A6 · Karla 700 + Nunito 400 · 5 variantes SVG en /logo/. Referencia definitiva para Cowork en T3.9. |  

### Escalera de SKUs (cerrada)  

| SKU | Precio | Contenido | Promesa |  
|---|---:|---|---|  
| Tripwire | $29 | M1 | Propuesta de valor ejecutiva — el núcleo |  
| Core | $59 | M1–M3 | Posicionamiento completo: PV + mercado + CV/LinkedIn |  
| Bundle | $89 | M1–M6 | Sistema completo de búsqueda ejecutiva end-to-end |  
| Premium | — | Scorecard IA | Deshabilitado hasta gatillo Fase 2 |  

---  

## 2. Arquitectura del sistema  

```
FUNNEL DE CONVERSIÓN (gratuito)  
──────────────────────────────
Landing execforward.com ✅ LIVE  
 └── Quiz M0 (HTML vanilla) ✅ LIVE en /quiz  
 └── Score + texto copiable con resultado  
 └── CTA personalizado por banda → [LS_URL_*] checkout  
 ↑ PENDIENTE post-aprobación LS  

PRODUCTO (pagado)  
──────────────────────────────
Post-purchase redirect → execforward.com/programa/[SKU]  
 └── Pantalla onboarding "¿cuál fue tu score?"  
 └── Sidebar personalizado por banda de score  
 └── M1 → M2 → M3 → M4 → M5 → M6  
 · Preguntas interactivas con feedback condicional  
 · Prompts con botón "copiar"  
 · Audio NotebookLM embebido por módulo  
 · Video NotebookLM embebido por módulo  
 · Mindmap visual por módulo  
 · 1 video intro prompts (post primera interacción)  
 · Progreso por módulo (checkmarks)  

ENTORNO DE PRUEBA  
──────────────────────────────
execforward.com/programa/test ✅ SHELL LISTO  
 └── M1–M6 completos · sin candados · credenciales separadas  
 └── Banner "versión de prueba" · se desactiva antes de lanzamiento  

INTEGRACIÓN LS — HUECO PLANIFICADO  
──────────────────────────────
Placeholder [LS_URL_START] / [LS_URL_CORE] / [LS_URL_BUNDLE]  
 └── Viven en app-utils.js (líneas 341 y 468) + quiz resultado + landing  
 └── Find-and-replace post-aprobación LS · < 30 min · un solo archivo principal  
 └── Aprobación LS: someter cuando /test tenga M1–M6 completos (Gate S3-A)  

FASE 2 (bloqueada hasta criterio numérico)  
──────────────────────────────
SKU Premium deshabilitado en LS desde S3  
Quiz M0 → scorecard IA automatizado (misma rúbrica, nueva capa)  
```  

### Score M0  

| Elemento | Detalle |  
|---|---|  
| Ejes | 7 |  
| Preguntas por eje | 2 |  
| Total preguntas | 14 |  
| Opciones por pregunta | A=1 · B=2 · C=3 · D=4 |  
| Score global | Suma de 14 preguntas → rango **14–56** |  
| Score por eje | Suma de 2 preguntas → rango **2–8** (uso interno) |  

### Bandas de diagnóstico M0  

| Banda | Score | Nombre |  
|---|---|---|  
| 1 | 14–26 | Base |  
| 2 | 27–38 | Operativo |  
| 3 | 39–49 | Competitivo |  
| 4 | 50–56 | Diferenciado |  

### Acceso por SKU  

| SKU | URL | Módulos visibles | Credencial |  
|---|---|---|---|  
| Tripwire $29 | /programa/start | M1 | ef-start-k9x2m7pq / Rv4mT8nP |  
| Core $59 | /programa/core | M1–M3 | ef-core-j4t6n1bz / Xk7qB2wS |  
| Bundle $89 | /programa/bundle | M1–M6 | ef-bundle-h7w3c8yf / Nm3pL6jA |  
| Test | /programa/test | M1–M6 (sin candados) | ef-test-r5v8d2kg / Wd9cFItY |  

> ⚠️ Desactivar credenciales /test antes del lanzamiento público.  

### Gatillo de Fase 2 — número, no corazonada  

| Criterio | Umbral |  
|---|---:|  
| Volumen | ≥ 25 ventas/mes sostenidas 30 días |  
| Canal | ≥ 30% vía afiliados |  
| Calidad | Reembolsos < 5% |  

---  

## 3. Carta Gantt  

**Leyenda:** ✅ Completo · ⏳ En curso · ⬜ Pendiente · ▲ Acción única · ┊ Hito  

> S1 = 19–25 may · S2 = 26 may–1 jun · S3a = 2–8 jun · S3b = 9–15 jun · S4 = 16–22 jun · S5 = 23–29 jun · S6 = 30 jun–6 jul  

[GANTT CHART OMITTED FOR BREVITY - Available in full file]

---  

## 4. Entregables verificables por semana  

| Semana | Entregable concreto | Prueba de verificación | Ejecutor |  
|---|---|---|---|  
| **S1** ✅ | Tienda LS · dominio · logo · M0–M6 ES completos | Contenido aprobado · tienda accesible | Claude · Tú · Cónyuge |  
| **S2** ✅ | Spec web app · spec quiz · copy landing · email score · landing live · quiz live · web app shell | execforward.com live · /quiz funcional · /programa/test con login y sidebar | Claude · Cowork · Tú |  
| **S3a** | Logo v2 ✅ · Brandbook ✅ · M0–M6 en /test · onboarding y cierre · emails LS · audio/video NbLM producido | /test navegable completo · brandbook entregado a Cowork | Cowork · Tú · Claude |  
| **S3b** | Variantes PT/EN/FR · SKUs en LS · LS aprobado · [LS_URL_*] insertados · compra real de prueba | Compra end-to-end en ≥2 idiomas | Tú · Cowork · Cónyuge |  
| **S4** | Disparo LinkedIn ejecutado · dashboard con datos · diagnóstico documentado | Post publicado (timestamp) · métricas reales · veredicto 1 pág | Tú · Claude |  
| **S5** | Motor afiliados activo · ≥1 afiliado aprobado automáticamente · pack creatives | URL signup funcional · 1 afiliado sin intervención | Cónyuge · Cowork |  
| **S6** | Veredicto tracción · checklist gatillo Fase 2 · plan 30 días | Métricas vs umbral · plan aprobado | Tú · Claude |  

---  

## 5. Hitos de validación y circuit-breakers  

### Hito S4 — ¿el producto convierte?  

**PASS si al cierre de S4:**  
- ≥ 10 ventas pagadas acumuladas, o  
- ≥ 4 ventas en las primeras 72h post-disparo  

**Circuit-breaker S4:**  

| Diagnóstico | Palanca |  
|---|---|  
| Tráfico OK · conversión <1% | Reescribir copy · bajar precio ancla · activar tripwire más agresivo |  
| Conversión OK · tráfico bajo | Adelantar afiliados · activar variantes PT/FR · segundo ángulo de post |  
| Ambas bajas | Repositionar a VP/gerencia desplazada · relanzar a sub-segmento |  

### Hito S6 — ¿hay tracción medible?  

**PASS si se cumple cualquiera:**  
- ≥ 20 ventas acumuladas totales, o  
- Run-rate últimas 2 semanas ≥ 8 ventas/2 sem + ≥ 1 venta vía afiliado  

**Circuit-breaker S6:**  
1. Precio — A/B bajar ancla o reconfigurar escalera  
2. Ángulo — reescribir promesa (misma IP, otro job-to-be-done)  
3. Audiencia — repositionar segmento + relanzar a sub-lista + 5 afiliados nicho PT/ES  

---  

## 6. Economía unitaria  

Fees verificados may 2026. Confirmar al configurar.  

| Caso | Neto estimado | Nota |  
|---|---:|---|  
| Venta directa $89 | ≈ $81 | Fee LS ~5% + $0,50 + 1,5% intl |  
| Venta directa $59 | ≈ $53 | Idem |  
| Venta directa $29 | ≈ $25 | Idem |  
| Venta vía afiliado $89 | ≈ $35 | Fee LS + 50% comisión |  
| Venta vía afiliado $59 | ≈ $23 | Idem |  
| Para $1.000 neto/mes (mix 60/40, ancla $89) | ≈ 17 ventas | — |  

---  

## 7. Inversión acumulada  

| Concepto | Monto | Estado |  
|---|---:|---|  
| Dominio execforward.com | ~$10 | ✅ Pagado |  
| Plataforma LS | $0 | Fee solo sobre ventas |  
| Producción (Cowork, Claude, herramientas) | $0 | Incluido en plan pagado |  
| Hosting web app (Cloudflare Pages) | $0 | Gratuito |  
| Test de ads (solo si circuit-breaker) | ≤ $80 | Reservado |  
| **Total base / tope** | **~$10 / <$92** | Caja-positivo desde venta 1 |  

---  

## 8. Archivos del proyecto  

| Archivo | Descripción | Versión |  
|---|---|---|  
| `Roadmap_ExecForward_v7_2.md` | Este archivo | v7.2 |  
| `Brandbook_ExecForward_v1.md` | Estrategia de marca + sistema visual completo | v1.0 |  
| `Spec_Tecnica_ExecForward_Cowork_v1.1.md` | Spec técnica completa para Cowork | v1.1 |  
| `Handoff_Cowork_ExecForward_v1.md` | Handoff completo con copy y orden de ejecución | v1.0 |  
| `M0_y_M1_Completo_v2.md` | M0 diagnóstico + M1 propuesta de valor | v2 |  
| `M2_Mercado_Objetivo_y_Mercado_Oculto.md` | Módulo 2 | — |  
| `M3_CV_Ejecutivo_y_LinkedIn.md` | Módulo 3 | — |  
| `M4_Red_de_Contactos_y_Networking.md` | Módulo 4 | — |  
| `M5_Pitch_Entrevista_y_Negociacion.md` | Módulo 5 | — |  
| `M6_Gestion_del_Proceso_y_Plan_Ejecucion.md` | Módulo 6 | — |  
| `logo/EF_logo_A_isotipo.svg` | Isotipo solo — favicon, avatar, app icon | v1.0 |  
| `logo/EF_logo_B_horizontal.svg` | Logo horizontal — navbar, email, docs | v1.0 |  
| `logo/EF_logo_C_apilado.svg` | Logo apilado — portadas, tarjetas | v1.0 |  
| `logo/EF_logo_D_dark.svg` | Dark mode — fondos oscuros | v1.0 |  
| `logo/EF_logo_E_monocromo.svg` | Monocromo — impresión a un color | v1.0 |  

---  

## 9. Próximos pasos en orden  

> Roadmap v7.2 — cambios vs v7.1: T3.7 logo + brandbook marcados ✅. Decisión 26 cerrada (brandbook). Archivos del proyecto actualizados con logo SVGs y brandbook.  

| # | Tarea | Quién | Cuándo |  
|---:|---|---|---|  
| 1 | ⬜ T3.5 — Cowork pantallas onboarding y cierre | Cowork | Ahora |  
| 2 | ⬜ T3.6 — Cowork plantillas email confirmación LS (3 SKUs) | Cowork | Ahora |  
| 3 | ⬜ T3.3 — Producir audio + video NbLM por módulo | Tú | S3a (paralelo) |  
| 4 | ⬜ T3.8 — Revisión funcional completa de /test | Tú · Claude | Post T3.5 + T3.6 |  
| 5 | ⬜ T3.9 — Pase de brandbook sobre todo el producto | Cowork | Post T3.8 |  
| 6 | ⬜ T3.12 — Someter producto a aprobación LS | Cónyuge · Tú | Post brandbook |  
| 7 | ⬜ T3.14 — Find-and-replace `[LS_URL_*]` en app-utils.js | Tú | Post-aprobación LS |  
| 8 | ⬜ Gate S3-A — Prueba de círculo vía /programa/test | Tú · círculo | Cierre S3a |  

---  

*ExecForward · Roadmap v7.2 · 26 may 2026*
