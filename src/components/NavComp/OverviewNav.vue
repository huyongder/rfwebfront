<template>
  <nav class="navbar">
    <ul>
      <li v-for="(item, index) in flattenedNavLists" :key="index" class="nav-item">
        <a
          class="nav-link"
          :class="{ 'main-title': item.isMain }"
          :href="item.link || 'javascript:void(0)'"
          :style="item.isMain ? 'pointer-events: none;' : ''"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navLists: [
        {
          title: '集团概况',
          subTitle: 'GROUP OVERVIEW',
          subMenu: [
            { title: '最新动态', link: '/about/news' },
            { title: '企业简介', link: '/about/company' },
            { title: '企业优势', link: '/about/advantages' },
            { title: '企业文化', link: '/about/culture' },
            { title: '集团架构', link: '/about/structure' },
            { title: '资质证书', link: '/about/certificates' },
            { title: '集团荣誉', link: '/about/honors' },
          ],
        },
      ],
    }
  },
  computed: {
    flattenedNavLists() {
      const flattened = []
      this.navLists.forEach((item) => {
        // 让主标题的 link 为空，避免 undefined 导致错误
        flattened.push({ title: item.title, link: '', isMain: true })
        if (item.subMenu) {
          item.subMenu.forEach((subItem) => {
            flattened.push({ ...subItem, isMain: false }) // 确保子菜单的 link 正常
          })
        }
      })
      return flattened
    },
  },
}
</script>

<style scoped>
.navbar {
  background-color: red;
  color: white;
  padding: 0 10px; /* 左右留白 */
  width: 1250px;
  height: 50px; /* 设定固定高度 */
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 0 30px;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* 主标题“集团概况” */
.main-title {
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}

/* 禁止鼠标悬停时主标题变色 */
.main-title:hover {
  background-color: transparent !important;
}

.nav-link:hover {
  background-color: #cc0000;
}

/* 禁止主标题“集团概况”可点击 */
.main-title {
  pointer-events: none;
}
</style>
