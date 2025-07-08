<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-07-01 14:30:49
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-02 09:42:43
-->
<template>
  <HeaderBanner />
  <SizeviewNav />
  <div class="stores-page">
    <div class="container">
      <h1 class="page-title">直营门店</h1>
      <div class="stores-list">
        <div
          v-for="store in stores"
          :key="store.id"
          class="store-card"
          @mouseover="hoverStore = store.id"
          @mouseleave="hoverStore = null"
          @click="toggleActiveStore(store.id)"
          :class="{ active: activeStore === store.id }"
        >
          <router-link :to="`/about/stores/${store.id}`" class="store-link">
            <div class="store-content">
              <div class="image-container">
                <img
                  :src="store.imageUrl"
                  :alt="store.name"
                  :class="{ 'image-zoom': hoverStore === store.id }"
                />
              </div>
              <div class="text-content">
                <h3 :class="{ 'title-hover': hoverStore === store.id }">{{ store.name }}</h3>
                <div class="divider"></div>
                <p class="introduction">{{ store.introduction }}</p>
              </div>
              <div class="date-content">
                <div class="create-time">
                  <span class="year-month">{{ formatYearMonth(store.createTime) }}</span>
                  <span class="day">{{ formatDay(store.createTime) }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp,
  },
  setup() {
    const stores = ref([])
    const hoverStore = ref(null)
    const activeStore = ref(null)

    const toggleActiveStore = (id) => {
      activeStore.value = activeStore.value === id ? null : id
    }

    const fetchStores = async () => {
      try {
        const response = await axios.get('/api/stores/list', {
          responseType: 'json',
        })
        stores.value = response.data.data.map((item) => ({
          ...item,
          imageUrl: item.coverImage,
          introduction: item.brief,
        }))
      } catch (error) {
        console.error('获取门店列表失败:', error)
      }
    }

    const formatYearMonth = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
    }

    const formatDay = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.getDate().toString().padStart(2, '0')
    }

    onMounted(() => {
      fetchStores()
    })

    return {
      stores,
      hoverStore,
      activeStore,
      toggleActiveStore,
      formatYearMonth,
      formatDay,
    }
  },
}
</script>

<style scoped>
.stores-page {
  display: flex;
  justify-content: center;
  width: 100%;
}

.container {
  width: 100%;
  max-width: none; /* 移除最大宽度限制 */
  padding: 0; /* 移除左右内边距 */
}

.page-title {
  text-align: center;
  margin: 30px 0;
  font-size: 2rem;
}

.stores-list {
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 100%;
  padding: 0 5%; /* 添加少量内边距防止内容贴边 */
}

.store-card {
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  margin: 0 auto;
  max-width: 1400px; /* 设置一个较大的最大宽度 */
}

.store-card:hover {
  background-color: transparent !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.store-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.store-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px; /* 增加高度 */
}

.image-container {
  width: 300px; /* 增加宽度 */
  height: 180px; /* 增加高度 */
  overflow: hidden;
  border-radius: 4px;
  flex-shrink: 0;
  margin-right: 40px; /* 增加右边距 */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-zoom {
  transform: scale(1.05);
}

.text-content {
  flex: 1; /* 保持弹性 */
  min-width: 0; /* 允许内容收缩 */
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-width: 750px; /* 添加最小宽度 */
}

h3 {
  margin: 0 0 10px;
  color: #333;
  transition: color 0.3s ease;
  font-size: 1.3rem; /* 适中标题大小 */
  white-space: nowrap; /* 防止标题换行 */
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-hover {
  color: #f00;
}

.divider {
  border-top: 1px dashed #ddd;
  margin: 8px 0; /* 减少分割线边距 */
  width: 100%;
}

.introduction {
  color: #666;
  margin: 8px 0 0;
  line-height: 1.5;
  font-size: 0.95rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2; /* 限制两行 */
  line-clamp: 2; /* 标准属性 */
  -webkit-box-orient: vertical;
  box-orient: vertical; /* 标准属性 */
}

.date-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  flex-shrink: 0;
  height: 100%; /* 使用容器高度 */
}

.create-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
}

.year-month {
  font-size: 14px;
  line-height: 1.2;
}

.day {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.store-card.active {
  border-color: #f00;
  background-color: #fff9f9;
}

.store-card.active .introduction {
  color: #333;
}

.store-card.active .day {
  color: #f00;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .container {
    max-width: 100%;
  }

  .store-content {
    height: 160px;
  }

  .image-container {
    width: 200px;
    height: 140px;
  }
}

@media (max-width: 768px) {
  .store-content {
    flex-direction: column;
    height: auto;
  }

  .image-container {
    width: 100%;
    height: 180px;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .date-content {
    align-self: flex-end;
    margin-top: 15px;
  }
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .text-content {
    width: 65%; /* 中等屏幕稍宽一些 */
  }
}

@media (max-width: 992px) {
  .text-content {
    width: 70%; /* 小屏幕更宽一些 */
  }
}

@media (max-width: 768px) {
  .text-content {
    width: 100%; /* 移动端全宽 */
    max-width: none;
    padding: 0;
  }
}
</style>
