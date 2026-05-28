# ESTRATEGIA DE MARCA — EXECFORWARD
**Brandbook v1.2 · 28 may 2026**

> **Cambios respecto a v1.1:**
> - **Gap horizontal recalibrado** según referencia del usuario: `gap = 0.354 × cap-height del texto` (antes era ~1.5× cap-height — el isotipo flotaba demasiado lejos del wordmark).
> - **Isotipo más prominente en horizontales**: `isoH = 1.98 × cap-height` (antes ~1.5×). El isotipo ahora visualmente "pesa" como debe a la derecha del wordmark.
> - **Apilado (C) rediseñado** según referencia del usuario: wordmark en weight 800 (antes 700), `isoH = 3.53 × cap-height`, `vGap = 0.456 × cap-height`.
> - **Nuevas variantes apiladas:** `C_dark` y `C_mono` (antes solo existía C light).
> - **Nuevas variantes isotipo:** `A_dark` y `A_mono` para paridad con apilado.
> - Geometría del isotipo unificada: **una sola fuente de verdad** (Variante A canónica, aspect 1.339).

---

## 1. CORE DE MARCA

| Dimensión | Definición |
|---|---|
| **Rol** | Coach cercano que te entiende — no herramienta fría, no gurú distante |
| **Usuario entrada** | Frustración + urgencia — sabe que necesita actuar, no sabe cómo |
| **Propuesta** | Costo de producto ($89) + expertise de coach real + IA que personaliza → sin meses de coaching |
| **Emoción salida** | Confianza en el sistema + claridad en pasos + "hay alguien que me entiende aquí" |

---

## 2. IDENTIDAD VISUAL — LOGO

### 2.1 Sistema de variantes

Tres formas (A, B, C) × tres tratamientos cromáticos (light, dark, mono):

| Forma | Light (default) | Dark | Mono |
|---|---|---|---|
| **A** · Isotipo solo | `EF_logo_A_isotipo.svg` | `EF_logo_A_isotipo_dark.svg` | `EF_logo_A_isotipo_mono.svg` |
| **B** · Horizontal (texto + isotipo lado a lado) | `EF_logo_B_horizontal.svg` | **D** · `EF_logo_D_dark.svg` | **E** · `EF_logo_E_monocromo.svg` |
| **C** · Apilado (isotipo arriba, texto abajo) | `EF_logo_C_apilado.svg` | `EF_logo_C_apilado_dark.svg` | `EF_logo_C_apilado_mono.svg` |

> **Nota histórica:** D y E son nombres heredados del kit original — son simplemente variantes cromáticas de B. Se mantienen para compatibilidad con `_system/CONTEXT.md` y el brandbook v1.0.

### 2.2 Construcción del isotipo (canónica)

El isotipo es la **Variante A** y consta de dos elementos en una sola unidad compacta:

- **5 barras horizontales paralelas** (azul `#2563EB`) — track record / trayectoria ejecutiva
- **3 chevrones de avance en degradado** (teal `#14B8A6` con opacidades 1.0 / 0.70 / 0.40) — movimiento hacia adelante

**Specs canónicas (Variante A, viewBox 200×200):**

| Elemento | Specs |
|---|---|
| Barras | 5 × `width=72, height=16, rx=3` · gap vertical 6px entre barras · `x=40`, primera barra `y=44` |
| Chevrones | 3 piezas, cada una 31px ancho con notch interno · offset horizontal +23 entre piezas · primera empieza en `x=113` (pegada al borde derecho de las barras) |
| Bounding box del iso | x `[40..190]` · y `[44..156]` → **W=150 H=112 aspect=1.339** |
| Opacidad chevrones | 1.0 / 0.70 / 0.40 (degradado hacia la derecha) |

**Regla clave:** las barras y chevrones son **una unidad compacta** y la geometría es fija — los lockups B y C solo escalan la Variante A; nunca redibujan sus partes.

### 2.3 Lockup horizontal (B / D / E)

Sistema proporcional anclado al wordmark:

```
cap-height (capH) = font-size × 0.72       [empírico para Karla Bold]
isoH              = 1.98 × capH            [isotipo casi 2× la altura de mayúsculas]
isoW              = isoH × 1.339           [aspect canónico]
gap text → iso    = 0.354 × capH           [≈ tercio de cap-height]
iso vertical      = centrado ópticamente sobre la línea de mayúsculas
```

**Tamaño de referencia (defaults del SVG):**

| Parámetro | Valor |
|---|---|
| Font family | Karla, fallback Helvetica Neue / Arial |
| Font weight | **700** |
| Font size | 52 |
| Letter spacing | -0.5 |
| Cap height resultante | ~37.4 |
| isoH × isoW | 74.1 × 99.3 |
| Gap | 13.2 |
| Scale del isotipo vs canónica A | 0.662 |

### 2.4 Lockup apilado (C)

Más vistoso, para portadas y tarjetas. Wordmark **más pesado** (weight 800) y proporcionalmente menor:

```
font-weight       = 800                    [más chunky que el horizontal]
isoH              = 3.53 × capH            [iso visualmente domina la composición]
vGap iso → texto  = 0.456 × capH
texto             = centrado horizontalmente bajo el iso
```

**Tamaño de referencia:**

| Parámetro | Valor |
|---|---|
| Font weight | **800** |
| Font size | 44 |
| Cap height | ~31.7 |
| isoH × isoW | 111.8 × 149.8 |
| vGap | 14.5 |
| Scale del isotipo vs canónica A | ~1.00 |

### 2.5 Paleta cromática por tratamiento

| Tratamiento | Barras | Chevrones | Wordmark |
|---|---|---|---|
| **Light** (default, fondos claros) | `#2563EB` | `#14B8A6` (opacidades 1/0.7/0.4) | `#1F2937` |
| **Dark** (fondos oscuros) | `#60A5FA` | `#2DD4BF` (opacidades 1/0.7/0.4) | `#FFFFFF` |
| **Mono** (impresión un tono) | `#000000` | `#000000` (opacidades 1/0.60/0.30) | `#000000` |

### 2.6 Tamaños mínimos y zona de respeto

| Aplicación | Variante | Altura mínima |
|---|---|---|
| Watermark de video (top-left) | B o D | 22-32 px |
| Header web | B o D | 32-40 px |
| Logo display (hero / brand reveal) | B / C / D | 80-140 px |
| CTA card / portada | C apilado | 100-180 px |
| Favicon / app icon | A isotipo | 32×32 mín. |
| Impresión un tono | E (horizontal) o C_mono (apilado) | seguir specs anteriores |

**Zona de respeto:** mínimo equivalente a la altura del isotipo libre alrededor del lockup. Para C apilado, equivalente al ancho del chevron más pequeño.

### 2.7 Casos prohibidos

- ❌ No estirar ni distorsionar (todos los SVGs preservan aspect ratio).
- ❌ No separar el isotipo del wordmark en B (lockup compacto, gap fijo proporcional).
- ❌ No invertir el orden (en B el wordmark va SIEMPRE a la izquierda).
- ❌ No cambiar colores del isotipo fuera de las paletas listadas en 2.5.
- ❌ No usar chevrones sin sus tres niveles de opacidad.
- ❌ No reemplazar la familia tipográfica sin actualizar el brandbook.
- ❌ No rasterizar el SVG; usar siempre vectorial.
