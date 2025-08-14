<!--
 * @Descripttion: 底部页脚
 * @Author: huimeng
 * @Date: 2025-01-15 10:12:15
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-09 10:33:35
-->
<template>
  <footer class="footer">
    <!-- 电脑端显示的文字链接 -->
    <div class="desktop-footer">
      <div class="footer-content">
        <div class="footer-row">
          <p>
            集团合肥总部地址：安徽省合肥市长江西路乐客来商业广场1-3层
            合肥总部服务热线：0551-62339888
          </p>
        </div>
        <div class="footer-row">
          <p>
            集团六安总部地址:安徽省六安市磨子潭路顺达大市场二号楼4-5层
            六安总部服务热线：0564-7228888
          </p>
        </div>
        <div class="footer-row">
          <p>
            直营门店地址：六安市312国道与文蔚路交叉口 原点明珠家居生活广场
            六安市佛子岭路 居然商场(原红星美凯龙)
          </p>
        </div>
        <div class="footer-row">
          <p>
            Copyright © 2021-2025 荣锋装饰集团品牌部 版权所有
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">皖ICP备2021007561号-1</a>
          </p>
        </div>
        <div class="footer-row">
          <p><strong>友情链接：</strong><a href="http://www.jahszh.com/">六安金安区红十字会</a></p>
        </div>
      </div>
    </div>

    <!-- 手机端显示的内容 -->
    <div class="mobile-footer">
      <!-- 新增的底部logo图片 -->
      <div class="footer-logo-container">
        <img
          src="/src/public/index/footlogo.jpg"
          alt="荣锋装饰集团"
          class="footer-bottom-logo"
        >
      </div>

      <!-- 手机端底部信息 -->
      <div class="footer-info">
        <p>Copyright © 2021-2025 荣锋建材家居装饰集团</p>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">皖ICP备2021007561号-1</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 这里可以添加组件逻辑（如果有需要）
</script>

<style scoped>
/* 基础样式 - 重置margin和padding */
.footer {
  width: 100%;
  margin: 0;
  padding: 20px 0;
  background-color: #f8f8f8;
  font-size: 12px;
  color: #333;
  box-sizing: border-box;
}

/* 电脑端样式 */
.desktop-footer {
  width: 100%;
  box-sizing: border-box;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box;
}
.footer-row {
  margin: 5px 0;
  line-height: 1.5;
  text-align: center;
}

/* 手机端样式 - 默认隐藏 */
.mobile-footer {
  display: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-footer {
    display: none;
  }

  .mobile-footer {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
  }

  /* 新增的底部logo样式 */
  .footer-logo-container {
    width: 100%;
    margin-bottom: 12px;
    text-align: center;
  }

  .footer-bottom-logo {
    width: 100%;
    max-width: 768px;  /* 最大宽度限制 */
    height: auto;      /* 高度自动保持比例 */
    display: block;    /* 消除图片底部间隙 */
    margin: 0 auto;    /* 水平居中 */
  }

  .footer-info {
    text-align: center;
    color: #999;
    font-size: 10px;
    line-height: 1.4;
    padding: 0 5px;
    word-break: break-word;
  }
}

/* 通用链接样式 */
a {
  color: #1e90ff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>