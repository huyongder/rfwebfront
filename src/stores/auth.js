/*
 * @Descripttion: 将 Token 操作集中到 Store
 * @Author: huimeng
 * @Date: 2025-04-05 17:25:32
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-29 09:05:36
 */
// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'


export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  const role = ref(localStorage.getItem('role') || '')
  const isLoggedIn = ref(false)
  
  // 登录成功处理
  const loginSuccess = (data) => {
    token.value = data.token
    username.value = data.username
    role.value = data.role
    isLoggedIn.value = true

    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', data.role)

    // 跳转到管理界面
    router.push('/admin')
  }

  // 登出处理
  const logout = () => {
    token.value = ''
    username.value = ''
    role.value = ''
    isLoggedIn.value = false

    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')

    // 跳转到登录页
    router.push('/login')
  }

  // 检查是否有特定角色
  const hasRole = (requiredRoles) => {
    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles]
    }
    return requiredRoles.includes(role.value)
  }

  return {
    token,
    username,
    role,
    isLoggedIn,
    loginSuccess,
    logout,
    hasRole
  }
})