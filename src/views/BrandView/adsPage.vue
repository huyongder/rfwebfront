<!--
 * @Descripttion: 品牌传播>硬广投放
 * @Author: huimeng
 * @Date: 2025-02-20 09:51:11
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 15:28:58
-->

<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
  name: 'adsView',
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
    <p class="text">
      为让更多的客户能够熟悉荣锋、了解荣锋，从而能够及时享受到荣锋一站式家装带来的巨大实惠，从而节省不必要的开支，荣锋装饰长期投放电视台、户外高炮、广告位、橱窗、跨路桥、出租车、公交车等各类硬广。
    </p>
    <div class="imgs">
      <img src="/src/public/brand/ads/ads1.jpg" alt="荣锋硬广投放1" class="img" />
      <img src="/src/public/brand/ads/ads2.jpg" alt="荣锋硬广投放2" class="img" />
      <img src="/src/public/brand/ads/ads3.jpg" alt="荣锋硬广投放3" class="img" />
      <img src="/src/public/brand/ads/ads4.jpg" alt="荣锋硬广投放4" class="img" />
      <img src="/src/public/brand/ads/ads5.jpg" alt="荣锋硬广投放5" class="img" />
    </div>
  </div>
  <FooterComp />
</template>

<style scoped>
/* PC端保持原有样式完全不变 */
.text {
  width: 1200px;
  font-size: 16px;
  color: #333;
  text-indent: 3em;
  display: flex;
  margin: 0 auto;
  padding: 20px 0;
}
.imgs {
  display: grid;
  justify-content: center;
  gap: 20px;
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

  .text {
    width: 100%;
    font-size: 14px;
    text-indent: 2em;
    padding: 15px 0;
    line-height: 1.6;
  }

  .imgs {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .img {
    width: 100%;
    height: auto;
  }
}
</style>