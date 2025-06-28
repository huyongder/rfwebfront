/*
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-03-14 15:07:39
 * @LastEditors: huimeng
 * @LastEditTime: 2025-06-28 09:26:03
 */
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { nextTick } from 'vue'
import router from '@/router'

// 创建 axios 实例
const service = axios.create({
  timeout: 5000,
})

// 请求拦截器（通过全局访问 store）
service.interceptors.request.use(
  (config) => {
    const store = useAuthStore()
    if (store.token) {
      config.headers.Authorization = `Bearer ${store.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
service.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const store = useAuthStore()
      store.clearToken()
      // 跳转登录页（需在 Vue 组件中调用）
      if (import.meta.env.MODE === 'development') {
        console.error('请检查登录状态或联系管理员')
      }
      nextTick(() => {
        router.push('/login').catch(() => {})
      })
    }
    return Promise.reject(error)
  },
)

export default service
