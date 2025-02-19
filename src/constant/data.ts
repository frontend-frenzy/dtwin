import { ref } from 'vue';
import type { Model } from '../types/Modal';



export const models = ref<Model[]>([
  {
    id: 1,
    name: 'Model 1',
    thumbnail: '/thumbnails/cover1.png',
    modelUrl: '/thumbnails/LittlestTokyo.glb',
    description: 'This is the first model'
  },
  {
    id: 2,
    name: 'Model 2',
    thumbnail: '/thumbnails/cover2.png',
    modelUrl: '/thumbnails/kira.glb',
    description: 'This is the second model'
  },
  {
    id: 3,
    name: 'Model 3',
    thumbnail: '/thumbnails/cover3.png',
    modelUrl: '/thumbnails/modal1.glb',
    description: 'This is the third model'
  },
  {
    id: 3,
    name: 'Model 3',
    thumbnail: '/thumbnails/cover4.png',
    modelUrl: '/thumbnails/LittlestTokyo.glb',
    description: 'This is the third model'
  },
  {
    id: 3,
    name: 'Model 3',
    thumbnail: '/thumbnails/cover3.png',
    modelUrl: '/thumbnails/LittlestTokyo.glb',
    description: 'This is the third model'
  },
  {
    id: 3,
    name: 'Model 3',
    thumbnail: '/thumbnails/cover3.png',
    modelUrl: '/thumbnails/LittlestTokyo.glb',
    description: 'This is the third model'
  },
  {
    id: 3,
    name: 'Model 3',
    thumbnail: '/thumbnails/cover3.png',
    modelUrl: '/thumbnails/LittlestTokyo.glb',
    description: 'This is the third model'
  }
  ,
  {
    id: 3,
    name: 'Model 3',
    thumbnail: '/thumbnails/cover3.png',
    modelUrl: '/thumbnails/LittlestTokyo.glb',
    description: 'This is the third model'
  }
]);
