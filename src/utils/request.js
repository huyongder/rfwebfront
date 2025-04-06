/*
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-03-14 15:07:39
 * @LastEditors: huimeng
 * @LastEditTime: 2025-04-05 09:40:13
 */
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000,
})

// 请求拦截器：自动添加令牌
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器：处理401错误
service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('jwt_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default service
