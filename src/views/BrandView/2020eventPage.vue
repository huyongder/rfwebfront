<!--
 * @Descripttion: 2020年会
 * @Author: huimeng
 * @Date: 2025-02-20 10:25:22
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 15:31:45
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
      <img src="/src/public/brand/2020event.jpg" alt="2020集团年会" class="img" />
    </div>
  </div>
  <FooterComp />
</template>

<style scoped>
/* PC端保持原有样式完全不变 */
.imgs {
  display: grid;
  justify-content: center;
  margin: 20px 0; /* 添加适当外边距 */
}
.img {
  width: 1200px;
  height: auto; /* 确保高度自适应 */
}

/* 仅针对手机端的适配 */
@media (max-width: 768px) {
  .continer {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .imgs {
    margin: 15px 0; /* 调整手机端外边距 */
  }

  .img {
    width: 100%;
    max-width: 100%; /* 双重保障 */
  }
}
</style>