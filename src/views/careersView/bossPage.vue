<!--
 * @Descripttion:boss直聘
 * @Author: huimeng
 * @Date: 2025-02-25 10:41:41
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-25 08:48:14
-->

<template>
  <HeaderBanner />
  <CareersviewNav />
  <div class="boss-page">
    <img src="/src/public/careerPhotos/boss.jpg" alt="" />
  </div>
  <FooterComp />
</template>

<script lang="ts">
import CareersviewNav from '@/components/NavComp/CareersviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  name: 'BossPage',
  components: {
    CareersviewNav,
    HeaderBanner,
    FooterComp,
  },
}
</script>

<style scoped>
.boss-page {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
</style>
