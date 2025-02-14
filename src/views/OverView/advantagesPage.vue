<template>
  <div class="core-advantages">
    <OverviewNav />
    <h1>荣锋集团十三大核心优势</h1>

    <div class="section">
      <h2>1. “一线品牌一级代理一站式”</h2>
      <p>
        集团厂家一级代理50个一线建材、家居、厨电品牌，15大品类，让客户省时、省力、省心、省钱，真正一站式购齐，每个品类都有完善的产品配套，可以满足客户不同类型的需求。
      </p>
    </div>

    <div class="section">
      <h2>2. 实体经营</h2>
      <p>
        荣锋集团为实体公司，总部拥有两大办公区，旗下在六安原点明珠家居生活MALL、红星美凯龙一店、寿县红星美凯龙、顺达大市场品牌直营直店102家，乡镇核心加盟店30余家，乡镇渠道经销商300余家，仓储面积达1.5万平方米，库存超5000万元；总面积超7.5万平米，总投资过亿元，安徽建材家居装饰行业规模居首位。
      </p>
    </div>

    <div class="section">
      <h2>3. 六大分公司</h2>
      <p>集团在寿县、金寨、霍邱、霍山、叶集、舒城设立了6家总面积达1.8万平米的大型直营分公司。</p>
    </div>

    <div class="section">
      <h2>4. 无中间商</h2>
      <p>厂家直接拿货，免除中间零售商从中赚取差价，真正让利于客户。</p>
    </div>

    <div class="section">
      <h2>5. 主材成本价辅材不加价</h2>
      <p>花10万可达到15万的装修效果，让客户省钱省心。</p>
    </div>

    <div class="section">
      <h2>6. 工地绝对不外包</h2>
      <p>为确保工程质量，不偷工减料，荣锋工地工程均为集团项目经理施工，且郑重承诺绝对不外包。</p>
    </div>

    <div class="section">
      <h2>7. 预算等于决算</h2>
      <p>计划预算费用多少，装修费用就是多少，让客户绝不多花冤枉钱。</p>
    </div>

    <div class="section">
      <h2>8. 零增项</h2>
      <p>装修项目需要多少就是多少，绝对承诺不额外增项。</p>
    </div>

    <div class="section">
      <h2>9. 自己的设计团队</h2>
      <p>
        公司拥有超100人的高水平设计师团队，设计费用由公司承担，为客户免费设计高水平方案，帮助客户快速直观规划新居。
      </p>
    </div>

    <div class="section">
      <h2>10. 自己的施工及监理团队</h2>
      <p>
        从工人到项目经理，再到工程监理，均为集团直管，逐级监督，定期巡查，用材明确、保证施工质量，让客户安心省心。
      </p>
    </div>

    <div class="section">
      <h2>11. 自己的售后团队</h2>
      <p>集团配备专业的售后团队，76辆专业售后服务车，为客户提供高效的售后服务。</p>
    </div>

    <div class="section">
      <h2>12. 强势登陆央视</h2>
      <p>集团强势登陆CCTV1、CCTV2、CCTV7、CCTV10、CCTV12，CCTV17成为央视CCTV广告合作品牌。</p>
    </div>

    <div class="section">
      <h2>13. 全方位品牌广告投放</h2>
      <p>
        六安市区公交车、出租车大量的广告投放；重要路段高炮广告的耸立；纸质媒体《皖西日报》、《新安晚报》的广告宣传；官方媒体《六安电视台》的战略合作；自媒体《腾讯广告》、《今日头条抖音》、《六安城市网》、《六安市民网》、《六安论坛》、《六安时讯》、《中安在线》、《六安全频道》等争相报道；与知名房企碧桂园·城市之光、丽景苑、凤凰东苑、徽盐·湖畔明珠等达成深度战略合作伙伴关系。集团全方位，多维度，立体式宣传，牢牢占据安徽建材家居装饰行业的制高点。
      </p>
    </div>
  </div>
</template>

<script>
import OverviewNav from '@/components/NavComp/OverviewNav.vue';

export default {
  name: 'CoreAdvantages',
  components: {
    OverviewNav
  }
}
</script>

<style scoped>
.core-advantages {
  font-family: '微软雅黑', sans-serif;
  line-height: 1.6;
  padding: 24px 20%;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 14px;
  margin-top: 15px;
  color: #333;
}

p {
  margin-left: 20px;
  font-size: 14px;
  color: #555;
}

.section {
  font-size: 14px;
  margin-bottom: 20px;
}


/* 响应式设计：手机端样式 */
@media (max-width: 768px) {
  .core-advantages {
    padding: 24px 10%;
  }

  h1 {
    font-size: 20px;
  }

  h2 {
    font-size: 12px;
  }

  p {
    font-size: 12px;
    margin-left: 0;
  }
}
</style>
