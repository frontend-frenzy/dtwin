<template>
  
    <div ref="container" class="w-full h-screen relative bg-[#bfe3dd]">

      <div id="ui" class="absolute top-4 left-4 z-10 space-y-2">
        <input
          type="file"
          id="uploadModel"
          accept=".glb, .gltf, .obj, .dae"
          @change="onFileChange"
          class="p-2 border rounded"
        />
        <button
          id="resetCamera"
  
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Camera
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useThreeScene } from '../composables/useThreeScene'
  

  const { container, onFileChange } = useThreeScene()
  </script>
  
  <style scoped>
 
  </style>
  