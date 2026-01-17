// Сцена, камера, рендерер
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050509);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Світло
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 0.6));

// Параметри субіта
const N = 4;
const spacing = 1.2;
const offset = (N - 1) * spacing * 0.5;

const material = new THREE.MeshPhongMaterial({ color: 0x55ccff });
const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);

// Створюємо 4×4×4 блоки
for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    for (let z = 0; z < N; z++) {
      const cube = new THREE.Mesh(geometry, material.clone());
      cube.position.set(
        x * spacing - offset,
        y * spacing - offset,
        z * spacing - offset
      );
      scene.add(cube);
    }
  }
}

// Автообертання сцени
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// Ресайз
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
