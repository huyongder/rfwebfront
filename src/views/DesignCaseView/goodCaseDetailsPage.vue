<template>
  <div class="good-case-details">
    <h1>{{ caseData.title }}</h1>
    <div class="content" v-html="caseData.content"></div>

    <div class="actions">
      <button @click="goBack" class="back-btn">返回列表</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'goodCaseDetailsPage',
  data() {
    return {
      caseData: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const id = this.$route.params.id
      axios.get(`/api/goodCase/${id}`).then(response => {
        this.caseData = response.data.data
      }).catch(error => {
        console.error('获取详情失败:', error)
        this.$router.push({ name: 'excellent-cases' })
      })
    },
    goBack() {
      this.$router.push({ name: 'excellent-cases' })
    }
  }
}
</script>

<style scoped>
.good-case-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  margin-top: 30px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.back-btn {
  padding: 8px 16px;
  cursor: pointer;
}
</style>