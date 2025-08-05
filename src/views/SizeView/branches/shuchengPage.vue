<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'
// 导入图片资源
import shuchengImg from '@/assets/about/branches/shucheng.jpg'

export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp
  },
  data() {
    return {
      shuchengImg // 将图片作为响应式数据
    }
  }
}
</script>

<template>
  <HeaderBanner />
  <SizeviewNav />
  <br />
  <div class="title">舒城公司</div>
  <div class="address">
    <p>地址： 舒城梅河东路华盛集团5-6层</p>
    <p>电话： 0564-7225888 (占地3000平米)</p>
  </div>
  <img :src="shuchengImg" alt="舒城分公司图片" class="shucheng" />
  <div class="navigation">
    <router-link to="/about/branches/huoqiu" class="nav-link">上一篇：霍邱分公司</router-link>
    <router-link to="/about/branches/yeji" class="nav-link">下一篇：叶集分公司</router-link>
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
.shucheng {
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
