<!--
 * @Descripttion: 后端管理界面
 * @Author: huimeng
 * @Date: 2025-05-28 13:48:30
 * @LastEditors: huimeng
 * @LastEditTime: 2025-06-26 16:05:58
-->
<template>
  <el-container class="h-screen">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <!-- <SideMenu :menuData="menuList" /> -->
    </el-aside>

    <!-- 右侧内容 -->
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
