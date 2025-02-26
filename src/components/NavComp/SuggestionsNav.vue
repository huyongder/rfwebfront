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
        // 主标题的 link 设为空字符串，防止 undefined 影响点击
        flattened.push({ title: item.title, link: '', isMain: true })
        if (item.subMenu) {
          item.subMenu.forEach((subItem) => {
            flattened.push({ ...subItem, isMain: false }) // 确保子菜单 link 正常
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

/* 主标题“集团规模” */
.main-title {
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  pointer-events: none; /* 禁止主标题可点击 */
}

/* 禁止鼠标悬停时主标题变色 */
.main-title:hover {
  background-color: transparent !important;
}

.nav-link:hover {
  background-color: #cc0000;
}
</style>
