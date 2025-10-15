// main.js
import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { createControls } from './control.js';
import { generateAirfoil } from './airfoil.js';

// --- Scene setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Lighting ---
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

// --- OrbitControls ---<script type="module" src="js/main.js"></script>

const controls = createControls(camera, renderer);
camera.position.set(0, 0, 3);

// --- Airfoil setup ---
let airfoilMesh = null;
document.getElementById("generateBtn").addEventListener("click", async () => {
    if (airfoilMesh) scene.remove(airfoilMesh);
    airfoilMesh = await generateAirfoil(scene);
});

// --- Animation loop ---
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // important for damping
    renderer.render(scene, camera);
}
animate();

// --- Responsive resize ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
