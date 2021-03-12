import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin:false,  // 是否登陆
    obj:{}
  },
  mutations: {
    // 修改登陆状态
    switchLoginStatus(state){
      state.isLogin  = !state.isLogin
    },
    // 添加对象信息
    addPeopleObj(state, payload){
      if(payload) {
        state.obj = payload
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
