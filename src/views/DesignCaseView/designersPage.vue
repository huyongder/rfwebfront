<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-04-11 09:16:20
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-14 15:17:43
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
/* 原有PC端样式保持不变 */
.design-team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
}

.text-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.vertical-line {
  width: 2px;
  height: 30px;
  background-color: #ff0000;
  flex-shrink: 0;
}

.chinese-text {
  font-size: 30px;
  font-weight: bold;
}

.red-text {
  color: #ff0000;
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
  width: 280px;
  height: 245px;
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

.name-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  text-align: center;
}

/* 交互效果 */
.designer-card:hover .designer-image {
  transform: scale(1.1);
}

.designer-card:hover .name-overlay {
  background-color: rgba(255, 0, 0, 0.7);
}

/* ========== 手机端适配 ========== */
/* 平板设备 (992px以下) */
@media (max-width: 992px) {
  .designers-grid {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }

  .designer-card {
    width: 100%;
    height: auto; /* 修改这里 */
    aspect-ratio: 280/245; /* 使用现代浏览器支持的宽高比属性 */
    position: relative;
  }
  
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .text-group {
    gap: 1rem;
  }

  .chinese-text {
    font-size: 26px;
  }

  .english-text {
    font-size: 22px;
  }
}

/* 中等尺寸手机 (768px以下) */
@media (max-width: 768px) {
  .design-team-container {
    padding: 1.5rem;
  }

  .designers-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .vertical-line {
    height: 25px;
  }

  .chinese-text {
    font-size: 22px;
  }

  .english-text {
    font-size: 18px;
  }

  .slogan {
    font-size: 12px;
  }

  .name-overlay {
    padding: 8px;
    font-size: 14px;
  }
}

/* 小尺寸手机 (576px以下) */
@media (max-width: 576px) {
  .design-team-container {
    padding: 1rem;
  }

  .text-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .vertical-line {
    display: none; /* 小屏幕隐藏竖线 */
  }

  .designers-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .chinese-text {
    font-size: 20px;
    padding-left: 0;
  }

  .english-text {
    font-size: 16px;
    white-space: normal;
  }

  .designer-card {
    max-width: 100%;
  }

  .name-overlay {
    padding: 6px;
    font-size: 13px;
  }
}

/* 超小尺寸手机 (400px以下) */
@media (max-width: 400px) {
  .chinese-text {
    font-size: 18px;
  }

  .english-text {
    font-size: 14px;
  }

  .slogan {
    margin: 12px 0;
  }
}
</style>
