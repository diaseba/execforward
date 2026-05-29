# Veo Clip Prompt · TODO scene id

> Una copia de este archivo por clip. Pegar el bloque en español al final directo en Veo 3 (Gemini AI Studio · aistudio.google.com → Veo). **Antes de generar, verifica brand lock en `_system/CONTEXT.md` §2 (casting + look).**

---

## Metadata
- **Video:** `videos/NNN-slug/`
- **Escena que cubre:** TODO (id, tIn-tOut según timeline)
- **Duración del clip:** TODO seg (= duración del acto + 1 s de cola para crossfade)
- **Aspect:** 1920×1080 (16:9) o 1080×1920 (9:16) según el video
- **Intentos:** Veo permite 1-2 reintentos · si al tercer intento no calza, simplificar el prompt o ir a stock

---

## Prompt (pegar en Veo · español)

```
TODO acción/sujeto. (Ejemplo de estructura, no copiar literal:)

Mujer ejecutiva latinoamericana de 45 años, cabello recogido bajo, blusa color camel sobre fondo de oficina con luz de tarde fría que entra por una ventana grande. Está sentada frente a un laptop plateado abierto sobre un escritorio de madera oscura, con los hombros ligeramente caídos y mirada cansada al monitor. Plano medio frontal, ligeramente bajo ángulo. Cámara muy lenta, casi estática, con leve respiración de cámara. Depth of field marcado: ella en foco, fondo desenfocado. Color grading frío con azules apagados, baja saturación, sombras profundas, alta nitidez en la cara. Estética editorial cinematográfica, referencia: Forbes Mujer / Bloomberg Línea. Sin texto en pantalla, sin gráficos, sin objetos identificables de marca terceros.

Duración: 6 segundos. Movimiento mínimo. Loopeable en los extremos.
```

### Reglas para escribir el prompt

1. **Empezar por el sujeto + acción + contexto** (no por el estilo).
2. **Especificar casting según CONTEXT §2** literalmente — Veo se sesga a estereotipos si no se lo dices.
3. **Encuadre** explícito: plano medio · plano cerrado · plano americano · over the shoulder.
4. **Movimiento de cámara mínimo** — “casi estática, leve respiración”. Veo añade movimiento agresivo si no lo restringes.
5. **Iluminación + color grading**: tono, dirección, temperatura, saturación, sombras.
6. **Lente / DOF**: depth of field marcado, fondo desenfocado.
7. **Referencia editorial** (Forbes Mujer, Bloomberg Línea, MasterClass, Apple).
8. **Lista de NO**: sin texto en pantalla, sin gráficos sobreimpuestos, sin logos de terceros, sin emojis, sin caras famosas reconocibles.
9. **Duración + loopability** al final.

---

## Variantes a probar

Si el primer intento falla, ajustar UNA variable a la vez (no reescribir todo):

- [ ] Cambiar encuadre (medio → cerrado / lateral → frontal)
- [ ] Bajar/subir intensidad de luz
- [ ] Cambiar prenda/color de vestuario
- [ ] Más/menos movimiento de cámara
- [ ] Otra referencia editorial

## Plan B (si Veo no da el clip aceptable en 3 intentos)

1. Buscar en **Pexels** o **Pixabay** con keywords específicas: TODO
2. Si necesitas múltiples versiones del mismo plano, considera grabarlo con iPhone + estabilizador (luz natural + ropa según §2)
3. Re-encuadrar/cropear en DaVinci para acomodar
