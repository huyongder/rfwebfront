/**newsDetail 动态渲染出详细界面 */
<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="detail-container">
    <div class="detail-wrapper">
      <el-card class="detail-card">
        <h1 class="detail-title">{{ newsDetail.title }}</h1>
        <el-image
          :src="newsDetail.coverImage"
          class="cover-image"
          :preview-src-list="[newsDetail.coverImage]"
        />

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
</script>

<style scoped>
.detail-wrapper{
  display: flex;
  justify-content: center;
}
.detail-title{
  text-align: center;
}
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
