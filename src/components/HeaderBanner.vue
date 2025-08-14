<template>
  <div class="header-banner">
    <!-- 欢迎条 - 移动端隐藏 -->
    <div class="welcome-bar" v-show="!isMobile">
      <p class="welcome-text">安徽荣锋装饰集团欢迎您！</p>
    </div>

    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 集团标志 -->
      <div class="brand-block" @click="$router.push('/')">
        <img src="/src/public/index/logo2.png" alt="集团标志" class="logo" />
      </div>

      <!-- 右侧内容容器 - 移动端简化 -->
      <div class="right-content" v-show="!isMobile">
        <!-- 服务热线 - 移动端只显示图标 -->
        <div class="hotline-block">
          <img src="/src/public/index/redPhone.png" class="hotline-icon" alt="热线图标" />
          <div class="hotline-text" v-show="!isMobile">
            <p class="hotline-title">全国服务热线</p>
            <p class="hotline-number">400-606-8788</p>
          </div>
        </div>

        <!-- 公众号 - 移动端隐藏 -->
        <div class="qr-block" v-show="!isMobile">
          <img src="/src/public/index/qr.png" alt="公众号" class="qr-code" />
          <p class="qr-text">扫码关注公众号</p>
        </div>
      </div>
    </div>

    <HeaderComp :navLists="navLists"/>

    <!-- 大图 - 移动端高度压缩 -->
    <div class="banner-image">
      <img src="/src/public/index/largePhoto.jpg" alt="banner" />
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, ref, onMounted } from 'vue';
import HeaderComp from './HeaderComp.vue';

export default defineComponent({
  components: {
    HeaderComp,
  },
  setup() {
    const navLists = inject('NavLists', []);
    const isMobile = ref(false);

    onMounted(() => {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    });

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    return { navLists, isMobile };
  },
});
</script>

<style scoped>
/* 基础样式 */
.header-banner {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* 欢迎条样式 */
.welcome-bar {
  height: 28px;
  background-color: #00000014;
  display: flex;
  align-items: center;
  padding-left: 12%;
}

.welcome-text {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 主要内容区域 */
.main-content {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

/* 品牌logo */
.brand-block {
  cursor: pointer;
}
.logo {
  height: 50px;
}

/* 右侧内容容器 */
.right-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 热线电话 */
.hotline-block {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hotline-icon {
  width: 30px;
  height: 30px;
}

.hotline-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hotline-title {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.hotline-number {
  font-size: 14px;
  font-weight: bold;
  color: #fa0505;
  margin: 0;
}

/* 二维码区域 */
.qr-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code {
  width: 50px;
  height: 50px;
}

.qr-text {
  font-size: 10px;
  margin: 2px 0 0;
}

/* banner大图 */
.banner-image {
  width: 100%;
  overflow: hidden;
}

.banner-image img {
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: cover;
}

/* ================ 响应式设计 ================ */
@media (max-width: 992px) {
  .logo {
    height: 45px;
  }

  .right-content {
    gap: 15px;
  }

  .hotline-icon {
    width: 25px;
    height: 25px;
  }

  .hotline-title,
  .hotline-number {
    font-size: 13px;
  }

  .qr-code {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 768px) {
  .welcome-bar {
    display: none;
  }

  .main-content {
    width: 95%;
    padding: 5px 0;
  }

  .logo {
    height: 40px;
  }

  .hotline-text {
    display: none !important;
  }

  .banner-image img {
    max-height: 180px;
  }

  .qr-block {
    display: none;
  }
}

@media (max-width: 480px) {
  .main-content {
    justify-content: center;
  }

  .logo {
    height: 35px;
  }

  .hotline-icon {
    width: 20px;
    height: 20px;
  }

  .banner-image img {
    max-height: 150px;
  }
}

@media (max-width: 375px) {
  .logo {
    height: 30px;
  }

  .banner-image img {
    max-height: 120px;
  }
}
</style>