import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'

export function useThreeScene() {
  const container = ref<HTMLDivElement | null>(null)
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
    camera.lookAt(0, 3, 0)

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

  function loadColladaModel(file: File) {
    if (!scene) return
    if (currentModel) {
      scene.remove(currentModel)
      currentModel = null
    }
    const url = URL.createObjectURL(file)
    const loader = new ColladaLoader()
    loader.load(url, (collada) => {
      currentModel = collada.scene
      scene.add(currentModel)
    }, undefined, (error) => {
      console.error('Error loading Collada model:', error)
    })
  }

  function loadModel(file: File) {
    const fileName = file.name.toLowerCase()
    if (fileName.endsWith('.dae')) {
      loadColladaModel(file)
    } else {
      console.warn('Currently only .dae is handled here')
    }
  }

  function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      loadModel(target.files[0])
    }
  }

  function resetCamera() {
    camera.position.set(8, 10, 8)
    camera.lookAt(0, 3, 0)
    controls.target.set(0, 3, 0)
    controls.update()
    if (currentModel) {
      scene.remove(currentModel)
      currentModel = null
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
