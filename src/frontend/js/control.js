// control.js
import { OrbitControls } from 'https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js';

export function createControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    return controls;
}
