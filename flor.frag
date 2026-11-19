// Author: Sergio Dámaso Guerra
// Title: Reactive Sectoral Bloom

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define TAU 6.28318530718

float angleDiff(float a, float b) {
    float d = abs(a - b);
    return min(d, TAU - d);
}

void main() {

    // Coordenadas centradas
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 mouse = (u_mouse.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Coordenadas Polares
    float r = length(st);
    float a = atan(st.y, st.x);
    float aMouse = atan(mouse.y, mouse.x);

    // Forma de la flor
    float radioBase = 0.25 + 0.08 * cos(7.0 * a);

    // Mascara angular: sector alrededor del cursor
    float dAng = angleDiff(a, aMouse);
    float influencia = 1.0 - smoothstep(0.0, 0.45, dAng);

    // Respiracion localizada por sector
    float escala = 1.0 + 0.18 * sin(u_time) * influencia;
    float radio = radioBase * escala;

    // Mascara de la flor
    float flor = 1.0 - smoothstep(radio - 0.005, radio + 0.005, r);

    // Colores
    vec3 fondo = vec3(0.02, 0.02, 0.10);
    vec3 colorFlorBase = vec3(0.98, 0.80, 0.20);

    vec3 rosa = vec3(1.0, 0.2, 0.5);
    vec3 azul = vec3(0.2, 0.4, 1.0);

    float cambio = 0.5 + 0.5 * sin(u_time * 0.8);
    vec3 colorFlorDinamico = mix(rosa, azul, cambio);

    // Mezcla de color solo en el sector afectado
    vec3 colorFlor = mix(colorFlorBase, colorFlorDinamico, influencia);

    // Resultado final
    vec3 color = mix(fondo, colorFlor, flor);

    gl_FragColor = vec4(color, 1.0);
}

