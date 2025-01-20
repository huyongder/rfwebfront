<template>
  <nav class="main">
    <ul id="i_nav" class="wrap">
      <!-- 遍历 navItems 动态生成每个导航项 -->
      <li
        v-for="(item, index) in navLists"
        :key="index"
        :style="{ width: item.width + 'px' }"
        class="nav-item"
      >
        <!-- 每个菜单项的链接和标题 -->
        <router-link :to="item.link" class="nav-link">
          <p>{{ item.title }}</p>
          <b>{{ item.subTitle }}</b>
        </router-link>

        <!-- 如果存在子菜单，则展示子菜单 -->
        <ul v-show="item.subMenu && item.subMenu.length" class="nav_menu">
          <!-- 遍历子菜单 -->
          <li v-for="(subItem, subIndex) in item.subMenu" :key="subIndex">
            <!-- 子菜单项的链接 -->
            <router-link :to="subItem.link">{{ subItem.title }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, inject, provide } from 'vue'

export default defineComponent({
  name: 'HeaderComp',
  setup() {
    const navLists = inject('navLists')
    provide('navLists', navLists)
    return { navLists }
  },
})
</script>

<style scoped>
.main {
  width: 100%;
  background-color: #f70202;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 0;
  margin: 0;
}

.wrap {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  text-align: center;
  padding: 10px 0;
  color: white;
  text-decoration: none;
}

.nav-link p {
  margin: 0;
}

/* 只在父项悬停时显示子菜单 */
.nav-item:hover .nav_menu {
  display: block;
}

.nav_menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgb(0, 255, 179); /* 红色背景 */
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 200px; /* 子菜单宽度 */
}

.nav_menu li {
  padding: 10px 20px;
  color: white; /* 白色文字 */
}

.nav-item:hover .nav_menu li:hover {
  background-color: #1518c4; /* 悬停时子菜单项 */
}

.nav-item:hover .nav-link {
  background-color: #555;
}
</style>
