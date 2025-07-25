<!--
 * @Descripttion:管理界面的布局组件
 * @Author: huimeng
 * @Date: 2025-07-11 14:29:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-25 15:46:25
-->

<template>
  <div class="admin-container">
    <div class="sidebar">
      <h2>管理菜单</h2>
      <nav>
        <ul>
          <li>
            <router-link to="/admin">控制面板</router-link>
          </li>
          <li>
            <router-link to="/admin/largePhoto">首页大图管理</router-link>
          </li>
          <li>
            <router-link to="/admin/manNews">新闻管理</router-link>
          </li>
          <li>
            <router-link to="/admin/manstores">直营门店</router-link>
          </li>
          <li>
            <router-link to="/admin/manDesigners">设计大咖</router-link>
          </li>
          <li>
            <router-link to="/admin/manBuild">工地实拍</router-link>
          </li>
          <li>
            <router-link to="/admin/manGoodCase">优秀案例</router-link>
          </li>
          <li>
            <router-link to="/admin/manComplaint">投诉中心</router-link>
          </li>
          <li>
            <router-link to="/admin/manDepartment">部门管理</router-link>
          </li>
          <li>
            <router-link to="/admin/manReward">奖惩管理</router-link>
          </li>
          <li>
            <router-link to="/admin/manSelectReward">奖惩查询</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
}
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100vh; /* 确保高度占满屏幕 */
  background: #2c3e50;
  padding: 20px;
  z-index: 1000; /* 确保菜单栏在顶层 */
}

.sidebar h2 {
  color: #42b983;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar a.router-link-active {
  background: #42b983;
  color: white;
}

.main-content {
  margin-left: 220px; /* 与侧边栏宽度一致 */
  flex: 1;
  overflow: auto;
}
</style>
