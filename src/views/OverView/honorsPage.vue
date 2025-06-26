<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="core-advantages">
    <div class="vertical-images">
      <img
        v-for="(src, index) in imageSources"
        :key="index"
        :src="src"
        :alt="'honor' + (index + 1)"
      />
    </div>
  </div>
  <FooterComp />
</template>

<script setup lang="ts">
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';

const imageSources = [
  '/src/public/honorsPhotos/honor1.jpg',
  '/src/public/honorsPhotos/honor2.jpg',
  '/src/public/honorsPhotos/honor3.jpg',
  '/src/public/honorsPhotos/honor4.png',
  '/src/public/honorsPhotos/honor5.jpg',
  '/src/public/honorsPhotos/honor6.jpg',
  '/src/public/honorsPhotos/honor7.jpg',
  '/src/public/honorsPhotos/honor8.jpg',
  '/src/public/honorsPhotos/honor9.jpg',
  '/src/public/honorsPhotos/honor10.jpg',
  '/src/public/honorsPhotos/honor11.jpg',
  '/src/public/honorsPhotos/honor12.png',
]
</script>

<style scoped>
.core-advantages {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vertical-images {
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  margin-top: 20px;
}

.vertical-images img {
  max-width: 80%;
  margin: 0 10%;
}
</style>
