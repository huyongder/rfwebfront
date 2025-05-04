/*
 * @Descripttion: 将 Token 操作集中到 Store
 * @Author: huimeng
 * @Date: 2025-04-05 17:25:32
 * @LastEditors: huimeng
 * @LastEditTime: 2025-04-07 15:57:59
 */
// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt_token') || null,
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken
      localStorage.setItem('jwt_token', newToken)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('jwt_token')
    },
    async login(credentials) {
      try {
        const res = await axios.post('/auth/login', credentials)
        this.setToken(res.data.token)
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
  },
})
