# ESTRATEGIA DE MARCA — EXECFORWARD  
**Brandbook v1.1 · 27 may 2026** (corrección de proporciones logo)  

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

### Construcción del isotipo (fuente de verdad)

El isotipo es la **Variante A** y consta de dos elementos:
- **Barras horizontales** (5 barras paralelas) — representan la trayectoria ejecutiva, el track record
- **Chevrones de avance** (3 flechas en degradado de opacidad) — representan el movimiento hacia adelante

**Specs internas del isotipo (viewBox 200×200):**

| Elemento | Specs |
|---|---|
| Barras | `width=72, height=16, rx=3`, gap 6 entre barras, primera en `y=44` |
| Chevrones | 3 piezas, ancho 31 cada una, offset horizontal +23 entre ellas |
| Posición chevrones | Pegados a las barras (sin gap) — primera comienza en `x=113`, justo donde acaban las barras `x=112` |
| Opacidad chevrones | 1.0 / 0.70 / 0.40 (degradado hacia la derecha) |

**Regla clave:** las barras y chevrones funcionan como **una sola unidad compacta**. Nunca aumentar el espacio entre barras y chevrones — esta proporción es la firma visual de la marca y se mantiene escalada a cualquier tamaño.

### Lockup horizontal (wordmark + isotipo)

| Elemento | Specs |
|---|---|
| ViewBox | `0 0 440 80` |
| Wordmark | `font-family: Karla, weight 700, size 52, letter-spacing -0.5`, posición `x=0, y=58` |
| Isotipo dentro del lockup | Variante A escalada a 0.51 (barras `36×9`, chevrones proporcionales). Wrapped en `<g transform="translate(350, 0)">` |
| Gap visual wordmark↔isotipo | ~29px en viewBox (a ojo se ve como 4 cuerpos de "o") |

**No** usar barras de `width=30, height=7` ni isotipo posicionado en `x=398` (proporciones de v1.0 — deprecated).

### Paleta de colores del logo

| Variante | Wordmark | Barras | Chevrones |
|---|---|---|---|
| **A · Isotipo** | — | `#2563EB` | `#14B8A6` |
| **B · Horizontal** | `#1F2937` | `#2563EB` | `#14B8A6` |
| **C · Apilado** | `#1F2937` | `#2563EB` | `#14B8A6` |
| **D · Dark mode** | `#FFFFFF` | `#60A5FA` | `#2DD4BF` |
| **E · Monocromo** | `#000000` | `#000000` | `#000000` (opacidades 1.0 / 0.60 / 0.30) |

### Tamaños mínimos y zona de respeto

| Aplicación | Altura mín. |
|---|---|
| Watermark de video (top-left) | 22-32px |
| Header web | 32-40px |
| Logo display (hero / brand reveal) | 80-140px |
| CTA card | 70-90px |
| Favicon | Variante A (isotipo solo) a 32×32 mín. |

**Zona de respeto:** un mínimo equivalente a la altura del isotipo (no del wordmark) debe quedar libre alrededor del lockup.

### Casos prohibidos

- ❌ No estirar el lockup horizontal ni vertical
- ❌ No separar el isotipo del wordmark en el lockup horizontal
- ❌ No cambiar los colores del isotipo a colores no listados arriba
- ❌ No invertir el orden (wordmark debe ir SIEMPRE a la izquierda, isotipo a la derecha en variante B)
- ❌ No usar el isotipo sin las 3 capas de opacidad (1.0 / 0.70 / 0.40)
- ❌ No rasterizar — usar siempre el SVG vectorial