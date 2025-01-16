<template>
  <div class="contact-widget">
    <!-- 鼠标进入显示二维码，离开隐藏二维码 -->
    <div class="contact-button" @mouseenter="showQRCode = true" @mouseleave="showQRCode = false">
      <span>联系我</span>
    </div>

    <!-- 当 showQRCode 为 true 时显示二维码 -->
    <div v-if="showQRCode" class="qr-code">
      <img src="path-to-your-qr-code-image.jpg" alt="二维码" />
    </div>

    <!-- 电话号码，点击可以直接拨打 -->
    <div v-if="showPhone" class="phone-number" @click="callPhone">
      <span>拨打电话</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 使用 showQRCode 来控制二维码显示与隐藏
const showQRCode = ref(false)

// 使用 showPhone 来控制电话号码的显示与隐藏
const showPhone = ref(true)

// 方法：拨打电话
const callPhone = () => {
  window.location.href = 'tel:+1234567890' // 替换为你的电话号码
}
</script>

<style scoped>
.contact-widget {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 1000;
}

.contact-button {
  padding: 10px;
  background-color: #0084ff;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.qr-code {
  margin-top: 10px;
  display: inline-block;
}

.qr-code img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.phone-number {
  margin-top: 10px;
  background-color: #ff5733;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
