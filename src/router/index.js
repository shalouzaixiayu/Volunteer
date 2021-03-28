import {
  createRouter,
  createWebHistory
} from 'vue-router'
const Home = () => import('../views/Home/Home.vue')
const ActiveList = () => import('../views/ActiveList/ActiveList.vue')
const ActiveDetail = () => import('../views/ActiveDetail/ActiveDetail.vue')
const Me = () => import('../views/Me/Me.vue')
const BackEndView = () => import('../views/BackEndView/BackEndView.vue')
const Rank = () => import('../views/Rank/Rank.vue')
const Login = () => import('../views/Login/Login.vue')
const ActivePush = () => import('../views/ActivePush/activePush.vue');

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: "Home",
    component: Home,
    meta: {
      title: "首页",
      isActive: false, // 是否处于活跃态
    }
  },
  {
    path: '/activeList',
    name: "ActiveList",
    component: ActiveList,
    meta: {
      title: "活动令",
      isActive: true
    }
  },
  {
    path: '/activeDetail',
    name: "ActiveDetail",
    component: ActiveDetail,
    meta: {
      title: "活动详情",
      isActive: false
    }
  },
  {
    path: '/me',
    name: "Me",
    component: Me,
    meta: {
      title: "我的",
      isActive: false
    }
  },
  {
    path: '/backEndView',
    name: "BackEndView",
    component: BackEndView,
    meta: {
      title: "后台系统",
      isActive: false
    }
  },
  {
    path: "/rank",
    name: "Rank",
    component: Rank,
    meta: {
      title: "排名",
      isActive: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录",
      isActive: false
    }
  },
  {
    path: "/ActivePush",
    name: "ActivePush",
    component: ActivePush,
    meta: {
      title: "发布活动",
      isActive: false
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router