<script setup lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'

const imageSources = [
  '/src/public/about/headquartersPage/luan1.png',
  '/src/public/about/headquartersPage/luan2.gif',
  '/src/public/about/headquartersPage/luan3.gif',
  '/src/public/about/headquartersPage/luan4.gif',
  '/src/public/about/headquartersPage/luan5.jpg',
  '/src/public/about/headquartersPage/luan7.jpg',
  '/src/public/about/headquartersPage/luan8.jpg',
  '/src/public/about/headquartersPage/luan9.jpg',
  '/src/public/about/headquartersPage/luan10.jpg',
  '/src/public/about/headquartersPage/luan11.jpg',
  '/src/public/about/headquartersPage/luan12.jpg',
  '/src/public/about/headquartersPage/luan13.jpg',
  '/src/public/about/headquartersPage/luan14.jpg',
  '/src/public/about/headquartersPage/luan15.jpg',
]
</script>

<template>
  <SizeviewNav />
  <br />
  <br />
  <br />
  <h2>集团总部办公区</h2>
  <br />
  <div class="vertical-images">
    <img
      v-for="(src, index) in imageSources"
      :key="index"
      :src="src"
      :alt="'honor' + (index + 1)"
      class="image"
    />
  </div>
</template>

<style scoped>
h2 {
  text-align: center; /* 标题居中 */
  font-size: 24px;
}

.vertical-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.image {
  width: 1200px; /* 设置图片宽度 */
  height: 900px; /* 设置图片高度 */
  object-fit: cover; /* 保持图片比例，裁剪多余部分 */
  margin-bottom: 20px; /* 图片之间的间距 */
}
</style>
