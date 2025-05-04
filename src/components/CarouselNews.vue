<template>
  <div class="news-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">正在加载最新新闻...</div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error">
      <span>加载失败，请重试</span>
      <button @click="fetchNews">重试</button>
    </div>

    <!-- 新闻列表 -->
    <div v-else class="news-grid">
      <div
        v-for="(item, index) in displayedNews"
        :key="item.id"
        class="news-card"
        :class="{ 'first-item': index === 0 }"
      >
        <img :src="item.imageUrl" :alt="item.title" class="news-image">
        <div class="news-content">
          <h3 class="news-title">{{ item.title }}</h3>
          <p class="news-summary">{{ item.summary }}</p>
          <div class="news-meta">
            <span class="publish-time">{{ formatTime(item.publishTime) }}</span>
            <span class="view-count">阅读({{ item.viewCount }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const newsList = ref([])
const loading = ref(false)
const error = ref(false)

// 获取新闻数据
const fetchNews = async () => {
  loading.value = true
  error.value = false
  try {
    const res = await axios.get('/api/news/public/list', {
      params: {
        pageNum: 1,
        pageSize: 5,  // 固定获取前5条
        orderBy: 'publishTime',
        order: 'desc'
      }
    })

    if (res.data.code === 200) {
      // 确保数据格式正确
      const validData = Array.isArray(res.data.data.records)
        ? res.data.data.records
        : []

      // 仅保留前5条
      newsList.value = validData.slice(0, 5)
    } else {
      throw new Error(res.data.msg)
    }
  } catch (err) {
    console.error('获取新闻失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

// 时间格式化
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 生命周期
onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
.news-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.news-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-4px);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 1.5rem;
}

.news-title {
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: #c7000a;
  font-weight: 600;
}

.news-summary {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.news-meta {
  display: flex;
  gap: 1rem;
  color: #999;
  font-size: 0.9rem;
}

/* 首条特殊样式 */
.first-item {
  grid-column: span 2;
  height: 420px;
}

.first-item .news-content {
  padding: 2rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }

  .first-item {
    grid-column: 1;
  }
}
</style>