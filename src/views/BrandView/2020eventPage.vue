<!--
 * @Descripttion: 2020年会
 * @Author: huimeng
 * @Date: 2025-02-20 10:25:22
 * @LastEditors: huimeng
 * @LastEditTime: 2025-06-27 14:55:18
-->
<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
  name: '2020eventPage',
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
    <div class="imgs">
      <img src="/src/public/brand/2020event.jpg" alt="" class="img" />
    </div>
  </div>
  <FooterComp />
</template>

<style scoped>
.imgs {
  display: grid;
  justify-content: center;
}
.img {
  width: 1200px;
}
</style>
