<template>
  <div class="index-page">
    <div class="welcome-page">
      <p class="welcome-text">六安装饰装修公司——荣锋装饰集团欢迎您！</p>
    </div>

    <div class="compact-layout">
      <!-- 集团标志区块 -->
      <div class="brand-block">
        <img
          src="/src/public/index/logo2.png"
          @click="$router.push('/')"
          alt="集团标志"
          class="compact-logo"
        />
      </div>

      <!-- 右侧组合区块 -->
      <div class="right-group">
        <!-- 服务热线区块 -->
        <div class="hotline-block">
          <img src="/src/public/index/redPhone.png" class="hotline-icon" alt="热线图标" />
          <div class="hotline-text">
            <p class="hotline-title">全国服务热线</p>
            <p class="hotline-number">400-606-8788</p>
          </div>
        </div>

        <!-- 公众号区块 -->
        <div class="qr-block">
          <img src="/src/public/index/qr.png" alt="公众号" class="compact-qr" />
          <p class="qr-text">扫码关注公众号</p>
        </div>
      </div>
    </div>

    <div class="index-largePhoto">
      <img src="/src/public/index/largePhoto.jpg" alt="largePhoto" />
    </div>
  </div>

  <HeaderComp />
  <CarouselComp />

  <div class="full-width-bg">
    <div class="service-container">
      <div class="service-item">
        <img src="/src/public/index/advantage1.png" alt="一站式品质家装" />
      </div>
      <div class="service-item">
        <img src="/src/public/index/advantage2.png" alt="工地绝不外包" />
      </div>
      <div class="service-item">
        <img src="/src/public/index/advantage3.png" alt="资深设计师团队" />
      </div>
      <div class="service-item">
        <img src="/src/public/index/advantage4.png" alt="丰富家装案例呈现" />
      </div>
    </div>
  </div>

  <div class="AboutEnterpriseModule">
    <div class="MainContentContainer">
      <div class="ContentTextSection">
        <div class="MainSectionHeader">
          <h2 class="MainSectionTitle">集团简介</h2>
          <p class="EnterpriseTagline">建材家居全品类代理/家装设计/监理施工一体化运营服务企业</p>
        </div>

        <div class="CorporateProfileContent">
          <p class="ProfileTextParagraph">
            集团由董事长王显锋先生于1995年在安徽省金寨县创立，2007年进军六安市，后更名为荣锋装饰集团，并于2021年进军合肥市场。荣锋装饰集团是建材家居全品类代理/装饰设计/监理施工一体化运营服务企业，集团旗下厂家一级代理50个一线建材、家居、厨电品牌。集团合肥总部设立于合肥市蜀山区乐客来商业中心、六安总部设立于顺达大市场二号楼4-5楼，拥有顺达大市场、六安原点明珠家居生活MALL两大办公区；集团在合肥乐客来商业中心一至三楼、六安原点明珠家居生活MALL一至五楼、居然之家（原红星美凯龙一店）A馆、顺达大市场、寿县红星美凯龙等卖场设立了102家总营业面积超5.6万平方米的高端品牌直营专卖店、三个高端家装设计部，以及专注洋房别墅设计的"锋·设计中心"；集团拥有渠道分销商300余家，专业服务车辆76辆，仓储面积超1.5万平方米。集团在六安市金寨县城、霍邱县城、霍山县城、舒城县城、叶集区以及淮南市寿县县城，成立了6家总面积超1.8万平方米的大型直营分公司、30余家核心加盟店。目前集团总面积超7.5万平方米。
          </p>
          <br />
          <a href="/about/company" class="ExtendedLink"> >>> 查看更多+</a>
        </div>
      </div>

      <div class="VideoPresentation">
        <div class="MainSectionHeader">
          <h2 class="MainSectionTitle">集团概况</h2>
          <p class="EnterpriseTagline">企业形象片</p>
        </div>
        <div class="VideoPlayerWrapper">
          <video
            src="/src/public/index/RF.mp4"
            controls
            class="EnterprisePromoVideo"
            poster="http://localhost:8080/uploads/shipin.png"
          >
            您的浏览器不支持视频播放
          </video>
        </div>
      </div>
    </div>
  </div>

  <div class="full-width-bg">
    <div class="service-container modified-layout">
      <div class="service-item main-service">
        <img src="/src/public/index/advantage5.png" alt="全国服务热线" />
      </div>
      <div class="service-item secondary-services">
        <img src="/src/public/index/advantage6.png" alt="工程监督热线" />
      </div>
      <div class="service-item secondary-services">
        <img src="/src/public/index/advantage7.png" alt="售后服务热线" />
      </div>
    </div>
  </div>

  <nav class="news-section-header">
    <div class="news-section-header__title-group">
      <h2 class="news-section-header__main-title">集团动态</h2>
      <span class="news-section-header__subtitle">掌握最新集团动态，带您走进荣锋集团</span>
    </div>

    <router-link to="/about/news" class="news-section-header__action-link"> 查看更多+ </router-link>
  </nav>

  <div class="news-section">
    <div class="news-wrapper">
      <CarouselNews />
    </div>
  </div>

  <FooterComp />
</template>

<script>
import { defineComponent } from 'vue'
import HeaderComp from '@/components/HeaderComp.vue'
import CarouselComp from '@/components/carouselComp.vue'
import CarouselNews from '@/components/CarouselNews.vue'
import FooterComp from '@/components/FooterComp.vue'

export default defineComponent({
  components: {
    HeaderComp,
    CarouselComp,
    CarouselNews,
    FooterComp,
  },
  mounted() {
    console.log('IndexPage.vue 已开始执行。')
  },
  setup() {
    return {}
  },
  data() {
    return {}
  },
  methods: {},
})
</script>

<style scoped>
/* 主容器 */
.index-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* 欢迎栏 */
.welcome-page {
  height: 34px;
  background-color: #00000014;
  display: flex;
  align-items: center;
}

.welcome-text {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 300px;
}

/* 顶部导航布局 */
.compact-layout {
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 10px 0;
}

.brand-block {
  flex: 0 0 auto;
}

/* 右侧组合区块 */
.right-group {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* 热线区块 - 确保电话两行不变形 */
.hotline-block {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px; /* 防止内容挤压 */
}

.hotline-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0; /* 防止图标被压缩 */
}

.hotline-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0; /* 防止文字被压缩 */
}

.hotline-title,
.hotline-number {
  padding: 0;
  margin: 0;
  white-space: nowrap; /* 防止文字换行 */
}

.hotline-title {
  font-size: 18px;
  color: #666;
}

.hotline-number {
  font-size: 18px;
  font-weight: bold;
  color: #fa0505;
}

/* 二维码区块 */
.qr-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0; /* 防止二维码区块被压缩 */
}

.compact-qr {
  width: 68px;
  height: 68px;
  padding: 4px;
  flex-shrink: 0;
}

.qr-text {
  font-size: 12px;
  margin: 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
}

/* 大图容器 */
.index-largePhoto {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  margin: 0;
}

.index-largePhoto img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 服务优势区块 */
.full-width-bg {
  background: rgba(0, 0, 0, 0.08);
  padding: 10px 0;
  margin-top: 15px;
}

.service-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 10px;
}

.service-item {
  flex-shrink: 0;
  width: 302px;
  height: 80px;
}

.service-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
}

/* 三张特殊图片布局 */
.modified-layout {
  justify-content: flex-start;
  padding-left: 10%;
}

.main-service {
  order: 1;
  width: 302px;
}

.secondary-services {
  order: 2;
  width: 280px;
}

/* 集团简介模块 */
.AboutEnterpriseModule {
  padding: 0 auto;
  background: #ffffff;
}

.MainContentContainer {
  display: flex;
  justify-content: space-between;
  max-width: 1250px;
  margin: 0 auto;
  gap: 1rem;
  padding: 0;
}

.ContentTextSection {
  flex: 0, 0, 65%;
  min-width: 0;
}

.MainSectionHeader {
  display: flex;
  align-items: center;
  padding: 15px 0;
  position: relative;
}

.MainSectionTitle {
  font-size: 25px;
  font-weight: 600;
  padding: 0 30px;
  position: relative;
}

.MainSectionTitle::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 1.2em;
  background: #ff2d2d;
  left: 0;
}

.EnterpriseTagline {
  font-size: 14px;
  color: #666;
  margin-left: 20px;
  white-space: nowrap;
}

.MainSectionHeader::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #808080;
  transform: translateY(-35px);
}

.CorporateProfileContent {
  margin-top: 5px;
  background: #00000014;
}

.ProfileTextParagraph {
  line-height: 1.8;
  color: #444;
  margin: 0 1rem 1rem 1rem;
  padding-top: 5px;
  text-align: justify;
  font-size: 14px;
  text-indent: 2em;
}

.VideoPresentation {
  flex: 0 0 35%;
  position: relative;
}

.VideoPlayerWrapper {
  position: sticky;
  top: 2rem;
  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 550px;
  height: 315px;
}

.EnterprisePromoVideo {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  display: block;
}

.ExtendedLink {
  color: #ff0000;
  text-decoration: none;
  font-size: 0.95rem;
}

.ExtendedLink:hover {
  color: #ff0000 !important;
}

/* 新闻动态区块 */
.news-section-header {
  --red-accent: #ff0000;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 24px 50px;
  background: #ffffff;
}

.news-section-header__title-group {
  position: relative;
  padding-left: 20px;
  flex-grow: 1;
}

.news-section-header__title-group::before {
  content: '';
  position: absolute;
  left: 0;
  top: 3px;
  bottom: 3px;
  width: 3px;
  background: var(--red-accent);
  border-radius: 1.5px;
}

.news-section-header__main-title {
  font-size: 25px;
  font-weight: 700;
  color: #000;
  margin: 0;
  display: inline-block;
  line-height: 1.3;
}

.news-section-header__subtitle {
  font-size: 14px;
  color: #666;
  margin-left: 12px;
  vertical-align: bottom;
}

.news-section-header__action-link {
  color: var(--red-accent);
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.3s;
  padding: 8px 12px;
  margin-left: 32px;
}

.news-section-header__action-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .compact-layout {
    width: 85%;
  }
  .right-group {
    gap: 20px;
  }
  .modified-layout {
    justify-content: center;
    padding-left: 0;
  }
  .secondary-services {
    width: 260px;
  }
}

@media (max-width: 992px) {
  .compact-layout {
    width: 90%;
  }
  .right-group {
    gap: 15px;
  }
  .compact-qr {
    width: 60px;
    height: 60px;
  }
  .secondary-services {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .compact-layout {
    width: 95%;
    flex-direction: column;
    gap: 15px;
  }

  .brand-block {
    order: 1;
    width: 100%;
    text-align: center;
  }

  .right-group {
    order: 2;
    width: 100%;
    justify-content: center;
    gap: 30px;
  }

  .hotline-icon {
    width: 35px;
    height: 35px;
  }

  .hotline-title,
  .hotline-number {
    font-size: 16px;
  }

  .main-service {
    width: 90%;
    max-width: 350px;
  }

  .secondary-services {
    display: none;
  }

  .service-item {
    height: auto;
    max-height: 80px;
  }

  .MainContentContainer {
    flex-direction: column;
    padding: 0 1.5rem;
  }

  .VideoPlayerWrapper {
    position: static;
    margin-top: 2rem;
    width: 100%;
    height: auto;
  }

  .MainSectionTitle {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .welcome-text {
    margin-left: 10px;
    font-size: 11px;
  }

  .right-group {
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-around;
  }

  .compact-qr {
    width: 50px;
    height: 50px;
  }

  .qr-text {
    font-size: 11px;
  }

  .main-service {
    width: 95%;
  }

  /* 确保电话两行在小屏幕上也不变形 */
  .hotline-block {
    min-width: auto;
  }
  .hotline-text {
    min-width: 120px;
  }
}
</style>