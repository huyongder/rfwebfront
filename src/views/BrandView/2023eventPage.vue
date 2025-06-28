<!--
 * @Descripttion:2023年会
 * @Author: huimeng
 * @Date: 2025-02-20 10:26:04
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-25 10:37:18
-->
<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
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
      <img src="/src/public/brand/2023brand/2023event1.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event2.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event3.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event4.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event5.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event6.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event7.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event8.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event9.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event10.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event11.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event12.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event13.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event14.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event15.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event16.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event17.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event18.png" alt="" class="img" />
      <img src="/src/public/brand/2023brand/2023event19.png" alt="" class="img" />
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
  width: 678px;
}
</style>
