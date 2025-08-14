<template>
  <nav class="main-nav">
    <div class="nav-container">
      <!-- 移动端悬浮菜单按钮 -->
      <div v-if="isMobile" class="mobile-menu-btn" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 桌面导航 -->
      <ul v-if="!isMobile" class="nav-wrap">
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

      <!-- 移动端菜单 - 简化版 -->
      <div v-if="isMobile" class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
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
      if (!isMobile.value) {
        isMobileMenuOpen.value = false
      }
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
      isMobile,
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
  font-size: 14px;
  font-weight: normal;
  opacity: 0.8;
  margin-top: 4px;
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
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
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
  transform: translate(-50%, 3px);
}

/* 子菜单项 */
.sub-menu-item {
  transition: all 0.25s ease;
  margin: 1px 5px;
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
  text-align: center;
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
  .main-nav {
    background: transparent;
    height: auto;
  }

  .nav-container {
    position: fixed;
    top: 20px;
    right: 20px;
    width: auto;
    height: auto;
    z-index: 1000;
  }

  .mobile-menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 40px;
    height: 40px;
    background: #E6212A;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 1001;
  }

  .mobile-menu-btn span {
    display: block;
    width: 20px;
    height: 2px;
    background: white;
    margin: 0 auto;
    transition: all 0.3s ease;
  }

  .mobile-menu {
    position: fixed;
    top: 70px;
    right: 20px;
    width: 200px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1000;
    max-height: calc(100vh - 90px);
    overflow-y: auto;
  }

  .mobile-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .mobile-nav-item {
    border-bottom: 1px solid #f0f0f0;
  }

  .mobile-nav-item:last-child {
    border-bottom: none;
  }

  .mobile-nav-link {
    display: block;
    padding: 12px 15px;
    color: #333;
    font-size: 15px;
    text-decoration: none;
    transition: background 0.2s;
  }

  .mobile-nav-link span {
    display: block;
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }

  .mobile-nav-link:hover {
    background: #f5f5f5;
  }

  .mobile-sub-menu {
    background: #f9f9f9;
  }

  .mobile-sub-menu-item {
    border-top: 1px solid #eee;
  }

  .mobile-sub-menu-link {
    display: block;
    padding: 10px 15px 10px 25px;
    color: #555;
    font-size: 14px;
    text-decoration: none;
    transition: background 0.2s;
  }

  .mobile-sub-menu-link:hover {
    background: #f0f0f0;
    color: #E6212A;
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