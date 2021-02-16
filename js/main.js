import * as THREE from '../node_modules/three/build/three.module.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// 3 primary components: scene, camera and renderer
const scene = new THREE.Scene();

// Camera takes 4 params: FOV (degrees), Aspect Ratio (Width / Height), Near Clipping Plane, Far Clipping Plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5; // Set camera position
camera.position.y = 5; // Set camera position
// camera.position.x = 5; // Set camera position

const renderer = new THREE.WebGLRenderer({antialias: true});

// Renderer settings:
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);

// Add renderer to HTML as a canvas element
document.body.appendChild(renderer.domElement);

const controls = new TrackballControls(camera, renderer.domElement); //Trackball Controls for camera 
controls.rotateSpeed = 4;
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
const sphereGeometry1 = new THREE.SphereGeometry(0.1, 32, 32); // Define geometry
const sphereMaterial1 = new THREE.MeshLambertMaterial({color: 0xC56CEF}) // Define material (green: 0x47FF0A)
const sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1); // Build sphere
sphereMesh1.position.set(3, 0, 0)
scene.add(sphereMesh1); // Add sphere to canvas

const sphereGeometry2 = new THREE.SphereGeometry(0.1, 32, 32); // Define geometry
const sphereMaterial2 = new THREE.MeshLambertMaterial({color: 0xC56CEF}) // Define material (green: 0x47FF0A)
const sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2); // Build sphere
sphereMesh2.position.set(4, 0, 0)
scene.add(sphereMesh2); // Add sphere to canvas

const sphereGeometry3 = new THREE.SphereGeometry(0.1, 32, 32); // Define geometry
const sphereMaterial3 = new THREE.MeshLambertMaterial({color: 0xC56CEF}) // Define material (green: 0x47FF0A)
const sphereMesh3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3); // Build sphere
sphereMesh3.position.set(5, 0, 0)
scene.add(sphereMesh3); // Add sphere to canvas

const sphereGeometry4 = new THREE.SphereGeometry(0.1, 32, 32); // Define geometry
const sphereMaterial4 = new THREE.MeshLambertMaterial({color: 0xC56CEF}) // Define material (green: 0x47FF0A)
const sphereMesh4 = new THREE.Mesh(sphereGeometry4, sphereMaterial4); // Build sphere
sphereMesh4.position.set(6, 0, 0)
scene.add(sphereMesh4); // Add sphere to canvas

// Load external models
// const gltfLoader = new GLTFLoader();
// // Load cube
// gltfLoader.load('./img/blank_cube.gltf', function (gltf) {
//     const boxMesh = gltf.scene
// 	scene.add(boxMesh);
// }, undefined, function (error) {
// 	console.error(error);
// } );

// Create box: Available params at https://threejs.org/docs/#api/en/geometries/SphereGeometry
let boxGeometry = new THREE.BoxGeometry(2, 2, 2); // Define geometry
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF}) // Define material (blue: 0x61D6FA) // Simple white box
// Load manager for box image textures
// const loader = new THREE.TextureLoader(new THREE.LoadingManager());
// // Image textures array
// const boxMaterials = [
//     new THREE.MeshLambertMaterial({map: loader.load('./img/help.png')}),
//     new THREE.MeshLambertMaterial({map: loader.load('./img/help.png')}),
//     new THREE.MeshLambertMaterial({map: loader.load('./img/envelope.png')}),
//     new THREE.MeshLambertMaterial({map: loader.load('./img/envelope.png')}),
//     new THREE.MeshLambertMaterial({map: loader.load('./img/rocket.png')}),
//     new THREE.MeshLambertMaterial({map: loader.load('./img/rocket.png')})
//   ];

// Add one box
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // Build box
// boxMesh.applyMatrix4(new THREE.Matrix4().makeTranslation(1, 1, 1));
boxMesh.rotation.set(40, 0, 40); // Set box initial rotation

//Make a pivot
// const boxPivot = new THREE.Object3D();
// boxPivot.add(boxMesh); //Add boxMesh to pivot
// boxMesh.position.set(new THREE.Vector3(0,0,0)); //Move boxMesh away from pivot
// boxPivot.rotation.y = Math.PI / 2; //rotate the boxMesh 90 degrees around pivot
scene.add(boxMesh); // Add box to canvas

// Lights
const light1 = new THREE.PointLight(0x14D14A, 8, 12); // Dark Green
light1.position.set(1, 0, 8); // Set light position
light1.light
scene.add(light1); // Add light to canvas

const light2 = new THREE.PointLight(0xBE61CF, 6, 12); // Purple
light2.position.set(-2, 1, -10); // Set light position
scene.add(light2); // Add light to canvas

const light3 = new THREE.PointLight(0x00FFFF, 3, 10); // Light Blue
light3.position.set(0, 10, 1); // Set light position
scene.add(light3); // Add light to canvas

const light4 = new THREE.PointLight(0x00FF00, 6, 12); // Green
light4.position.set(0, -10, -1); // Set light position 
scene.add(light4); // Add light to canvas

const light5 = new THREE.PointLight(0x16A7F5, 6, 12); // Dark Blue
light5.position.set(10, 3, 0); // Set light position
scene.add(light5); // Add light to canvas

const light6 = new THREE.PointLight(0x90F615, 6, 12); // Lime Green
light6.position.set(-10, -1, 0); // Set light position
scene.add(light6); // Add light to canvas

// Light Helpers
// const pointLightHelper1 = new THREE.PointLightHelper(light1);
// const pointLightHelper2 = new THREE.PointLightHelper(light2);
// const pointLightHelper3 = new THREE.PointLightHelper(light3);
// const pointLightHelper4 = new THREE.PointLightHelper(light4);
// const pointLightHelper5 = new THREE.PointLightHelper(light5);
// const pointLightHelper6 = new THREE.PointLightHelper(light6);
// scene.add(pointLightHelper1);
// scene.add(pointLightHelper2);
// scene.add(pointLightHelper3);
// scene.add(pointLightHelper4);
// scene.add(pointLightHelper5);
// scene.add(pointLightHelper6);

// Axes Helper
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper ); // X axis = red, Y axis = green, Z axis = blue

// Orbiting Sphere tutorial can be found here: https://mattloftus.github.io/2016/02/03/threejs-p2/
//Set the sphere's orbital radius, start angle, and angle increment value
const r1 = 2; // Radius of orbit
const r2 = 2.25; // Radius of orbit
const r3 = 2.5; // Radius of orbit
const r4 = 2.75; // Radius of orbit
let theta = 0; // Starting angle
const dTheta = 2 * Math.PI / 100; // Angle increment on each render (100 = increments to complete revolution)

// Ensure model aspect ratio is readjusted when screen size and screen aspect ratio change
const render = function() {
    requestAnimationFrame(render); // Rerender every time the page refreshes (pause when on another tab)

    // Update trackball controls
    controls.update();

    // Constantly rotate box
    scene.rotation.z -= 0.005;
    // gltf.scene.rotation.x -= 0.005;
    // boxMesh.rotation.y -= 0.005;

    //Increment theta, and update sphere x and y
    //position based off new theta value        
    theta += dTheta;

    sphereMesh1.position.x = r1 * Math.cos(theta*1.05);
    sphereMesh1.position.z = r1 * Math.sin(theta*1.05);
    sphereMesh1.position.y = r1 * Math.cos(theta*1.05);

    sphereMesh2.position.x = r2 * Math.cos(theta/1.2);
    sphereMesh2.position.y = r2 * Math.sin(theta/1.2);
    sphereMesh2.position.z = r2 * Math.sin(theta/1.2);

    sphereMesh3.position.y = r3 * Math.cos(theta*1.2);
    sphereMesh3.position.x = r3 * Math.sin(theta*1.2);
    sphereMesh3.position.z = r3 * Math.sin(theta*1.2);

    sphereMesh4.position.x = r4 * Math.sin(theta/1.05);
    sphereMesh4.position.y = r4 * Math.cos(theta/1.05);

    renderer.render(scene, camera);
}

render();