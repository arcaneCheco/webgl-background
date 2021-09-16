import * as THREE from "three";
import Experience from "./Experience";

export default class Smoke {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    this.count = 10;
    this.group = new THREE.Group();
    this.group.position.y -= 2;
    this.scene.add(this.group);

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "smoke",
      });
    }

    this.setGeometry();
    this.setMaterial();
    this.setItems();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      alphaMap: this.resources.items.smokeTexture,
      opacity: 0.1 + Math.random() * 0.4,
    });
  }

  setItems() {
    this.items = [];

    for (let i = 0; i < this.count; i++) {
      const item = {};

      item.floatingSpeed = Math.random() * 0.0001;
      item.rotationSpeed = (Math.random() - 0.5) * Math.random() * 0.0003;

      const scale = 3 + Math.random() * 3;

      // Mesh
      item.mesh = new THREE.Mesh(this.geometry, this.material);
      item.mesh.scale.set(scale, scale, scale);
      item.mesh.position.x += (Math.random() - 0.5) * 10;
      this.group.add(item.mesh);

      // Save
      this.items.push(item);
    }
  }

  resize() {}

  update() {
    const elapsedTime = this.time.elapsed + 123456789.123;

    for (const _item of this.items) {
      _item.mesh.rotation.z = elapsedTime * _item.rotationSpeed;
      _item.mesh.position.y = Math.sin(elapsedTime * _item.floatingSpeed);
    }
  }
}
