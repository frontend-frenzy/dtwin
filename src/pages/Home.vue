<template>
  <div class="landing-screen p-4">
    <div class="flex justify-center m-5">
      <!-- Search field (currently disabled) -->
    </div>

    <div class="flex justify-center flex-wrap gap-10 gap-y-20 m-5 my-16 p-5 min-h-[45vh]">
      <div class="w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <GalleryCard v-for="(modal, index) in filteredModals" :key="index" :modal="modal" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import GalleryCard from '../components/GalleryCard.vue';
import { models } from '../constant/data';
import type { Model } from '../types/Modal';

const searchQuery = ref('');

const filteredModals = computed(() => {
  return models.value?.filter((modal: Model) => 
    modal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
/* Ensure cards have proper spacing and max width */
.landing-screen {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
