<template>
    <div class="landing-screen p-4">
      <h1 class="text-2xl font-bold mb-4">3D Models</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="model in models"
          :key="model.id"
          class="model-card border rounded p-2 cursor-pointer hover:shadow-lg"
          @click="selectModel(model)"
        >
          <img
            :src="model.thumbnail"
            :alt="model.name"
            class="w-full h-48 object-cover mb-2"
          />
          <h2 class="text-lg font-semibold">{{ model.name }}</h2>
          <p class="text-sm text-gray-500">{{ model.description }}</p>
        </div>
      </div>
      <div v-if="selectedModelUrl" class="mt-8">
        <ThreeViewer :modelUrl="selectedModelUrl" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import ThreeViewer from './ThreeViewer.vue'
  
  interface Model {
    id: number
    name: string
    thumbnail: string
    modelUrl: string
    description: string
  }
  
  const models = ref<Model[]>([
    {
      id: 1,
      name: 'Model 1',
      thumbnail: '/cover.jpg',
      modelUrl: '/thumbnails/modal1.glb',
      description: 'This is the first model'
    },
    {
      id: 2,
      name: 'Model 2',
      thumbnail: '/assets/thumbnails/model2.jpg',
      modelUrl: '/thumbnails/modal2.glb',
      description: 'This is the second model'
    },
    {
      id: 3,
      name: 'Model 3',
      thumbnail: '/assets/thumbnails/model3.jpg',
      modelUrl: '/thumbnails/modal3.glb',
      description: 'This is the third model'
    }
  ])
  
  const selectedModelUrl = ref<string>('')
  
  const selectModel = (model: Model) => {
    console.log("modal",model)
    selectedModelUrl.value = model.modelUrl
  }
  </script>
  
  <style scoped>
  .landing-screen {
    min-height: 100vh;
    background-color: #f7fafc;
  }
  .model-card {
    transition: box-shadow 0.3s ease;
  }
  </style>
  