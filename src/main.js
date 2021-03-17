import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import './assets/css/backFont.css'
import store from './store'

const app = createApp(App)


const findType = {
  autograph: '/bind/1', // 个性签名
  point: '/bind/2', // 积分
  image: '/bind/3', // 图片
  comment: '/bind/4', // 评论
  study: '/bind/5', //学习记录
  phone: '/bind/6', // 绑定手机
}


app.config.globalProperties.$findType = findType
app.use(store).use(router).mount('#app')

