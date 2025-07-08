<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-04-11 09:16:20
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-03 09:27:12
-->
<template>
  <HeaderBanner />
  <DesignviewNav />
  <div class="design-team-container">
    <div class="text-group">
      <!-- 新增红色竖线 -->
      <div class="vertical-line"></div>
      <span class="chinese-text">
        <span class="red-text">设计</span>
        <span class="black-text">大咖</span>
      </span>
      <span class="english-text">DESIGN TEAM</span>
    </div>
    <p class="slogan">用激情与灵感赋予品牌更高的价值</p>
  </div>

  <div class="designers-container">
    <div class="designers-grid">
      <div
        v-for="designer in designers"
        :key="designer.id"
        class="designer-card"
        @click="designersDetailPage(designer.id)"
      >
        <div class="image-container">
          <img :src="designer.avatar" :alt="designer.name" class="designer-image" />
          <div class="name-overlay">{{ designer.name }}</div>
        </div>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  name: 'designersPage',
  components: {
    DesignviewNav,
    HeaderBanner,
    FooterComp,
  },

  setup() {
    const designers = ref([])
    const router = useRouter()

    const designersDetailPage = (id) => {
      router.push(`/design/designers/${id}`)
    }
    onMounted(async () => {
      try {
        const response = await axios.get('/api/designers/list')
        designers.value = response.data.data
        console.log(designers.value)
      } catch (error) {
        console.error('Error fetching designers:', error)
      }
    })
    return {
      designers,
      designersDetailPage,
    }
  },
}
</script>

<style scoped>
.design-team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
}

.text-group {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 1.5rem; /* 元素间距 */
  margin-bottom: 1rem;
  position: relative; /* 为竖线定位准备 */
}

/* 新增红色竖线样式 */
.vertical-line {
  width: 2px; /* 线宽 */
  height: 30px; /* 线高度 */
  background-color: #ff0000; /* 红色 */
  flex-shrink: 0; /* 防止压缩 */
}

.chinese-text {
  font-size: 30px;
  font-weight: bold;
  position: relative; /* 为竖线定位准备 */
  padding-left: 1rem; /* 左侧留出竖线空间 */
}

.red-text {
  color: #ff0000;
  padding-right: 0;
}

.black-text {
  color: #000000;
}

.english-text {
  font-size: 26px;
  color: #808080;
  white-space: nowrap;
}

.slogan {
  margin: 18px 0;
  font-size: 13px;
  color: #808080;
  line-height: 1.5;
}

.designers-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.designers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.designer-card {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 280px; /* 固定宽度 */
  height: 245px; /* 固定高度 */
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.designer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.designer-card:hover .designer-image {
  transform: scale(1.1);
}

.name-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  text-align: center;
  transition: all 0.3s ease;
}

.designer-card:hover .name-overlay {
  background-color: rgba(255, 0, 0, 0.7); /* 红色背景 */
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .designers-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .designer-card {
    width: 100%;
    height: 0;
    padding-bottom: 87.5%; /* 245/280=0.875 */
  }
}

@media (max-width: 768px) {
  .designers-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .designer-card {
    padding-bottom: 87.5%;
  }
}

@media (max-width: 480px) {
  .designers-grid {
    grid-template-columns: 1fr;
  }

  .designer-card {
    padding-bottom: 87.5%;
  }
}
</style>
