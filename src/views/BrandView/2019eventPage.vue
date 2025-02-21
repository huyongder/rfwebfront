<!--
 * @Descripttion:2019集团年会
 * @Author: huimeng
 * @Date: 2025-02-20 10:24:59
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-20 16:55:31
-->

<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewPage.vue'
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
    <div class="imgs">
      <img src="/src/public/brand/2019event.jpg" alt="" class="img" />
    </div>
  </div>
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
