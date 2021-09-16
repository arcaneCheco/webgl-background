uniform float uTime;

attribute float aProgress;
attribute float aSize;
attribute float aAlpha;

varying float vAlpha;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

void main() {
    float progress = mod(aProgress + uTime * 0.00001, 1.);

    vec4 modelPosition = modelMatrix * vec4(position, 1.);
    modelPosition.y += progress * 10.;
    modelPosition.x += perlin3d(modelPosition.xyz * 0.2) * 3.;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = 50. * aSize;
    gl_PointSize *= 1. / -viewPosition.z;

    vAlpha = aAlpha;
}