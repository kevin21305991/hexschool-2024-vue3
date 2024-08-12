import { createRouter, createWebHistory } from 'vue-router';
import Week1 from '../views/Week1.vue';
import Week2 from '../views/Week2.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'week1',
      component: Week1
    },
    {
      path: '/week2',
      name: 'week2',
      component: Week2
    }
  ]
});

export default router;
