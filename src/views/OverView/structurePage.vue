<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-02-11 11:15:22
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 14:59:13
-->
<script setup lang="ts">
import FooterComp from '@/components/FooterComp.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
</script>

<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="structure-title">
    <img
      src="@/public/structurePhotos/structurePhoto.jpg"
      alt="rfstructure"
      class="structure-image"
    />
  </div>
  <FooterComp />
</template>

<style scoped>
.structure-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}

.structure-image {
  max-width: 100%;
  height: auto;
}

/* 手机端适配 */
@media (max-width: 768px) {
  .structure-title {
    padding: 20px 0;
  }

  .structure-image {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
