import { createRouter, createWebHistory } from 'vue-router'
import IndexPageVue from '@/views/IndexPage.vue'
import newsPageVue from '@/views/OverView/newsPage.vue'
import companyPageVue from '@/views/OverView/companyPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPageVue,
    },
    {
      path:"/about/news",
      name:"news",
      component:newsPageVue
    },

    {
      path:"/about/company",
      name:"company",
      component:companyPageVue
    }
  ],
})

export default router
