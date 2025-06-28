<!--
 * @Descripttion:2019集团年会
 * @Author: huimeng
 * @Date: 2025-02-20 10:24:59
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-25 10:36:27
-->

<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
  name: '2019eventPage',
  components: {
    BrandviewPage,
    HeaderBanner,
    FooterComp
   },
  data() {
    return {}
  },
}
</script>

<template>
  <HeaderBanner />
  <BrandviewPage />
  <div class="continer">
    <div class="imgs">
      <img src="/src/public/brand/2019event.jpg" alt="" class="img" />
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
