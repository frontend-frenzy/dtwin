<template>
  <div class="gallery">
    <div class="gallery__strip__wrapper">
      <div class="gallery__strip one">
        <div class="photo" v-for="(modal, index) in filteredModals" :key="index">
          <div class="photo__image">
            <img :src="modal.thumbnail" alt="modal.name"/>
          </div>
          <div class="photo__name">{{ modal.name }}</div>
        </div>
      </div>
    </div>
    <div class="gallery__strip__wrapper">
      <div class="gallery__strip two">
        <div class="photo" v-for="(modal, index) in filteredModals" :key="index">
          <div class="photo__image">
            <img :src="modal.thumbnail" alt="modal.name"/>
          </div>
          <div class="photo__name">{{ modal.name }}</div>
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
  
  <style lang="scss" scoped>
  /* Ensure cards have proper spacing and max width */
  /* .landing-screen {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  } */
  
  
  
  
  
  .gallery {
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
   width: 100%;
   overflow: hidden;
   max-width: 1300px;
   margin: auto;
   &__strip {
    min-height: 100vh;
    &__wrapper {
     flex: 0 0 100%;
     justify-content: flex-end;
     background: #bfe3dd;
     border-right: 2px solid #333;
     position: relative;
    }
   }
  }
  
  @media (min-width: 500px) {
   .gallery__strip__wrapper {
    flex: 0 0 50%;
   }
  }
  
  @media (min-width: 950px) {
   .gallery {
    height: 100vh;
    &__strip {
     &.one {
      animation: 60s move-it ease alternate infinite 5s;
      transform: translateY(2%);
     }
     &.three {
      animation: 70s move-it ease alternate infinite 6s;
      transform: translateY(2%);
     }
     &.two {
      animation: 58s move-it-2 ease alternate infinite 5s;
      transform: translateY(-50%);
     }
     &.four {
      animation: 65s move-it-2 ease alternate infinite 5.5s;
      transform: translateY(-50%);
     }
     &:hover {
      animation-play-state: paused;
     }
     &__wrapper {
      flex: 0 0 25%;
     }
    }
   }
  }
  
  .photo {
   position: relative;
   text-align: right;
   padding-bottom: 3rem;
   &__image img {
    width: 90%;
    transform: translateX(30%);
    transition: 1s cubic-bezier(0.19, 1, 0.22, 1) 0.2s;
   }
   &__name {
    text-transform: uppercase;
    font-size: 40px;
    letter-spacing: 2px;
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
    margin-top: -25px;
    transition: 0.4s ease-in-out 0.4s;
    position: relative;
    width: 100%;
   }
   &:hover {
    .photo__image img {
     transform: translateX(0%);
    }
    .photo__name {
     color: #fff;
    }
   }
  }
  
  @keyframes move-it {
   0%,
   90%,
   100% {
    transform: translateY(2%);
   }
   45% {
    transform: translateY(-50%);
   }
  }
  
  @keyframes move-it-2 {
   0%,
   90%,
   100% {
    transform: translateY(-50%);
   }
   45% {
    transform: translateY(5%);
   }
  }
  
  
  
  </style>
  