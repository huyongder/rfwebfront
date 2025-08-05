<!--
 * @Descripttion: 霍山分公司界面
 * @Author: huimeng
 * @Date: 2025-02-17 14:43:04
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-05 08:57:59
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
// 导入图片
import huoshanImg from '@/assets/about/branches/huoshan.jpg'

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp,
  },
  data() {
    return {
      huoshanImg // 将图片作为组件数据
    }
  }
}
</script>

<template>
  <HeaderBanner />
  <SizeviewNav />
  <br />
  <div class="title">霍山分公司</div>
  <div class="address">
    <p>地址： 霍山县华强文旅城2号楼2-3层</p>
    <p>电话： 0564-7259888(占地3000平米)</p>
  </div>
  <img :src="huoshanImg" alt="huoshan" class="huoshan" />
  <div class="navigation">
    <router-link to="/about/branches/shouxian" class="nav-link">上一篇：寿县分公司</router-link>
    <router-link to="/about/branches/huoqiu" class="nav-link">下一篇：霍邱分公司</router-link>
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
.huoshan {
  width: fit-content;
  display: block;
  margin: 0 auto;
  max-width: 100%; /* 确保图片不会超出容器 */
  height: auto; /* 保持图片比例 */
}

.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: fit-content;
  margin-left: 350px;
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