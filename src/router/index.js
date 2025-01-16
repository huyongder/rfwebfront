import { createRouter, createWebHistory } from 'vue-router'
import IndexPageVue from '@/views/IndexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPageVue,
    },
  ],
})

export default router
