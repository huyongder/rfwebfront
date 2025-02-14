<!-- <template>
  <footer class="footer">
    <div class="footer-content">
      <div class="address-group">
        <p>集团六安总部地址：安徽省六安市磨子潭路顺达大市场二号楼4-5楼 集团合肥总部地址：安徽省合肥市长江西路乐客来商业广场1-3层</p>
      </div>
      <div class="store-group">
        <p><strong>直营门店地址：</strong></p>
        <ul>
          <li>六安市312国道与文蔚路交叉口 金三角家居生活广场(原居然之家商城)</li>
          <li>六安市佛子岭路 红星美凯龙商场一店</li>
          <li>六安市迎宾大道 红星美凯龙商场二店</li>
        </ul>
      </div>
      <div class="copyright">
        <p>Copyright © 2021-2024 荣锋建材家居装饰集团品牌部 版权所有 皖ICP备2021007561号-1</p>
      </div>
      <div class="links">
        <p><strong>友情链接：</strong><a href="https://www.laijinanzhizhi.com">六安金安区红十字会</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 如果有需要的 script 逻辑可以在这里添加
</script>

<style scoped>
.footer {
  background-color: #f8f8f8;
  padding: 20px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.address-group, .store-group {
  margin-bottom: 10px;
}

ul {
  padding-left: 20px;
}

ul li {
  list-style-type: disc;
}

.links a {
  color: #1e90ff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style> -->

<template>
  <div class="footer">
    <div class="footer-address">
      <p><strong>集团总部地址：</strong>安徽省六安市磨子潭路顺达大市场二号楼4-5楼</p>
      <p><strong>直营门店地址：</strong>六安市312国道与文蔚路交叉口 居然之家商场</p>
      <p>六安市佛子岭路 红星美凯龙商场一店</p>
      <p>六安市迎宾大道 红星美凯龙商场二店</p>
    </div>

    <div class="footer-copy">
      <p>荣锋建材家居装饰集团品牌部 &copy; 版权所有</p>
      <p><a href="https://beian.miit.gov.cn">皖ICP备2021007561号-1</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
  background-color: #ffffff;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-address {
  margin-bottom: 10px;
}

.footer-address p {
  font-family: '微软雅黑', sans-serif;
  font-size: 14px;
  color: #000000;
}

.footer-copy {
  margin-top: 10px;
}

.footer-copy p {
  font-family: '微软雅黑', sans-serif;
  font-size: 14px;
  color: #000000;
}

.footer-links a {
  color: #cc0000;
  text-decoration: none;
  margin: 0 5px;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
