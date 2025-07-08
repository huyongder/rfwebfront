<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-06-28 15:52:38
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-03 09:27:20
-->
<template>
  <HeaderBanner />
  <DesignviewNav />
  <div class="good-case-details">
    <h1 class="title">{{ caseData.title }}</h1>
    <div class="content" v-html="caseData.content"></div>
  </div>
  <FooterComp />
</template>

<script>
import axios from 'axios'
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  name: 'goodCaseDetailsPage',
  components: {
    DesignviewNav,
    HeaderBanner,
    FooterComp,
  },

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
      axios
        .get(`/api/goodCase/${id}`)
        .then((response) => {
          this.caseData = response.data.data
        })
        .catch((error) => {
          console.error('获取详情失败:', error)
          this.$router.push({ name: 'excellent-cases' })
        })
    },
    goBack() {
      this.$router.push({ name: 'excellent-cases' })
    },
  },
}
</script>

<style scoped>
.good-case-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: large;
  text-align: center;
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
