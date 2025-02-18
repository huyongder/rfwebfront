<!--
 * @Descripttion: 集团规模下集团总部界面
 * @Author: huimeng
 * @Date: 2025-02-17 08:26:53
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-18 08:33:41
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
export default {
  name: 'BrancesPage',
  components: {
    SizeviewNav,
  },

  data() {
    return {
      images: [
        {
          src: '/src/public/about/branches/jinzhai.jpg',
          alt: 'Image jinzhai',
          caption1: '金寨分公司',
          caption2: '地址： 金寨县莲花山路堃茂大厦A座1-2层',
          caption3: '电话： 0564-7222666 (占地3000平米)',
          link: '/about/branches/jinzhai',
        },
        {
          src: '/src/public/about/branches/shouxian.jpg',
          alt: 'Image shouxian',
          caption1: '寿县分公司',
          caption2: '地址： 寿县瑶海大市场4栋4-5层',
          caption3: '电话： 0554-2753666 (占地3000平米)',
          link: '/about/branches/shouxian',
        },
        {
          src: '/src/public/about/branches/huoshan.jpg',
          alt: 'Image huoshan',
          caption1: '霍山分公司',
          caption2: '地址： 霍山县华强文旅城2号楼2-3层',
          caption3: '电话： 0564-7259888 (占地3000平米)',
          link: '/about/branches/huoshan',
        },
        {
          src: '/src/public/about/branches/huoqiu.jpg',
          alt: 'Image huoqiu',
          caption1: '霍邱分公司',
          caption2: '地址： 霍邱县苏润城市广场S4号楼5层',
          caption3: '电话： 0564-7280888 (占地3000平米)',
          link: '/about/branches/huoqiu',
        },
        {
          src: '/src/public/about/branches/shucheng.jpg',
          alt: 'Image shucheng',
          caption1: '舒城分公司',
          caption2: '地址： 舒城梅河东路华盛集团5-6层',
          caption3: '电话： 0564-7225888 (占地3000平米)',
          link: '/about/branches/shucheng',
        },
        {
          src: '/src/public/about/branches/yeji.jpg',
          alt: 'Image yeji',
          caption1: '叶集分公司',
          caption2: '地址： 叶集区金叶大道金叶新城3-4层',
          caption3: '电话： 0564-7280888 (占地3000平米)',
          link: '/about/branches/yeji',
        },
      ],
    }
  },
}
</script>

<template>
  <SizeviewNav />
  <br />
  <div class="container">
    <h1 class="title">集团分公司</h1>
    <div class="current-location">
      <span class="location-text">
        当前的位置：
        <a href="/" class="link">首页</a> &gt;
        <a href="/about/branches" class="link">集团分公司</a>
      </span>
    </div>
  </div>

  <div class="gallery">
    <a v-for="(item, index) in images" :key="index" :href="item.link" class="gallery-item">
      <img :src="item.src" :alt="item.alt" class="image" />
      <div class="caption">
        <p class="first-line">{{ item.caption1 }}</p>
        <p>{{ item.caption2 }}</p>
        <p>{{ item.caption3 }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 左右两侧对齐 */
  align-items: center; /* 垂直居中 */
  border-bottom: 1px solid #e0e0e0; /* 添加浅色横线 */
  padding-bottom: 15px; /* 为横线留出间距 */
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0; /* 去掉默认的外边距 */
}

.current-location {
  font-size: 14px;
  color: #666;
}

.location-text {
  color: #999;
}

.link {
  color: #007bff; /* 链接颜色 */
  text-decoration: none; /* 去掉下划线 */
  margin: 0 5px; /* 链接间距 */
}

.link:hover {
  text-decoration: underline; /* 鼠标悬停时显示下划线 */
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 15;
  max-width: 1250px;
}

.gallery-item {
  display: block; /* 使a标签表现为块级元素 */
  width: 371px;
  text-align: center;
  text-decoration: none; /* 移除下划线 */
  transition: all 0.3s ease; /* 添加过渡动画 */
  position: relative;
  top: 0;
  background-color: #fff;
}

.gallery-item:hover {
  transform: translateY(-5px); /* 上移效果 */
}

.image {
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.caption {
  margin-top: 10px;
  font-size: 12px;
  color: #333;
  text-align: left;
}

.first-line {
  font-weight: bold; /* 第一行加粗 */
  transition: color 0.3s ease; /* 颜色过渡 */
  font-size: 16px;
}

.gallery-item:hover .first-line {
  color: red; /* 悬停时第一行变红 */
}

.caption p {
  margin: 5px 0;
}
</style>
