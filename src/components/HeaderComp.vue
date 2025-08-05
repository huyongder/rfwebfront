<template>
  <nav class="main-nav">
    <div class="nav-container">
      <!-- 移动端汉堡菜单按钮 -->
      <div class="mobile-menu-btn" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 桌面导航 -->
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

      <!-- 移动端菜单 -->
      <div class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
        <div class="mobile-menu-content">
          <ul>
            <li
              v-for="(item, index) in navLists"
              :key="index"
              class="mobile-nav-item"
            >
              <router-link
                :to="item.link"
                class="mobile-nav-link"
                @click="closeMobileMenu"
              >
                {{ item.title }}
                <span v-if="item.subTitle">{{ item.subTitle }}</span>
              </router-link>

              <!-- 移动端子菜单 -->
              <ul v-if="item.subMenu?.length" class="mobile-sub-menu">
                <li
                  v-for="(subItem, subIndex) in item.subMenu"
                  :key="subIndex"
                  class="mobile-sub-menu-item"
                >
                  <router-link
                    :to="subItem.link"
                    class="mobile-sub-menu-link"
                    @click="closeMobileMenu"
                  >
                    {{ subItem.title }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, inject, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'HeaderNavigation',
  setup() {
    const navLists = inject('navLists', [])
    const isMobileMenuOpen = ref(false)
    const isMobile = ref(false)

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 768
    }

    onMounted(() => {
      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkScreenSize)
    })

    return {
      navLists,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
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
  position: relative;
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

.nav-link b {
  font-size: 14px; /* 设置字体大小为 14px */
  font-weight: normal; /* 移除默认的粗体效果 */
  opacity: 0.8; /* 稍微降低透明度，使主标题更突出 */
  margin-top: 4px; /*调整与主标题的间距 */
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
  width: 150px;               /* 与导航项同宽 */
  min-width: 130px;
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
  margin: 2px 5px;
  border-radius: 3px;
}

.sub-menu-item:hover {
  background: #E6212A !important;
  transform: translateX(6px);
}

.sub-menu-link {
  display: block;
  padding: 5px 10px;
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

/* 移动端样式 */
@media (max-width: 768px) {
  .nav-wrap {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 24px;
    position: absolute;
    right: 20px;
    top: 17px;
    cursor: pointer;
    z-index: 1001;
  }

  .mobile-menu-btn span {
    display: block;
    width: 100%;
    height: 3px;
    background: white;
    transition: all 0.3s ease;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    transition: right 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
  }

  .mobile-menu.active {
    right: 0;
  }

  .mobile-menu-content {
    padding: 70px 20px 20px;
  }

  .mobile-nav-item {
    margin-bottom: 10px;
  }

  .mobile-nav-link {
    display: block;
    padding: 12px 15px;
    color: white;
    font-size: 16px;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.3s;
  }

  .mobile-nav-link span {
    display: block;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 4px;
  }

  .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .mobile-sub-menu {
    margin-top: 5px;
    padding-left: 15px;
    border-left: 2px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-sub-menu-item {
    margin-bottom: 5px;
  }

  .mobile-sub-menu-link {
    display: block;
    padding: 8px 15px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.3s;
  }

  .mobile-sub-menu-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
}

/* 桌面端隐藏移动菜单按钮 */
@media (min-width: 769px) {
  .mobile-menu-btn,
  .mobile-menu {
    display: none;
  }
}
</style>