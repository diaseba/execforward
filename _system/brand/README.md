# Brand · ExecForward

Single source of truth para identidad visual. Cualquier cambio aquí cambia todos los videos del proyecto.

## Archivos

| Archivo | Uso |
|---|---|
| `tokens.css` | Colores, tipografía, sombras, scrim, easing. Importar en cualquier HTML que renderice marca. |
| `EF_logo_horizontal_light.svg` | Logo principal para fondos oscuros (default) |
| `EF_logo_horizontal_dark.svg` | Logo para fondos blancos (CTA cards editorial) |
| `EF_logo_isotipo_light.svg` | Isotipo solo (chevrones), para watermark cuando no hay espacio horizontal |
| `EF_logo_A_isotipo.svg` · `_dark` · `_mono` | Isotipo solo en sus 3 paletas. Watermark cuando no hay espacio horizontal o favicon. |
| `EF_logo_B_horizontal.svg` · `D_dark.svg` · `E_monocromo.svg` | Lockup horizontal en sus 3 paletas. Default para watermarks, headers, documentos. |
| `EF_logo_C_apilado.svg` · `_dark` · `_mono` | Lockup apilado (iso arriba, texto debajo) en sus 3 paletas. Para portadas, tarjetas, CTAs. Wordmark más pesado (weight 800). |
| `_logo-verification-v1.2.html` | Hoja visual de todas las variantes a varios tamaños — abrir para validar antes de exportar. |

**Specs proporcionales:** ver `uploads/Brandbook_ExecForward_v1.2.md` §2 para fórmulas (`gap = 0.354 × cap-height`, etc).

## Reglas

- **Un acento, un teal.** El color de marca es `#2DD4BF` (teal-light) para énfasis y `#14B8A6` (teal) para CTA. No introducir otros acentos sin actualizar este folder + `_system/CHANGELOG.md`.
- **Dos fuentes:** Karla (display) + Nunito (body). No agregar terceras.
- **Logo:** horizontal por default. Isotipo solo cuando hay restricción de espacio.

## Si necesitas cambiar algo

1. Edita `tokens.css` (o agrega un logo nuevo)
2. Anota el cambio en `_system/CHANGELOG.md` (crear si no existe)
3. Bumpea versión semántica si el cambio rompe videos anteriores
