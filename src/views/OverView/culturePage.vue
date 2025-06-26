<script setup lang="ts">
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue'
</script>


<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="culture-page">
    <img src="@/public/culturePhotos/rfculture.jpg" alt="rfculture" />
  </div>
  <FooterComp />
</template>

<style scoped>
.culture-page{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}
</style>
