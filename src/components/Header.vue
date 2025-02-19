<template>
    <div :class="`p-5 flex justify-between relative ${styles.header}`">
      <router-link to="/" style="z-index: 11">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 36 36">
            <path fill="#333" d="M32 7H4a4 4 0 0 0-4 4v15a4 4 0 0 0 4 4h11.416c.52.596 1.477 1 2.584 1s2.065-.404 2.584-1H32a4 4 0 0 0 4-4V11a4 4 0 0 0-4-4" />
          </svg>
          <div class="font-semibold">3D Models</div>
        </div>
      </router-link>
<!--   
      <svg style="z-index: 11" class="hamb" @click="toggleMenu" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
        <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h22M5 16h22M5 24h22" />
      </svg> -->
  
      <div class="flex items-center gap-5 list">
        <router-link  >
       tes
        </router-link>
      </div>
  
      <!-- <div v-if="open" class="flex flex-col items-center gap-5 listResponsive">
        <router-link  @click="toggleMenu" >
       tes
        </router-link>
      </div> -->
    </div>
  
    <router-view />
    <Footer />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  import styles from '../styles/Header.module.css';
  
  const route = useRoute();
  const open = ref(false);
  
  const toggleMenu = () => {
    open.value = !open.value;
  };
  
  const isActive = (name: string) => {
    const pathname = route.path.slice(1);
    return pathname.includes(name.toLowerCase()) || (pathname === '' && name === 'Home');
  };
  </script>
  
  <style scoped>
  .header {
    padding: 20px;
    background-color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .list {
    display: flex;
    gap: 10px;
  }
  .listResponsive {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: var(--secondary);
    padding: 10px;
    border-radius: 5px;
  }
  .hamb {
    cursor: pointer;
    color: white;
  }
  .router-link {
    text-decoration: none;
    color: white;
    font-weight: normal;
  }
  .router-link.active {
    font-weight: 700;
    text-decoration: underline;
  }
  </style>
  