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
  justify-content: center;
  background-color: red;
}

.navbar {
  background-color: red;
  color: white;
  padding: 0 10px;
  width: 1250px;
  height: auto; /* 改为自动高度以适应移动布局 */
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
  flex-wrap: wrap; /* 添加换行 */
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
  white-space: nowrap; /* 防止文字换行 */
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

/* 移动端适配 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 10px;
  }

  .navbar {
    width: 100%;
    padding: 10px 0;
    height: auto;
  }

  .navbar ul {
    justify-content: space-around; /* 均匀分布 */
  }

  .nav-item {
    width: calc(50% - 10px); /* 两列布局，减去边距 */
    margin: 5px;
    height: 40px;
    justify-content: center;
  }

  .nav-link {
    width: 100%;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    justify-content: center;
  }

  .main-title {
    width: 100%;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }
}

/* 小屏幕手机适配 */
@media (max-width: 480px) {
  .nav-item {
    width: calc(50% - 10px); /* 保持两列布局 */
  }

  .nav-link {
    font-size: 13px;
    padding: 0 5px;
  }

  .main-title {
    font-size: 16px;
  }
}
</style>
