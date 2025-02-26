<!--
 * @Descripttion: 品牌传播>硬广投放
 * @Author: huimeng
 * @Date: 2025-02-20 09:51:11
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-20 10:15:48
-->

<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
export default {
  name: 'adsView',
  components: {
    BrandviewPage,
  },
}
</script>

<template>
  <BrandviewPage />
  <div class="continer">
    <p class="text">
      为让更多的客户能够熟悉荣锋、了解荣锋，从而能够及时享受到荣锋一站式家装带来的巨大实惠，从而节省不必要的开支，荣锋装饰长期投放电视台、户外高炮、广告位、橱窗、跨路桥、出租车、公交车等各类硬广。
    </p>
    <div class="imgs">
      <img src="/src/public/brand/ads/ads1.jpg" alt="" class="img" />
      <img src="/src/public/brand/ads/ads2.jpg" alt="" class="img" />
      <img src="/src/public/brand/ads/ads3.jpg" alt="" class="img" />
      <img src="/src/public/brand/ads/ads4.jpg" alt="" class="img" />
      <img src="/src/public/brand/ads/ads5.jpg" alt="" class="img" />
    </div>
  </div>
</template>

<style scoped>
.text {
  width: 1200px;
  font-size: 16px;
  color: #333;
  text-indent: 3em;
}
.imgs {
  display: grid;
  justify-content: center;
}
.img {
  width: 1200px;
}
</style>
