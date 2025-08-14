<!--
 * @Descripttion: 品牌传播>cctv
 * @Author: huimeng
 * @Date: 2025-02-20 09:26:25
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 15:26:31
-->
<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
  name: 'cctvPage',
  components: {
    BrandviewPage,
    HeaderBanner,
    FooterComp,
  },
}
</script>

<template>
  <HeaderBanner />
  <BrandviewPage />
  <div class="continer">
    <img src="/src/public/brand/cctv.jpg" alt="CCTV品牌传播" class="brand-img" />
  </div>
  <FooterComp />
</template>

<style scoped>
/* PC端保持原有样式完全不变 */
.continer {
  display: block;
  text-align: center;
}
.brand-img {
  width: 1000px;
}

/* 仅针对手机端的适配 */
@media (max-width: 768px) {
  .continer {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .brand-img {
    width: 100%;
    height: auto;
    max-width: 100%;
  }
}
</style>