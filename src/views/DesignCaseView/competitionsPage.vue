<!--
 * @Descripttion: 设计案例>设计大赛
 * @Author: huimeng
 * @Date: 2025-02-19 16:21:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-20 08:23:06
-->

<script lang="ts">
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'

export default { components: { DesignviewNav } }
</script>

<template>
  <DesignviewNav />
  <div>
    <p class="title">“新锐·新视界”——荣锋装饰集团首届设计创意大赛</p>
    <div class="image-container">
      <img
        src="/src/public/designPhotos/competitions1.jpg"
        alt="competitions1"
        class="competitionsPhotos"
      />
    </div>

    <p class="text-containe">
      7月21日上午，荣锋装饰集团设计精英齐聚荣锋总部。集团董事长王显锋先生及吴泽荣女士作为特邀嘉宾出席本次比赛。
    </p>

    <div class="image-container">
      <img
        src="/src/public/designPhotos/competitions2.jpg"
        alt="competitions2"
        class="competitionsPhotos"
      />
    </div>

    <p class="text-containe">
      八时许，大赛主持人宣布比赛开始。此次比赛评分规则包括：CAD方案、效果图设计、施工图设计、施工工艺测评、设计师职业规划，总计五项评分点。
    </p>

    <div class="image-container">
      <img
        src="/src/public/designPhotos/competitions3.jpg"
        alt="competitions3"
        class="competitionsPhotos"
      />
    </div>

    <p class="text-containe">
      此次大赛的主题为“新锐·新视界”，担任评委的有荣锋装饰集团总经理助理黎婕、设计部经理谢飞、蔡程鹏，高端设计部主管孟军、设计三部主管沈飞、市场三部经理余汪、光彩部经理关敏、居然二部经理陈燕、居然三部经理童保好、居然九部经理夏登义、工程部经理陶成、工程二部经理胡涛、客服监理部经理柏光辉。由13位评委共同打分，评选此次比赛的冠、亚、季军。
    </p>

    <div class="image-container">
      <img
        src="/src/public/designPhotos/competitions4.jpg"
        alt="competitions4"
        class="competitionsPhotos"
      />
    </div>

    <p class="text-containe">
      经过层层评选，共有10位优秀设计师进入决赛阶段，并依次上台，向现场嘉宾评委展示他们形式多样、内容丰富、满足客户需求的设计作品，展现出高质量的设计水平和高水准的创作能力；评审团依次听取了设计师从客户需求、设计思路等角度的阐述。
    </p>

    <div class="image-container">
      <img
        src="/src/public/designPhotos/competitions5.jpg"
        alt="competitions5"
        class="competitionsPhotos"
      />
    </div>
    <div class="image-container">
      <img
        src="/src/public/designPhotos/competitions6.jpg"
        alt="competitions6"
        class="competitionsPhotos"
      />
    </div>

    <p class="text-containe">
      最终，高端设计部“锋”设计中心设计师马俊熙斩获大赛冠军、设计一部设计师鲍海峰夺得亚军、设计三部设计师周启兵夺得季军；特邀嘉宾、荣锋装饰集团董事长王显锋先生为获奖设计师颁发荣誉证书及奖金。
    </p>

    <div class="image-container">
      <img
        src="/src/public/designPhotos/competitions7.jpg"
        alt="competitions7"
        class="competitionsPhotos"
      />
    </div>

    <p class="text-containe">
      荣锋装饰集团作为一家具有高度社会责任感的企业，持续致力于满足客户所有需求，伴随着客户日益提升的思维方式、生活方式、以及对高品质生活的进一步需要，青年创新设计人才就是赢得商业竞争和推动产业发展的重要战略资源。此次大赛意在激发荣锋装饰集团创意设计群体的创新力与创造力，也让集团优秀的设计师们发现自己的优势和短板，开拓视野、提升自我，服务好每一位客户！
    </p>

  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}
.image-container {
  text-align: center; /* 让 img 作为 inline-block 元素居中 */
}

.text-containe {
  text-indent: 2em;
  width: 1200px;
  margin: 0 auto;
}
</style>
