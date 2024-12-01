import SceneManager from './core/SceneManager.js';
import { scenes } from './data/scenes.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class App {
    constructor() {
        this.sceneManager = new SceneManager();
        this.setupControls();
        this.setupEventListeners();
        this.loadInitialScene();
        this.animate();
    }

    setupControls() {
        this.controls = new OrbitControls(this.sceneManager.camera, this.sceneManager.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    setupEventListeners() {
        // Scene selector
        const sceneSelector = document.getElementById('scene-selector');
        sceneSelector.addEventListener('change', (e) => {
            this.loadScene(e.target.value);
        });

        // Window resize
        window.addEventListener('resize', () => this.sceneManager.onWindowResize());
    }

    loadScene(sceneKey) {
        const sceneData = scenes[sceneKey];
        if (sceneData) {
            this.sceneManager.loadScene(sceneData);
        }
    }

    loadInitialScene() {
        const firstSceneKey = Object.keys(scenes)[0];
        this.loadScene(firstSceneKey);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.sceneManager.animate();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
