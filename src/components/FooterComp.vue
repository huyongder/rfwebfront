<!--
 * @Descripttion: 底部页脚
 * @Author: huimeng
 * @Date: 2025-01-15 10:12:15
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-02 15:20:08
-->


<template>
  <footer class="footer">
    <!-- 电脑端显示的文字链接 -->
    <div class="desktop-footer">
      <div class="footer-content">
        <div class="footer-row">
          <p>
            集团六安总部地址：安徽省六安市磨子潭路顺达大市场二号楼4-5楼
            集团合肥总部地址：安徽省合肥市长江西路乐客来商业广场1-3层
          </p>
        </div>
        <div class="footer-row">
          <p>
            直营门店地址：六安市312国道与文蔚路交叉口 金三角家居生活广场
            六安市佛子岭路 红星美凯龙商场一店 六安市迎宾大道 红星美凯龙商场二店
          </p>
        </div>
        <div class="footer-row">
          <p>
            Copyright © 2021-2025 荣锋建材家居装饰集团品牌部 版权所有
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">皖ICP备2021007561号-1</a>
          </p>
        </div>
        <div class="footer-row">
          <p><strong>友情链接：</strong><a href="http://www.jahszh.com/">六安金安区红十字会</a></p>
        </div>
      </div>
    </div>

    <!-- 手机端显示的图片内容 -->
    <div class="mobile-footer">
      <div class="footer-main">
        <!-- 左侧：图标和电话 -->
        <div class="footer-left">
          <div class="logo-group">
            <img
              src="/src/public/index/logo2.png"
              @click="$router.push('/home')"
              alt="集团标志"
              class="footer-logo"
            />
            <img
              src="/src/public/index/logo3.png"
              alt="集团信息"
              class="footer-sublogo"
            />
          </div>
          <div class="contact-group">
            <img src="/src/public/index/redPhone.png" class="phone-icon" alt="热线图标"/>
            <div class="contact-text">
              <p class="contact-title">全国服务热线</p>
              <p class="contact-number">400-606-8788</p>
            </div>
          </div>
        </div>

        <!-- 右侧：二维码 -->
        <div class="footer-right">
          <img src="/src/public/index/qr.png" alt="公众号" class="qr-code"/>
          <p class="qr-text">扫码关注公众号</p>
        </div>
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
// 脚本逻辑（如有需要）
</script>

<style scoped>
/* 基础样式 */
.footer {
  width: 100%;
  background-color: #f8f8f8;
  padding: 20px 0;
  font-size: 12px;
  color: #333;
}

/* 电脑端样式 - 默认显示 */
.desktop-footer {
  display: block;
}

/* 手机端样式 - 默认隐藏 */
.mobile-footer {
  display: none;
}

/* 响应式设计 - 手机端 */
@media (max-width: 768px) {
  .desktop-footer {
    display: none;
  }

  .mobile-footer {
    display: block;
  }
}

/* 电脑端原有样式 */
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

.footer-row {
  margin: 5px 0;
  line-height: 1.5;
}

/* 手机端新增样式 */
.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 10px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-group {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  height: 40px;
  margin-bottom: 5px;
  cursor: pointer;
}

.footer-sublogo {
  height: 20px;
}

.contact-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.phone-icon {
  height: 24px;
}

.contact-text {
  line-height: 1.3;
}

.contact-title {
  font-size: 12px;
  color: #666;
}

.contact-number {
  font-size: 16px;
  font-weight: bold;
  color: #d62e2e;
}

.footer-right {
  text-align: center;
}

.qr-code {
  width: 80px;
  height: 80px;
}

.qr-text {
  font-size: 12px;
  margin-top: 5px;
  color: #666;
}

.footer-info {
  text-align: center;
  padding: 0 15px;
  color: #999;
  font-size: 11px;
}

/* 通用样式 */
a {
  color: #1e90ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>