import { createRouter, createWebHistory } from 'vue-router'
import IndexPageVue from '@/views/IndexPage.vue'
import newsPageVue from '@/views/OverView/newsPage.vue'
import companyPageVue from '@/views/OverView/companyPage.vue'
import advantagesPage from '@/views/OverView/advantagesPage.vue'
import culturePage from '@/views/OverView/culturePage.vue'
import structurePage from '@/views/OverView/structurePage.vue'
import certificatesPage from '@/views/OverView/certificatesPage.vue'
import honorsPage from '@/views/OverView/honorsPage.vue'
import headquartersPage from '@/views/SizeView/headquartersPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPageVue,
    },
    {
      path: '/about/news',
      name: 'news',
      component: newsPageVue,
    },

    {
      path: '/about/company',
      name: 'company',
      component: companyPageVue,
    },
    {
      path: '/about/advantages',
      name: 'advantages',
      component: advantagesPage,
    },
    {
      path: '/about/culture',
      name: 'culture',
      component: culturePage,
    },
    {
      path: '/about/structure',
      name: 'structure',
      component: structurePage,
    },
    {
      path: '/about/certificates',
      name: 'certificates',
      component: certificatesPage,
    },
    {
      path: '/about/honors',
      name: 'honors',
      component: honorsPage,
    },
    {
      path: '/about/headquarters',
      name: 'headquarters',
      component: headquartersPage,
    },
  ],
})

export default router
