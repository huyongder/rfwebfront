<!--
 * @Descripttion: 总部招聘
 * @Author: huimeng
 * @Date: 2025-02-25 10:50:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-25 10:58:24
-->

<template>
  <CareersviewNav />
  <div class="headquarters-page">
    <img src="/src/public/careerPhotos/headquarters.jpg" alt="" />
  </div>
</template>

<script lang="ts">
import CareersviewNav from '@/components/NavComp/CareersviewNav.vue'

export default {
  name: 'headquartersPage',
  components: {
    CareersviewNav,
  },
}
</script>

<style scoped>
.headquarters-page {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
</style>
