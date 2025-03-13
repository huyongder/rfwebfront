<template>
  <nav class="main">
    <div class="nav-container">
      <ul class="wrap">
        <li
          v-for="(item, index) in navLists"
          :key="index"
          class="nav-item"
        >
          <router-link :to="item.link" class="nav-link">
            <p>{{ item.title }}</p>
            <b>{{ item.subTitle }}</b>
          </router-link>

          <ul v-show="item.subMenu?.length" class="nav_menu">
            <li v-for="(subItem, subIndex) in item.subMenu" :key="subIndex">
              <router-link :to="subItem.link">{{ subItem.title }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'HeaderComp',
  setup() {
    const navLists = inject('navLists')
    return { navLists }
  }
})

</script >

<style scoped>
.main {
  background: #E6212A;
  right: 0;
  z-index: 999;
  height: 58px;
  display: flex;
  justify-content: center;
}

.nav-container {
  max-width: 100vw;
  margin: 0 auto;
  height: 100%;
}

.wrap {
  display: inline-flex;
  height: 100%;
  padding: 0;
  margin: 0 auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.nav-item {
  width: 156px;
  height: 58px;
  flex-shrink: 0;
  list-style: none;
  position: relative;
}

.nav-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
}

/* 新增悬停效果 */
.nav-item:hover .nav-link {
  background: rgba(0,0,0,0.2);
}

.nav-link p,
.nav-link b {
  margin: 0;
  line-height: 1.2;
}

/* 下拉菜单样式修改 */
.nav_menu {
  display: none; /* 默认隐藏 */
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(128, 128, 128, 0.5); /* 半透明白色 */
  backdrop-filter: blur(5px);
  list-style: none; /* 去除列表符号 */
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* 添加阴影 */
  border-radius: 4px;
  z-index: 1001; /* 确保在最上层 */
}

/* 悬停显示菜单 */
.nav-item:hover .nav_menu {
  display: block;
}

.nav_menu li {
  padding: 12px 20px;
  text-align: center;
  transition: all 0.2s;
}

/* 菜单项悬停效果 */
.nav_menu li:hover {
  background: #f70202 !important; /* 红色背景 */
}

.nav_menu a {
  color: #333; /* 文字颜色改为深色 */
  text-decoration: none;
  display: block;
  font-size: 14px;
}

/* 菜单项悬停时文字变白 */
.nav_menu li:hover a {
  color: white !important;
}
</style>
