<!--
 * @Descripttion: 底部页脚
 * @Author: huimeng
 * @Date: 2025-01-15 10:12:15
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-25 16:17:34
-->
<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- 第一行：两个总部地址 -->
      <div class="footer-row">
        <p>
          集团六安总部地址：安徽省六安市磨子潭路顺达大市场二号楼4-5楼
          集团合肥总部地址：安徽省合肥市长江西路乐客来商业广场1-3层
        </p>
      </div>
      <!-- 第二行：直营门店地址 -->
      <div class="footer-row">
        <ul>
          <p>
            直营门店地址：六安市312国道与文蔚路交叉口 金三角家居生活广场(原居然之家商城)
            六安市佛子岭路 红星美凯龙商场一店 六安市迎宾大道 红星美凯龙商场二店
          </p>
        </ul>
      </div>
      <!-- 第三行：版权信息 -->
      <div class="footer-row">
        <p>
          Copyright © 2021-2025 荣锋建材家居装饰集团品牌部 版权所有
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
            >皖ICP备2021007561号-1</a
          >
        </p>
      </div>
      <!-- 第四行：友情链接 -->
      <div class="footer-row">
        <p><strong>友情链接：</strong><a href="http://www.jahszh.com/">六安金安区红十字会</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 如果有需要的 script 逻辑可以在这里添加
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: #f8f8f8;
  padding: 10px 0;
  font-size: 12px; /* 更小的字体 */
  color: #333;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
}

.footer-row {
  margin: 5px 0;
}

ul {
  padding-left: 20px;
  margin: 0;
  list-style-type: none;
}

ul li {
  list-style-type: disc;
  font-size: 12px; /* 更小的字体 */
}

a {
  color: #1e90ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
