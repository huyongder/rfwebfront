<!--
 * @Descripttion: 后台管理界面左侧菜单栏 使用 Element Plus 的 el-menu 和递归组件处理多级菜单
 * @Author: huimeng
 * @Date: 2025-05-28 14:44:19
 * @LastEditors: huimeng
 * @LastEditTime: 2025-05-28 14:44:28
-->
<!-- SideMenu.vue -->
<template>
  <el-menu :router="true">
    <template v-for="item in menuData">
      <!-- 有子菜单 -->
      <el-sub-menu v-if="item.children" :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <SideMenu :menuData="item.children" />
      </el-sub-menu>

      <!-- 无子菜单 -->
      <el-menu-item v-else :index="item.path">
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
