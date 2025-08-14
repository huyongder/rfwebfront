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
// 导入图片资源
import shouxianImg from '@/assets/about/branches/shouxian.jpg'

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp
  },
  data() {
    return {
      shouxianImg // 将图片作为响应式数据
    }
  }
}
</script>

<template>
  <HeaderBanner />
  <SizeviewNav />
  <br />
  <div class="title">寿县分公司</div>
  <div class="address">
    <p>地址： 寿县瑶海大市场4栋4-5层</p>
    <p>电话： 0564-2753666(占地3000平米)</p>
  </div>
  <img :src="shouxianImg" alt="寿县分公司图片" class="shouxian" />
  <div class="navigation">
    <router-link to="/about/branches/jinzhai" class="nav-link">上一篇：金寨分公司</router-link>
    <router-link to="/about/branches/huoshan" class="nav-link">下一篇：霍山分公司</router-link>
    <router-link to="/about/branches" class="nav-link">返回上一级</router-link>
  </div>
  <FooterComp />
</template>

<style scoped>
/* PC端样式 - 完全保持不变 */
.title {
  font-size: 26px;
  text-align: center;
}
.address {
  width: fit-content;
  margin-left: 30%;
  padding: 20px;
  text-align: left;
  transform: translateX(-10%);
}
.shouxian {
  width: fit-content;
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
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

/* 仅添加手机端适配样式 */
@media only screen and (max-width: 768px) {
  .title {
    font-size: 20px;
  }

  .address {
    margin-left: 10%;
    transform: translateX(0);
    padding: 15px 10px;
    width: 80%;
  }

  .shouxian {
    width: 90%;
    margin: 0 auto;
  }

  .navigation {
    margin-left: 10%;
    width: 80%;
    align-items: center;
  }

  .nav-link {
    font-size: 12px;
    padding: 8px 15px;
    margin-bottom: 8px;
    width: 100%;
    text-align: center;
    background-color: #f8f9fa;
  }
}
</style>
