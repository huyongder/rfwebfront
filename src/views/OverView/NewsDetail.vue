/**newsDetail 动态渲染出详细界面 */
<template>
  <div class="detail-container">
    <div class="detail-wrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'NewsPage' }">集团动态</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card class="detail-card">
        <h1 class="detail-title">{{ newsDetail.title }}</h1>
        <div class="meta-info">
          <span class="publish-date">{{ formatDate(newsDetail.createTime) }}</span>
          <el-tag type="info" size="small">{{ newsDetail.category }}</el-tag>
        </div>

        <el-image
          :src="newsDetail.coverImage"
          class="cover-image"
          :preview-src-list="[newsDetail.coverImage]"
        />

        <div class="quill-content" v-html="safeContent"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '@/utils/request'
import DOMPurify from 'dompurify'
// 导入 ElMessage
import { ElMessage } from 'element-plus'

const newsDetail = ref({})
// 增加加载状态和错误处理
const loading = ref(true)

// 通过props接收路由参数[3](@ref)
const props = defineProps({
  id: {
    type: [String, Number], // 支持字符串和数字类型
    required: true,
    validator: (value) => /^\d+$/.test(value), // 验证数字格式
  },
})

// 安全过滤富文本内容[6](@ref)
const safeContent = computed(() => {
  return DOMPurify.sanitize(newsDetail.value.content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen'],
  })
})

// 获取详情数据
const fetchDetail = async () => {
  try {
    // 修改响应结构解构
    const res = await axios.get(`/api/news/public/${props.id}`) // 注意添加/api前缀
    if (res.data.code !== 200) throw new Error(res.data.msg)

    // 验证响应结构
    if (res.data.code !== 200) throw new Error(res.data.msg)
    if (!res.data.data?.content) throw new Error('接口数据缺失content字段')

    const apiData = res.data.data

    newsDetail.value = {
      title: apiData.title || '默认标题',
      content: apiData.content, // 确保content字段存在
      coverImage: apiData.coverImage,
      category: '科技动态',
      createTime: apiData.createTime,
    }
    console.log('新闻详情数据:', newsDetail.value) // 调试用
  } catch (error) {
    ElMessage.error(`加载失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDetail)

//日期格式化工具函数
const formatDate = (timestamp) => {
  if (!timestamp) return '未知日期'

  // 处理ISO格式时间（如 "2023-10-01T10:00:00"）
  const date = new Date(timestamp)

  return date
    .toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/\//g, '-')
}
</script>

<style scoped>
.quill-content {
  line-height: 1.6;

  /* 重置富文本样式 */
  h2 {
    font-size: 1.5em;
    margin: 1em 0;
  }
  p {
    margin: 0.8em 0;
  }
  ul {
    padding-left: 2em;
  }
  li {
    list-style: disc;
  }

  /* 处理图片自适应 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem auto;
  }
}
</style>
