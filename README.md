# IG - Semana 9 y 10 - Shaders

## Autor

- Sergio Dámaso Guerra

## Shader de fragmentos

Este shader representa una **flor o estrella de siete pétalos** que presenta un efecto de respiración (dilatación y contracción) y cambios dinámicos de color. Ambos efectos se aplican únicamente en un sector determinado por la posición del cursor, mientras que el resto de la figura permanece estático y conserva su color original.

### Flujo de funcionamiento

1. **Coordenadas:** se centran las coordenadas respecto a la pantalla y se transforman a coordenadas polares (radio y ángulo).
2. **Forma de la flor:** se utiliza una función coseno dependiente del ángulo para generar los siete pétalos.
3. **Influencia del cursor:** se calcula la diferencia angular entre cada fragmento y el cursor, obteniendo una máscara suavizada que delimita el sector afectado.
4. **Animación:** se modifica el radio de la flor mediante una función seno del tiempo, produciendo el efecto de respiración únicamente en el sector seleccionado.
5. **Colores:** se interpola entre rosa y azul en función del tiempo, mezclando el resultado con el color base según la influencia del cursor.
6. **Resultado final:** se genera una máscara de la flor mediante `smoothstep` y se utiliza `mix` para combinar su color con el fondo.

### Versiones del shader

Se incluyen dos versiones del shader:

- `flor.frag`: versión desarrollada y comentada, que facilita la comprensión de las operaciones y efectos implementados.

- `flor_tiny.frag`: versión compactada y optimizada para cumplir con la restricción de 512 bytes, eliminando comentarios, espacios y simplificando algunas operaciones.

Ambas versiones mantienen el mismo efecto visual, con pequeñas diferencias derivadas de la optimización.

### Ejecución

El shader utiliza las variables uniformes `u_resolution`, `u_mouse` y `u_time` para controlar la resolución, la posición del cursor y la animación, respectivamente.

Puede ejecutarse directamente en el editor online [The Book of Shaders](https://editor.thebookofshaders.com/).