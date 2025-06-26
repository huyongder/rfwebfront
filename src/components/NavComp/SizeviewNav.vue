<!--
 * @Descripttion: 集团规模标签栏
 * @Author: huimeng
 * @Date: 2025-02-14 10:03:47
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-25 17:31:13
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
.nav-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: red;
}

.navbar {
  background-color: red;
  color: white;
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
  height: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 0 30px;
  height: 100%;
  line-height: 50px;
  border-radius: 5px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* 主标题"集团规模" */
.main-title {
  font-size: 20px;
  font-weight: bold;
  pointer-events: none; /* 禁止主标题可点击 */
}

/* 禁止鼠标悬停时主标题变色 */
.main-title:hover {
  background-color: transparent !important;
}

.nav-link:hover {
  background-color: #cc0000;
}

/* 响应式设计 */
@media (max-width: 1250px) {
  .navbar {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    padding: 0 10px;
  }
  
  .navbar::-webkit-scrollbar {
    display: none;
  }
  
  .nav-link {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .nav-link {
    padding: 0 15px;
    font-size: 14px;
  }
  
  .main-title {
    font-size: 18px;
  }
}
</style>