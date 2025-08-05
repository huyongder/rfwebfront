<!--
 * @Descripttion:管理界面的布局组件
 * @Author: huimeng
 * @Date: 2025-07-11 14:29:10
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-29 08:31:33
-->

<template>
  <div class="admin-container">
    <div class="sidebar">
      <h2>管理菜单</h2>
      <nav>
        <ul>
          <!-- 控制面板 - 权限1、2和管理员可见 -->
          <li v-if="authStore.hasRole(['ADMIN', 'PERMISSION1', 'PERMISSION2'])">
            <router-link to="/admin">展示页</router-link>
          </li>

          <!-- 以下菜单项仅管理员可见 -->
          <li v-if="authStore.hasRole('ADMIN')">
            <router-link to="/admin/largePhoto">首页大图管理</router-link>
          </li>
          <li v-if="authStore.hasRole('ADMIN')">
            <router-link to="/admin/manNews">新闻页管理</router-link>
          </li>
          <li v-if="authStore.hasRole('ADMIN')">
            <router-link to="/admin/manstores">直营门店管理</router-link>
          </li>
          <li v-if="authStore.hasRole('ADMIN')">
            <router-link to="/admin/manDesigners">设计师管理</router-link>
          </li>
          <li v-if="authStore.hasRole('ADMIN')">
            <router-link to="/admin/manBuild">工地实拍管理</router-link>
          </li>
          <li v-if="authStore.hasRole('ADMIN')">
            <router-link to="/admin/manGoodCase">优秀案例管理</router-link>
          </li>
          <li v-if="authStore.hasRole('ADMIN')">
            <router-link to="/admin/manComplaint">投诉建议管理</router-link>
          </li>

          <!-- 以下菜单项权限1和管理员可见 -->
          <li v-if="authStore.hasRole(['ADMIN', 'PERMISSION1'])">
            <router-link to="/admin/mandepartment">部门管理</router-link>
          </li>
          <li v-if="authStore.hasRole(['ADMIN', 'PERMISSION1'])">
            <router-link to="/admin/manReward">奖惩管理</router-link>
          </li>

          <!-- 奖惩查询 - 权限1、2和管理员可见 -->
          <li v-if="authStore.hasRole(['ADMIN', 'PERMISSION1', 'PERMISSION2'])">
            <router-link to="/admin/manSelectReward">奖惩查询</router-link>
          </li>
        </ul>
      </nav>

      <!-- 用户信息和登出按钮 -->
      <div class="user-info">
        <div class="user-name">{{ authStore.username }}</div>
        <button @click="authStore.logout" class="logout-btn">登出</button>
      </div>
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
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
  height: 100vh;
  background: #2c3e50;
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  color: #42b983;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  flex-grow: 1;
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
  margin-left: 220px;
  flex: 1;
  overflow: auto;
}

.user-info {
  margin-top: 50px;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
}

.user-name {
  margin-bottom: 10px;
  font-size: 14px;
  color: #42b983;
}

.logout-btn {
  width: 100%;
  padding: 8px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>