<template>
  <div class="landing-screen p-4">
   

    <!-- Drag & Drop Area -->
    <div 
      class="drag-drop-area"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <p v-if="!dragging">Drag & Drop your 3D model files here or</p>
      <p v-else>Drop the file to upload</p>
      <input type="file" accept=".glb, .gltf, .obj, .dae, .ifc" @change="onFileSelect" class="file-input" />
    </div>

    <!-- Loader Animation -->
    <transition name="fade">
      <div v-if="isLoading" class="loader-overlay">
        <svg class="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    </transition>

     <!-- Scene container for rendering the 3D model -->
     <div ref="container" class="scene-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useThreeScene } from '../composables/useThreeScene';

const dragging = ref(false);
const isLoading = ref(false);
const { container, onFileChange } = useThreeScene(); 

const onDragOver = () => {
  dragging.value = true;
};

const onDragLeave = () => {
  dragging.value = false;
};

const onDrop = (event: DragEvent) => {
  dragging.value = false;
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    handleFileUpload(event.dataTransfer.files[0]);
  }
};

const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    handleFileUpload(target.files[0]);
  }
};

const handleFileUpload = (file: File) => {
  isLoading.value = true;
  setTimeout(() => {
    onFileChange(file); 
    isLoading.value = false;
    console.log('Uploaded file:', file.name);
  }, 1000);
};
</script>

<style scoped>
.landing-screen {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  height: 100vh;
}

.scene-container {
  width: 80%;
  height: 60vh;
  border: 1px solid #ccc;
  background: #eee;
  margin-top: 20px;
  
}

.drag-drop-area {
  width: 50%;
  height: 250px;
  border: 2px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: background 0.3s;
  padding: 20px;
  position: relative;
  background: white;
}

.file-input {
  margin-top: 10px;
  cursor: pointer;
}

.drag-drop-area:hover, .drag-drop-area.dragging {
  background: rgba(0, 0, 0, 0.1);
}

.loader-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
