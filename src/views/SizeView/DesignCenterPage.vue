<!--
 * @Descripttion: 集团规模>设计中心
 * @Author: huimeng
 * @Date: 2025-02-19 08:20:06
 * @LastEditors: huimeng
 * @LastEditTime: 2025-08-07 17:09:01
-->

<script lang="ts">
import SizeviewNav from '@/components/NavComp/SizeviewNav.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
  components: {
    SizeviewNav,
    HeaderBanner,
    FooterComp,
  },
}
</script>

<template>
  <HeaderBanner />
  <SizeviewNav />
  <div class="container">
    <h1 class="title">设计中心</h1>
    <div class="current-location">
      <span class="location-text">
        当前的位置：
        <a href="/" class="link">首页</a> &gt;
        <a href="/about/branches/team" class="link">设计中心</a>
      </span>
    </div>
  </div>

  <div class="images">
    <p class="subtitle">合肥设计团队</p>
    <img
      src="/src/public/about/DesignCenter/hefeiDesign.jpg"
      alt="合肥设计团队"
      class="team-image"
    />
    <p class="subtitle">六安设计团队</p>
    <img
      src="/src/public/about/DesignCenter/luanDesign.jpg"
      alt="六安设计团队"
      class="team-image"
    />
    <p class="subtitle">锋设计中心</p>
    <p class="fengAdress">(专注洋房、别墅设计 位于金三角家居生活广场五楼)</p>
    <img
      src="/src/public/about/DesignCenter/fengDesign1.jpg"
      alt="锋设计中心1"
      class="team-image"
    />
    <img
      src="/src/public/about/DesignCenter/fengDesign2.jpg"
      alt="锋设计中心2"
      class="team-image"
    />
    <img
      src="/src/public/about/DesignCenter/fengDesign3.jpg"
      alt="锋设计中心3"
      class="team-image"
    />
    <img
      src="/src/public/about/DesignCenter/fengDesign4.jpg"
      alt="锋设计中心4"
      class="team-image"
    />
    <p class="subtitle">设计一部<span class="small-text">(顺达总部五楼)</span></p>
    <img src="/src/public/about/DesignCenter/DesignOne1.jpg" alt="DesignOne1" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignOne2.jpg" alt="DesignOne2" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignOne3.jpg" alt="DesignOne3" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignOne4.jpg" alt="DesignOne4" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignOne5.jpg" alt="DesignOne5" class="team-image" />

    <p class="subtitle">设计二部<span class="small-text">(金三角家居生活广场二楼)</span></p>
    <img src="/src/public/about/DesignCenter/DesignTwo1.jpg" alt="DesignTwo1" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignTwo2.jpg" alt="DesignTwo2" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignTwo3.jpg" alt="DesignTwo3" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignTwo4.jpg" alt="DesignTwo4" class="team-image" />

    <p class="subtitle">设计三部<span class="small-text">(金三角家居生活广场五楼)</span></p>
    <img src="/src/public/about/DesignCenter/DesignThree1.jpg" alt="DesignThree1" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignThree2.jpg" alt="DesignThree2" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignThree3.jpg" alt="DesignThree3" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignThree4.jpg" alt="DesignThree4" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignThree5.jpg" alt="DesignThree5" class="team-image" />
    <img src="/src/public/about/DesignCenter/DesignThree6.jpg" alt="DesignThree6" class="team-image" />

  </div>
  <FooterComp />
</template>

<style scoped>
/* 原有PC端样式保持不变 */
.container {
  padding: 15px;
  max-width: 1250px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.current-location {
  font-size: 14px;
  color: #666;
}

.location-text {
  color: #070707;
}

.link {
  color: #000;
}

.top {
  padding: 20px;
  font-size: 13px;
  color: #333;
  line-height: 1.5;
  max-width: 1250px;
  text-indent: 2em;
}

.images {
  max-width: 1250px;
  margin: 10px auto;
  text-align: center;
  display: grid;
}

.subtitle {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  font-size: 25px;
}

.team-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.small-text {
  font-size: 16px;
}

.fengAdress {
  margin: 0;
  margin-bottom: 10px;
}

.cangku {
  display: flex;
  padding: 0 25px;
  margin-left: 0;
}

.cangku-image {
  width: 600px;
}

/* 新增移动端适配样式 */
@media only screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 15px;
  }

  .title {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .current-location {
    font-size: 12px;
  }

  .images {
    padding: 0 10px;
  }

  .subtitle {
    font-size: 18px;
    margin: 15px 0 10px;
  }

  .small-text {
    font-size: 14px;
  }

  .fengAdress {
    font-size: 14px;
    padding: 0 15px;
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .team-image {
    margin-bottom: 5px;
  }
}

/* 小屏幕手机优化 (小于480px) */
@media only screen and (max-width: 480px) {
  .title {
    font-size: 20px;
  }

  .subtitle {
    font-size: 16px;
  }

  .small-text {
    font-size: 12px;
  }

  .fengAdress {
    font-size: 12px;
  }

  .team-image {
    margin-bottom: 3px;
  }
}
</style>
