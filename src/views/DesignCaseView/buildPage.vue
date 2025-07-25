<template>
  <HeaderBanner />
  <DesignviewNav />
  <div class="build-page">
    <h1>工地实拍</h1>
    <div class="build-grid">
      <div
        v-for="item in reversedBuildList"
        :key="item.id"
        class="build-item"
        @mouseenter="hoverItem(item.id)"
        @mouseleave="unhoverItem(item.id)"
        @click="goToDetail(item.id)"
      >
        <div
          class="build-image"
          :style="{ backgroundImage: `url(${item.coverImage})`, transform: hoverId === item.id ? 'translateY(-5px)' : '' }"
        ></div>
        <h3 :style="{ color: hoverId === item.id ? 'red' : '' }">{{ item.title }}</h3>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  components: {
    DesignviewNav,
    HeaderBanner,
    FooterComp
  },

  setup() {
    const router = useRouter();
    const buildList = ref([]);
    const currentPage = ref(1);
    const pageSize = 12; // 4行3列
    const totalPages = ref(1);
    const hoverId = ref(null);

    const fetchBuildList = async () => {
      try {
        const response = await axios.get('/api/build/list', {
          params: {
            pageNum: currentPage.value,
            pageSize: pageSize
          }
        });
        buildList.value = response.data.records;
        totalPages.value = response.data.pages;
      } catch (error) {
        console.error('获取工地列表失败:', error);
      }
    };

    const hoverItem = (id) => {
      hoverId.value = id;
    };

    const unhoverItem = () => {
      hoverId.value = null;
    };

    const goToDetail = (id) => {
      router.push(`/design/site-photos/${id}`);
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchBuildList();
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchBuildList();
      }
    };

    const reversedBuildList = computed(() => {
      return [...buildList.value].reverse();
    });

    onMounted(() => {
      fetchBuildList();
    });


    return {
      buildList,
      currentPage,
      totalPages,
      hoverId,
      hoverItem,
      unhoverItem,
      goToDetail,
      prevPage,
      nextPage,
      reversedBuildList
    };
  }
};
</script>

<style scoped>
.build-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.build-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  margin: 20px 0;
}

.build-item {
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;          /* 启用Flex布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center;    /* 水平居中 */
  justify-content: center; /* 垂直居中（可选） */
}

.build-image {
  width: 370px;
  height: 190px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.build-item h3 {
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

.pagination button {
  padding: 8px 16px;
  background-color: #f80303;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>