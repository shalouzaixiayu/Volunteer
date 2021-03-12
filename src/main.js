import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import store from './store'

const app = createApp(App)

app.use(store).use(router).mount('#app')

