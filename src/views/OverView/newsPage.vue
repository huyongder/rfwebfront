<template>
  <div class="main-container">
    <OverviewNav />

    <div class="content-wrapper">
      <div class="breadcrumb-bar">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>集团动态</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="news-list-container">
        <div
          v-for="(item, index) in newsList"
          :key="item.id"
          class="news-item"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = -1"
        >
          <el-card shadow="never" class="flat-card">
            <div class="card-inner">
              <!-- 封面图容器 -->
              <div class="image-wrapper" :class="{ 'image-hover': hoverIndex === index }">
                <el-image
                  :src="item.coverImage"
                  class="news-cover"
                  fit="cover"
                  :preview-src-list="[item.coverImage]"
                >
                  <template #error>
                    <div class="image-fallback">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </template>
                </el-image>
              </div>

              <!-- 修改后的内容区域 -->
              <div class="content-main">
                <div class="layout-container">
                  <!-- 左侧内容区域 (80%) -->
                  <div class="left-content">
                    <div class="title-header">
                      <router-link
                        :to="{ name: 'NewsDetail', params: { id: item.id } }"
                        class="title-link"
                      >
                        <h3 class="news-title" :class="{ 'title-hover': hoverIndex === index }">
                          {{ item.title }}
                        </h3>
                      </router-link>

                      <div class="meta-info">
                        <el-button
                          type="text"
                          class="detail-btn"
                          :class="{ 'btn-hover': hoverIndex === index }"
                          @click="$router.push({ name: 'NewsDetail', params: { id: item.id } })"
                        >
                          查看详情 <i class="el-icon-arrow-right"></i>
                        </el-button>
                      </div>
                    </div>
                    <div class="title-divider"></div>
                    <div class="news-summary">{{ item.summary }}</div>
                  </div>

                  <!-- 右侧日期区域 (20%) -->
                  <div class="right-date">
                    <div class="date-wrapper" :class="{ 'date-hover': hoverIndex === index }">
                      <div class="year-month">{{ formatYearMonth(item.createTime) }}</div>
                      <div class="day-red">{{ formatDay(item.createTime) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          background
          :page-size="pageSize"
          :current-page="currentPage"
          :total="total"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '@/utils/request'
import OverviewNav from '@/components/NavComp/OverviewNav.vue'

export default defineComponent({
  name: 'NewsPage',
  components: {
    OverviewNav,
  },
  setup() {
    const newsList = ref([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const hoverIndex = ref(-1)

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

    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/api/news/public/list', {
          params: {
            pageNum: currentPage.value,
            pageSize: pageSize.value,
          },
        })
        console.log('收到响应：', response)
        if (response.code === 200) {
          newsList.value = response.data.records || []
          total.value = response.data.total || 0
        } else {
          ElMessage.error(response.msg || '数据加载失败')
        }
      } catch (error) {
        ElMessage.error('请求异常，请检查网络')
        console.error('API错误详情:', error)
      }
    }

    const handlePageChange = (newPage) => {
      currentPage.value = newPage
      fetchData()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDetail = (id) => {
      // 跳转详情页逻辑
      console.log('查看详情:', id)
    }

    onMounted(() => {
      fetchData()
    })

    return {
      newsList,
      total,
      currentPage,
      pageSize,
      hoverIndex,
      formatYearMonth,
      formatDay,
      handlePageChange,
      handleDetail,
    }
  },
})
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  overflow-x: hidden;
}

.content-wrapper {
  width: 1000px; /* 固定父容器宽度 */
  margin: 0 auto;
  padding: 30px 0; /* 清除左右内边距 */
}

.breadcrumb-bar {
  margin: 20px 0 30px;
}

:deep(.el-breadcrumb__inner) {
  color: #666 !important;
  font-size: 15px !important;
}

.news-list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  width: 1000px; /* 精确匹配父容器宽度 */
  margin: 0 auto 20px; /* 垂直间距保持20px */
  transition: transform 0.3s ease;
}

.news-item:hover {
  transform: translateY(-3px);
}

.flat-card {
  width: 100% !important;
  border-radius: 0;
  border: none;
  background: #fff;
  box-shadow: none !important; /* 移除默认阴影 */
}

.card-inner {
  display: flex;
  height: 145px;
  width: 100%; /* 确保内部元素继承宽度 */
}

/* 图片样式 */
.image-wrapper {
  flex: 0 0 300px;
  height: 145px;
  overflow: hidden;
  position: relative;
}

.news-cover {
  width: 100%;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  object-position: center;
}

.image-hover .news-cover {
  transform: scale(1.03);
}

.image-fallback {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
}

/* 内容区域 */
.content-main {
  flex: 1;
  padding: 15px 25px;
  min-width: 0;
}

.layout-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.left-content {
  flex: 0 0 80%;
  padding-right: 30px;
}

.right-date {
  flex: 0 0 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 日期样式 */
.date-wrapper {
  text-align: center;
  line-height: 1.3;
  padding-left: 20px;
  border-left: 1px solid #eee;
  transition: all 0.3s ease;
}

.year-month {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.day-red {
  font-size: 28px;
  color: #c7000b;
  font-weight: 600;
}

/* 标题区域 */
.title-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.news-title {
  font-size: 20px;
  color: #333;
  margin: 0;
  flex: 1;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.title-divider {
  border-bottom: 1px dashed #ddd;
  margin: 10px 0;
}

.news-summary {
  color: #666;
  font-size: 13px;
  line-height: 1.8;
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 按钮样式 */
.detail-btn {
  color: #333 !important;
  padding: 0;
  transition: all 0.3s ease;
}

.btn-hover {
  color: #c7000b !important;
}

/* 交互效果 */
.title-hover {
  color: #c7000b !important;
}

.date-hover {
  border-color: #c7000b !important;
}

/* 分页样式 */
.pagination-container {
  width: 100%;
  margin: 20px 0 0;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

:deep(.el-pagination) {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 防止页码过多换行问题 */
}

/* 响应式 */
@media (max-width: 768px) {
  .card-inner {
    flex-direction: column;
    height: auto;
  }

  .image-wrapper {
    width: 100%;
    height: 180px;
  }

  .layout-container {
    flex-direction: column;
  }

  .left-content {
    width: 100%;
    padding-right: 0;
    margin-bottom: 15px;
  }

  .right-date {
    justify-content: flex-start;
  }

  .date-wrapper {
    border-left: none;
    border-top: 1px solid #eee;
    padding: 10px 0 0;
    width: 100%;
  }
}
</style>
