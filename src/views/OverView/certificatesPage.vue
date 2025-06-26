<script>
import OverviewNav from '@/components/NavComp/OverviewNav.vue'
import FooterComp from '@/components/FooterComp.vue'
import HeaderBanner from '@/components/HeaderBanner.vue';
export default {
  name: 'CoreAdvantages',
  components: {
    OverviewNav,
    FooterComp,
    HeaderBanner,
  },
}
</script>
<template>
  <HeaderBanner />
  <OverviewNav />
  <div class="core-advantages">
    <div class="vertical-images">
      <img src="@/public/certificatesPhotos/BusinessLicense.jpg" alt="BusinessLicense" />
      <img src="@/public/certificatesPhotos/QS.jpg" alt="QS" />
      <img
        src="@/public/certificatesPhotos/QualificationCertificate.jpg"
        alt="QualificationCertificate"
      />
    </div>
    <!-- <FooterComp /> -->
  </div>
  <FooterComp />
</template>

<style scoped>
.core-advantages {
  font-family: '微软雅黑', sans-serif;
  line-height: 1.6;
  padding: 0 20%;
}

.vertical-images {
  display: grid;
  grid-template-rows: auto;
  justify-items: center; /* 使图片水平居中 */
  margin-top: 20px; /* 可选：增加一些间距 */
}

.vertical-images img {
  max-width: 80%; /* 限制图片的最大宽度为容器宽度的80% */
  margin: 0 10%; /* 使图片左右各空10% */
}
</style>
