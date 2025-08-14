<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-02-11 11:14:50
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 14:57:19
-->
<script setup lang="ts">
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'
</script>

<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="culture-page">
    <img src="@/public/culturePhotos/rfculture.jpg" alt="rfculture" class="culture-image" />
  </div>
  <FooterComp />
</template>

<style scoped>
.culture-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}

.culture-image {
  max-width: 100%;
  height: auto;
}

/* 手机端适配 */
@media (max-width: 768px) {
  .culture-page {
    padding: 20px 0;
  }

  .culture-image {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
