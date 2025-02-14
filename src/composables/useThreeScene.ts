// src/composables/useThreeScene.ts
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'

export function useThreeScene() {

  const container = ref<HTMLDivElement | null>(null)

  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let controls: OrbitControls
  let stats: Stats
  let clock: THREE.Clock
  let mixer: THREE.AnimationMixer | null = null
  let currentModel: THREE.Object3D | null = null
  let animationId = 0

  function initThree() {
    if (!container.value) return

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbfe3dd)

   
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    container.value.appendChild(renderer.domElement)


    stats = new Stats()
    container.value.appendChild(stats.dom)


    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

   
    camera = new THREE.PerspectiveCamera(
      40,
      container.value.clientWidth / container.value.clientHeight,
      1,
      100
    )
    camera.position.set(5, 2, 8)


    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.5, 0)
    controls.enablePan = false
    controls.enableDamping = true
    controls.update()

 
    clock = new THREE.Clock()


    animate()
  }

  function animate() {
    const delta = clock.getDelta()
    if (mixer) mixer.update(delta)
    controls.update()
    stats.update()
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  function loadModel(file: File) {
    if (!scene) return;
  

    if (currentModel) {
      scene.remove(currentModel);
      currentModel = null;
    }
  

    const url = URL.createObjectURL(file);
    const fileName = file.name.toLowerCase();
  
  
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
  
    if (fileName.endsWith('.glb') || fileName.endsWith('.gltf')) {
 
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load(url, (gltf) => {
        currentModel = gltf.scene;
        currentModel.position.set(1, 1, 0);
        currentModel.scale.set(0.01, 0.01, 0.01);
        scene.add(currentModel);
  
   
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(currentModel);
          mixer.clipAction(gltf.animations[0]).play();
        }
      });
    } else if (fileName.endsWith('.obj')) {
  
      const objLoader = new OBJLoader();
      objLoader.load(url, (obj) => {
        currentModel = obj;
        scene.add(currentModel);
      });
    } else if (fileName.endsWith('.dae')) {

      const colladaLoader = new ColladaLoader();
      colladaLoader.load(url, (collada) => {
        currentModel = collada.scene;
        scene.add(currentModel);
      });
    } else if (fileName.endsWith('.3dtile') || fileName.endsWith('.3dtiles')) {

      console.warn("3D TITLE ERROR ");
    } else {
      console.error('noo   .');
    }
  }

  function loadMultiFileModel(files: FileList) {

    const gltfFile = Array.from(files).find(file => file.name.toLowerCase().endsWith('.gltf'));
    if (!gltfFile) {
      console.error('error');
      return;
    }
  
 
    const fileMap: { [name: string]: File } = {};
    Array.from(files).forEach(file => {
      fileMap[file.name] = file;
    });
  

    const gltfUrl = URL.createObjectURL(gltfFile);
  

    const gltfLoader = new GLTFLoader();
   
  
    gltfLoader.load(gltfUrl, (gltf) => {
 
      currentModel = gltf.scene;
      scene.add(currentModel);
    }, undefined, (error) => {
      console.error('   error:', error);
    });
  }
  
  
  function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      loadModel(target.files[0])
    }
  }

  function resetCamera() {
    if (!camera || !controls) return;
  

    camera.position.set(0, 2, 5);
    controls.target.set(0, 0, 0);
    controls.update();
  
 
    if (currentModel) {
      scene.remove(currentModel);
      currentModel = null;
      mixer = null;
    }
  }
  

  function onWindowResize() {
    if (!container.value || !camera || !renderer) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }

  onMounted(() => {
    initThree()
    window.addEventListener('resize', onWindowResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize)
    cancelAnimationFrame(animationId)
  })

  return {
    container,
    onFileChange,
    resetCamera
  }
}
