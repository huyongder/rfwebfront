<template>
  <div class="fullscreen-carousel">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- 空状态 -->
    <div v-else-if="!photos.length" class="empty">暂无图片</div>

    <!-- 轮播主体 -->
    <div v-else class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="photo in photos"
          :key="photo.filename"
          class="swiper-slide"
        >
          <img
            :src="photo.url"
            :alt="photo.filename"
            class="carousel-image"
            @load="handleImageLoad"
          />
        </div>
      </div>
      <!-- 自定义翻页按钮 -->
      <div class="custom-prev">&lt;</div>
      <div class="custom-next">&gt;</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default {
  name: 'FullScreenCarousel',
  setup() {
    const photos = ref([])
    const loading = ref(true)
    const swiperInstance = ref(null)

    // 获取图片数据
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/api/upload',{
          params: { type: 'largePhoto' },
        });
        photos.value = response.data
      } catch (error) {
        console.error('获取图片失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 初始化轮播
    const initSwiper = () => {
      swiperInstance.value = new Swiper('.swiper-container', {
        modules: [Navigation, Autoplay],
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 0,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        },
        observer: true,
        observeParents: true,
        speed: 800
      })
    }

    // 图片加载处理
    const handleImageLoad = () => {
      if (swiperInstance.value) {
        swiperInstance.value.update()
      }
    }

    onMounted(async () => {
      await fetchPhotos()
      if (photos.value.length) {
        initSwiper()
      }
    })

    onBeforeUnmount(() => {
      if (swiperInstance.value) {
        swiperInstance.value.destroy(true, true)
      }
    })

    return {
      photos,
      loading,
      handleImageLoad
    }
  }
}
</script>

<style scoped>
.fullscreen-carousel {
  position: relative;
  width: 100vw;
  height: 450px;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
}

.loading, .empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: #666;
}

.swiper-container {
  width: 100%;
  height: 100%;
  max-width: 100vw;
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
  width: auto !important;
}

.swiper-slide {
  width: 100vw !important;
  height: 100%;
  flex-shrink: 0;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  pointer-events: none;
}

.custom-prev,
.custom-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;  /* 增大宽度 */
  height: 60px; /* 增大高度 */
  background: transparent !important; /* 背景透明 */
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px; /* 增大字体 */
  color: white; /* 改为白色更显眼 */
  transition: all 0.3s;
  box-shadow: none; /* 移除阴影 */
  margin: 0 20px; /* 增加外边距 */
  border: none; /* 移除边框 */
  opacity: 0.8; /* 半透明效果 */
}

.custom-prev:hover,
.custom-next:hover {
  opacity: 1; /* 悬停时完全不透明 */
  background: rgba(255,255,255,0.1) !important; /* 悬停时轻微背景 */
}

.custom-prev {
  left: 0;
}

.custom-next {
  right: 0;
}

@media (max-width: 768px) {
  .fullscreen-carousel {
    height: 200px;
  }

  .custom-prev,
  .custom-next {
    width: 40px; /* 移动端也相应增大 */
    height: 40px;
    font-size: 24px;
    margin: 0 10px;
  }
}
</style>