<template>
  <HeaderBanner />
  <DesignviewNav />
  <div class="build-page">
    <h1>工地实拍</h1>
    <div class="build-grid">
      <div
        v-for="item in buildList"
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
import { ref, onMounted, onActivated } from 'vue';
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
    const pageSize = 12;
    const totalPages = ref(1);
    const hoverId = ref(null);
    const scrollPosition = ref(0);

    const fetchBuildList = async () => {
      try {
        const response = await axios.get('/api/build/list', {
          params: {
            pageNum: currentPage.value,
            pageSize: pageSize,
            sortField: 'id',
            sortOrder: 'desc'
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
      // 保存当前滚动位置和页码
      scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
      sessionStorage.setItem('buildListPage', currentPage.value.toString());
      sessionStorage.setItem('buildListScroll', scrollPosition.value.toString());

      router.push(`/design/site-photos/${id}`);
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        fetchBuildList();
        // 滚动到顶部
        window.scrollTo(0, 0);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchBuildList();
        // 滚动到顶部
        window.scrollTo(0, 0);
      }
    };

    onMounted(() => {
      // 检查是否有保存的页码
      const savedPage = sessionStorage.getItem('buildListPage');
      if (savedPage) {
        currentPage.value = parseInt(savedPage);
        sessionStorage.removeItem('buildListPage');
      }

      fetchBuildList().then(() => {
        // 检查是否有保存的滚动位置
        const savedScroll = sessionStorage.getItem('buildListScroll');
        if (savedScroll) {
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedScroll));
            sessionStorage.removeItem('buildListScroll');
          }, 100);
        }
      });
    });

    // 使用keep-alive时，组件激活时恢复状态
    onActivated(() => {
      const savedPage = sessionStorage.getItem('buildListPage');
      if (savedPage) {
        currentPage.value = parseInt(savedPage);
        sessionStorage.removeItem('buildListPage');
      }

      const savedScroll = sessionStorage.getItem('buildListScroll');
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll));
          sessionStorage.removeItem('buildListScroll');
        }, 100);
      }
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
      nextPage
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-size: 16px;
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

/* 平板设备适配 */
@media (max-width: 992px) {
  .build-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .build-image {
    width: 100%;
    height: 180px;
  }
}

/* 手机设备适配 */
@media (max-width: 768px) {
  .build-page {
    padding: 15px;
  }

  .build-grid {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  .build-image {
    width: 100%;
    height: 200px;
  }

  .build-item h3 {
    font-size: 18px;
    margin-top: 8px;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }

  .pagination span {
    order: -1;
  }

  .pagination button {
    width: 100%;
    padding: 10px;
  }
}

/* 小尺寸手机适配 */
@media (max-width: 480px) {
  .build-page h1 {
    font-size: 24px;
  }

  .build-image {
    height: 160px;
  }

  .build-item h3 {
    font-size: 16px;
  }
}
</style>