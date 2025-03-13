<template>
  <div class="index-page">
    <div class="welcome-page">
      <p class="welcome-text">六安装饰装修公司——荣锋装饰集团欢迎您！</p>
    </div>

    <div class="compact-layout">
      <!-- 集团标志区块 -->
      <div class="brand-block">
        <img
          src="/src/static/index/logo2.png"
          @click="$router.push('/')"
          alt="集团标志"
          class="compact-logo"
        />
      </div>

      <!-- 代理信息区块 -->
      <div class="agent-info">
        <img src="/src/static/index/logo3.png" alt="集团信息" class="agent-logo" />
      </div>

      <!-- 服务热线区块 -->
      <div class="hotline-block">
        <img src="/src/static/index/redPhone.png" class="hotline-icon" alt="热线图标" />
        <div class="hotline-text">
          <p class="hotline-title">全国服务热线</p>
          <p class="hotline-number">400-606-8788</p>
        </div>
      </div>

      <!-- 公众号区块 -->
      <div class="qr-block">
        <img src="/src/static/index/qr.png" alt="公众号" class="compact-qr" />
        <p class="qr-text">扫码关注公众号</p>
      </div>
    </div>

    <div class="index-largePhoto">
      <img src="/src/static/index/largePhoto.jpg" alt="largePhoto" />
    </div>
  </div>
  <div>
    <!-- <HeaderComp /> -->
    <!-- <BannerComp />
    <FooterComp />
    <ToolComp /> -->
  </div>
  <HeaderComp />
  <CarouselComp />
</template>

<script>
//import FooterComp from '@/components/FooterComp.vue'
import { defineComponent, provide } from 'vue'
import HeaderComp from '@/components/HeaderComp.vue'
import CarouselComp from '@/components/carouselComp.vue'
// import ToolComp from '@/components/ToolComp.vue';
// import BannerComp from '@/components/BannerComp.vue'

export default defineComponent({
  components: {
    HeaderComp,
    // BannerComp,
    //FooterComp,
    // ToolComp
    CarouselComp
  },

  // 初始执行，类似onLoad
  mounted() {
    console.log('IndexPage.vue 已开始执行。')
  },
  setup() {
    // 定义导航项数据，包括每个菜单项及其子菜单
    const NavLists = [
      {
        title: '网站首页',
        subTitle: 'HOME',
        link: '/',
      },
      {
        title: '集团概况',
        subTitle: 'GROUP OVERVIEW',
        link: '/about/overview',
        subMenu: [
          { title: '最新动态', link: '/about/news' },
          { title: '企业简介', link: '/about/company' },
          { title: '企业优势', link: '/about/advantages' },
          { title: '企业文化', link: '/about/culture' },
          { title: '集团架构', link: '/about/structure' },
          { title: '资质证书', link: '/about/certificates' },
          { title: '集团荣誉', link: '/about/honors' },
        ],
      },
      {
        title: '集团规模',
        subTitle: 'Group size',
        link: '/about/size',
        subMenu: [
          { title: '集团总部', link: '/about/headquarters' },
          { title: '集团分公司', link: '/about/branches' },
          { title: '代理品牌', link: '/about/brands' },
          { title: '直营门店', link: '/about/stores' },
          { title: '保障团队', link: '/about/team' },
          { title: '设计中心', link: '/about/design-center' },
        ],
      },
      {
        title: '设计案例',
        subTitle: 'Design case',
        link: '/design/cases',
        subMenu: [
          { title: '优秀案例', link: '/design/excellent-cases' },
          { title: '工地实拍', link: '/design/site-photos' },
          { title: '设计大咖', link: '/design/designers' },
          { title: '设计大赛', link: '/design/competitions' },
        ],
      },
      {
        title: '品牌传播',
        subTitle: 'Brand Spreading',
        link: '/brand/spreading',
        subMenu: [
          { title: '强势登录央视', link: '/brand/cctv' },
          { title: '硬广投放', link: '/brand/ads' },
          { title: '2019集团盛典', link: '/brand/2019-event' },
          { title: '2020集团盛典', link: '/brand/2020-event' },
          { title: '2022集团盛典', link: '/brand/2022-event' },
          { title: '2023集团盛典', link: '/brand/2023-event' },
        ],
      },
      {
        title: '招贤纳士',
        subTitle: 'Talents Wanted',
        link: '/careers',
        subMenu: [
          { title: 'BOSS直聘', link: '/careers/boss' },
          { title: '总部招聘', link: '/careers/headquarters' },
          { title: '分公司招聘', link: '/careers/branches' },
        ],
      },
      {
        title: '投诉与建议',
        subTitle: 'Suggestions',
        link: '/contact/suggestions',
        subMenu: [
          { title: '投诉中心', link: '/contact/complaints' },
          { title: '售后监督', link: '/contact/after-sales' },
        ],
      },
      {
        title: '联系我们',
        subTitle: 'CONTACT US',
        link: '/contact',
      },
    ]
    provide('navLists', NavLists)
    return { NavLists }
  },
  // 数据管理
  data() {
    return {}
  },
  // 方法管理
  methods: {},
})
</script>

<style scoped>
/* 主容器 */
.index-page {
  width: 100vw; /* 强制视窗宽度 */
  display: flex;
  flex-direction: column;
}

/* 通用子容器样式 */
.welcome-page,
.index-logo,
.index-largePhoto {
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 安全内边距 */
}

/* 欢迎栏 */
.welcome-page {
  height: 34px;
  background-color: #00000014;
  display: flex;
  align-items: center;
}

.welcome-text {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 300px;
}

.compact-layout {
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 0;
}

.agent-logo {
  margin: 0 auto;
}

/* 整体横向布局 */
.hotline-block {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 图片和文字间距 */
  margin-left: 80px;
}

/* 图片样式 */
.hotline-icon {
  width: 40px; /* 按需调整图片尺寸 */
  height: 40px;
}

/* 文字垂直排列 */
.hotline-text {
  display: flex;
  flex-direction: column; /* 关键：垂直排列 */
  gap: 4px; /* 两行文字间距 */
}
/* 取消文字元素的 padding */
.hotline-title,
.hotline-number {
  padding: 0; /* 清除默认或继承的 padding */
  margin: 0; /* 可选：清除默认的 margin */
}

/* 文字样式*/
.hotline-title {
  font-size: 18px;
  color: #666;
}
.hotline-number {
  font-size: 18px;
  font-weight: bold;
  color: #fa0505;
}

.qr-block {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  gap: 0;
  display: block;
  align-items: center;
}
.compact-qr {
  width: 68px;
  height: 68px;
  padding: 4px;
}
.qr-text {
  font-size: 12px;
  margin: 0;
  padding: 0;
  text-align: center;
}
/* 大图容器 */
.index-largePhoto {
  display: grid; /* 网格布局更稳定 */
  place-items: center;
}

.hotline-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  padding: 20px;
  background: #fff;
}
.hotline-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.index-largePhoto img {
  max-width: 100%; /* 限制不超过容器 */
  height: auto;
  object-fit: none; /* 禁用任何变形处理 */
  display: block; /* 消除图片基线间隙 */
}
</style>
