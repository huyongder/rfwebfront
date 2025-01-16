<template>
  <van-swipe class="custom-swipe" :style="swipeStyle" :autoplay="3000" indicator-color="white">
    <!-- <van-swipe-item>
      <div class="swipe-image-wrapper">
        <img
          src="http://rongfengjt.com/goodsimages/202372210380_370.jpg"
          alt="Image 1"
          class="swipe-image"
        />
      </div>
    </van-swipe-item> -->
    <van-swipe-item>
      <div class="swipe-image-wrapper">
        <img
          src="http://rongfengjt.com/goodsimages/202221016716_324203.jpg"
          alt="Image 2"
          class="swipe-image"
        />
      </div>
    </van-swipe-item>
    <!-- <van-swipe-item>
      <div class="swipe-image-wrapper">
        <img
          src="http://rongfengjt.com/goodsimages/202412793914_562.jpg"
          alt="Image 3"
          class="swipe-image"
        />
      </div>
    </van-swipe-item> -->
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      windowWidth: window.innerWidth, // 获取浏览器窗口的宽度
    }
  },
  computed: {
    // 动态计算轮播容器的样式
    swipeStyle() {
      console.log('Calculating swipe style:', this.windowWidth)
      return {
        width: `${this.windowWidth}px`, // 动态设置宽度为浏览器窗口的宽度
        height: `${this.windowWidth / 3}px`, // 高度为屏幕宽度的三分之一
      }
    },
  },
  mounted() {
    console.log('Component mounted')
    window.addEventListener('resize', this.updateWindowWidth)
  },
  unmounted() {
    console.log('Component unmounted')
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    updateWindowWidth() {
      console.log('Updating window width')
      this.windowWidth = window.innerWidth // 更新窗口宽度
    },
  },
}
</script>

<style scoped>
/* 更具体的选择器 */
.custom-swipe {
  width: 100vw !important; /* 确保宽度与视口一致 */
  margin: 0 !important; /* 去除外边距 */
  padding: 0 !important; /* 去除内边距 */
  box-sizing: border-box;
  position: relative; /* 确保轮播图的位置相对容器 */
  top: 0; /* 如果你需要设置一个特定的顶部间距 */
}

/* 单个图片的容器 */
.custom-swipe .swipe-image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 防止图片溢出 */
}

/* 图片样式 */
.custom-swipe .swipe-image {
  width: 100%; /* 图片宽度填满容器 */
  height: auto; /* 自动调整高度以保持比例 */
  object-fit: contain; /* 确保图片完全可见 */
  display: block; /* 避免图片作为内联元素引起间隙 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
