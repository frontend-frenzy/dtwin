<script setup lang="ts">
import { ref } from 'vue'

import ThreeSceneUploader from './ThreeSceneUploader.vue'
import LandingHome from './LandingHome.vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

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
