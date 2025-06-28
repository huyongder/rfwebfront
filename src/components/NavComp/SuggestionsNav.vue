<template>
  <div class="nav-container">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      navLists: [
        {
          title: '投诉与建议',
          subTitle: 'Suggestions',
          link: '/contact/suggestions',
          subMenu: [
            { title: '投诉中心', link: '/contact/complaints' },
            { title: '售后监督', link: '/contact/after-sales' },
          ],
        },
      ],
    }
  },
  computed: {
    flattenedNavLists() {
      const flattened = []
      this.navLists.forEach((item) => {
        flattened.push({ title: item.title, link: '', isMain: true })
        if (item.subMenu) {
          item.subMenu.forEach((subItem) => {
            flattened.push({ ...subItem, isMain: false })
          })
        }
      })
      return flattened
    },
  },
}
</script>

<style scoped>
/* 新增的外层容器样式 */
.nav-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  background-color: red; /* 保持背景色一致 */
}

.navbar {
  background-color: red;
  color: white;
  padding: 0 10px;
  width: 1250px; /* 保持您设定的固定宽度 */
  height: 50px;
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

.main-title {
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}

.main-title:hover {
  background-color: transparent !important;
}

.nav-link:hover {
  background-color: #cc0000;
}

.main-title {
  pointer-events: none;
}
</style>