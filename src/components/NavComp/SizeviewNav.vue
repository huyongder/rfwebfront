<!--
 * @Descripttion: 集团规模标签栏
 * @Author: huimeng
 * @Date: 2025-02-14 10:03:47
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-19 15:46:48
-->

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
          title: '集团规模',
          subTitle: 'GROUP SIZE',
          subMenu: [
            { title: '集团总部', link: '/about/headquarters' },
            { title: '集团分公司', link: '/about/branches' },
            { title: '代理品牌', link: '/about/brands' },
            { title: '直营门店', link: '/about/stores' },
            { title: '保障团队', link: '/about/team' },
            { title: '设计中心', link: '/about/DesignCenter' },
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
