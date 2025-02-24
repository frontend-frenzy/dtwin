<template>
  <div ref="container" class="w-full h-screen relative bg-[#bfe3dd]">
    <div id="ui" class="absolute top-4 left-4 z-10 space-y-2">
      <input
        type="file"
        id="uploadModel"
        accept=".glb, .gltf, .obj, .dae, .ifc"
        @change="onFileChange"
        class="p-2 border rounded"
      />
      <button
        id="resetCamera"
        @click="resetCamera"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Camera
      </button>
      <div  class="absolute top-4 left-4 z-10 space-y-2" style="
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1000px;
    width: 1000px;
">
      <div  v-if="isLoading" class="loader">
        <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThreeScene } from '../composables/useThreeScene'
const { container, onFileChange, resetCamera, isLoading } = useThreeScene()
</script>

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
