import * as THREE from "three";
import Experience from "./Experience";
import vertexShader from "./shaders/particles/vertex.glsl";
import fragmentShader from "./shaders/particles/fragment.glsl";

export default class Particles {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    this.count = 2000;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "particles",
      });
    }

    this.setGeometry();
    this.setMaterial();
    this.setPoints();
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();

    const positionArray = new Float32Array(this.count * 3);
    const progressArray = new Float32Array(this.count);
    const sizeArray = new Float32Array(this.count);
    const alphaArray = new Float32Array(this.count);

    for (let i = 0; i < this.count; i++) {
      positionArray[i * 3] = (Math.random() - 0.5) * 20;
      positionArray[i * 3 + 1] = 0;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10;

      progressArray[i] = Math.random();

      sizeArray[i] = Math.random();

      alphaArray[i] = Math.random();
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionArray, 3)
    );
    this.geometry.setAttribute(
      "aProgress",
      new THREE.Float32BufferAttribute(progressArray, 1)
    );
    this.geometry.setAttribute(
      "aSize",
      new THREE.Float32BufferAttribute(sizeArray, 1)
    );
    this.geometry.setAttribute(
      "aAlpha",
      new THREE.Float32BufferAttribute(alphaArray, 1)
    );
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uMask: { value: this.resources.items.particleMaskTexture },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });
  }

  setPoints() {
    this.points = new THREE.Points(this.geometry, this.material);
    this.points.position.y = -5;
    this.scene.add(this.points);
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed;
  }
}
