<!--
 * @Descripttion: 分公司招聘
 * @Author: huimeng
 * @Date: 2025-02-25 10:50:52
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-25 10:55:02
-->


<template>
  <HeaderBanner />
  <CareersviewNav />
  <div class="branches-page">
    <img src="/src/public/careerPhotos/branches.jpg" alt="" />
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
}
</style>
