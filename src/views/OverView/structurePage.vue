<!--
 * @Descripttion: 
 * @Author: huimeng
 * @Date: 2025-02-11 11:15:22
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-25 17:17:09
-->
<script setup lang="ts">
import FooterComp from '@/components/FooterComp.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
</script>

<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="structure-title">
    <img src="@/public/structurePhotos/structurePhoto.jpg" alt="rfstructure" />
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
</style>
