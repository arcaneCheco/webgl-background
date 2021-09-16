uniform float uTime;

varying vec2 vUv;

vec3 hsvToRgb(vec3 c)
// from https://gist.github.com/yiwenl/745bfea7f04c456e0101
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main () {
    vec3 startColor = hsvToRgb(vec3(uTime * 0.0001,1.,1.));
    vec3 endColor = hsvToRgb(vec3(0.5,1.,1.));
    vec3 finalColor = mix(startColor, endColor, vUv.y);
    gl_FragColor = vec4(finalColor, 1.);
}