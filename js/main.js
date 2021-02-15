import * as THREE from '../node_modules/three/build/three.module.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';

// 3 primary components: scene, camera and renderer
const scene = new THREE.Scene();

// Camera takes 4 params: FOV (degrees), Aspect Ratio (Width / Height), Near Clipping Plane, Far Clipping Plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 10; // Set camera position

const renderer = new THREE.WebGLRenderer({antialias: true});

// Renderer settings:
renderer.setClearColor("#2E4057");
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer to HTML as a canvas element
document.body.appendChild(renderer.domElement);

const controls = new TrackballControls(camera, renderer.domElement); //Trackball Controls for camera 
controls.rotateSpeed = 10;
controls.dynamicDampingFactor = 0.15;


// Make canvas responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Update size
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix();
})

// Determine which boxMesh is being clicked
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// Create sphere: Available params at https://threejs.org/docs/#api/en/geometries/SphereGeometry
const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Define geometry
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF}) // Define material (green: 0x47FF0A)
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial); // Build sphere
sphereMesh.position.set(10, 0, 0)
scene.add(sphereMesh); // Add sphere to canvas

// Orbiting Sphere tutorial can be found here: https://mattloftus.github.io/2016/02/03/threejs-p2/
//Set the sphere's orbital radius, start angle, and angle increment value
const r = 3; // Radius of orbit
let theta = 0; // Starting angle
const dTheta = 2 * Math.PI / 150; // Angle increment on each render (100 = increments to complete revolution)

// Create box: Available params at https://threejs.org/docs/#api/en/geometries/SphereGeometry
const boxGeometry = new THREE.BoxGeometry(2, 2, 2); // Define geometry
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF}) // Define material (blue: 0x61D6FA)

// Add one box with pivot
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // Build box
boxMesh.rotation.set(40, 0, 40); // Set box initial rotation

//Make a pivot
// const boxPivot = new THREE.Object3D();
// boxPivot.add(boxMesh); //Add boxMesh to pivot
// boxMesh.position.set(new THREE.Vector3(0,0,0)); //Move boxMesh away from pivot
// boxPivot.rotation.y = Math.PI / 2; //rotate the boxMesh 90 degrees around pivot
scene.add(boxMesh); // Add box to canvas

// Lights
const light1 = new THREE.PointLight(0x14D14A, 8, 12); // Red
light1.position.set(1, 0, 8); // Set light position
light1.light
scene.add(light1); // Add light to canvas

const light2 = new THREE.PointLight(0xBE61CF, 6, 12); // Pink
light2.position.set(-2, -1, -10); // Set light position
scene.add(light2); // Add light to canvas

const light3 = new THREE.PointLight(0x00FFFF, 3, 10); // Light Blue
light3.position.set(0, 10, 1); // Set light position
scene.add(light3); // Add light to canvas

const light4 = new THREE.PointLight(0x00FF00, 6, 12); // Green
light4.position.set(0, -10, -1); // Set light position 
scene.add(light4); // Add light to canvas

const light5 = new THREE.PointLight(0x3021DA, 6, 12); // Dark Blue
light5.position.set(10, 3, 0); // Set light position
scene.add(light5); // Add light to canvas

const light6 = new THREE.PointLight(0xF6CC15, 6, 12); // Orange
light6.position.set(-10, -1, 0); // Set light position
scene.add(light6); // Add light to canvas

// Light Helpers
const pointLightHelper1 = new THREE.PointLightHelper(light1);
const pointLightHelper2 = new THREE.PointLightHelper(light2);
const pointLightHelper3 = new THREE.PointLightHelper(light3);
const pointLightHelper4 = new THREE.PointLightHelper(light4);
const pointLightHelper5 = new THREE.PointLightHelper(light5);
const pointLightHelper6 = new THREE.PointLightHelper(light6);
scene.add(pointLightHelper1);
scene.add(pointLightHelper2);
scene.add(pointLightHelper3);
scene.add(pointLightHelper4);
scene.add(pointLightHelper5);
scene.add(pointLightHelper6);

// Ensure model aspect ratio is readjusted when screen size and screen aspect ratio change
const render = function() {
    requestAnimationFrame(render); // Rerender every time the page refreshes (pause when on another tab)

    // Update trackball controls
    controls.update();

    // Constantly rotate box
    boxMesh.rotation.z -= 0.005;

    //Increment theta, and update sphere x and y
    //position based off new theta value        
    theta += dTheta;
    sphereMesh.position.x = r * Math.cos(theta);
    sphereMesh.position.z = r * Math.sin(theta);

    renderer.render(scene, camera);
}

render();