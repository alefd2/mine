import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { World } from "./world";
import { createUI } from "./ui";

const stats = new Stats();
document.body.append(stats.dom);

// renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);

// Renderizo os elementos na tela
document.body.appendChild(renderer.domElement);

// camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-80, 50, -32);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(50, 0, 50);
controls.update();

// Scene setup
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

// Lights setup
function setUpLights() {
  const light1 = new THREE.DirectionalLight();
  light1.position.set(5, 10, 7);
  // light1.castShadow = true;
  scene.add(light1);

  const light2 = new THREE.DirectionalLight();
  light2.position.set(-5, 10, -7);
  // light2.castShadow = true;
  scene.add(light2);

  const ambient = new THREE.AmbientLight();
  ambient.intensity = 0.1;
  scene.add(ambient);
}

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setUpLights();
createUI(world);
animate();
