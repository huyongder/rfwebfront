<template>
  <nav class="main-nav">
    <div class="nav-container">
      <ul class="nav-wrap">
        <li
          v-for="(item, index) in navLists"
          :key="index"
          class="nav-item"
        >
          <router-link :to="item.link" class="nav-link">
            <p>{{ item.title }}</p>
            <b>{{ item.subTitle }}</b>
          </router-link>

          <!-- 子菜单 -->
          <ul v-if="item.subMenu?.length" class="sub-menu">
            <li
              v-for="(subItem, subIndex) in item.subMenu"
              :key="subIndex"
              class="sub-menu-item"
            >
              <router-link :to="subItem.link" class="sub-menu-link">
                {{ subItem.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
/* 保持原有逻辑不变 */
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'HeaderNavigation',
  setup() {
    const navLists = inject('navLists', [])
    return { navLists }
  }
})
</script>

<style scoped>
/* 全局重置 */
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-nav {
  background: #E6212A;
  height: 58px;
  position: relative;
  z-index: 1000;
}

.nav-container {
  max-width: 100vw;
  margin: 0 auto;
  height: 100%;
}

.nav-wrap {
  display: inline-flex;
  height: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

/* 导航项 */
.nav-item {
  width: 156px;
  height: 58px;
  position: relative;
  z-index: 1000;
  padding: 0 !important;
}

.nav-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
  padding: 0;
}

/* 悬停效果 */
.nav-item:hover {
  z-index: 1002;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* 子菜单样式 */
.sub-menu {
  position: absolute;
  top: 100%;
  left: 50%;                   /* 居中关键属性 */
  transform: translateX(-50%); /* 居中关键属性 */
  width: 156px;               /* 与导航项同宽 */
  background: #00000029;
  backdrop-filter: blur(8px);
  border-radius: 4px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  padding: 10px 0 !important;
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover .sub-menu {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 3px); /* 调整居中后的下落动画 */
}

/* 子菜单项 */
.sub-menu-item {
  transition: all 0.25s ease;
  margin: 2px 8px;
  border-radius: 3px;
}

.sub-menu-item:hover {
  background: #E6212A !important;
  transform: translateX(6px);
}

.sub-menu-link {
  display: block;
  padding: 10px 20px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 14px;
  font-weight: 500;
  text-align: center;          /* 文字居中 */
  text-decoration: none;
  transition: all 0.25s ease;
}

.sub-menu-link:hover {
  color: white !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* 文本元素 */
p, b {
  margin: 0;
  line-height: 1.2;
  pointer-events: none;
}
</style>