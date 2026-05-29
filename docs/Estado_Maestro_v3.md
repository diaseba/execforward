# ExecForward — Estado Maestro  
**Actualizado:** 26 may 2026 · S3a en curso  

---

## Resumen ejecutivo

| Campo | Estado |
|---|---|
| Semana actual | S3a (2–8 jun) |
| Fase | Fase 1 — Producto digital ES |
| Próximo gate | S3-A: /test con M1–M6 completos · probado por círculo |
| Bloqueadores activos | T1.2 (tienda LS payout) ⏳ |
| Presupuesto invertido | ~$10 (dominio) de <$92 tope |

---

## Estado de tareas

### S1 — Completado ✅

| Tarea | Entregable | Estado |
|---|---|---|
| T1.1 Decisiones fundacionales | Roadmap v7.2 cerrado | ✅ |
| T1.2 Tienda LS + payout | Tienda creada | ⏳ payout pendiente |
| T1.3 Dominio + logo | execforward.com · logo v2 | ✅ |
| T1.4 Contenido M0–M6 ES | 7 archivos .md completos | ✅ |

### S2 — Completado ✅

| Tarea | Entregable | Estado |
|---|---|---|
| T2.1 Spec técnica web app | Spec_Tecnica_ExecForward_Cowork_v1.1.md | ✅ |
| T2.2 Spec quiz M0 landing | Incluida en Spec técnica | ✅ |
| T2.3 Copy landing ES master | Incluido en Handoff Cowork | ✅ |
| T2.4 Diseño email score quiz | Incluido en Handoff Cowork | ✅ |
| T2.5 Landing page live | execforward.com live | ✅ |
| T2.6 Quiz M0 funcional en /quiz | execforward.com/quiz | ✅ |
| T3.1 Shell web app (4 versiones) | /programa/test operativo | ✅ |
| T3.2 Integrar contenido M0–M6 en web app | Contenido M1–M6 integrado + interactividad | ✅ |
| T3.4 Mindmaps SVG por módulo (M1–M6) | 6 SVGs embebidos en web app | ✅ |

### S3a — En curso (2–8 jun)

| Tarea | Ejecutor | Estado |
|---|---|---|
| T3.7 Logo v2 + brandbook | Tú · Claude | ✅ Completado 26 may |
| T3.5 Pantallas onboarding y cierre | Cowork | ✅ Completado 26 may |
| T3.5b Corrección flujos transición/upsell/cierre | Cowork | ð Tarea entregada — Tarea_Cowork_Pasos_7_y_7b.md |
| T3.6 Plantillas email confirmación LS (3 SKUs) | Cowork | ð Tarea entregada — Tarea_Cowork_Pasos_7_y_7b.md |
| T3.3 Audio + video NotebookLM por módulo | Tú | ⬜ En paralelo |
| T3.8 Revisión funcional completa de /test | Tú · Claude | ⬜ Post T3.5b + T3.6 |
| T3.9 Pase de brandbook sobre web app | Cowork | ⬜ Post T3.8 |
| T3.12 Someter producto a aprobación LS | Cónyuge · Tú | ⬜ Post brandbook |

### S3b — Pendiente (9–15 jun)

| Tarea | Ejecutor | Estado |
|---|---|---|
| T3.10 Variantes PT/EN/FR (landing + web app) | Cowork | ⬜ |
| T3.11 Cargar SKUs en LS (Premium deshabilitado) | Cónyuge | ⬜ |
| T3.13 Aprobación LS recibida (≤48h) | LS | ⬜ |
| T3.14 Find-and-replace [LS_URL_*] en app-utils.js | Tú · Cónyuge | ⬜ — ahora son 5 placeholders (ver nota) |
| T3.15 Configurar afiliados en LS (oculto) | Cónyuge · Claude | ⬜ |
| T3.16 Post LinkedIn + mensajes afiliados | Claude · Tú | ⬜ |

> **Nota T3.14:** Los placeholders de find-and-replace son ahora 5 (no 3):
> `[LS_URL_START]` · `[LS_URL_CORE]` · `[LS_URL_BUNDLE]` · `[LS_URL_BUNDLE_UPGRADE_START]` · `[LS_URL_BUNDLE_UPGRADE_CORE]`
> Los dos nuevos corresponden a los precios de upgrade con descuento ($60 y $30 respectivamente). Se configuran en LS en sesión posterior.

### S4–S6 — Pendiente

| Tarea | Ejecutor | Cuándo |
|---|---|---|
| T4.1 ▲ Disparo único LinkedIn (10.429) | Tú | S4 |
| T4.2 Monitoreo pasivo métricas | Cónyuge | S4–S6 |
| T5.1 ▲ Outreach afiliados (una vez) | Tú | S5 |
| T5.2 Activar signup afiliados + auto-aprobación | Cónyuge | S5 |
| T5.3 Pack creatives para afiliados | Cowork | S5 |

---

## Gates y checklist

- [x] Gate S2: Specs aprobadas → Cowork arrancó ✅
- [ ] Gate S3-A: /test con M1–M6 completos · revisión funcional OK · brandbook aplicado · probado por círculo
- [ ] Gate S3-B: LS aprobado + find-and-replace [LS_URL_*] + compra real end-to-end
- [ ] Hito S4: ≥10 ventas acumuladas o ≥4 en primeras 72h post-disparo
- [ ] Hito S6: ≥20 ventas acumuladas o run-rate ≥8 ventas/2 sem + ≥1 vía afiliado

---

## Métricas (activas post-lanzamiento S4)

| Métrica | Umbral Fase 2 | Actual |
|---|---|---|
| Ventas/mes | ≥ 25 sostenidas 30 días | — |
| Canal afiliados | ≥ 30% del total | — |
| Reembolsos | < 5% | — |

---

## Credenciales entornos (confidencial)

| Entorno | URL | Usuario | Password |
|---|---|---|---|
| Tripwire | /programa/start | ef-start-k9x2m7pq | Rv4mT8nP |
| Core | /programa/core | ef-core-j4t6n1bz | Xk7qB2wS |
| Bundle | /programa/bundle | ef-bundle-h7w3c8yf | Nm3pL6jA |
| Test | /programa/test | ef-test-r5v8d2kg | Wd9cFItY |

> ⚠️ Desactivar credenciales /test antes del lanzamiento público.

---

## Archivos del proyecto

| Archivo | Descripción |
|---|---|
| Roadmap_ExecForward_v7_2.md | Fuente de verdad — decisiones, Gantt, economía |
| Brandbook_ExecForward_v1.md | Sistema visual completo — paleta, tipografía, componentes, voz |
| Spec_Tecnica_ExecForward_Cowork_v1_1.md | Spec técnica completa para Cowork |
| Handoff_Cowork_ExecForward_v1.md | Handoff con copy y orden de ejecución |
| Tarea_Cowork_Pasos_7_y_7b.md | Tarea activa Cowork — emails LS + flujos transición/upsell/cierre |
| M0_y_M1_Completo_v2.md | Módulos M0 + M1 |
| M2_Mercado_Objetivo_y_Mercado_Oculto.md | Módulo M2 |
| M3_CV_Ejecutivo_y_LinkedIn.md | Módulo M3 |
| M4_Red_de_Contactos_y_Networking.md | Módulo M4 |
| M5_Pitch_Entrevista_y_Negociacion.md | Módulo M5 |
| M6_Gestion_del_Proceso_y_Plan_Ejecucion.md | Módulo M6 |
| T3_3_NotebookLM_Audio_Video_por_Modulo.md | Brief T3.3 producción audio/video |
| logo/EF_logo_A_isotipo.svg | Isotipo — favicon, avatar, app icon |
| logo/EF_logo_B_horizontal.svg | Horizontal — navbar, email, docs |
| logo/EF_logo_C_apilado.svg | Apilado — portadas, tarjetas |
| logo/EF_logo_D_dark.svg | Dark mode — fondos oscuros |
| logo/EF_logo_E_monocromo.svg | Monocromo — impresión a un color |
| logo/[PNGs Gemini] | Alta resolución para redes y docs |
| Estado_Maestro_v3.md | Este archivo — actualizar semanalmente |

---

## Log de cambios

| Fecha | Cambio |
|---|---|
| 26 may 2026 | Archivo creado. Estado real al cierre de S2. |
| 26 may 2026 | T3.2 y T3.4 marcados ✅. Secuencia S3a corregida. Brandbook agregado como archivo del proyecto. |
| 26 may 2026 | T3.7 ✅: Logo v2 creado con brandbook. 5 SVGs en /logo/. PNGs Gemini en /logo/. Brandbook_ExecForward_v1.md guardado en Drive. Roadmap actualizado a v7.2. |
| 26 may 2026 | T3.5 ✅: Pantallas onboarding y cierre completadas por Cowork (Paso 6). Verificación parcial en /test confirmada. 4 gaps identificados y resueltos: copy CTA cierre, lógica reordenamiento sidebar, persistencia localStorage quiz, pre-fill banda en onboarding. T3.5b y T3.6 — tarea entregada a Cowork (Tarea_Cowork_Pasos_7_y_7b.md): emails confirmación LS (3 SKUs) + flujos de transición entre módulos + pantallas upsell /start y /core + pantalla "Casi llegas" + corrección trigger cierre final. T3.14 actualizado: ahora son 5 placeholders LS. |

---

*Actualizar cada lunes. ≤15 min. Solo cambiar estado de tareas y métrica