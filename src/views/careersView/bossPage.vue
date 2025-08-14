<!--
 * @Descripttion:boss直聘
 * @Author: huimeng
 * @Date: 2025-02-25 10:41:41
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 15:09:33
-->

<template>
  <HeaderBanner />
  <CareersviewNav />
  <div class="boss-page">
    <img src="/src/public/careerPhotos/boss.jpg" alt="BOSS直聘" class="boss-image" />
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
  padding: 0 20px;
  box-sizing: border-box;
}

.boss-image {
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 平板设备适配 */
@media (max-width: 1024px) {
  .boss-page {
    margin-top: 80px;
  }
}

/* 手机端适配 */
@media (max-width: 768px) {
  .boss-page {
    margin-top: 60px;
    padding: 0 15px;
  }

  .boss-image {
    width: 100%;
  }
}

/* 小屏手机适配 */
@media (max-width: 480px) {
  .boss-page {
    margin-top: 50px;
    padding: 0 10px;
  }
}
</style>