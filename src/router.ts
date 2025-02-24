import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import UploadFile from './pages/UploadFile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/uploadfile', component: UploadFile }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
