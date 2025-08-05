<template>
  <div class="welcome-container">
    <!-- 第一行：大标题 -->
    <h1 class="title">荣锋装饰网站后台管理界面</h1>

    <!-- 装饰分隔线 -->
    <div class="divider"></div>

    <!-- 第二行：副标题 -->
    <h2 class="subtitle">荣锋装饰集团人事部 · 荣锋装饰集团品牌督查部</h2>
  </div>
</template>

<script setup>
// 使用Vue3的setup语法糖，无需额外代码
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  text-align: center;
  transform: translate(90px, -20px); /* 向右90px，向上20px */
}

.title {
  color: #e74c3c;
  font-size: 4vw;
  margin: 0;
  padding: 0 20px;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.3;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
  animation: fadeInDown 0.8s ease-out;
}

.subtitle {
  color: #e74c3c;
  font-size: 2.2vw;
  margin: 0;
  padding: 0 30px;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  line-height: 1.4;
  letter-spacing: 0.5px;
  max-width: 80%;
  animation: fadeInUp 0.8s ease-out 0.3s;
  animation-fill-mode: both;
}

.divider {
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #e74c3c, transparent);
  margin: 15px 0;
  opacity: 0.8;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 7vw;
    padding: 0 15px;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 4vw;
    padding: 0 20px;
    max-width: 90%;
  }

  .divider {
    width: 80px;
    margin: 10px 0;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 9vw;
  }

  .subtitle {
    font-size: 5vw;
  }
}
</style>