<template>
    <div :class="['p-5', styles.card]">
      <img :src="modal.thumbnail" :alt="modal.name" style="height: 175px;" @click="openModal" class="cursor-pointer" />
      
      <Teleport to="body">
        <transition name="modal-fade">
          <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
              <button class="close-btn" @click="closeModal">&times;</button>
              <h2 class="text-lg font-bold">{{ modal.name }}</h2>
              <ThreeViewer :modelUrl="modal.modelUrl" v-if="modal?.modelUrl" class="viewer" />
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import styles from '../styles/GalleryCard.module.css';
import ThreeViewer from './ThreeViewer.vue';
  
const props = defineProps<{ modal: {
  modelUrl: any;
  name: string;
  thumbnail: string;
  author: string;
  description: string;
}, index: number }>();
  
const isModalOpen = ref(false);
  
const openModal = () => {
  isModalOpen.value = true;
};
  
const closeModal = () => {
  isModalOpen.value = false;
};
</script>
  
<style scoped>
.card {
  display: flex;
  gap: 16px;
  padding: 20px;
  cursor: pointer;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 90%;
  width: 80vw;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transform: scale(0.9);
  transition: transform 0.3s ease-out;
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}
.viewer {
  width: 100%;
  height: 70vh;
}
</style>
