import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Trips from '@/components/Trips.vue';
import Transports from '@/components/Transports.vue';
import CreateTransport from "@/components/CreateTransport.vue";

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/trips',
    component: Trips,
  },
  {
    path: '/transports',
    component: Transports,
  },
  {
    path: '/createTransport',
    component: CreateTransport,
  }
];

const router = createRouter({
  history: createWebHistory(), // Используем режим истории HTML5
  routes, // Список маршрутов
});

export default router;
