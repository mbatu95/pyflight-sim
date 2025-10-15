// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

camera.position.z = 3;

let airfoilMesh = null;

// Generate airfoil
async function generateAirfoil() {
    const m = parseFloat(document.getElementById("m").value);
    const p = parseFloat(document.getElementById("p").value);
    const t = parseFloat(document.getElementById("t").value);

    const res = await fetch("/api/naca", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({m, p, t, n: 100, span: 0.2})
    });
    const data = await res.json();
    const x = data.x;
    const y = data.y;
    const z = data.z;

    if (airfoilMesh) scene.remove(airfoilMesh);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    // Extrude along z-axis
    for(let zi of z){
        for(let i=0;i<x.length;i++){
            vertices.push(x[i]-0.5, y[i], zi-0.1); // center at origin
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Build faces (strip)
    const indices = [];
    const n = x.length;
    for(let i=0;i<n-1;i++){
        indices.push(i, i+n, i+1);
        indices.push(i+1, i+n, i+n+1);
    }
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({color: 0x0077ff, side: THREE.DoubleSide});
    airfoilMesh = new THREE.Mesh(geometry, material);
    scene.add(airfoilMesh);
}

// Button event
document.getElementById("generateBtn").addEventListener("click", generateAirfoil);

// Animation loop
function animate(){
    requestAnimationFrame(animate);
    if(airfoilMesh) airfoilMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
