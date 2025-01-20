<template>
  <div>
    <HeaderComp />
    <!-- <BannerComp />
    <FooterComp />
    <ToolComp /> -->

  </div>
  <div class="feature-container">
    <div class="feature-item" v-for="(item, index) in features" :key="index">
      <div class="icon-container">
        <img :src="item.icon" alt="icon" class="icon" />
      </div>
      <div class="text-container">
        <h3 class="title">{{ item.title }}</h3>
        <p class="subtitle">{{ item.subtitle }}</p>
      </div>
    </div>
  </div>
</template>
<script>
//import FooterComp from '@/components/FooterComp.vue'
import { defineComponent, provide } from 'vue'
import HeaderComp from '@/components/HeaderComp.vue'
// import ToolComp from '@/components/ToolComp.vue';
// import BannerComp from '@/components/BannerComp.vue'

export default defineComponent({
  components: {
    HeaderComp,
    // BannerComp,
    //FooterComp,
    // ToolComp
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
        width: 156.25,
      },
      {
        title: '集团概况',
        subTitle: 'GROUP OVERVIEW',
        link: '/about/overview',
        width: 156.25,
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
        width: 156.25,
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
        width: 156.25,
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
        width: 156.25,
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
        width: 156.25,
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
        width: 156.25,
        subMenu: [
          { title: '投诉中心', link: '/contact/complaints' },
          { title: '售后监督', link: '/contact/after-sales' },
        ],
      },
      {
        title: '联系我们',
        subTitle: 'CONTACT US',
        link: '/contact',
        width: 156.25,
      },
    ]
    provide('navLists', NavLists)
    return { NavLists }
  },
  // 数据管理
  data() {
    return {
      features: [
        {
          // icon: '@/assets/home-icon.png',  // Replace with actual icon paths
          title: '一站式品质家装',
          subtitle: '建材家居全品类代理',
        },
        {
          // icon: '@/assets/diamond-icon.png',  // Replace with actual icon paths
          title: '工地绝不外包',
          subtitle: '绝对零瑕疵 预算等于费用',
        },
        {
          // icon: '@/assets/team-icon.png',  // Replace with actual icon paths
          title: '资深设计师团队',
          subtitle: '有一种设计为你而生',
        },
        {
          // icon: '@/assets/case-icon.png',  // Replace with actual icon paths
          title: '丰富家装案例呈现',
          subtitle: '我选择荣尚建材家居',
        },
      ],
    }
  },
  // 方法管理
  methods: {},
})
</script>

<style scoped>
.feature-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.feature-item {
  text-align: center;
  margin: 10px;
  width: 20%;
  min-width: 180px;
}

.icon-container {
  margin-bottom: 10px;
}

.icon {
  width: 50px;
  height: 50px;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
}
</style>
