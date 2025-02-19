<template>
    <div ref="container" class="viewer-container"></div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref, watch, withDefaults, defineProps } from 'vue'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
  
  const props = withDefaults(defineProps<{ modelUrl?: string }>(), {
    modelUrl: '/thumbnails/modal1.glb'
  })
  const container = ref<HTMLDivElement | null>(null)
  let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls, animationId: number
  
  function initThree() {
    if (!container.value) return
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbfe3dd)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    container.value.appendChild(renderer.domElement)
    
    camera = new THREE.PerspectiveCamera(40, container.value.clientWidth / container.value.clientHeight, 1, 100)
    camera.position.set(5, 2, 8)
    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.5, 0)
    controls.enablePan = false
    controls.enableDamping = true
    controls.update()
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
    animate()
  }
  
  function animate() {
    controls.update()
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  
  function loadModelFromUrl(url: string) {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    loader.load(url, (gltf) => {
   
      const model = gltf.scene;
				model.position.set( 1, 1, 0 );
				model.scale.set( 0.01, 0.01, 0.01 );
				scene.add( model );
    }, undefined, (error) => {
      console.error('Error loading model:', error)
    })
  }
  
  onMounted(() => {
    initThree()
    if (props.modelUrl) {
      loadModelFromUrl(props.modelUrl)
    }
  })
  
  watch(() => props.modelUrl, (newUrl, oldUrl) => {
    if (newUrl !== oldUrl && newUrl) {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0])
      }
      loadModelFromUrl(newUrl)
    }
  })
  
  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
  })
  </script>
  
  <style scoped>
  .viewer-container {
    min-height: 100vh;
  }
  </style>
  