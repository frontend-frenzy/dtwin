import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { IFCLoader } from 'web-ifc-three'

export function useThreeScene() {
  const container = ref<HTMLDivElement | null>(null)
  const isLoading = ref(false) // Loader state
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let controls: OrbitControls
  let stats: Stats
  let clock: THREE.Clock
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
    directionalLight.position.set(1, 1, 0).normalize()
    scene.add(directionalLight)

    camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 2000)
    camera.position.set(8, 10, 8)
    camera.lookAt(new THREE.Vector3(0, 3, 0))

    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 3, 0)
    controls.enableDamping = true
    controls.update()

    clock = new THREE.Clock()
    animate()
  }

  function animate() {
    const delta = clock.getDelta()
    controls.update()
    stats.update()
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  function clearModel() {
    if (currentModel) {
      scene.remove(currentModel)
      currentModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
      currentModel = null
    }
  }

  function loadModel(file: File) {
    const fileName = file.name.toLowerCase()
    isLoading.value = true 
    clearModel()
    const url = URL.createObjectURL(file)

    if (fileName.endsWith('.dae')) {
      console.log("Loading Collada model (.dae)")
      const loader = new ColladaLoader()
      loader.load(url, (collada) => {
        currentModel = collada.scene
        scene.add(currentModel)
        isLoading.value = false 
      }, undefined, (error) => {
        console.error('Error loading Collada model:', error)
        isLoading.value = false
      })
    } else if (fileName.endsWith('.gltf') || fileName.endsWith('.glb')) {
      console.log("Loading GLTF model (.gltf, .glb)")
      const loader = new GLTFLoader()
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
      loader.setDRACOLoader(dracoLoader)
      loader.load(url, (gltf) => {
        currentModel = gltf.scene
        scene.add(currentModel)
        isLoading.value = false
      }, undefined, (error) => {
        console.error('Error loading GLTF model:', error)
        isLoading.value = false
      })
    } else if (fileName.endsWith('.ifc')) {
      console.log("Loading IFC model (.ifc)")
      const loader = new IFCLoader()
      loader.load(url, (ifcModel) => {
        currentModel = ifcModel
        scene.add(currentModel)
        isLoading.value = false
      }, undefined, (error) => {
        console.error('Error loading IFC model:', error)
        isLoading.value = false
      })
    } else {
      console.warn('Unsupported format. Only .dae, .gltf, .glb, and .ifc are supported.')
      isLoading.value = false
    }
  }

  function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      console.log("File selected:", target.files[0].name)
      loadModel(target.files[0])
    }
  }

  function resetCamera() {
    console.log("Resetting Camera and Clearing Model")
    clearModel()
    camera.position.set(8, 10, 8)
    camera.lookAt(new THREE.Vector3(0, 3, 0))
    controls.target.set(0, 3, 0)
    controls.update()
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
    resetCamera,
    isLoading
  }
}
