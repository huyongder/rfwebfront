<!--
 * @Descripttion:2019集团年会
 * @Author: huimeng
 * @Date: 2025-02-20 10:24:59
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 15:30:14
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
      <img src="/src/public/brand/2019event.jpg" alt="2019集团年会" class="img" />
    </div>
  </div>
  <FooterComp />
</template>

<style scoped>
/* PC端保持原有样式完全不变 */
.imgs {
  display: grid;
  justify-content: center;
}
.img {
  width: 1200px;
}

/* 仅针对手机端的适配 */
@media (max-width: 768px) {
  .continer {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .img {
    width: 100%;
    height: auto;
  }
}
</style>