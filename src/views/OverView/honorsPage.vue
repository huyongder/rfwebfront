<!--
 * @Descripttion: 
 * @Author: huimeng
 * @Date: 2025-02-11 11:15:59
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-03 09:56:33
-->
<!-- eslint-disable -->
<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="core-advantages">
    <div class="vertical-images">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.isLoaded ? image.src : placeholder"
        :alt="'荣誉图片 ' + (index + 1)"
        :width="imageWidth"
        :height="imageHeight"
        loading="lazy"
        @load="handleImageLoad(index)"
        ref="imageRefs"
        class="lazy-image"
      />
    </div>
  </div>
  <FooterComp />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

// 1. 手动导入所有图片
import honor1 from '@/assets/honorsPhotos/honor1.jpg'
import honor2 from '@/assets/honorsPhotos/honor2.jpg'
import honor3 from '@/assets/honorsPhotos/honor3.jpg'
import honor4 from '@/assets/honorsPhotos/honor4.png'
import honor5 from '@/assets/honorsPhotos/honor5.jpg'
import honor6 from '@/assets/honorsPhotos/honor6.jpg'
import honor7 from '@/assets/honorsPhotos/honor7.jpg'
import honor8 from '@/assets/honorsPhotos/honor8.jpg'
import honor9 from '@/assets/honorsPhotos/honor9.jpg'
import honor10 from '@/assets/honorsPhotos/honor10.jpg'
import honor11 from '@/assets/honorsPhotos/honor11.jpg'
import honor12 from '@/assets/honorsPhotos/honor12.png'

// 2. 图片数据管理
const images = ref([
  { src: honor1, isLoaded: false },
  { src: honor2, isLoaded: false },
  { src: honor3, isLoaded: false },
  { src: honor4, isLoaded: false },
  { src: honor5, isLoaded: false },
  { src: honor6, isLoaded: false },
  { src: honor7, isLoaded: false },
  { src: honor8, isLoaded: false },
  { src: honor9, isLoaded: false },
  { src: honor10, isLoaded: false },
  { src: honor11, isLoaded: false },
  { src: honor12, isLoaded: false },
])

// 3. 懒加载相关配置
const placeholder =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4='
const imageRefs = ref<HTMLImageElement[]>([])
const observer = ref<IntersectionObserver | null>(null)
const imageWidth = 800
const imageHeight = 600

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
            // 实际图片已经通过src绑定，这里只需要触发加载状态
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

  // 观察所有图片元素
  imageRefs.value.forEach((img) => {
    observer.value?.observe(img)
  })
})

// 6. 清理观察器
onBeforeUnmount(() => {
  observer.value?.disconnect()
})
</script>

<style scoped>
.core-advantages {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}

.vertical-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
}

.lazy-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  opacity: 0;
}

.lazy-image.loaded {
  opacity: 1;
}

.lazy-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .vertical-images {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>
