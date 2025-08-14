<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="detail-container">
    <div class="detail-wrapper">
      <el-card class="detail-card">
        <div class="quill-content" v-html="safeContent"></div>
      </el-card>
    </div>
  </div>
  <FooterComp />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '@/utils/request'
import DOMPurify from 'dompurify'
import { ElMessage } from 'element-plus'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'
import OverviewNav from '@/components/NavComp/OverviewNav.vue'

const newsDetail = ref({})
const loading = ref(true)

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
    validator: (value) => /^\d+$/.test(value),
  },
})

const safeContent = computed(() => {
  return DOMPurify.sanitize(newsDetail.value.content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen'],
  })
})

const fetchDetail = async () => {
  try {
    const res = await axios.get(`/api/news/public/${props.id}`)
    if (res.data.code !== 200) throw new Error(res.data.msg)

    const apiData = res.data.data

    newsDetail.value = {
      title: apiData.title || '默认标题',
      content: apiData.content,
      coverImage: apiData.coverImage,
      category: '科技动态',
      createTime: apiData.createTime,
    }
  } catch (error) {
    ElMessage.error(`加载失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDetail)
</script>


<style scoped>
/* ===== PC端基础样式 ===== */
.detail-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.detail-wrapper {
  /* PC端保持原样 */
}

/* ===== 手机端直接缩放容器 ===== */
@media (max-width: 768px) {
  .detail-container {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }

  .detail-wrapper {
    transform: scale(0.95); /* 轻微缩放 */
    transform-origin: top center;
    width: 100%;
    overflow-x: hidden; /* 隐藏可能的水平溢出 */
  }

  /* 确保内部所有元素都适应 */
  .detail-wrapper * {
    max-width: 100% !important;
    box-sizing: border-box;
  }
}

/* ===== 超小屏加大缩放比例 ===== */
@media (max-width: 480px) {
  .detail-wrapper {
    transform: scale(0.9); /* 加大缩放比例 */
  }
}
</style>