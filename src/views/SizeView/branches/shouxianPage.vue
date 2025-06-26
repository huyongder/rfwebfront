<!--
 * @Descripttion: 寿县分公司界面
 * @Author: huimeng
 * @Date: 2025-02-18 08:22:56
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-26 10:55:28
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp
  },
}
</script>

<template>
  <HeaderBanner  />
  <SizeviewNav />
  <br />
  <div class="title">寿县分公司</div>
  <div class="address">
    <p>地址： 寿县瑶海大市场4栋4-5层</p>
    <p>电话： 0564-2753666(占地3000平米)</p>
  </div>
  <img src="/src/public/about/branches/shouxian.jpg" alt="shouxian" class="shouxian" />
  <div class="navigation">
    <router-link to="/about/branches/jinzhai" class="nav-link">上一篇：金寨分公司</router-link>
    <router-link to="/about/branches/huoshan" class="nav-link">下一篇：霍山分公司</router-link>
    <router-link to="/about/branches" class="nav-link">返回上一级</router-link>
  </div>
  <FooterComp />
</template>

<style scoped>
.title {
  font-size: 26px;
  text-align: center;
}
.address {
  width: fit-content; /* 根据内容自适应宽度 */
  margin-left: 30%; /* 左侧留白30%实现偏左 */
  padding: 20px;
  text-align: left; /* 内容左对齐 */
  transform: translateX(-10%); /* 微调居中位置 */
}
.shouxian {
  width: fit-content;
  display: block;
  margin: 0 auto;
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: fit-content;
  margin-left: 350px;
}
.nav-p {
  color: #000;
  text-decoration: none;
  font-size: 13px;
  padding: 1px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.nav-link {
  color: #000;
  text-decoration: none;
  font-size: 13px;
  padding: 1px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

.nav-link:hover {
  background-color: #e9ecef;
}
</style>
