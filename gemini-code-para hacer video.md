# Manual de Producción de Video con Gemini

Este manual detalla las directrices, parámetros y capacidades necesarias para la generación y edición de video utilizando los modelos **Veo 3**, **Veo 3.1 Fast** y **Gemini Omni**. Está diseñado para proporcionar todo el contexto requerido desde un punto de partida inicial de cero contexto.

## 1. Materiales Base (Inputs Admitidos)
La combinación de elementos debe seguir reglas específicas para optimizar el procesamiento del modelo:
* **Texto (El Prompt):** Descripción detallada de la secuencia, movimientos y atmósfera.
* **Imágenes:** Es posible cargar múltiples imágenes de referencia para establecer un *storyboard*, definir el estilo visual, o fijar la apariencia de personajes y entornos.
* **Video (Regla de Oro):** Para tareas de edición, transformación o continuación, **solo se permite ingresar un video a la vez**. Este input único de video puede combinarse con múltiples imágenes y texto de soporte.

## 2. Parámetros de Generación (El Briefing Técnico)
Para la creación de clips cinematográficos (duración estándar de **8 segundos**), la instrucción debe estructurarse bajo cinco pilares fundamentales:

1. **Sujeto:** Identificación precisa del protagonista o elemento central (ej. un personaje, un objeto, un vehículo).
2. **Acción:** Descripción exacta del movimiento y desarrollo de la escena. Debe especificarse la velocidad y dirección (ej. "corriendo a toda velocidad", "girando hacia la cámara").
3. **Entorno:** Detalle del escenario, condiciones climáticas, paleta de colores y tipo de iluminación (ej. "taller iluminado con luces de neón", "atardecer nublado").
4. **Estilo Visual y Cámara:** Definición estética (hiperrealismo, animación 3D, estilo cómic, etc.) y configuración de cámara (toma panorámica, primer plano, plano secuencia, toma aérea con dron). Se debe especificar el **aspect ratio** requerido (ej. 16:9, 9:16).
5. **Audio:** Indicaciones explícitas sobre efectos de sonido ambientales (Foley), banda sonora o diálogos específicos integrados en la escena.

## 3. Flujo de Trabajo e Interacción
Las capacidades varían según la modalidad de interacción seleccionada dentro del entorno:

### Creación Rápida
* **Modalidad:** Texto a video o Imagen a video.
* **Uso:** Generación ágil de clips cinemáticos iniciales basados en los modelos Veo.

### Mesa de Edición Conversacional (Gemini Omni)
* **Acceso:** Disponible en el panel lateral de navegación ("Videos") o mediante el menú de adición ("+").
* **Comprensión Contextual:** No requiere la entrega de todo el contexto en un único mensaje. Al cargar un video, el modelo asimila la física, la coherencia espacial y el contexto del entorno de manera nativa.
* **Evolución Iterativa:** El proceso de edición es incremental. Es posible modificar elementos de forma secuencial en mensajes sucesivos (ej. ajustar la iluminación en el primer mensaje, añadir un objeto en el segundo y alterar el fondo en el tercero), manteniendo la consistencia estructural de la escena.

---

## Ejemplo de Estructura de Prompt Óptimo
> "Quiero generar un video de 8 segundos en formato 16:9. El sujeto es un astronauta con traje retro. La acción es que está plantando una bandera en cámara lenta. El entorno es la superficie de Marte durante una tormenta de arena roja. El estilo debe ser hiperrealista, estilo documental espacial, con un primer plano de la bandera. Añade sonido de viento fuerte y respiración por radio."