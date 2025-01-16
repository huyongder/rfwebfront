import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { Swipe, SwipeItem } from 'vant'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(Swipe)
app.use(SwipeItem)
app.mount('#app')
