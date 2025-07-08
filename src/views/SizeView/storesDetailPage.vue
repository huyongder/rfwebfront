<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-07-01 14:31:06
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-02 10:21:37
-->
<template>
  <HeaderBanner />
  <SizeviewNav />

  <div class="store-detail">
    <div class="container" v-if="store">
      <div class="store-header">
        <h1>{{ store.title }}</h1>
      </div>
      <div class="detail-content">
        <div class="quill-content" v-html="store.detailContent"></div>
      </div>
    </div>
    <div v-else class="loading">加载中...</div>
  </div>
  <FooterComp />
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
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
        // 仅提取需要的字段并重命名
        store.value = {
          title: response.data.data.name,
          detailContent: response.data.data.detailContent,
        }
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    }

    onMounted(() => {
      fetchStoreDetail()
    })

    return { store }
  },
}
</script>

<style scoped>
.store-detail {
  display: flex;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
.store-header h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}
.quill-content {
  line-height: 1.6;
  font-size: 16px;
}
.loading {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}
</style>
