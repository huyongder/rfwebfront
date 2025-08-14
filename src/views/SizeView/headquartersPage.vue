<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';

// 1. 手动导入所有图片
import luan1 from '@/assets/about/headquartersPage/luan1.png'
import luan2 from '@/assets/about/headquartersPage/luan2.gif'
import luan3 from '@/assets/about/headquartersPage/luan3.gif'
import luan4 from '@/assets/about/headquartersPage/luan4.gif'
import luan5 from '@/assets/about/headquartersPage/luan5.jpg'
import luan7 from '@/assets/about/headquartersPage/luan7.jpg'
import luan8 from '@/assets/about/headquartersPage/luan8.jpg'
import luan9 from '@/assets/about/headquartersPage/luan9.jpg'
import luan10 from '@/assets/about/headquartersPage/luan10.jpg'
import luan11 from '@/assets/about/headquartersPage/luan11.jpg'
import luan12 from '@/assets/about/headquartersPage/luan12.jpg'
import luan13 from '@/assets/about/headquartersPage/luan13.jpg'
import luan14 from '@/assets/about/headquartersPage/luan14.jpg'
import luan15 from '@/assets/about/headquartersPage/luan15.jpg'

// 2. 图片数据管理
const images = ref([
  { src: luan1, isLoaded: false },
  { src: luan2, isLoaded: false },
  { src: luan3, isLoaded: false },
  { src: luan4, isLoaded: false },
  { src: luan5, isLoaded: false },
  { src: luan7, isLoaded: false },
  { src: luan8, isLoaded: false },
  { src: luan9, isLoaded: false },
  { src: luan10, isLoaded: false },
  { src: luan11, isLoaded: false },
  { src: luan12, isLoaded: false },
  { src: luan13, isLoaded: false },
  { src: luan14, isLoaded: false },
  { src: luan15, isLoaded: false },
])

// 3. 懒加载相关配置
const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4='
const imageRefs = ref<HTMLImageElement[]>([])
const observer = ref<IntersectionObserver | null>(null)

// 4. 图片加载处理
const handleImageLoad = (index: number) => {
  images.value[index].isLoaded = true
  const imgElement = imageRefs.value[index]
  if (imgElement) {
    imgElement.classList.add('loaded')
  }
}

// 5. 初始化懒加载观察器
onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const index = imageRefs.value.indexOf(img)
          if (index !== -1 && !images.value[index].isLoaded) {
            images.value[index].isLoaded = true
          }
          observer.value?.unobserve(img)
        }
      })
    },
    {
      rootMargin: '200px',
      threshold: 0.01,
    },
  )

  imageRefs.value.forEach((img) => {
    observer.value?.observe(img)
  })
})

// 6. 清理观察器
onBeforeUnmount(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <HeaderBanner/>
  <SizeviewNav />
  <br />
  <br />
  <br />
  <h2>集团总部办公区</h2>
  <br />
  <div class="vertical-images">
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="image.isLoaded ? image.src : placeholder"
      :alt="'办公区图片 ' + (index + 1)"
      width="1200"
      height="900"
      loading="lazy"
      @load="handleImageLoad(index)"
      ref="imageRefs"
      class="lazy-image"
    />
  </div>
  <FooterComp />
</template>

<style scoped>
/* PC端保持原有样式完全不变 */
h2 {
  text-align: center;
  font-size: 24px;
}

.vertical-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.lazy-image {
  width: 1200px;
  height: 900px;
  object-fit: cover;
  margin-bottom: 20px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lazy-image.loaded {
  opacity: 1;
}

/* 仅针对手机端的适配 */
@media (max-width: 768px) {
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .vertical-images {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .lazy-image {
    width: 100%;
    height: auto;
    max-height: 70vh;
    margin-bottom: 15px;
  }
}
</style>