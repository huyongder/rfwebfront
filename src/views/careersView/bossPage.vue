<!--
 * @Descripttion:boss直聘
 * @Author: huimeng
 * @Date: 2025-02-25 10:41:41
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-25 15:21:02
-->

<template>
  <CareersviewNav />
  <div class="boss-page">
    <img src="/src/public/careerPhotos/boss.jpg" alt="" />
  </div>
</template>

<script lang="ts">
import CareersviewNav from '@/components/NavComp/CareersviewNav.vue'

export default {
  name: 'BossPage',
  components: {
    CareersviewNav,
  },
}
</script>

<style scoped>
.boss-page {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
</style>
