# Tabla de Credenciales — ExecForward
## Uso interno — no compartir públicamente

| SKU | URL de acceso | UUID | Password | Tipo |
|---|---|---|---|---|
| Tripwire ($29) | /programa/start | ef-start-k9x2m7pq | Rv4mT8nP | Producción |
| Core ($59) | /programa/core | ef-core-j4t6n1bz | Xk7qB2wS | Producción |
| Bundle ($89) | /programa/bundle | ef-bundle-h7w3c8yf | Nm3pL6jA | Producción |
| Test (interno) | /programa/test | ef-test-r5v8d2kg | Wd9cF1tY | ⚠️ Prueba — desactivar antes del lanzamiento público |

---

## Módulos accesibles por SKU

| SKU | M1 | M2 | M3 | M4 | M5 | M6 |
|---|---|---|---|---|---|---|
| Tripwire | ✅ | 🔒 | 🔒 | 🔒 | 🔒 | 🔒 |
| Core | ✅ | ✅ | ✅ | 🔒 | 🔒 | 🔒 |
| Bundle | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Test | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Instrucciones para el operador

1. **Antes del lanzamiento público**: cambiar o desactivar las credenciales del entorno `/programa/test` (uuid + password en `programa/test/index.html`).
2. **Para rotar credenciales**: modificar `uuid` y `password` en el bloque `window.SKU_CONFIG` del `index.html` correspondiente y actualizar esta tabla.
3. **Estas credenciales se envían al comprador** por email de confirmación tras completar el pago en Lemon Squeezy. Ver templates en `email-start.html`, `email-core.html`, `email-bundle.html`.
4. **Las credenciales están hardcodeadas en el HTML** — no hay base de datos ni backend. El sistema de autenticación es local (localStorage, 7 días de sesión).
