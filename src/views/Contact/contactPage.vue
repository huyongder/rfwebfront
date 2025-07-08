<!--
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-06-30 16:37:01
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-01 10:32:02
-->
<script>
import HeaderBanner from '@/components/HeaderBanner.vue'
import FooterComp from '@/components/FooterComp.vue'
import { BaiduMap, BmNavigation, BmMarker, BmLabel, BmInfoWindow } from 'vue-baidu-map-3x'

export default {
  name: 'designersPage',
  components: {
    HeaderBanner,
    FooterComp,
    BaiduMap,
    BmNavigation,
    BmMarker,
    BmLabel,
    BmInfoWindow,
  },
  data() {
    return {
      locations: [
        {
          position: { lng: 116.482672, lat: 31.727766 },
          title: '集团六安总部地址',
          content: '地址：安徽省六安市磨子潭路顺达大市场二号楼4-5楼',
        },
        {
          position: { lng: 116.48452, lat: 31.724198 },
          title: '集团红星美凯龙商场一店分部',
          content: '地址：六安市佛子岭路红星美凯龙商场一店',
        },
        {
          position: { lng: 116.555639, lat: 31.770323 },
          title: '集团红星美凯龙商场二店分部',
          content: '地址：六安市迎宾大道红星美凯龙商场二店',
        },
        {
          position: { lng: 116.56844, lat: 31.75798 },
          title: '集团居然之家分部',
          content: '地址：六安市312国道与文蔚路交叉口原居然之家商城',
        },
        {
          position: { lng: 117.170581, lat: 31.852428 },
          title: '集团合肥总部',
          content: '地址：安徽省合肥市长江西路乐客来商业广场1-3层',
        },
      ],
      infoWindow: {
        show: false,
        position: {},
        title: '',
        content: '',
      },
    }
  },
  methods: {
    showInfoWindow(marker) {
      this.infoWindow.position = marker.position
      this.infoWindow.title = marker.title
      this.infoWindow.content = marker.content
      this.infoWindow.show = true
    },
    hideInfoWindow() {
      this.infoWindow.show = false
    },
  },
}
</script>

<template>
  <HeaderBanner />
  <div class="hotline-container">
    <h2 class="hotline-title">热线电话</h2>
    <div class="hotline-list">
      <div class="hotline-item">
        <span class="hotline-name">全国服务热线：</span>
        <span class="hotline-number">400-606-8788</span>
      </div>
      <div class="hotline-item">
        <span class="hotline-name">总部热线：</span>
        <span class="hotline-number">0564-7228888/7286888</span>
      </div>
      <div class="hotline-item">
        <span class="hotline-name">工程监督热线：</span>
        <span class="hotline-number">0564-5335555</span>
      </div>
      <div class="hotline-item">
        <span class="hotline-name">售后服务热线：</span>
        <span class="hotline-number">0564-3988988</span>
      </div>
      <div class="image-map-container">
        <img src="/src/public/lxwm1.jpg" alt="联系图片" class="contact-image" />
        <BaiduMap
          class="map"
          ak="6awab9sEz1VbnkG3EY4fVf6riVezoGDE"
          :center="{ lng: 116.507676, lat: 31.752889 }"
          :zoom="10"
          :scroll-wheel-zoom="true"
        >
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

          <!-- 位置标记 -->
          <bm-marker
            v-for="(location, index) in locations"
            :key="index"
            :position="location.position"
            @click="showInfoWindow(location)"
          >
            <bm-label
              :content="location.title"
              :style="{
                color: '#fff',
                fontSize: '12px',
                backgroundColor: '#4CAF50',
                padding: '2px 6px',
              }"
            />
          </bm-marker>

          <!-- 信息提示框 -->
          <bm-info-window
            :position="infoWindow.position"
            :title="infoWindow.title"
            :show="infoWindow.show"
            @close="hideInfoWindow"
          >
            {{ infoWindow.content }}
          </bm-info-window>
        </BaiduMap>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<style scoped>
/* 保持原有样式不变 */
.hotline-container {
  display: flex;
  flex-direction: column;
  margin-left: 20%;
}
.hotline-item {
  display: flex;
  flex-direction: row;
  font-size: 18px;
  margin-bottom: 10px;
}
.image-map-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
}
.map {
  width: 50%;
  height: auto; /* 改为固定高度确保地图显示 */
  padding-left: 5%;
}
</style>
