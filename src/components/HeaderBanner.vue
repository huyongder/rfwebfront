<template>
  <div class="header-banner">
    <!-- 欢迎条 -->
    <div class="welcome-bar">
      <p class="welcome-text">六安装饰装修公司——荣锋装饰集团欢迎您！</p>
    </div>

    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 集团标志 -->
      <div class="brand-block" @click="$router.push('/')">
        <img src="/src/static/index/logo2.png" alt="集团标志" class="logo" />
      </div>

      <!-- 代理信息 - 居中 -->
      <div class="agent-info" v-show="!isMobile">
        <img src="/src/static/index/logo3.png" alt="集团信息" class="agent-logo" />
      </div>

      <!-- 右侧内容容器 -->
      <div class="right-content" v-show="!isMobile">
        <!-- 服务热线 -->
        <div class="hotline-block">
          <img src="/src/static/index/redPhone.png" class="hotline-icon" alt="热线图标" />
          <div class="hotline-text">
            <p class="hotline-title">全国服务热线</p>
            <p class="hotline-number">400-606-8788</p>
          </div>
        </div>

        <!-- 公众号 -->
        <div class="qr-block" v-show="isMobile">
          <img src="/src/static/index/qr.png" alt="公众号" class="qr-code" />
          <p class="qr-text">扫码关注公众号</p>
        </div>
      </div>
    </div>

    <HeaderComp :navLists = "navLists"/>
    <!-- 大图 -->
    <div class="banner-image">
      <img src="/src/static/index/largePhoto.jpg" alt="banner" />
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
      isMobile.value = window.innerWidth <= 768;
      window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth <= 768;
      });
    });
    console.log('注入的导航数据:', navLists); // 查看控制台输出
    return { navLists, isMobile };
  },
});

</script>


<style scoped>
.header-banner {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* 欢迎条样式 - 保持左侧偏移 */
.welcome-bar {
  width: 100%;
  height: 34px;
  background-color: #00000014;
  display: flex;
  align-items: center;
  padding-left: 12%; /* 保持左侧偏移 */
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
  height: 100%;
  padding: 10px 0;
  position: relative;
}

/* 品牌logo */
.brand-block {
  cursor: pointer;
  flex-shrink: 0;
}
.logo {
  height: 60px;
}

/* 代理信息 - 居中 */
.agent-info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.agent-logo {
  height: 60px;
}

/* 右侧内容容器 */
.right-content {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: auto;
}

/* 热线电话 */
.hotline-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hotline-icon {
  width: 40px;
  height: 40px;
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

/* 二维码区域 */
.qr-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code {
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

/* banner大图 */
.banner-image {
  width: 100%;
  min-width: unset;
  max-width: none;
  overflow: hidden;
  box-sizing: border-box;
  display: block;
  place-items: center;
  margin: 0 auto;
}

.banner-image img {
  width: auto;
  height: auto;
  max-height: 300px; /* 限制最大高度 */
  object-fit: cover; /* 保持比例裁剪 */
}

/* 移动端适配 */
@media (max-width: 768px) {
  .welcome-bar {
    padding-left: 20px; /* 移动端保持左侧偏移但减少距离 */
  }

  .welcome-text {
    font-size: 12px;
    white-space: nowrap;
    text-align: center; /* 确保文本居中 */
  }

  .main-content {
    width: 95%;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 0;
  }

  .brand-block {
    order: 1;
    margin-bottom: 10px;
  }

  .agent-info {
    position: static;
    order: 3;
    transform: none;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }

  .right-content {
    order: 2;
    margin-left: 0;
    gap: 15px;
  }

  .hotline-block {
    gap: 5px;
  }

  .hotline-title, .hotline-number {
    font-size: 14px;
  }

  .hotline-icon {
    width: 30px;
    height: 30px;
  }

  .qr-code {
    width: 50px;
    height: 50px;
  }

  .qr-text {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .right-content {
    gap: 10px;
  }

  .hotline-text {
    display: none;
  }

  .hotline-icon {
    width: 25px;
    height: 25px;
  }

  .qr-code {
    width: 40px;
    height: 40px;
  }

  .right-content {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: auto;
  flex-wrap: wrap; /* 新增：允许换行 */
  justify-content: flex-end; /* 新增：右对齐 */
}

/* 修改后的移动端适配 */
@media (max-width: 992px) { /* 新增中等屏幕适配 */
  .right-content {
    gap: 20px;
  }

  .hotline-title {
    font-size: 16px;
  }

  .hotline-number {
    font-size: 16px;
  }

  .qr-code {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-wrap: wrap;
    justify-content: space-between; /* 修改为两端对齐 */
    padding: 10px 5%; /* 增加左右内边距 */
  }

  .brand-block {
    order: 1;
    margin-bottom: 0; /* 移除底部边距 */
    flex: 0 0 auto;
  }

  .agent-info {
    order: 3;
    width: 100%;
    margin: 10px 0;
    text-align: center;
    position: static;
    transform: none;
  }

  .right-content {
    order: 2;
    margin-left: 0;
    gap: 15px;
    flex: 0 0 auto; /* 防止缩小 */
    justify-content: flex-end; /* 保持右对齐 */
  }

  .hotline-block {
    gap: 8px;
    min-width: max-content; /* 新增：防止内容挤压 */
  }

  .hotline-text {
    display: flex !important; /* 强制显示 */
    flex-direction: column;
  }

  .hotline-title,
  .hotline-number {
    font-size: 14px;
    white-space: nowrap; /* 防止文字换行 */
  }

  .qr-block {
    min-width: max-content; /* 新增：防止挤压 */
  }

  .qr-code {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 576px) { /* 新增小屏幕适配 */
  .right-content {
    gap: 10px;
    margin-top: 10px;
    width: 100%;
    justify-content: center; /* 小屏幕居中显示 */
  }

  .hotline-block {
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .hotline-title {
    font-size: 12px;
  }

  .hotline-number {
    font-size: 14px;
  }

  .qr-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .qr-text {
    display: block !important; /* 确保始终显示 */
  }
}

@media (max-width: 400px) { /* 新增超小屏幕适配 */
  .right-content {
    flex-direction: column;
    align-items: center;
  }

  .hotline-block {
    flex-direction: row;
    margin-bottom: 5px;
  }

  .qr-block {
    margin-top: 5px;
  }
}
}
</style>