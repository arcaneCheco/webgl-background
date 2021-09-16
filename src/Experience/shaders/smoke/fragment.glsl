uniform vec2 uSize;
uniform float uTime;

varying vec2 vUv;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

void main() {
    vec2 smokeUv = vUv * uSize * 0.01;

    // smokeUv.x += perlin3d(vec3(smokeUv * 0.2 + 23.45, 0.)) * 6.;

    // smokeUv.y /= 2.;
    // smokeUv.y -= uTime * 0.0003;

    // smokeUv.y += perlin3d(vec3(smokeUv + 123.45, 0.));

    float smokeStrength = perlin3d(vec3(smokeUv, uTime * 0.0002));
    smokeStrength *= pow(1. - vUv.y, 2.);
    gl_FragColor = vec4(1., 1., 1., smokeStrength);
}