<template>
  <HeaderBanner />
  <DesignviewNav />
  <div class="good-case-page">
    <h1>优秀案例展示</h1>
    <div class="case-grid">
      <div
        v-for="item in caseList"
        :key="item.id"
        class="case-item"
        @mouseover="hoverItem = item.id"
        @mouseleave="hoverItem = null"
        @click="goToDetail(item.id)"
      >
        <div
          class="case-image"
          :style="{
            backgroundImage: `url(${item.coverUrl})`,
            transform: hoverItem === item.id ? 'translateY(-5px)' : 'none'
          }"
        ></div>
        <h3 :style="{ color: hoverItem === item.id ? 'red' : 'inherit' }">{{ item.title }}</h3>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="pageNum === 1">上一页</button>
      <span>第 {{ pageNum }} 页 / 共 {{ totalPage }} 页</span>
      <button @click="nextPage" :disabled="pageNum === totalPage">下一页</button>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import axios from 'axios'
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  name: 'goodCasePage',
  components: {
     DesignviewNav,
     HeaderBanner,
     FooterComp
    },
  data() {
    return {
      caseList: [],
      pageNum: 1,
      pageSize: 12,
      total: 0,
      hoverItem: null
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get('/api/goodCase/page', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(response => {
        console.log('分页数据:', response.data.data);
        this.caseList = response.data.data.records
        this.total = response.data.data.total
      })
    },
    goToDetail(id) {
      this.$router.push({
        name: 'goodCaseDetailsPage',
        params: { id }
      })
    },
    prevPage() {
      if (this.pageNum > 1) {
        this.pageNum--
        this.fetchData()
      }
    },
    nextPage() {
      if (this.pageNum < this.totalPage) {
        this.pageNum++
        this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
.good-case-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px 0;
}

.case-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.case-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

h3 {
  margin-top: 10px;
  text-align: center;
  transition: color 0.3s ease;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>