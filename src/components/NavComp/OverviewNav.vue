<template>
  <div class="overview-nav">
    <div class="overview-nav-item" v-for="(item, index) in navList" :key="index" @click="handleClick(item)">
      <div class="overview-nav-item-text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OverviewNav',
    props: {
      navList: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      handleClick (item) {
        this.$router.push({name: item.name});
      }
    }
  }
</script>
