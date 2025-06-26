<!--
 * @Descripttion:代理品牌页面

 * @Author: huimeng
 * @Date: 2025-02-18 10:06:09
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-26 11:03:41
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue';
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp,
  },
};
</script>

<template>
  <HeaderBanner />
  <SizeviewNav />
  <div class="container">
    <div class="current-location">
      <span class="location-text">
        当前的位置：
        <a href="/" class="link">首页</a> &gt;
        <a href="/about/brands" class="link">代理品牌</a>
      </span>
    </div>
  </div>

  <img src="/src/public/about/brand.jpg" alt="Brands" class="brands-image" />
  <FooterComp />
</template>

<style scoped>
.container {
  margin-top: 20px;
  padding: auto;
  font-family: Arial, sans-serif;
  border-bottom: 1px solid #e0e0e0; /* 添加浅色横线 */
  padding-bottom: 15px; /* 为横线留出间距 */
}
.current-location {
  text-align: right;
  font-size: 14px;
  color: #0e0d0d;
}
.location-text{
  margin-right: 300px;
}
.link {
  color: #0e0d0d;
}
.brands-image {
  width: 780px;
  height: auto;
  display: block;
  margin: 0 auto;
  padding: 20px 20%;
}
</style>
