<!--
 * @Descripttion: 集团规模>保障团队
 * @Author: huimeng
 * @Date: 2025-02-19 08:17:08
 * @LastEditors: huimeng
 * @LastEditTime: 2025-06-26 16:55:41
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp,
  },
}
</script>

<template>
  <HeaderBanner />
  <SizeviewNav />
  <div class="container">
    <h1 class="title">保障团队</h1>
    <div class="current-location">
      <span class="location-text">
        当前的位置：
        <a href="/" class="link">首页</a> &gt;
        <a href="/about/branches/team" class="link">保障团队</a>
      </span>
    </div>
  </div>
  <div class="top">
    <p>
      荣锋装饰，工地绝对不外包，拥有自己直管的工程施工及监理团队，以及由卫浴组、厨电组、家居组构成的完整售后服务团队、76辆售后服务车；随时随地，让客户享受一站式安心售后服务；集团拥有1号、2号和3号三个总计1.5万平米的大型仓库，以及仓储物流团队，库存货品价值超5000万，为客户提供完整的供货保障。
    </p>
  </div>
  <div class="images">
    <p class="subtitle">工程团队</p>
    <img src="/src/public/about/team/gongchengTeam.jpg" alt="工程团队" class="team-image" />
    <p class="subtitle">监理团队</p>
    <img src="/src/public/about/team/jianliTeam.jpg" alt="监理团队" class="team-image" />
    <p class="subtitle">施工团队</p>
    <img src="/src/public/about/team/shigongTeam.jpg" alt="施工团队" class="team-image" />
    <p class="subtitle">售后团队</p>
    <img src="/src/public/about/team/shouhouTeam.jpg" alt="售后团队" class="team-image" />
    <p class="subtitle">仓储团队</p>
    <img src="/src/public/about/team/cangchuTeam.gif" alt="仓储团队" class="team-image" />
    <div class="cangku">
      <img src="/src/public/about/team/cangku1.jpg" alt="1" class="cangku-image" />
      <img src="/src/public/about/team/cangku2.jpg" alt="2" class="cangku-image" />
    </div>
    <img
      src="/src/public/about/team/cangku3.jpg"
      width="1200px"
      alt="仓储团队"
      class="team-image"
    />
  </div>
  <FooterComp />
</template>

<style scoped>
.container {
  padding: 15px;
  max-width: 1250px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.current-location {
  font-size: 14px;
  color: #666;
}

.location-text {
  color: #070707;
}

.link {
  color: #000;
}

.top {
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: #333;
  line-height: 1.5;
  max-width: 1250px;
  margin: 0 auto; 
  text-indent: 2em;
}

.images {
  max-width: 1250px;
  margin: 0 auto; /* 居中显示 */
  text-align: center; /* 文字居中 */
  display: grid;
}

.subtitle {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  font-size: 25px;
}

.team-image {
  max-width: 100%; /* 图片最大宽度为容器宽度 */
  height: auto; /* 高度自适应 */
  display: block; /* 防止图片下方有空白间隙 */
  margin: 0 auto; /* 图片居中 */
}

.cangku {
  display: flex;
  padding: 0 25px;
  margin-left: 0;
}
.cangku-image {
  width: 600px;

}
</style>
