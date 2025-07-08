<template>
  <div class="index-page">
    <div class="welcome-page">
      <p class="welcome-text">六安装饰装修公司——荣锋装饰集团欢迎您！</p>
    </div>

    <div class="compact-layout">
      <!-- 集团标志区块 -->
      <div class="brand-block">
        <img
          src="/src/static/index/logo2.png"
          @click="$router.push('/')"
          alt="集团标志"
          class="compact-logo"
        />
      </div>

      <!-- 代理信息区块 -->
      <div class="agent-info">
        <img src="/src/static/index/logo3.png" alt="集团信息" class="agent-logo" />
      </div>

      <!-- 服务热线区块 -->
      <div class="hotline-block">
        <img src="/src/static/index/redPhone.png" class="hotline-icon" alt="热线图标" />
        <div class="hotline-text">
          <p class="hotline-title">全国服务热线</p>
          <p class="hotline-number">400-606-8788</p>
        </div>
      </div>

      <!-- 公众号区块 -->
      <div class="qr-block">
        <img src="/src/static/index/qr.png" alt="公众号" class="compact-qr" />
        <p class="qr-text">扫码关注公众号</p>
      </div>
    </div>
    <!--  -->
    <div class="index-largePhoto">
      <img src="/src/static/index/largePhoto.jpg" alt="largePhoto" />
    </div>
  </div>
  <HeaderComp />
  <CarouselComp />
  <div class="full-width-bg">
    <div class="service-container">
      <div class="service-item">
        <img src="/src/static/index/advantage1.png" alt="一站式品质家装" />
      </div>
      <div class="service-item">
        <img src="/src/static/index/advantage2.png" alt="工地绝不外包" />
      </div>
      <div class="service-item">
        <img src="/src/static/index/advantage3.png" alt="资深设计师团队" />
      </div>
      <div class="service-item">
        <img src="/src/static/index/advantage4.png" alt="丰富家装案例呈现" />
      </div>
    </div>
  </div>

  <div class="AboutEnterpriseModule">
    <!-- 主内容容器 -->
    <div class="MainContentContainer">
      <!-- 文字内容区块 -->
      <div class="ContentTextSection">
        <div class="MainSectionHeader">
          <h2 class="MainSectionTitle">集团简介</h2>
          <p class="EnterpriseTagline">建材家居全品类代理/家装设计/监理施工一体化运营服务企业</p>
        </div>

        <div class="CorporateProfileContent">
          <p class="ProfileTextParagraph">
            集团由董事长王显锋先生于1995年在安徽省金寨县创立，2007年进军六安市，后更名为荣锋装饰集团，并于2021年进军合肥市场。荣锋装饰集团是建材家居全品类代理/装饰设计/监理施工一体化运营服务企业，集团旗下厂家一级代理50个一线建材、家居、厨电品牌。集团合肥总部设立于合肥市蜀山区乐客来商业中心、六安总部设立于顺达大市场二号楼4-5楼，拥有顺达大市场、六安原点明珠家居生活MALL两大办公区；集团在合肥乐客来商业中心一至三楼、六安原点明珠家居生活MALL一至五楼、居然之家（原红星美凯龙一店）A馆、顺达大市场、寿县红星美凯龙等卖场设立了102家总营业面积超5.6万平方米的高端品牌直营专卖店、三个高端家装设计部，以及专注洋房别墅设计的“锋·设计中心”；集团拥有渠道分销商300余家，专业服务车辆76辆，仓储面积超1.5万平方米。集团在六安市金寨县城、霍邱县城、霍山县城、舒城县城、叶集区以及淮南市寿县县城，成立了6家总面积超1.8万平方米的大型直营分公司、30余家核心加盟店。目前集团总面积超7.5万平方米。
          </p>
          <br />
          <a href="/about/company" class="ExtendedLink"> >>> 查看更多+</a>
        </div>
      </div>

      <!-- 视频展示区块 -->
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
    <div class="service-container">
      <div class="service-item">
        <img src="/src/static/index/advantage5.png" alt="全国服务热线" />
      </div>
      <div class="service-item">
        <img src="/src/static/index/advantage6.png" alt="工程监督热线" />
      </div>
      <div class="service-item">
        <img src="/src/static/index/advantage7.png" alt="售后服务热线" />
      </div>
      <div class="service-item">
        <img src="/src/static/index/advantage8.png" alt="总部热线" />
      </div>
    </div>
  </div>

  <nav class="news-section-header">
    <!-- 左侧文字区 -->
    <div class="news-section-header__title-group">
      <h2 class="news-section-header__main-title">集团动态</h2>
      <span class="news-section-header__subtitle">掌握最新集团动态，带您走进荣锋集团</span>
    </div>

    <!-- 右侧操作区 -->
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
import { defineComponent} from 'vue'
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

  // 初始执行，类似onLoad
  mounted() {
    console.log('IndexPage.vue 已开始执行。')
  },
  setup() {
    return{}
  },
  // 数据管理
  data() {
    return {}
  },
  // 方法管理
  methods: {},
})
</script>

<style scoped>
/* 主容器 */
.index-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* 防止子元素导致整体溢出 */
  margin: 0;
  padding: 0;
}

/* 通用子容器样式 */
.welcome-page,
.index-logo,
.index-largePhoto {
  width: 100%;
  box-sizing: border-box;
  padding: 0; /* 安全内边距 */
  overflow: hidden;
  margin: 0;
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

.compact-layout {
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 0;
}

.agent-logo {
  margin: 0 auto;
}

/* 整体横向布局 */
.hotline-block {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 图片和文字间距 */
  margin-left: 80px;
}

/* 图片样式 */
.hotline-icon {
  width: 40px; /* 按需调整图片尺寸 */
  height: 40px;
}

/* 文字垂直排列 */
.hotline-text {
  display: flex;
  flex-direction: column; /* 关键：垂直排列 */
  gap: 4px; /* 两行文字间距 */
}
/* 取消文字元素的 padding */
.hotline-title,
.hotline-number {
  padding: 0; /* 清除默认或继承的 padding */
  margin: 0; /* 可选：清除默认的 margin */
}

/* 文字样式*/
.hotline-title {
  font-size: 18px;
  color: #666;
}
.hotline-number {
  font-size: 18px;
  font-weight: bold;
  color: #fa0505;
}

.qr-block {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  gap: 0;
  display: block;
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
  text-align: center;
}
/* 大图容器 */
.index-largePhoto {
  width: 100%;
  max-width: 100%; /* 新增：确保容器不超出视口 */
  overflow: hidden; /* 新增：隐藏溢出内容 */
  box-sizing: border-box; /* 确保padding和border不增加宽度 */
  display: grid;
  place-items: center;
  margin: 0; /* 清除可能存在的默认margin */
}

.hotline-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  padding: 20px;
  background: #fff;
}
.hotline-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.index-largePhoto img {
  max-width: 100%; /* 限制不超过容器 */
  height: auto;
  display: block; /* 消除图片基线间隙 */
}

/* 整行背景控制 */
.full-width-bg {
  background: rgba(0, 0, 0, 0.08); /* #00000014 */
  padding: 10px 0; /* 根据图片留白调整 */
  margin-top: 15px;
}

/* 内容容器 */
.service-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 16px; /* 元素间距 */
  max-width: 1440px; /* 最大内容宽度 */
  margin: 0 auto; /* 水平居中 */
  padding: 0 10px; /* 安全边距 */
}

/* 单个服务项 */
.service-item {
  flex-shrink: 0;
  width: 302px;
  height: 80px;
}

/* 图片控制 */
.service-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
}

/*-------------AboutEnterpriseModule----------------*/

/* 模块根容器 */
.AboutEnterpriseModule {
  padding: 0 auto;
  background: #ffffff;
}

/* 主内容容器 */
.MainContentContainer {
  display: flex;
  justify-content: space-between;
  max-width: 1250px;
  margin: 0 auto;
  gap: 1rem;
  padding: 0;
}

/* 文字内容区 */
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
}

.MainSectionTitle::before {
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

/* 视频展示区 */
.VideoPresentation {
  flex: 0 0 35%;
  position: relative;
}

.VideoPlayerWrapper {
  position: sticky;
  top: 2rem;
  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden; /* 确保视频不会超出容器 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 550px; /* 设置固定宽度 */
  height: 315px; /* 设置固定高度 */
}

.EnterprisePromoVideo {
  width: 100%; /* 让视频填满容器宽度 */
  height: 100%; /* 让视频填满容器高度 */
  aspect-ratio: 16 / 9; /* 保持视频的宽高比 */
  display: block;
}

.VideoDurationBadge {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.ExtendedLink {
  color: #ff0000;
  text-decoration: none;
  font-size: 0.95rem;
}

.ExtendedLink:hover {
  color: #ff0000 !important; /* 悬停时颜色保持红色 */
}

.news-section-header {
  --red-accent: #ff0000;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 24px 50px;
  background: #ffffff;
}

/* 标题组样式 */
.news-section-header__title-group {
  position: relative;
  padding-left: 20px; /* 红条位置 */
  flex-grow: 1;
}

/* 红色分隔线（伪元素实现） */
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

/* 主标题样式 */
.news-section-header__main-title {
  font-size: 25px;
  font-weight: 700;
  color: #000;
  margin: 0;
  display: inline-block;
  line-height: 1.3;
}

/* 副标题样式 */
.news-section-header__subtitle {
  font-size: 14px;
  color: #666;
  margin-left: 12px;
  vertical-align: bottom;
}

/* 操作链接样式 */
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
@media (max-width: 768px) {
  .MainContentContainer {
    flex-direction: column;
    padding: 0 1.5rem;
  }

  .VideoPlayerWrapper {
    position: static;
    margin-top: 2rem;
  }

  .MainSectionTitle {
    font-size: 1.75rem;
  }
}
</style>
