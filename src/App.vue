<script>
import { defineComponent, provide } from 'vue';
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    const navLists = [
      {
        title: '网站首页',
        subTitle: 'HOME',
        link: '/',
      },
      {
        title: '集团概况',
        subTitle: 'GROUP OVERVIEW',
        link: '/about/news',
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
        link: '/about/headquarters',
        subMenu: [
          { title: '集团总部', link: '/about/headquarters' },
          { title: '集团分公司', link: '/about/branches' },
          { title: '代理品牌', link: '/about/brands' },
          { title: '直营门店', link: '/about/stores' },
          { title: '保障团队', link: '/about/team' },
          { title: '设计中心', link: '/about/DesignCenter' },
        ],
      },
      {
        title: '设计案例',
        subTitle: 'Design case',
        link: '/design/excellent-cases',
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
        link: '/brand/cctv',
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
        link: '/careers/boss',
        subMenu: [
          { title: 'BOSS直聘', link: '/careers/boss' },
          { title: '总部招聘', link: '/careers/headquarters_recruit' },
          { title: '分公司招聘', link: '/careers/branches' },
        ],
      },
      {
        title: '投诉与建议',
        subTitle: 'Suggestions',
        link: '/contact/complaints',
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

    provide('navLists', navLists)
    return {};
  },
  components: {
    RouterView
  }
});

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
