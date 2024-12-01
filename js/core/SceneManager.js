import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PositionalAudio, AudioListener } from 'three';

class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.objects = new Map();
        this.audioListener = new AudioListener();
        this.camera.add(this.audioListener);
        
        this.setupRenderer();
        this.setupLights();
        this.setupCamera();
        this.setupRoom();
        this.setupControls();
    }

    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    setupLights() {
        // Ambient light for general illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Main directional light (like sunlight)
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // Additional point light for warmth
        const pointLight = new THREE.PointLight(0xffa95c, 1);
        pointLight.position.set(-5, 5, -5);
        this.scene.add(pointLight);
    }

    setupCamera() {
        // Position camera for a good view of the room
        this.camera.position.set(8, 5, 8);
        this.camera.lookAt(0, 0, 0);
    }

    setupRoom() {
        // Floor
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x808080,
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Walls
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            roughness: 0.9,
            metalness: 0.1
        });

        // Back wall
        const backWallGeometry = new THREE.PlaneGeometry(10, 8);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(0, 4, -5);
        backWall.receiveShadow = true;
        this.scene.add(backWall);

        // Left wall
        const leftWallGeometry = new THREE.PlaneGeometry(10, 8);
        const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
        leftWall.position.set(-5, 4, 0);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.receiveShadow = true;
        this.scene.add(leftWall);
    }

    setupControls() {
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 15;
        this.controls.maxPolarAngle = Math.PI / 2;
    }

    createObject(objData) {
        const position = new THREE.Vector3(...objData.position);
        const rotation = objData.rotation ? new THREE.Euler(...objData.rotation) : new THREE.Euler();
        const size = objData.size || [1, 1, 1];
        
        let object;
        switch(objData.type) {
            case 'person':
                object = this.createPerson(position, objData.name);
                break;
            case 'dog':
                object = this.createDog(position);
                break;
            case 'couch':
                object = this.createCouch(position);
                break;
            case 'lamp':
                object = this.createLamp(position);
                break;
            case 'toy':
                object = this.createToy(position);
                break;
        }
        
        if (object) {
            object.rotation.copy(rotation);
            if (objData.audio) {
                this.addAudioToObject(object, objData.audio);
            }
            this.objects.set(objData.name, object);
        }
        
        return object;
    }

    addAudioToObject(object, audioData) {
        const audio = new PositionalAudio(this.audioListener);
        // Audio loading would go here
        object.add(audio);
    }

    createPerson(position, name) {
        const group = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x3366cc });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffdbac });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 0.7;
        head.castShadow = true;
        group.add(head);

        group.position.set(position.x, position.y + 0.6, position.z);
        this.scene.add(group);
        return group;
    }

    createDog(position) {
        const group = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.6);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 0.1, 0.3);
        head.castShadow = true;
        group.add(head);

        group.position.set(position.x, position.y + 0.15, position.z);
        this.scene.add(group);
        return group;
    }

    createCouch(position) {
        const group = new THREE.Group();

        // Base
        const baseGeometry = new THREE.BoxGeometry(2, 0.5, 1);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.castShadow = true;
        group.add(base);

        // Back
        const backGeometry = new THREE.BoxGeometry(2, 1, 0.3);
        const backMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const back = new THREE.Mesh(backGeometry, backMaterial);
        back.position.set(0, 0.5, -0.35);
        back.castShadow = true;
        group.add(back);

        group.position.set(position.x, position.y + 0.25, position.z);
        this.scene.add(group);
        return group;
    }

    createLamp(position) {
        const group = new THREE.Group();

        // Base
        const baseGeometry = new THREE.CylinderGeometry(0.2, 0.3, 0.1, 32);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.castShadow = true;
        group.add(base);

        // Stand
        const standGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 32);
        const standMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.y = 0.8;
        stand.castShadow = true;
        group.add(stand);

        // Lampshade
        const shadeGeometry = new THREE.ConeGeometry(0.3, 0.4, 32, 1, true);
        const shadeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xeeeeee,
            side: THREE.DoubleSide
        });
        const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
        shade.position.y = 1.6;
        shade.castShadow = true;
        group.add(shade);

        // Light
        const light = new THREE.PointLight(0xffa95c, 1, 5);
        light.position.y = 1.5;
        light.castShadow = true;
        group.add(light);

        group.position.copy(position);
        this.scene.add(group);
        return group;
    }

    createToy(position) {
        const group = new THREE.Group();

        // Main toy body
        const bodyGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFF5252 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);

        group.position.copy(position);
        this.scene.add(group);
        return group;
    }

    loadScene(sceneData) {
        // Clear existing objects
        this.objects.forEach(object => {
            this.scene.remove(object);
        });
        this.objects.clear();
        
        // Create new objects based on scene data
        sceneData.objects.forEach(obj => {
            this.createObject(obj);
        });

        // Update camera if specified
        if (sceneData.camera) {
            const pos = sceneData.camera.position;
            const lookAt = sceneData.camera.lookAt;
            this.camera.position.set(...pos);
            this.controls.target.set(...lookAt);
            this.controls.update();
        }

        // Update scene info
        document.querySelector('#scene-info h2').textContent = sceneData.title;
        document.querySelector('#scene-info p').textContent = sceneData.description;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

export default SceneManager;
