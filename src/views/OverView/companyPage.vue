<!--
 * @Descripttion: 
 * @Author: huimeng
 * @Date: 2025-01-17 14:12:20
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-25 16:53:32
-->
<script setup lang="ts">
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
import FooterComp from '@/components/FooterComp.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
</script>

<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="company-container">
    <div class="company-page">
      <p>
        集团由董事长王显锋先生于1995年在安徽省金寨县创立，2007年进军六安市，后更名为荣锋装饰集团，并于2021年进军合肥市场。荣锋装饰集团是建材家居全品类代理/装饰设计/监理施工一体化运营服务企业，集团旗下厂家一级代理圣象地板、索菲亚全屋定制、欧派橱柜/衣柜、美标卫浴、东鹏瓷砖、顾家家居、惠达卫浴，亚细亚瓷砖、欧普照明、海尔厨电/集成灶、米兰窗帘/软装、华鹤木门、法狮龙全屋集成吊顶、樱雪厨电/集成灶、好太太晾衣机、尚高卫浴、莫干山实木定制/木门、立邦漆、德国高勒管道、西门子开关、日丰管等50个一线建材、家居、厨电品牌。<br />
        集团合肥总部设立于合肥市蜀山区乐客来商业中心、六安总部设立于顺达大市场二号楼4-5楼，拥有顺达大市场（3000平米）、金三角家居生活广场（1000平米）两大办公区；集团在合肥乐客来商业中心一至三楼（总四层、面积1.6万平米）、六安金三角家居生活广场（原居然之家）一至五楼、红星美凯龙一店A馆、顺达大市场、寿县红星美凯龙等卖场设立了102家总营业面积超5.6万平方米的高端品牌直营专卖店、三个高端家装设计部，以及专注洋房别墅设计的“锋·设计中心”；集团拥有渠道分销商300余家，专业服务车辆76辆，仓储面积超1.5万平方米。集团在六安市金寨县城、霍邱县城、霍山县城、舒城县城、叶集区以及淮南市寿县县城，成立了6家总面积超1.8万平方米的大型直营分公司、30余家核心加盟店。目前集团总面积超7.5万平方米。<br />
        经过荣锋人近30年的不懈努力与拼搏，荣锋装饰集团在服务、质量、品牌三个方面都赢得了市场的高度认可。集团自创建以来，始终坚持以“成为用户首选的高品质生活解决方案第一服务商”为企业使命；以“团结、感恩、拼搏、结果、荣誉、价值”为企业核心价值观；并以“客户第一、员工第二、企业第三”为企业核心利益观，凝心聚力，协同发展，牢牢占据安徽建材家居装饰行业的制高点，为集团稳定、高效、快速的发展保驾护航，为成就百年荣锋奠定坚实基础。
      </p>
    </div>
    <div class="company-page-img">
      <img src="@/static/overView/companyPhotos/hfcompany.png" alt="hfcompany" />
      <img src="@/static/overView/companyPhotos/jsanjiao.png" alt="jsanjiao" />
    </div>
  </div>
  <FooterComp />
</template>

<style scoped>
/* 包裹整个页面内容，使其撑满视窗高度 */
.company-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 设置页面最小高度为视窗高度 */
  margin: 0 auto;
  padding: 0 20%; /* 左右各留20%的空白 */
}

/* 主内容区域，自动撑开剩余空间 */
.company-page {
  flex: 1; /* 占据可用的剩余空间 */
  margin-bottom: 20px; /* 添加底部间距 */
  text-align: justify; /* 文本两端对齐 */
  text-indent: 2em;
}

.company-page-img {
  text-align: center; /* 使图片居中 */
}

.company-page-img img {
  max-width: 100%;
  height: auto;
}
.divider {
  border: 0;
  height: 2px; /* 横线的高度 */
  background-color: #b1b3b1; /* 横线的颜色 */
  width: 100vw; /* 横线占满整个宽度 */
  margin: 10px 0; /* 上下间距 */
}
.footer {
  background-color: #ffffff;
  padding: 20px;
  font-size: 12px;
  color: #333;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.address-group,
.store-group {
  margin-bottom: 10px;
}

ul {
  padding-left: 20px;
}

ul li {
  list-style-type: disc;
}

.links a {
  color: #1e90ff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>
