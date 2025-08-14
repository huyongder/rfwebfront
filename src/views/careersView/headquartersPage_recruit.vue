<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-02-25 10:50:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 15:18:56
-->
<!--
 * @Descripttion: 总部招聘
 * @Author: huimeng
 * @Date: 2025-02-25 10:50:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-25 10:58:24
-->

<template>
  <HeaderBanner />
  <CareersviewNav />
  <div class="headquarters-page">
    <img
      src="/src/public/careerPhotos/headquarters.jpg"
      alt="总部招聘"
      class="headquarters-image"
    />
  </div>
  <FooterComp />
</template>

<script lang="ts">
import CareersviewNav from '@/components/NavComp/CareersviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  name: 'headquartersPage',
  components: {
    CareersviewNav,
    HeaderBanner,
    FooterComp,
  },
}
</script>

<style scoped>
/* PC端保持原有样式完全不变 */
.headquarters-page {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

/* 仅针对手机端的适配 */
@media (max-width: 768px) {
  .headquarters-page {
    margin-top: 60px;
    padding: 0 15px;
    box-sizing: border-box;
  }

  .headquarters-image {
    width: 100%;
    height: auto;
    max-width: 100%;
  }
}
</style>
