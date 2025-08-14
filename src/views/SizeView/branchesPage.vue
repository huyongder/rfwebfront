<!--
 * @Descripttion: 集团规模下集团总部界面
 * @Author: huimeng
 * @Date: 2025-02-17 08:26:53
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-05 08:50:26
-->
<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';

import jinzhaiImg from '@/assets/about/branches/jinzhai.jpg'
import shouxianImg from '@/assets/about/branches/shouxian.jpg'
import huoshanImg from '@/assets/about/branches/huoshan.jpg'
import huoqiuImg from '@/assets/about/branches/huoqiu.jpg'
import shuchengImg from '@/assets/about/branches/shucheng.jpg'
import yejiImg from '@/assets/about/branches/yeji.jpg'

export default {
  name: 'BrancesPage',
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp,
  },

  data() {
    return {
      images: [
        {
          src: jinzhaiImg,
          alt: '金寨分公司',
          caption1: '金寨分公司',
          caption2: '地址：金寨县莲花山路堃茂大厦A座1-2层',
          caption3: '电话：0564-7222666 (占地3000平米)',
          link: '/about/branches/jinzhai',
        },
        {
          src: shouxianImg,
          alt: '寿县分公司',
          caption1: '寿县分公司',
          caption2: '地址：寿县瑶海大市场4栋4-5层',
          caption3: '电话：0554-2753666 (占地3000平米)',
          link: '/about/branches/shouxian',
        },
        {
          src: huoshanImg,
          alt: '霍山分公司',
          caption1: '霍山分公司',
          caption2: '地址：霍山县华强文旅城2号楼2-3层',
          caption3: '电话：0564-7259888 (占地3000平米)',
          link: '/about/branches/huoshan',
        },
        {
          src: huoqiuImg,
          alt: '霍邱分公司',
          caption1: '霍邱分公司',
          caption2: '地址：霍邱县苏润城市广场S4号楼5层',
          caption3: '电话：0564-7280888 (占地3000平米)',
          link: '/about/branches/huoqiu',
        },
        {
          src: shuchengImg,
          alt: '舒城分公司',
          caption1: '舒城分公司',
          caption2: '地址：舒城梅河东路华盛集团5-6层',
          caption3: '电话：0564-7225888 (占地3000平米)',
          link: '/about/branches/shucheng',
        },
        {
          src: yejiImg,
          alt: '叶集分公司',
          caption1: '叶集分公司',
          caption2: '地址：叶集区金叶大道金叶新城3-4层',
          caption3: '电话：0564-7280888 (占地3000平米)',
          link: '/about/branches/yeji',
        },
      ],
    }
  },
}
</script>

<template>
  <HeaderBanner />
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
  <FooterComp />
</template>

<style scoped>
/* PC端保持原有样式完全不变 */
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-left: 350px;
  margin-bottom: 0px;
}

.current-location {
  font-size: 14px;
  color: #666;
}

.location-text {
  color: #999;
  margin-right: 350px;
  margin-bottom: 0;
}

.link {
  color: #007bff;
  text-decoration: none;
  margin: 0 5px;
}

.link:hover {
  text-decoration: underline;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 1250px;
  margin: 0 auto;
}

.gallery-item {
  display: block;
  width: 371px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  top: 0;
  background-color: #fff;
}

.gallery-item:hover {
  transform: translateY(-5px);
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
  font-weight: bold;
  transition: color 0.3s ease;
  font-size: 16px;
}

.gallery-item:hover .first-line {
  color: red;
}

.caption p {
  margin: 5px 0;
}

/* 仅针对手机端的适配 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .title {
    font-size: 22px;
    margin-left: 0;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }

  .current-location {
    width: 100%;
    text-align: center;
  }

  .location-text {
    margin-right: 0;
    font-size: 12px;
  }

  .gallery {
    padding: 10px;
    gap: 15px;
  }

  .gallery-item {
    width: 100%;
    max-width: 400px;
    margin-bottom: 15px;
  }

  .image {
    height: auto;
    max-height: 200px;
  }

  .caption {
    font-size: 14px;
    padding: 0 10px;
  }

  .first-line {
    font-size: 18px;
  }
}

/* 小屏手机适配 */
@media (max-width: 480px) {
  .title {
    font-size: 20px;
  }

  .gallery-item {
    margin-bottom: 10px;
  }

  .caption {
    font-size: 13px;
  }

  .first-line {
    font-size: 16px;
  }
}
</style>