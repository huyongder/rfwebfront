<!--
 * @Descripttion: 金寨分公司界面展示
 * @Author: huimeng
 * @Date: 2025-02-17 14:42:25
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-18 08:20:59
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'

export default {
  components: {
    SizeviewNav,
  },
}
</script>

<template>
  <SizeviewNav />
  <br />
  <div class="title">金寨分公司</div>
  <div class="address">
    <p>地址： 金寨县莲花山路堃茂大厦A座1-2层</p>
    <p>电话： 0564-7222666 (占地3000平米)</p>
  </div>
  <img src="/src/public/about/branches/jinzhai.jpg" alt="jinzhai" class="jinzhai" />
  <div class="navigation">
    <p class="nav-p">上一篇：没有了</p>
    <router-link to="/about/branches/shouxian" class="nav-link">下一篇：寿县分公司</router-link>
    <router-link to="/about/branches" class="nav-link">返回上一级</router-link>
  </div>
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
.jinzhai {
  width: fit-content;
  margin: 0 20%;
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: fit-content;
  margin-left: 20px;
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
