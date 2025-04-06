/*
 * @Descripttion: 将 Token 操作集中到 Store
 * @Author: huimeng
 * @Date: 2025-04-05 17:25:32
 * @LastEditors: huimeng
 * @LastEditTime: 2025-04-06 14:49:46
 */
// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt_token') || null,
  }),
  actions: {
    // 设置 Token 并同步到 localStorage
    setToken(newToken) {
      this.token = newToken
      localStorage.setItem('jwt_token', newToken)
    },

    // 清除 Token
    clearToken() {
      this.token = null
      localStorage.removeItem('jwt_token')
    },
  },
})
