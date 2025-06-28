<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-06-28 15:56:35
 * @LastEditors: huimeng
 * @LastEditTime: 2025-06-28 15:56:41
-->
<template>
  <div class="detail">
    <h1>{{ caseData.title }}</h1>
    <div class="content" v-html="caseData.content"></div>

    <div class="pagination">
      <button @click="goBack">返回列表</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      caseData: {},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const id = this.$route.params.id
      axios.get(`/api/goodCase/${id}`).then((response) => {
        this.caseData = response.data.data
      })
    },
    goBack() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  margin-top: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
