<!--
 * @Descripttion: 品牌传播>cctv
 * @Author: huimeng
 * @Date: 2025-02-20 09:26:25
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-20 09:44:02
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
    <img src="/src/public/brand/cctv.jpg" alt="" class="brand-img" />
  </div>
  <FooterComp />
</template>

<style scoped>
.continer {
  display: block;
  text-align: center;
}
.brand-img {
  width: 1000px;
}
</style>
