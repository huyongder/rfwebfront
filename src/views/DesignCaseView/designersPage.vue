<template>
  <div>
    <DesignviewNav />

    <div class="design-team-container">
      <div class="text-group">
        <!-- 新增红色竖线 -->
        <div class="vertical-line"></div>
        <span class="chinese-text">
          <span class="red-text">设计</span>
          <span class="black-text">大咖</span>
        </span>
        <span class="english-text">DESIGN TEAM</span>
      </div>
      <p class="slogan">用激情与灵感赋予品牌更高的价值</p>
    </div>
  </div>
</template>

<script>
import DesignviewNav from '@/components/NavComp/DesignviewNav.vue'
export default {
  name: 'designersPage',
  components: {
    DesignviewNav,
  },
}
</script>

<style scoped>
.design-team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
}

.text-group {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 1.5rem; /* 元素间距 */
  margin-bottom: 1rem;
  position: relative; /* 为竖线定位准备 */
}

/* 新增红色竖线样式 */
.vertical-line {
  width: 2px; /* 线宽 */
  height: 30px; /* 线高度 */
  background-color: #ff0000; /* 红色 */
  flex-shrink: 0; /* 防止压缩 */
}

.chinese-text {
  font-size: 30px;
  font-weight: bold;
  position: relative; /* 为竖线定位准备 */
  padding-left: 1rem; /* 左侧留出竖线空间 */
}

.red-text {
  color: #ff0000;
  padding-right: 0;
}

.black-text {
  color: #000000;
}

.english-text {
  font-size: 26px;
  color: #808080;
  white-space: nowrap;
}

.slogan {
  margin: 18px 0;
  font-size: 13px;
  color: #808080;
  line-height: 1.5;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .text-group {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start; /* 移动端左对齐 */
  }

  .chinese-text {
    font-size: 24px;
    padding-left: 0; /* 移除竖线空间 */
  }

  .vertical-line {
    display: none; /* 移动端隐藏竖线 */
  }
}
</style>
