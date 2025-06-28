<template>
  <HeaderBanner />
  <SuggestionsNav />

  <div class = "container">
    <p class = "text-title">荣锋装饰集团 客服监理部</p>
    <p class="text-content">为快速响应各类工地、售后等客诉问题，荣锋建材家居装饰集团从2020年起整合客服部、工程监理部，
成立客服监理部，专门应对各类客诉问题及针对荣锋在建工地进行监督，对已交付工地售后问题进行快速处理。</p>
    <img src="/src/public/jianli.jpg" class="img-content">
    <p class = "content-title1">客服监理部职责：</p>
    <p class = "content1">1.负责公司所有工地包括分公司工地的巡视、监督和检查，对工地质量负责；</p>
    <p class = "content1">2.全面负责公司所有工地的客诉和售后问题的处理和解决，对客户满意度负责；</p>
    <p class = "content1">3.负责督导和监理团队的建设、培训，对监理部的专业度和效率负责；</p>
    <p class = "content1">4.负责每月工程部项目经理考评，对考评的结果负责；</p>
    <p class = "content1">5.参与公司工地验收标准、材料流程标准、售后服务标准等的制定；</p>
    <p style="font-family: '微软雅黑'; font-size: 12px; margin-left: 18%; margin-top: 15px;">
      <span style="font-weight: bold;">联系人</span>：柏经理 、李专员、许专员、何专员
    </p>
    <div class="contact-info">
      <p><span class="label-bold">工程监督热线</span>：0564-5335555</p>
      <p><span class="label-bold">售后服务热线</span>：0564-3988988</p>
  </div>
  </div>

  <FooterComp />

  </template>


  <script lang="ts">
  import SuggestionsNav from '@/components/NavComp/SuggestionsNav.vue'
  import HeaderBanner from '@/components/HeaderBanner.vue'
  import FooterComp from '@/components/FooterComp.vue'

  export default {
    name: 'SuggestionsPage',
    components: {
      SuggestionsNav,
      HeaderBanner,
      FooterComp
    }
  }
  </script>

<style scoped>
  .container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
  }

  .text-title {
    font-family: '微软雅黑';
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .text-content {
    font-family: '微软雅黑';
    font-size: 14px;
    text-align: left;
    margin-top: 1rem;
    text-align: center;
  }
  .img-content{
    max-width: 1200px;
    margin: 0 auto;
  }
  .content-title1{
    font-family: '微软雅黑';
    font-size: 13px;
    font-weight: bold;
    margin-top: 2rem;
    margin-left: 18%;
  }
  .content1{
    font-family: '微软雅黑';
    font-size: 12px;
    margin-left: 18%;
    margin-top: 0;
  }
  .contact-info {
  font-family: '微软雅黑', sans-serif;
  font-size: 18px;
  margin-left: 18%;
  margin-top: 0;
  padding-top: 0;
}
.label-bold {
  font-weight: bold;
}
</style>