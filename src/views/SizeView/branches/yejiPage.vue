<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-02-17 14:43:14
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-05 09:03:01
--><!--
 * @Descripttion: 叶集分公司界面
 * @Author: huimeng
 * @Date: 2025-02-17 14:43:14
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-26 11:00:41
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'
// 导入图片资源
import yejiImg from '@/assets/about/branches/yeji.jpg'

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp
  },
  data() {
    return {
      yejiImg // 将图片作为响应式数据
    }
  }
}
</script>

<template>
  <HeaderBanner />
  <SizeviewNav />
  <br />
  <div class="title">叶集分公司</div>
  <div class="address">
    <p>地址： 叶集区金叶大道金叶新城3-4层</p>
    <p>电话： 0564-7256888 (占地3000平米)</p>
  </div>
  <img :src="yejiImg" alt="叶集分公司图片" class="yeji" />
  <div class="navigation">
    <router-link to="/about/branches/shucheng" class="nav-link">上一篇：舒城分公司</router-link>
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
  width: fit-content;
  margin-left: 30%;
  padding: 20px;
  text-align: left;
  transform: translateX(-10%);
}
.yeji {
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
</style>