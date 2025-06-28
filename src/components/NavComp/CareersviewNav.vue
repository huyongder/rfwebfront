<!--
 * @Descripttion: 招聘
 * @Author: huimeng
 * @Date: 2025-02-20 08:46:59
 * @LastEditors: huimeng
 * @LastEditTime: 2025-06-27 15:07:49
-->
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
          title: '招贤纳士',
          subTitle: 'Talents Wanted',
          subMenu: [
          { title: 'BOSS直聘', link: '/careers/boss' },
          { title: '总部招聘', link: '/careers/headquarters_recruit' },
          { title: '分公司招聘', link: '/careers/branches' },
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