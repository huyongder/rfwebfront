<!--
 * @Descripttion: 霍山分公司界面
 * @Author: huimeng
 * @Date: 2025-02-17 14:43:04
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-18 08:46:55
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
  <div class="title">霍山分公司</div>
  <div class="address">
    <p>地址： 霍山县华强文旅城2号楼2-3层</p>
    <p>电话： 0564-7259888(占地3000平米)</p>
  </div>
  <img src="/src/public/about/branches/huoshan.jpg" alt="huoqiu" class="huoqiu" />
  <div class="navigation">
    <router-link to="/about/branches/shouxian" class="nav-link">上一篇：寿县分公司</router-link>
    <router-link to="/about/branches/huoqiu" class="nav-link">下一篇：霍邱分公司</router-link>
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
.huoqiu {
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
