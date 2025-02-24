<template>
    <div class="landing-screen p-4">
   <ThreeSceneUploader/>
    
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import GalleryCard from '../components/GalleryCard.vue';
  import { models } from '../constant/data';
  import type { Model } from '../types/Modal';
import ThreeSceneUploader from '../components/ThreeSceneUploader.vue';

  </script>
  
  <style scoped>

  .landing-screen {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  