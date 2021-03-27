import * as THREE from '../node_modules/three/build/three.module.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';

// 3 primary components: scene, camera and renderer
const scene = new THREE.Scene();

// Camera takes 4 params: FOV (degrees), Aspect Ratio (Width / Height), Near Clipping Plane, Far Clipping Plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5; // Set camera position
camera.position.y = 5; // Set camera position

// Renderer:
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Add renderer to HTML as a canvas element

// Make canvas responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Update size
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix();
})

//Trackball Controls for camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

// Create box:
let boxGeometry = new THREE.BoxGeometry(2, 2, 2); // Define geometry
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF}); // Define material // Simple white box
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // Build box
boxMesh.rotation.set(40, 0, 40); // Set box initial rotation
scene.add(boxMesh); // Add box to canvas

// Create spheres: 
const sphereMeshes = []
const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Define geometry
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xC56CEF}); // Define material
for (let i=0; i<4; i++) {
    sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial); // Build sphere
    sphereMeshes[i].position.set(0, 0, 0);
    scene.add(sphereMeshes[i]); // Add sphere to canvas
}

// Lights
const lights = [];
// const lightHelpers = [];

const lightColours = [
    [0x14D14A, 8, 12], 
    [0xBE61CF, 6, 12], 
    [0x00FFFF, 3, 10], 
    [0x00FF00, 6, 12], 
    [0x16A7F5, 6, 12], 
    [0x90F615, 6, 12]
];

const lightPositions = [
    [1, 0, 8], 
    [-2, 1, -10], 
    [0, 10, 1], 
    [0, -10, -1], 
    [10, 3, 0], 
    [-10, -1, 0]
];

for (let i=0; i<6; i++) {
    // Loop 6 times to add each light to lights array, using the lightColours and lightPositions arrays to input arguments
    lights[i] = new THREE.PointLight(lightColours[i][0], lightColours[i][1], lightColours[i][2]);
    lights[i].position.set(lightPositions[i][0], lightPositions[i][1], lightPositions[i][2]);
    scene.add(lights[i])

    // Add light helpers for each light
    // lightHelpers[i] = new THREE.PointLightHelper(lights[i]);
    // scene.add(lightHelpers[i])
};

// Axes Helper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add( axesHelper ); // X axis = red, Y axis = green, Z axis = blue

//Set the sphere's orbital radius, start angle, and angle increment value
const radii = [2, 2.25, 2.5, 2.75]; // Radii of orbit paths for each sphere
let theta = 0; // Starting angle
const dTheta = 2 * Math.PI / 100; // Angle increment on each render (100 = increments to complete revolution)

// Ensure model aspect ratio is readjusted when screen size and screen aspect ratio change
const render = function() {
    // Rerender every time the page refreshes (pause when on another tab)
    requestAnimationFrame(render); 

    // Update trackball controls
    controls.update();

    // Constantly rotate box
    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.01;

    //Increment theta, and update sphere x and y position based off new theta value        
    theta += dTheta;

    // Store trig functions for sphere orbits (MUST BE INSIDE RENDER FUNCTION OR THETA VALUES ONLY GET SET ONCE)
    const trigs = [
        [Math.cos(theta*1.05), Math.sin(theta*1.05), Math.cos(theta*1.05)],
        [Math.cos(theta*0.8), Math.sin(theta*0.8), Math.sin(theta*0.8)],
        [Math.cos(theta*1.25), Math.sin(theta*1.25), Math.sin(theta*1.25)],
        [Math.sin(theta*0.8), Math.cos(theta*0.8), 0]
    ];

    for (let i=0; i<4; i++) {
        sphereMeshes[i].position.x = radii[i] * trigs[i][0];
        sphereMeshes[i].position.z = radii[i] * trigs[i][1];
        sphereMeshes[i].position.y = radii[i] * trigs[i][2];
    };

    renderer.render(scene, camera);
}

render();