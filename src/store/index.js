import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    isLogin: false, // 是否登陆
    isShow: false, //是否显示大吐司层
    obj: {},  // 用户信息对象
    // 头像列表
    headPicList: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2118582514,3082357895&fm=26&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2172435215,840313269&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2899335337,2471522323&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1198700900,3240457758&fm=26&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3633693073,3344238293&fm=26&gp=0.jpg'],
  },
  mutations: {
    // 修改登陆状态
    switchLoginStatus(state) {
      state.isLogin = !state.isLogin
    },
    // 刷新记录登录状态
    loginStatus(state, obj) {
      state.isLogin = Boolean(window.sessionStorage.getItem('userInfo'))
      state.obj = obj
    },
    // 添加对象信息
    addPeopleObj(state, payload) {
      if (payload) {
        state.obj = payload
      }
    },
<<<<<<< HEAD
=======
    // 改变吐司状态
>>>>>>> pug
    changeToastStatus(state) {
      state.isShow = !state.isShow
    }
  },
  actions: {},
  modules: {}
})