import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import IndexPageVue from '@/views/IndexPage.vue'
import newsPageVue from '@/views/OverView/newsPage.vue'
import NewsDetail from '@/views/OverView/NewsDetail.vue'
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
import PageViewer from '@/components/PageViewer.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import testSide from '@/components/NavComp/testSide.vue'
import LoginPage from '@/views/Login/LoginPage.vue'
import DashboardPage from '@/views/Login/Dashboard/DashboardPage.vue'
import designersPage from '@/views/DesignCaseView/designersPage.vue'
import CarouselNewsPage from '@/components/CarouselNews.vue'
import goodCasePage from '@/views/DesignCaseView/goodCasePage.vue'
import goodCaseDetailsPage from '@/views/DesignCaseView/goodCaseDetailsPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPageVue,
    },
    {
      path: '/test',
      name: 'test',
      component: CarouselNewsPage,

    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/about/news',
      name: 'news',
      component: newsPageVue,
    },
    {
      path: '/about/news/:id',
      name: 'NewsDetail',
      component: NewsDetail,
      props: (route) => ({
        id: parseInt(route.params.id), // 转换为数字类型[3](@ref)
      }),
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
      path: '/brand/2020-event',
      name: '2020event',
      component: event2020Page,
    },
    {
      path: '/brand/2022-event',
      name: '2022event',
      component: event2022Page,
    },
    {
      path: '/brand/2023-event',
      name: '2023event',
      component: event2023Page,
    },
    {
      path: '/careers/boss',
      name: 'boss',
      component: bossPage,
    },
    {
      path: '/careers/branches',
      name: 'branches',
      component: branchesPage_recruit,
    },
    {
      path: '/careers/headquarters_recruit',
      name: 'headquarters_recruit',
      component: headquartersPage_recruit,
    },
    {
      path: '/contact/complaints',
      name: 'complaints',
      component: complaintsPage,
    },
    {
      path: '/contact/after-sales',
      name: 'afterSales',
      component: afterSalesPage,
    },
    {
      path: '/page/:id',
      component: PageViewer,
    },
    {
      path: '/editor', // 访问路径
      name: 'Editor',
      component: RichTextEditor,
    },
    {
      path: '/edit/:id',
      name: 'EditorWithId',
      component: RichTextEditor,
    },
    {
      path: '/testSide',
      name: 'testSide',
      component: testSide,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },

    // designer page
    {
      path: '/design/designers',
      name: 'designers',
      component: designersPage,
    },
    {
      path: '/design/excellent-cases',
      name: 'excellent-cases',
      component: goodCasePage,
    },
    {
      path: '/design/excellent-cases/:id',
      name: 'goodCaseDetailsPage',
      component: goodCaseDetailsPage,
    },
    //-----------------------管理界面路由--------------------------


    /*{
      path: '/auth/news',
      component: () => import('@/views/News/index.vue'),
      meta: { title: '新闻管理', icon: 'Document' },
      children: [
        {
          path: 'edit',
          component: () => import('@/views/News/Edit.vue'),
          meta: { title: '编辑新闻' }
        },
        {
          path: 'list',
          component: () => import('@/views/News/List.vue'),
          meta: { title: '新闻列表' }
        }
      ]

    }*/
  ],
})

const whiteList = ['/login', '/about/', '/contact', '/brands', '/team',"/",'/news']
// ===== 全局前置守卫 =====
router.beforeEach((to, from, next) => {
  const store = useAuthStore() // Pinia 状态管理

  // 1. 白名单内路由直接放行
  if (whiteList.some(path => to.path.startsWith(path))) {
    next()
    return
  }

  // 2. 需要登录的路由：检查用户是否已登录
  if (!store.token) {
    // 未登录则跳转到登录页，并携带重定向路径
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
    return
  }

  // 3. 登录后访问其他路由：直接放行
  next()
})

// ===== 全局错误处理 =====
router.onError((error) => {
  console.error('[路由错误]:', error)
})

export default router
