// airfoil.js
import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';

export async function generateAirfoil(scene) {
    const m = parseFloat(document.getElementById("m").value);
    const p = parseFloat(document.getElementById("p").value);
    const t = parseFloat(document.getElementById("t").value);

    const res = await fetch("/api/naca", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({m, p, t, n: 1000, span: 1})
    });

    const data = await res.json();
    const { x, y, z } = data;

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let zi of z) {
        for (let i = 0; i < x.length; i++) {
            vertices.push(x[i] - 0.5, y[i], zi - 0.1);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const indices = [];
    const n = x.length;
    for (let i = 0; i < n - 1; i++) {
        indices.push(i, i + n, i + 1);
        indices.push(i + 1, i + n, i + n + 1);
    }

    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({ color: 0x0077ff, side: THREE.DoubleSide });
    const airfoilMesh = new THREE.Mesh(geometry, material);

    scene.add(airfoilMesh);
    return airfoilMesh;
}
