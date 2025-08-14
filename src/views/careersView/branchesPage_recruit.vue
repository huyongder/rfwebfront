<!--
 * @Descripttion: 分公司招聘
 * @Author: huimeng
 * @Date: 2025-02-25 10:50:52
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 15:14:15
-->

<template>
  <HeaderBanner />
  <CareersviewNav />
  <div class="branches-page">
    <img src="/src/public/careerPhotos/branches.jpg" alt="分公司招聘" class="branches-image" />
  </div>
  <FooterComp />
</template>

<script lang="ts">
import CareersviewNav from '@/components/NavComp/CareersviewNav.vue';
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  name: 'branchesPage',
  components: {
    CareersviewNav,
    HeaderBanner,
    FooterComp,
  },
};
</script>

<style scoped>
.branches-page {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.branches-image {
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

/* 平板设备适配 */
@media (max-width: 1024px) {
  .branches-page {
    margin-top: 80px;
  }
}

/* 手机端适配 */
@media (max-width: 768px) {
  .branches-page {
    margin-top: 60px;
    padding: 0 15px;
  }

  .branches-image {
    width: 100%;
  }
}

/* 小屏手机适配 */
@media (max-width: 480px) {
  .branches-page {
    margin-top: 50px;
    padding: 0 10px;
  }

  .branches-image {
    border-radius: 3px;
  }
}
</style>