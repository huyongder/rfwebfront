/*
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-01-14 16:21:37
 * @LastEditors: huimeng
 * @LastEditTime: 2025-07-04 13:53:27
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // 代理所有以/api开头的请求
      '/api': {
        target: 'http://192.168.5.155:8080', // 后端服务器地址
        changeOrigin: true, // 允许跨域
        secure: false, // 关闭SSL验证（开发环境使用）
      },
      // 代理认证相关请求
      '/auth': {
        target: 'http://192.168.5.155',
        changeOrigin: true,
        // 不需要重写路径，保持/auth前缀
      },
      // 代理静态文件请求
      '/uploads': {
        target: 'http://192.168.5.155',
        changeOrigin: true,
      },
    },
  },
})
