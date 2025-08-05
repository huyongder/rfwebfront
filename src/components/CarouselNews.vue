<template>
  <div class="carousel-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">数据加载中...</div>

    <!-- 主内容区域 -->
    <div v-else
         class="carousel-wrapper"
         @mouseenter="pauseAutoPlay"
         @mouseleave="resumeAutoPlay"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd">

      <!-- 左侧图片 - 只在非移动端显示 -->
      <div class="left-panel" v-if="!isMobile">
        <div class="image-container">
          <img :src="currentItem.coverImage" class="carousel-image" @error="handleImageError" />
          <div class="image-overlay">
            <h2>{{ currentItem.title }}</h2>
            <div class="date-badge">
              <span class="day">{{ formatDay(currentItem.createTime) }}</span>
              <span class="month-year">{{ formatMonthYear(currentItem.createTime) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧轮播内容 -->
      <div class="right-panel">
        <div class="news-list">
          <router-link
            v-for="(item, index) in newsData"
            :key="item.id"
            :to="`/about/news/${item.id}`"
            :class="['news-item', { active: isActive(index) }]"
            @mouseenter="setActive(index)"
            @click.prevent
          >
            <div class="item-content">
              <div class="date-badge">
                <span class="day">{{ formatDay(item.createTime) }}</span>
                <span class="month-year">{{ formatMonthYear(item.createTime) }}</span>
              </div>
              <div class="text-content">
                <h4>{{ item.title }}</h4>
                <p class="summary">{{ item.summary }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

// 响应式状态
const loading = ref(true)
const currentIndex = ref(0)
const autoPlayTimer = ref(null)
const newsData = ref([])
const isMobile = ref(false)

// 检测移动设备
const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 触摸滑动相关变量
const touchStartX = ref(0)
const touchEndX = ref(0)

// 触摸开始事件
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

// 触摸移动事件
const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX
}

// 触摸结束事件
const handleTouchEnd = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    // 向左滑动，切换到下一项
    nextSlide()
  } else if (touchEndX.value - touchStartX.value > 50) {
    // 向右滑动，切换到上一项
    prevSlide()
  }
}

// 获取新闻数据
const fetchNewsData = async () => {
  try {
    const response = await axios.get('/api/news/public/list')
    // 获取最新的5条数据并按创建时间排序
    newsData.value = response.data.data.records
      .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
      .slice(0, 5)
    loading.value = false
  } catch (error) {
    console.error('获取新闻数据失败:', error)
    // 使用模拟数据作为后备
    newsData.value = [
      {
        id: 1,
        title: '人工智能技',
        summary: '科学家宣布在自然语言处理领域取得',
        coverImage: 'https://picsum.photos/720/440?random=1',
        createTime: '2023-10-01T10:00:00',
      },
      {
        id: 2,
        title: '气候变化国际会议召开',
        summary: '全球领导人齐聚讨论碳排放控制方案',
        coverImage: 'https://picsum.photos/720/440?random=2',
        createTime: '2023-10-02T14:30:00',
      },
      {
        id: 3,
        title: '新型疫苗研发成功',
        summary: '可预防多种冠状病毒变种',
        coverImage: 'https://picsum.photos/720/440?random=3',
        createTime: '2023-10-03T09:15:00',
      },
      {
        id: 4,
        title: '量子计算机新纪录',
        summary: '中国团队实现1000量子比特纠缠',
        coverImage: 'https://picsum.photos/720/440?random=4',
        createTime: '2023-10-04T16:45:00',
      },
      {
        id: 5,
        title: '教育改革方案发布',
        summary: '义务教育阶段将新增人工智能课程',
        coverImage: 'https://picsum.photos/720/440?random=5',
        createTime: '2023-10-05T11:20:00',
      },
    ]
    loading.value = false
  }
}

// 当前显示项
const currentItem = computed(() => {
  return newsData.value[currentIndex.value] || {}
})

// 当前激活项判断
const isActive = (index) => {
  return index === currentIndex.value
}

// 设置当前激活项
const setActive = (index) => {
  currentIndex.value = index
}

// 日期格式化
const formatDay = (dateString) => {
  const date = new Date(dateString)
  return date.getDate().toString().padStart(2, '0')
}

const formatMonthYear = (dateString) => {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${month}.${year}`
}

// 图片加载失败处理
const handleImageError = (e) => {
  e.target.src = 'https://picsum.photos/720/440?blur=1'
  e.target.classList.add('error-image')
}

// 轮播控制
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % newsData.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + newsData.value.length) % newsData.value.length
}

// 自动播放控制
const startAutoPlay = () => {
  if (!isMobile.value) { // 移动端不自动播放
    autoPlayTimer.value = setInterval(nextSlide, 3000)
  }
}

const pauseAutoPlay = () => clearInterval(autoPlayTimer.value)
const resumeAutoPlay = () => startAutoPlay()

// 生命周期
onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)

  fetchNewsData().then(() => {
    startAutoPlay()
  })

  if (isMobile.value) {
    const wrapper = document.querySelector('.carousel-wrapper')
    if (wrapper) {
      wrapper.addEventListener('touchstart', handleTouchStart)
      wrapper.addEventListener('touchmove', handleTouchMove)
      wrapper.addEventListener('touchend', handleTouchEnd)
    }
  }
})

onBeforeUnmount(() => {
  pauseAutoPlay()
  window.removeEventListener('resize', checkIsMobile)

  if (isMobile.value) {
    const wrapper = document.querySelector('.carousel-wrapper')
    if (wrapper) {
      wrapper.removeEventListener('touchstart', handleTouchStart)
      wrapper.removeEventListener('touchmove', handleTouchMove)
      wrapper.removeEventListener('touchend', handleTouchEnd)
    }
  }
})
</script>

<style scoped>
.carousel-container {
  width: 1260px;
  height: 440px;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.carousel-wrapper {
  display: flex;
  height: 100%;
}

/* 左侧图片区域 */
.left-panel {
  width: 55%;
  height: 100%;
  position: relative;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.error-image {
  filter: grayscale(100%);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.image-overlay h2 {
  font-size: 20px;
  margin-bottom: 15px;
  line-height: 1.4;
  transition: all 0.3s ease;
}

/* 右侧内容区域 */
.right-panel {
  width: 45%;
  height: 100%;
  padding: 0;
  background: #fff;
  overflow: hidden;
}

.news-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-item {
  height: 20%;
  display: block;
  position: relative;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: #f9f9f9;
    transform: translateX(5px);
  }

  &.active {
    background: #f5f5f5;
    box-shadow: inset 4px 0 0 #e74c3c;
    transform: translateX(0) scale(1.02);

    .date-badge {
      background: #e74c3c;
      color: white;
      transform: scale(1.1);
      box-shadow: 0 3px 8px rgba(231, 76, 60, 0.3);
    }

    .text-content h4 {
      color: #e74c3c;
      font-weight: bold;
    }

    .summary {
      opacity: 0.8;
    }
  }
}

.item-content {
  display: flex;
  width: 100%;
  gap: 15px;
  height: 100%;
  align-items: center;
}

.text-content {
  flex: 1;
  overflow: hidden;
}

.text-content h4 {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  margin: 0 0 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.summary {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: opacity 0.3s ease;
}

.date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  background: white;
  color: #e74c3c;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  border: 1px solid #e74c3c;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.date-badge .day {
  font-size: 22px;
  line-height: 1;
  font-weight: 700;
}

.date-badge .month-year {
  font-size: 11px;
  opacity: 0.9;
  margin-top: 2px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
  color: #666;
}

/* 移动端样式 */
@media screen and (max-width: 768px) {
  .carousel-container {
    width: 100%;
    height: auto;
    margin: 10px 0;
    border-radius: 0;
    box-shadow: none;
  }

  .carousel-wrapper {
    flex-direction: column;
  }

  .left-panel {
    display: none;
  }

  .right-panel {
    width: 100%;
    padding: 0;
  }

  .news-item {
    height: auto;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }

  .item-content {
    gap: 10px;
  }

  .date-badge {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  .date-badge .day {
    font-size: 18px;
  }

  .news-item.active {
    transform: none;
    box-shadow: none;
    background: #f5f5f5;
  }

  .text-content h4 {
    font-size: 16px;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .summary {
    font-size: 13px;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  .news-item:hover {
    transform: none;
  }

  .news-item:active {
    background: #eee;
  }

  .date-badge {
    border: none;
    box-shadow: none;
    background: #f0f0f0;
  }

  .news-item.active .date-badge {
    background: #e74c3c;
    color: white;
  }
}
</style>