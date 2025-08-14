<template>
  <div class="fullscreen-carousel">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- 空状态 -->
    <div v-else-if="!photos.length" class="empty">暂无图片</div>

    <!-- 轮播主体 -->
    <div v-else class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(photo, index) in photos" :key="index" class="swiper-slide">
          <div class="slide-content" @click="handleImageClick(photo.filename)">
            <img
              :src="photo.url"
              :alt="photo.filename"
              class="carousel-image"
              @load="handleImageLoad"
            />
          </div>
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
    const touchStartX = ref(0)
    const isClick = ref(true)

    // 获取图片数据
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/api/upload', {
          params: { type: 'largePhoto' },
        })
        photos.value = response.data
      } catch (error) {
        console.error('获取图片失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 处理图片点击事件
    const handleImageClick = async (filename) => {
      if (!isClick.value) return

      try {
        const response = await axios.get(`/api/photo-links/${filename}`)
        if (response.data?.link) {
          // PC端用新窗口打开
          if (window.innerWidth > 768) {
            window.open(response.data.link, '_blank')
          }
          // 移动端用当前窗口打开（避免被拦截）
          else {
            window.location.href = response.data.link
          }
        }
      } catch (error) {
        console.error('获取链接失败:', error)
      }
    }

    // 初始化轮播
    const initSwiper = () => {
      swiperInstance.value = new Swiper('.swiper-container', {
        modules: [Navigation, Autoplay],
        loop: true,
        slidesPerView: 1,
        centeredSlides: false,
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
        speed: 800,
        on: {
          touchStart: (swiper, event) => {
            touchStartX.value = event.changedTouches[0].screenX
            isClick.value = true
          },
          touchMove: () => {
            isClick.value = false
          }
        }
      })
    }

    // 图片加载处理
    const handleImageLoad = () => {
      if (swiperInstance.value) {
        swiperInstance.value.update()
      }
    }

    // 窗口大小变化时重新计算
    const handleResize = () => {
      if (swiperInstance.value) {
        swiperInstance.value.update()
      }
    }

    onMounted(async () => {
      await fetchPhotos()
      if (photos.value.length) {
        initSwiper()
        window.addEventListener('resize', handleResize)
      }
    })

    onBeforeUnmount(() => {
      if (swiperInstance.value) {
        swiperInstance.value.destroy(true, true)
      }
      window.removeEventListener('resize', handleResize)
    })

    return {
      photos,
      loading,
      handleImageLoad,
      handleImageClick,
    }
  },
}
</script>

<style scoped>
.fullscreen-carousel {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 450px;
  overflow: hidden;
  margin: 0 auto;
}

.loading,
.empty {
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
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

.swiper-slide {
  width: 100% !important;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  margin: 0 !important;
  padding: 0 !important;
}

.slide-content {
  width: 100%;
  height: 100%;
  display: block;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  cursor: pointer;
}

.custom-prev,
.custom-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background: transparent !important;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
  transition: all 0.3s;
  box-shadow: none;
  margin: 0 20px;
  border: none;
  opacity: 0.8;
}

.custom-prev:hover,
.custom-next:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1) !important;
}

.custom-prev {
  left: 0;
}

.custom-next {
  right: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .fullscreen-carousel {
    height: 200px;
  }

  .custom-prev,
  .custom-next {
    width: 40px;
    height: 40px;
    font-size: 24px;
    margin: 0 10px;
  }

  .loading,
  .empty {
    font-size: 1rem;
  }

  .slide-content {
    -webkit-tap-highlight-color: transparent;
  }
}

/* 超小屏幕适配 */
@media (max-width: 480px) {
  .fullscreen-carousel {
    height: 150px;
  }

  .custom-prev,
  .custom-next {
    width: 30px;
    height: 30px;
    font-size: 18px;
    margin: 0 5px;
  }
}
</style>