/*
 * @Descripttion:
 * @Author: huimeng
 * @Date: 2025-01-14 16:21:37
 * @LastEditors: huimeng
 * @LastEditTime: 2025-02-26 09:03:58
 */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { Swipe, SwipeItem } from 'vant'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(ElementPlus)
app.use(Swipe)
app.use(SwipeItem)
app.mount('#app')
