<template>
  <nav class="navbar">
    <ul>
      <li v-for="(item, index) in flattenedNavLists" :key="index">
        <a :href="item.link" class="nav-link">
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
          link: '/about/size',
          width: 156.25,
          subMenu: [
            { title: '集团总部', link: '/about/headquarters' },
            { title: '集团分公司', link: '/about/branches' },
            { title: '代理品牌', link: '/about/brands' },
            { title: '直营门店', link: '/about/stores' },
            { title: '保障团队', link: '/about/team' },
            { title: '设计中心', link: '/about/DesignCenter' },
          ],
        },
        // 其他导航项可以继续添加在这里
      ],
    }
  },
  computed: {
    flattenedNavLists() {
      const flattened = []
      this.navLists.forEach((item) => {
        flattened.push({ title: item.title, link: item.link })
        if (item.subMenu) {
          item.subMenu.forEach((subItem) => {
            flattened.push(subItem)
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
  padding: 10px;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
}

.navbar li {
  margin-right: 20px;
  margin-bottom: 10px; /* 添加底部间距以便换行时有间隔 */
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #cc0000;
}
</style>
