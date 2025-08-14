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
  font-size: 16px;
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
  background-color: #f80303;
  color: white;
  border: none;
  border-radius: 4px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: #cccccc;
}

/* 平板设备适配 (768px-992px) */
@media (max-width: 992px) {
  .case-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

  .case-image {
    height: 180px;
  }

  h3 {
    font-size: 15px;
  }
}

/* 手机设备适配 (576px-768px) */
@media (max-width: 768px) {
  .good-case-page {
    padding: 15px;
  }

  .case-grid {
    grid-template-columns: 1fr;
    grid-gap: 25px;
    margin: 20px 0;
  }

  .case-image {
    height: 220px;
  }

  h3 {
    font-size: 16px;
    margin-top: 12px;
  }

  .pagination {
    flex-direction: column;
    gap: 12px;
    margin-top: 25px;
  }

  .pagination span {
    order: -1; /* 将页码显示放在最上面 */
  }

  button {
    width: 100%;
    padding: 10px;
  }
}

/* 小尺寸手机适配 (小于576px) */
@media (max-width: 576px) {
  .good-case-page h1 {
    font-size: 22px;
    text-align: center;
  }

  .case-image {
    height: 200px;
  }

  h3 {
    font-size: 15px;
  }

  .pagination {
    gap: 10px;
  }
}
</style>