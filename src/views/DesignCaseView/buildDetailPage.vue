<template>
  <HeaderBanner />
  <DesignviewNav />
  <div class="detail-page">
    <h1>{{ buildDetail.title }}</h1>

    <div class="video-container">
      <video :key="videoPath" controls>
        <source :src="videoPath" type="video/mp4" />
      </video>
    </div>
    <h1 class="title">test</h1>
    <button @click="downloadVideo" class="download-button">下载视频</button>

    <div class="pagination">
      <button @click="prevItem" :disabled="currentIndex === 0">上一个</button>
      <span>第 {{ currentIndex + 1 }} 项 / 共 {{ totalItems }} 项</span>
      <button @click="nextItem" :disabled="currentIndex === totalItems - 1">下一个</button>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  components: {
    DesignviewNav,
    HeaderBanner,
    FooterComp,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const buildDetail = ref({})
    const allBuilds = ref([])
    const currentIndex = ref(0)
    const totalItems = ref(0)
    const videoError = ref(null)
    const videoPath = ref(null)

    const handleVideoError = (e) => {
      console.error('视频播放错误:', e)
      videoError.value = '视频格式可能不受支持或文件已损坏'
    }

    const fetchBuildDetail = async (id) => {
      try {
        const response = await axios.get(`/api/build/detail/${id}`)
        buildDetail.value = response.data
        videoPath.value = response.data.videoPath
        console.log('获取构建详情成功:', response.data)
        console.log('视频地址:', buildDetail.value.videoPath)
        videoError.value = null // 重置错误状态
      } catch (error) {
        console.error('获取工地详情失败:', error)
      }
    }

    const fetchAllBuilds = async () => {
      try {
        const response = await axios.get('/api/build/list', {
          params: {
            pageNum: 1,
            pageSize: 1000, // 获取所有数据用于翻页
          },
        })
        allBuilds.value = response.data.records
        totalItems.value = allBuilds.value.length
        currentIndex.value = allBuilds.value.findIndex(
          (item) => item.id === parseInt(route.params.id),
        )
      } catch (error) {
        console.error('获取所有工地列表失败:', error)
      }
    }

    const downloadVideo = () => {
      window.open(`/api/build/download/${route.params.id}`, '_blank')
    }

    const prevItem = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--
        router.push(`/design/site-photos/${allBuilds.value[currentIndex.value].id}`)
      }
    }

    const nextItem = () => {
      if (currentIndex.value < totalItems.value - 1) {
        currentIndex.value++
        router.push(`/design/site-photos/${allBuilds.value[currentIndex.value].id}`)
      }
    }
    onBeforeRouteUpdate(async (to, from, next) => {
      await fetchBuildDetail(to.params.id)
      currentIndex.value = allBuilds.value.findIndex((item) => item.id === parseInt(to.params.id))
      next()
    })

    onMounted(() => {
      fetchBuildDetail(route.params.id)
      fetchAllBuilds()
    })

    return {
      buildDetail,
      currentIndex,
      totalItems,
      videoError,
      downloadVideo,
      prevItem,
      nextItem,
      handleVideoError,
      videoPath
    }
  },
}
</script>

<style scoped>
.detail-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.video-container {
  margin: 20px 0;
  position: relative;
}

video {
  width: 100%;
  border-radius: 8px;
  background-color: #000;
}

.title {
  font-size: 24px;
  margin: 0 auto;
}

.video-error {
  color: #ff0000;
  padding: 10px;
  background-color: #ffeeee;
  border-radius: 4px;
  margin-top: 10px;
}

.video-error a {
  color: #0066cc;
  text-decoration: underline;
}

.download-button {
  display: block;
  margin: 10px auto 0;
  padding: 10px 20px;
  background-color: #fa0310;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.pagination button {
  padding: 8px 16px;
  background-color: #fa0404;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
