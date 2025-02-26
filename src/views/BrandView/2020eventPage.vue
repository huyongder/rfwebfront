<!--
 * @Descripttion: 2020年会
 * @Author: huimeng
 * @Date: 2025-02-20 10:25:22
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-25 10:36:56
-->
<script lang="ts">
import BrandviewPage from '@/components/NavComp/BrandviewNav.vue'
export default {
  name: '2020eventPage',
  components: { BrandviewPage },
}
</script>

<template>
  <BrandviewPage />
  <div class="continer">
    <div class="imgs">
      <img src="/src/public/brand/2020event.jpg" alt="" class="img" />
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
