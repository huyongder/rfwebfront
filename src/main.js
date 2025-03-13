/*
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-01-14 16:21:37
 * @LastEditors: huimeng
 * @LastEditTime: 2025-03-13 14:59:01
 */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { Swipe, SwipeItem } from 'vant'
import 'element-plus/dist/index.css'
import 'qweather-icons/font/qweather-icons.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(Swipe)
app.use(SwipeItem)
app.mount('#app')
