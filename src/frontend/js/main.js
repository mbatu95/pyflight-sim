// Grab container
const container = document.getElementById('three-container');

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

// Camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Plane geometry (placeholder)
const planeGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// Flight path (circle for demo)
const radius = 5;
let angle = 0;

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move plane along circular path
    angle += 0.02; // speed
    plane.position.x = radius * Math.cos(angle);
    plane.position.z = radius * Math.sin(angle);
    plane.position.y = 2 + Math.sin(angle * 2); // slight vertical motion

    // Rotate plane to face direction
    plane.rotation.y = -angle;

    renderer.render(scene, camera);
}

animate();
