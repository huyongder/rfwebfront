<template>
  <HeaderBanner />
  <DesignviewNav />
  <div class="designer-detail-wrapper">
    <div class="designer-detail" v-if="designer">
      <div class="content">
        <div class="left-section">
          <img :src="designer.avatar" :alt="designer.name" class="avatar" />
        </div>

        <div class="right-section">
          <div class="info-section">
            <div class="name-section">
              <h1 class="name">{{ designer.name }}</h1>
              <span class="position">【{{ designer.position }}】</span>
            </div>
            <div class="divider-line"></div>

            <div class="info-item">
              <span class="info-label">所属部门：</span>
              <span class="info-value">{{ designer.department }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">擅长风格：</span>
              <span class="info-value">{{ designer.style }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">代表作品：</span>
              <span class="info-value">{{ formatDisplayArray(designer.works) || '暂无作品信息' }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">设计理念：</span>
              <span class="info-value">{{ designer.concept }}</span>
            </div>

            <div class="info-item">
              <span class="info-label">曾获奖励：</span>
              <div class="info-value">
                <p v-if="designer.awards.length === 0">暂无获奖信息</p>
                <ul v-else>
                  <li v-for="(award, index) in designer.awards" :key="index">{{ cleanString(award) }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="error">
      加载出错: {{ error }}
    </div>

    <div v-else class="loading">
      加载中...
    </div>
  </div>
  <FooterComp />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

const route = useRoute();
const designer = ref(null);
const error = ref(null);

// 清理字符串中的特殊字符
function cleanString(str) {
  if (!str) return '';
  // 去除前后的方括号、引号和空格
  return str.toString()
    .replace(/^\[|\]$/g, '')
    .replace(/^"|"$/g, '')
    .replace(/^'|'$/g, '')
    .trim();
}

// 格式化数组显示
function formatDisplayArray(arr) {
  if (!arr || arr.length === 0) return '';
  return arr.map(item => cleanString(item)).join('，');
}

function tryParseJSON(str) {
  if (!str) return [];
  try {
    // 先清理字符串
    const cleanedStr = cleanString(str);
    // 尝试解析为JSON
    const parsed = JSON.parse(cleanedStr);
    if (typeof parsed === 'string') {
      // 如果是字符串，再次尝试解析
      return tryParseJSON(parsed);
    }
    // 确保返回的是数组
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error('Error parsing JSON:', error);
    // 如果解析失败，返回包含原始字符串的数组
    return [str];
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`/api/designers/${route.params.id}`);
    const rawData = response.data.data;

    designer.value = {
      ...rawData,
      works: tryParseJSON(rawData.works),
      awards: tryParseJSON(rawData.awards)
    };

  } catch (err) {
    console.error('Error fetching designer details:', err);
    error.value = err.message;
  }
});
</script>

<style scoped>
.designer-detail-wrapper {
  padding: 30px 0 40px;
  min-height: fit-content;
}

.designer-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Microsoft YaHei', sans-serif;
  color: #333;
}

.content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.left-section {
  flex: 0 0 400px;
}

.right-section {
  flex: 1;
  max-width: calc(100% - 460px);
}

.avatar {
  width: 100%;
  max-width: 400px;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.name-section {
  display: flex;
  align-items: baseline;
  margin-bottom: 15px;
}

.name {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  padding-left: 12px;
  position: relative;
}

.name::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #ff0000;
}

.position {
  font-size: 18px;
  color: #666;
  margin-left: 12px;
}

.divider-line {
  height: 1px;
  background-color: #eee;
  margin: 20px 0;
}

.info-item {
  margin-bottom: 18px;
  line-height: 1.6;
}

.info-label {
  font-weight: bold;
  font-size: 16px;
  color: #444;
}

.info-value {
  font-size: 16px;
  word-wrap: break-word;
  color: #555;
}

.info-value ul {
  margin: 8px 0;
  padding-left: 22px;
}

.info-value li {
  margin-bottom: 10px;
}

.loading {
  text-align: center;
  padding: 100px;
  font-size: 20px;
}

/* ========== 手机端适配 ========== */
/* 平板设备 (1024px以下) */
@media (max-width: 1024px) {
  .content {
    gap: 40px;
  }

  .left-section {
    flex: 0 0 350px;
  }

  .right-section {
    max-width: calc(100% - 390px);
  }

  .avatar {
    max-width: 350px;
    max-height: 350px;
  }
}

/* 中等尺寸平板 (768px以下) */
@media (max-width: 768px) {
  .designer-detail {
    padding: 30px 15px;
  }

  .content {
    flex-direction: column;
    gap: 30px;
  }

  .left-section {
    flex: 0 0 auto;
    width: 100%;
    text-align: center;
  }

  .right-section {
    max-width: 100%;
  }

  .avatar {
    max-width: 100%;
    max-height: 400px;
  }
}

/* 手机设备 (576px以下) */
@media (max-width: 576px) {
  .designer-detail-wrapper {
    padding: 20px 0;
  }

  .designer-detail {
    padding: 15px;
  }

  .name {
    font-size: 24px;
    padding-left: 10px;
  }

  .position {
    font-size: 16px;
    margin-left: 8px;
  }

  .divider-line {
    margin: 15px 0;
  }

  .info-item {
    margin-bottom: 15px;
  }

  .info-label,
  .info-value {
    font-size: 15px;
  }

  .info-value ul {
    padding-left: 18px;
  }
}

/* 小尺寸手机 (400px以下) */
@media (max-width: 400px) {
  .name {
    font-size: 22px;
  }

  .position {
    font-size: 14px;
  }

  .info-label,
  .info-value {
    font-size: 14px;
  }

  .info-value ul {
    padding-left: 15px;
  }

  .info-item {
    margin-bottom: 12px;
  }
}

/* 超小尺寸手机 (360px以下) */
@media (max-width: 360px) {
  .name-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .position {
    margin-left: 12px;
    margin-top: 5px;
  }

  .info-label {
    display: block;
    margin-bottom: 5px;
  }
}
</style>