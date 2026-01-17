import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js";

// Сцена
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050509);

// Камера
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);

// Контроли
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Світло
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(5, 10, 7);
scene.add(dir);

// Параметри субіта
const N = 4;
const spacing = 1.2;
const offset = (N - 1) * spacing * 0.5;

const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);

// Генерація 4×4×4
for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    for (let z = 0; z < N; z++) {
      const material = new THREE.MeshStandardMaterial({
        color: 0x55ccff,
        roughness: 0.3,
        metalness: 0.1
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        x * spacing - offset,
        y * spacing - offset,
        z * spacing - offset
      );

      scene.add(cube);
    }
  }
}

// Анімація
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Ресайз
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
