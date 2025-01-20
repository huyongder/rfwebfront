
<template>
  <div >
    <OverviewNav />
    <FooterComp />
  </div>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import OverviewNav from '@/components/NavComp/OverviewNav.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'newsPage',
  components: {
    OverviewNav,
    FooterComp,
  },

  mounted() {
    console.log('newsPage mounted');
  },
});


</script>
