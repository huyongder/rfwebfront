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
import branchesPage from '@/views/SizeView/branchesPage.vue'
import jinzhaiPage from '@/views/SizeView/branches/jinzhaiPage.vue'
import shouxianPage from '@/views/SizeView/branches/shouxianPage.vue'
import huoshanPage from '@/views/SizeView/branches/huoshanPage.vue'
import huoqiuPage from '@/views/SizeView/branches/huoqiuPage.vue'
import shuchengPage from '@/views/SizeView/branches/shuchengPage.vue'
import yejiPage from '@/views/SizeView/branches/yejiPage.vue'
import brandsPage from '@/views/SizeView/brandsPage.vue'
import teamPage from '@/views/SizeView/teamPage.vue'
import DesignCenterPage from '@/views/SizeView/DesignCenterPage.vue'

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
    {
      path: '/about/branches',
      name: 'brances',
      component: branchesPage,
    },


    //branches
    {
      path: '/about/branches/jinzhai',
      name: 'jinzhai',
      component: jinzhaiPage,
    },
    {
      path: '/about/branches/shouxian',
      name: 'shouxian',
      component: shouxianPage,
    },
    {
      path: '/about/branches/huoshan',
      name: 'huoshan',
      component: huoshanPage,
    },
    {
      path: '/about/branches/huoqiu',
      name: 'huoqiu',
      component: huoqiuPage,
    },
    {
      path: '/about/branches/shucheng',
      name: 'shucheng',
      component: shuchengPage,
    },
    {
      path: '/about/branches/yeji',
      name: 'yeji',
      component: yejiPage,
    },

    {
      path: '/about/brands',
      name: 'brands',
      component: brandsPage,
    },
    {
      path: '/about/team',
      name: 'team',
      component: teamPage,
    },
    {
      path: '/about/designCenter',
      name: 'designCenter',
      component: DesignCenterPage,
    }
  ],
})

export default router
