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
import competitionsPage from '@/views/DesignCaseView/competitionsPage.vue'
import cctvPage from '@/views/BrandView/cctvPage.vue'
import adsView from '@/views/BrandView/adsPage.vue'
import event2019Page from '@/views/BrandView/2019eventPage.vue'
import event2020Page from '@/views/BrandView/2020eventPage.vue'
import event2022Page from '@/views/BrandView/2022eventPage.vue'
import event2023Page from '@/views/BrandView/2023eventPage.vue'
import bossPage from '@/views/careersView/bossPage.vue'
import branchesPage_recruit from '@/views/careersView/branchesPage_recruit.vue'
import headquartersPage_recruit from '@/views/careersView/headquartersPage_recruit.vue'
import complaintsPage from '@/views/SuggestionView/complaintsPage.vue'
import afterSalesPage from '@/views/SuggestionView/after-salesPage.vue'

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
    },
    {
      path: '/design/competitions',
      name: 'competitions',
      component: competitionsPage,
    },

    //brandView
    {
      path: '/brand/cctv',
      name: 'cctv',
      component: cctvPage,
    },
    {
      path: '/brand/ads',
      name: 'ads',
      component: adsView,
    },
    {
      path: '/brand/2019-event',
      name: '2019event',
      component: event2019Page,
    },
    {
      path:'/brand/2020-event',
      name: '2020event',
      component: event2020Page
    },
    {
      path: '/brand/2022-event',
      name: '2022event',
      component: event2022Page
    },
    {
      path: '/brand/2023-event',
      name: '2023event',
      component: event2023Page
    },
    {
      path: '/careers/boss',
      name: 'boss',
      component: bossPage
    },
    {
      path: '/careers/branches',
      name: 'branches',
      component: branchesPage_recruit
    },
    {
      path: '/careers/headquarters',
      name: 'headquarters',
      component: headquartersPage_recruit
    },
    {
      path: '/contact/complaints',
      name: 'competitions',
      component: complaintsPage
    },
    {
      path: '/contact/after-sales',
      name: 'afterSales',
      component: afterSalesPage
    }
  ],
})

export default router
