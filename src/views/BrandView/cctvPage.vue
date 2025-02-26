<!--
 * @Descripttion: 品牌传播>cctv
 * @Author: huimeng
 * @Date: 2025-02-20 09:26:25
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-20 09:44:02
-->
<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
export default {
  name: 'cctvPage',
  components: {
    BrandviewPage,
  },
}
</script>

<template>
  <BrandviewPage />

  <div class="continer">
    <img src="/src/public/brand/cctv.jpg" alt="" class="brand-img" />
  </div>
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
