<script setup lang="ts">
import { ref } from 'vue'

import ThreeSceneUploader from './ThreeSceneUploader.vue'
import LandingHome from './LandingHome.vue'

defineProps()

const count = ref(0)
</script>

<template>


  <div class="bg-[#bfe3dd]">
    <ThreeSceneUploader />
  <LandingHome />

  </div>

  

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
