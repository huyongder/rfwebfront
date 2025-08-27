<template>
  <div class="nav-container">
    <nav class="navbar">
      <ul>
        <li
          v-for="(item, index) in flattenedNavLists"
          :key="index"
          class="nav-item"
          :class="{
            'main-title-item': item.isMain,
            'sub-item': !item.isMain
          }"
        >
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
/* ====================== PC端样式（完全保持不变） ====================== */
.nav-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: red;
}

.navbar {
  background-color: red;
  color: white;
  padding: 0 10px;
  width: 1250px;
  height: auto;
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
  flex-wrap: wrap;
  width: 100%;
}

.nav-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
  height: 50px;
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
  white-space: nowrap;
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

/* ====================== 移动端优化（主标题单独一行 + 子标题三列） ====================== */
@media (max-width: 768px) {
  .navbar {
    width: 100%;
    padding: 15px 10px;
  }

  .navbar ul {
    /* 网格布局实现三列效果 */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    justify-items: center;
  }

  /* 主标题独占一行 */
  .main-title-item {
    grid-column: 1 / -1;
    width: 100%;
    margin: 0 0 15px 0;
    justify-content: center;
    height: auto;
  }

  .main-title {
    width: 100%;
    font-size: 22px;
    text-align: center;
    margin-bottom: 5px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px 0;
  }

  /* 子标题卡片样式 */
  .sub-item {
    width: 100%;
    height: 60px;
    margin: 0;
    justify-content: center;
  }

  .sub-item .nav-link {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.3;
  }

  .sub-item .nav-link:hover {
    background-color: rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  .navbar ul {
    gap: 8px;
  }

  .sub-item .nav-link {
    font-size: 13px;
    min-height: 50px;
  }
}
</style>