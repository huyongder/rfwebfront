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
/* PC端样式 - 完全保持不变 */
.stores-page {
  display: flex;
  justify-content: center;
  width: 100%;
}

.container {
  width: 100%;
  max-width: none;
  padding: 0;
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
  padding: 0 5%;
}

.store-card {
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
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
  height: 200px;
}

.image-container {
  width: 300px;
  height: 180px;
  overflow: hidden;
  border-radius: 4px;
  flex-shrink: 0;
  margin-right: 40px;
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
  flex: 1;
  min-width: 0;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-width: 750px;
}

h3 {
  margin: 0 0 10px;
  color: #333;
  transition: color 0.3s ease;
  font-size: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-hover {
  color: #f00;
}

.divider {
  border-top: 1px dashed #ddd;
  margin: 8px 0;
  width: 100%;
}

.introduction {
  color: #666;
  margin: 8px 0 0;
  line-height: 1.5;
  font-size: 0.95rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
}

.date-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  flex-shrink: 0;
  height: 100%;
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

/* 仅添加手机端适配样式 */
@media only screen and (max-width: 768px) {
  .stores-page {
    padding: 0;
  }

  .page-title {
    font-size: 1.3rem;
    margin: 15px 0;
  }

  .stores-list {
    padding: 0;
    gap: 15px;
  }

  .store-card {
    width: 100%;
    margin: 0 auto 15px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .store-content {
    flex-direction: column;
    height: auto;
    padding: 0;
  }

  .image-container {
    width: 100%;
    height: 180px;
    margin: 0;
    border-radius: 0;
  }

  .text-content {
    padding: 15px;
    width: 100%;
    min-width: 100%;
    box-sizing: border-box;
  }

  h3 {
    font-size: 1.1rem;
    white-space: normal;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .divider {
    margin: 8px 0;
  }

  .introduction {
    font-size: 0.85rem;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    margin-top: 8px;
    line-height: 1.6;
  }

  .date-content {
    position: relative;
    width: 100%;
    padding: 10px 15px;
    background: #f8f8f8;
    display: flex;
    justify-content: flex-end;
  }

  .create-time {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .year-month {
    font-size: 12px;
    color: #666;
  }

  .day {
    font-size: 16px;
    color: #c7000b;
    font-weight: bold;
  }

  /* 交互状态调整 */
  .store-card:hover {
    transform: none;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  }

  .store-card.active {
    border: 1px solid #c7000b;
  }

  /* 确保没有水平滚动 */
  .container,
  .stores-list,
  .store-card {
    max-width: 100%;
    overflow: hidden;
  }
}

/* 小屏幕手机优化 (小于480px) */
@media only screen and (max-width: 480px) {
  .image-container {
    height: 150px;
  }

  .text-content {
    padding: 12px;
  }

  h3 {
    font-size: 1rem;
  }

  .introduction {
    font-size: 0.8rem;
  }

  .year-month {
    font-size: 11px;
  }

  .day {
    font-size: 14px;
  }
}
</style>