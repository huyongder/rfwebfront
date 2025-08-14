<template>
  <div class="index-page">
    <div class="welcome-page">
      <p class="welcome-text">安徽荣锋装饰集团欢迎您！</p>
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
        <nav class="news-section-header">
          <div class="news-section-header__title-group">
            <h2 class="news-section-header__main-title">集团简介</h2>
            <span class="news-section-header__subtitle">建材家居全品类代理/家装设计/监理施工一体化运营服务企业</span>
          </div>
        </nav>

        <div class="CorporateProfileContent">
          <p class="ProfileTextParagraph">
            集团由董事长王显锋先生于1995年在安徽省金寨县创立，2007年进军六安市，后更名为荣锋装饰集团，并于2021年进军合肥市场。荣锋装饰集团是建材家居全品类代理/装饰设计/监理施工一体化运营服务企业，集团旗下厂家一级代理50个一线建材、家居、厨电品牌。集团合肥总部设立于合肥市蜀山区乐客来商业中心、六安总部设立于顺达大市场二号楼4-5楼，拥有顺达大市场、六安原点明珠家居生活MALL两大办公区；集团在合肥乐客来商业中心一至三楼、六安原点明珠家居生活MALL一至五楼、居然之家（原红星美凯龙一店）A馆、顺达大市场、寿县红星美凯龙等卖场设立了102家总营业面积超5.6万平方米的高端品牌直营专卖店、三个高端家装设计部，以及专注洋房别墅设计的"锋·设计中心"；集团拥有渠道分销商300余家，专业服务车辆76辆，仓储面积超1.5万平方米。集团在六安市金寨县城、霍邱县城、霍山县城、舒城县城、叶集区以及淮南市寿县县城，成立了6家总面积超1.8万平方米的大型直营分公司、30余家核心加盟店。目前集团总面积超7.5万平方米。
          </p>
          <br />
          <a href="/about/company" class="ExtendedLink"> >>> 查看更多+</a>
        </div>
      </div>

      <div class="VideoPresentation">
        <nav class="news-section-header">
          <div class="news-section-header__title-group">
            <h2 class="news-section-header__main-title">集团概况</h2>
            <span class="news-section-header__subtitle">企业形象片</span>
          </div>
        </nav>
        <div class="VideoPlayerWrapper">
          <video
            src="/src/public/index/RF.mp4"
            controls
            class="EnterprisePromoVideo"
            poster="http://www.rongfengjt.com//uploads/shipin.png"
          >
            您的浏览器不支持视频播放
          </video>
        </div>
      </div>
    </div>
  </div>


  <nav class="news-section-header-action">
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

.compact-logo {
  height: auto;
  max-height: 60px;
  cursor: pointer;
}

/* 右侧组合区块 */
.right-group {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* 热线区块 */
.hotline-block {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
}

.hotline-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.hotline-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hotline-title,
.hotline-number {
  padding: 0;
  margin: 0;
  white-space: nowrap;
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
}

.compact-qr {
  width: 68px;
  height: 68px;
  padding: 4px;
}

.qr-text {
  font-size: 12px;
  margin: 0;
  padding: 0;
}

/* 大图容器 */
.index-largePhoto img {
  width: 100%;
  height: auto;
  display: block;
  max-width: 100%;
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
  padding: 0 50px;
}

.ContentTextSection {
  flex: 0 0 65%;
  min-width: 0;
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
  font-size: 16px;
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
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 24px 50px 24px 0;
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

.news-section-header-action {
  --red-accent: #ff0000;
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 24px 50px 24px 50px;
  background: #ffffff;
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

.news-section {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 50px 24px;
  background: #ffffff;
}

.news-wrapper {
  width: 100%;
}


/* ================= 移动端专属适配 (max-width: 768px) ================= */
@media (max-width: 768px) {
  /* 1. 顶部欢迎栏调整 */
  .welcome-page {
    height: 28px;
    justify-content: center; /* 居中显示 */
  }
  .welcome-text {
    margin-left: 0;
    font-size: 10px;
  }

  /* 2. 顶部LOGO和联系信息 */
  .compact-layout {
    width: 95%;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
  }
  .compact-logo {
    max-height: 45px;
  }
  .hotline-block,
  .qr-block {
    display: none;
  }

  /* 3. 大图保持比例 */
  .index-largePhoto img {
    height: auto;
    max-height: 180px; /* 限制最大高度 */
    object-fit: contain; /* 保持比例 */
  }

  /* 4. 服务优势隐藏 */
  .full-width-bg {
    display: none;
  }

  /* 5. 集团简介模块 */
  .MainContentContainer {
    flex-direction: column;
    padding: 0 15px;
    gap: 20px;
  }
  .ContentTextSection {
    width: 100%;
  }
  .ProfileTextParagraph {
    font-size: 14px;
    line-height: 1.6;
    margin: 0 0 1rem 0;
    text-indent: 2em;
  }

  /* 6. 视频模块 */
  .VideoPresentation {
    width: 100%;
  }
  .VideoPlayerWrapper {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9; /* 保持视频比例 */
  }

  /* 7. 新闻标题统一对齐 */
  .news-section-header,
  .news-section-header-action {
    padding: 15px !important; /* 统一内边距 */
  }
  .news-section-header__title-group {
    padding-left: 15px; /* 调整竖线位置 */
  }
  .news-section-header__main-title {
    display: block;
    font-size: 20px;
  }
  .news-section-header__subtitle {
    display: block;
    margin-left: 0;
    margin-top: 5px;
    font-size: 12px;
  }
  .news-section-header__action-link {
    margin-left: 0;
    margin-top: 10px;
    align-self: flex-start;
  }

  /* 8. 新闻轮播容器 */
  .news-section {
    padding: 0 15px 15px;
  }
  .news-wrapper {
    padding: 0;
  }
}

/* ================= 超小屏幕适配 (max-width: 480px) ================= */
@media (max-width: 480px) {
  /* 1. 进一步缩小文字 */
  .welcome-text {
    font-size: 9px;
  }
  .compact-logo {
    max-height: 38px;
  }

  /* 2. 简介文字调整 */
  .ProfileTextParagraph {
    font-size: 13px;
    text-indent: 1.5em;
  }

  /* 3. 标题调整 */
  .news-section-header__main-title {
    font-size: 18px;
  }
  .news-section-header__subtitle {
    font-size: 11px;
  }

  /* 4. 查看更多链接 */
  .news-section-header__action-link {
    font-size: 14px;
  }
}

/* ================= 极小屏幕适配 (max-width: 375px) ================= */
@media (max-width: 375px) {
  /* 1. 微调字号 */
  .news-section-header__main-title {
    font-size: 16px;
  }
  .ProfileTextParagraph {
    font-size: 12px;
  }

  /* 2. 大图高度限制 */
  .index-largePhoto img {
    max-height: 150px;
  }
}
</style>