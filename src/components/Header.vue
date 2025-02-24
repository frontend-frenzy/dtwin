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

      <router-link to="/uploadfile"  >
      <div class="flex items-center gap-5 list">
    
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 20h14v-2H5v2zm7-18l-5.5 5.5 1.42 1.42L11 6.83V17h2V6.83l3.08 3.09 1.42-1.42L12 2z"/>
          </svg>
       Upload Your File 
   
      </div>
     </router-link>
 
    </div>
  

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
  