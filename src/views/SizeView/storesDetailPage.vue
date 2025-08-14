<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-07-01 14:31:06
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-06 10:30:29
-->
<template>
  <HeaderBanner />
  <SizeviewNav />

  <div class="store-detail">
    <div class="container" v-if="store">
      <div class="detail-content">
        <div class="quill-content" v-html="safeContent"></div>
      </div>
    </div>
    <div v-else class="loading">加载中...</div>
  </div>
  <FooterComp />
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import DOMPurify from 'dompurify'
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp,
  },
  setup() {
    const store = ref(null)
    const route = useRoute()

    const fetchStoreDetail = async () => {
      try {
        const response = await axios.get(`/api/stores/${route.params.id}`)
        store.value = response.data.data
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    }

    // 安全过滤富文本内容
    const safeContent = computed(() => {
      return DOMPurify.sanitize(store.value?.detailContent || '', {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allowfullscreen', 'style']
      })
    })

    // 格式化日期显示
    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/\//g, '-')
    }

    onMounted(() => {
      fetchStoreDetail()
    })

    return {
      store,
      safeContent,
      formatDate
    }
  },
}
</script>

<style scoped>
.store-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


.store-meta {
  text-align: center;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.store-brief {
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  border-left: 4px solid #4285f4;
  font-size: 15px;
  line-height: 1.6;
}

.store-cover {
  margin: 20px 0;
  text-align: center;
}

.cover-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quill-content {
  line-height: 1.8;
  font-size: 15px;
  color: #333;
  word-break: break-word;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}

/* 富文本内容样式重置 */
.quill-content :deep(h1),
.quill-content :deep(h2),
.quill-content :deep(h3),
.quill-content :deep(h4),
.quill-content :deep(h5),
.quill-content :deep(h6) {
  margin: 1em 0 0.8em;
  line-height: 1.4;
}

.quill-content :deep(p) {
  margin: 0.8em 0;
}

.quill-content :deep(ul),
.quill-content :deep(ol) {
  padding-left: 2em;
  margin: 0.8em 0;
}

.quill-content :deep(li) {
  margin-bottom: 0.5em;
}

.quill-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem auto;
  border-radius: 4px;
}

.quill-content :deep(iframe) {
  max-width: 100%;
  margin: 1rem auto;
  display: block;
}

.quill-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  overflow-x: auto;
  display: block;
}

.quill-content :deep(th),
.quill-content :deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
}

.quill-content :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin: 1em 0;
  color: #666;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .store-detail {
    padding: 10px;
  }

  .container {
    padding: 20px;
  }

  .store-header h1 {
    font-size: 1.5rem;
  }

  .quill-content {
    font-size: 14px;
    line-height: 1.7;
  }

  .quill-content :deep(table) {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
  }

  .store-header h1 {
    font-size: 1.3rem;
  }

  .store-brief {
    font-size: 14px;
    padding: 10px;
  }

  .quill-content :deep(h1) {
    font-size: 1.4em;
  }

  .quill-content :deep(h2) {
    font-size: 1.3em;
  }

  .quill-content :deep(h3) {
    font-size: 1.2em;
  }
}
</style>
