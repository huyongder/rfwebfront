<!--
 * @Descripttion:页面展示组件
 * @Author: huimeng
 * @Date: 2025-03-03 16:38:27
 * @LastEditors: huimeng
 * @LastEditTime: 2025-03-03 17:00:43
-->
<template>
  <div class="page-viewer">
    <h2>页面内容</h2>
    <div v-html="content"></div>
    <router-link :to="`/edit/${pageId}`">编辑</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      pageId: this.$route.params.id,
    }
  },
  async created() {
    await this.fetchPage()
  },
  methods: {
    async fetchPage() {
      try {
        const response = await fetch(`http://localhost:8080/api/pages/get?id=${this.pageId}`)
        const result = await response.json()
        this.content = result.content
      } catch (error) {
        console.error('加载页面失败：', error)
      }
    },
  },
}
</script>

<style scoped>
.page-viewer {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
