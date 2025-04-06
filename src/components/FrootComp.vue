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
              <div
                class="image-wrapper"
                :class="{'image-hover': hoverIndex === index}"
              >
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

              <!-- 修改的内容区域 -->
              <div class="content-main">
                <div class="title-section">
                  <!-- 新增的日期容器 -->
                  <div class="date-top">
                    <div
                      class="date-wrapper"
                      :class="{'date-hover': hoverIndex === index}"
                    >
                      <span class="year-month">{{ formatYearMonth(item.createTime) }}</span>
                      <span class="day-red">{{ formatDay(item.createTime) }}</span>
                    </div>
                  </div>

                  <div class="title-header">
                    <h3
                      class="news-title"
                      :class="{'title-hover': hoverIndex === index}"
                    >
                      {{ item.title }}
                    </h3>
                    <div class="meta-info">
                      <el-button
                        type="text"
                        class="detail-btn"
                        :class="{'btn-hover': hoverIndex === index}"
                        @click="handleDetail(item.id)"
                      >
                        查看详情 <i class="el-icon-arrow-right"></i>
                      </el-button>
                    </div>
                  </div>
                  <div class="title-divider"></div>
                </div>

                <div class="news-summary">{{ item.summary }}</div>
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

    <FooterComp />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '@/utils/request'
import FooterComp from '@/components/FooterComp.vue'
import OverviewNav from '@/components/NavComp/OverviewNav.vue'

export default defineComponent({
  name: 'NewsPage',
  components: {
    OverviewNav,
    FooterComp
  },
  setup() {
    const newsList = ref([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const hoverIndex = ref(-1)

    // 日期格式化方法
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
        const { data: response } = await axios.get('/news/public/list', {
          params: {
            pageNum: currentPage.value,
            pageSize: pageSize.value
          }
        });

        if (response.code === 200) {
          newsList.value = response.data.records || [];
          total.value = response.data.total || 0;
          if (total.value === 0 && newsList.value.length > 0) {
            console.warn('后端返回total为0但存在数据，建议检查接口');
            total.value = newsList.value.length;
          }
        } else {
          ElMessage.error(response.msg || '数据加载失败');
        }
      } catch (error) {
        ElMessage.error('请求异常，请检查网络');
        console.error('API错误详情:', error);
      }
    }

    const handlePageChange = (newPage) => {
      currentPage.value = newPage;
      fetchData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleDetail = (id) => {
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
      handleDetail
    }
  }
})
</script>
<style scoped>
/* 完整样式 */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
}

.content-wrapper {
  flex: 1;
  max-width: 1225px;
  margin: 0 auto;
  padding: 30px 20px;
}

.breadcrumb-bar {
  margin: 20px 0 30px;
}

:deep(.el-breadcrumb__inner) {
  color: #666 !important;
  font-size: 15px !important;
  font-weight: normal !important;
}

.news-list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  width: 1225px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.news-item:hover {
  transform: translateY(-3px);
}

.flat-card {
  border-radius: 0;
  border: none;
  background: #fff;
}

.card-inner {
  display: flex;
  height: 145px;
  padding: 0;
}

/* 图片样式 */
.image-wrapper {
  flex: 0 0 300px;
  height: 145px;
  position: relative;
  overflow: hidden;
}

.news-cover {
  width: 300px;
  height: 145px;
  object-fit: cover;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-hover .news-cover {
  transform: scale(1.03);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.image-fallback {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #ccc;
}

/* 内容区域 */
.content-main {
  flex: 1;
  padding: 18px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 145px;
}

.title-section {
  position: relative;
  padding-top: 24px; /* 新增 */
}

/* 新增日期定位样式 */
.date-top {
  position: absolute;
  top: -6px;
  right: 0;
  z-index: 1;
  background: white;
  padding: 0 5px;
}

.date-wrapper {
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: #333;
  transition: color 0.3s ease;
}

.date-hover {
  color: #c7000b !important;
}

.year-month {
  font-size: 14px;
  color: #666;
}

.day-red {
  font-size: 18px;
  color: #c7000b;
}

.title-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px; /* 调整 */
}

.news-title {
  font-size: 24px;
  color: #333;
  margin: 0;
  flex: 1;
  max-width: 85%;
  transition: color 0.3s ease;
}

.title-hover {
  color: #c7000b !important;
}

.title-divider {
  border-bottom: 1px dashed #ddd;
  width: 100%;
  margin: 12px 0 8px; /* 调整 */
}

.news-summary {
  color: #666;
  font-size: 12px;
  line-height: 1.8;
  margin: 6px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  min-height: 36px;
}

/* 按钮样式 */
.detail-btn {
  color: #333 !important;
  padding: 0;
  margin-left: 15px;
  transition: all 0.3s ease;
}

.btn-hover {
  color: #c7000b !important;
}

.btn-hover .el-icon-arrow-right {
  transform: translateX(3px);
  transition: transform 0.2s ease;
}

/* 分页样式 */
.pagination-container {
  margin-top: 40px;
  text-align: center;
  padding: 15px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

:deep(.el-pagination.is-background .el-pager li) {
  margin: 0 3px !important;
  min-width: 32px;
  height: 32px;
  line-height: 32px;
}

:deep(.el-pagination.is-background .el-pager li.active) {
  background-color: #c7000b !important;
  color: #fff !important;
  border-color: #c7000b !important;
}

/* 新增响应式调整 */
@media (max-width: 768px) {
  .news-item {
    width: 100%;
  }

  .card-inner {
    flex-direction: column;
    height: auto;
  }

  .image-wrapper {
    flex: none;
    width: 100%;
    height: 200px;
  }

  .news-cover {
    width: 100%;
    height: 200px;
  }

  .content-main {
    min-height: auto;
    padding: 15px;
  }

  .date-top {
    position: static;
    background: transparent;
    padding: 0;
    margin-bottom: 8px;
  }
}
</style>