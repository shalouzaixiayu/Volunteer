<template>
  <div>
    <!-- 头部区域 -->
    <div :class="[!isLogin?'unloginbac':'', 'header']">
      <div class="hadlogin" v-if="isLogin">
        <div class="bigimg">
          <img src="../../../src/assets/img/userimg.jpg" alt="">
        </div>
        <div class="info">
          <img src="../../../src/assets/img/userimg.jpg" alt="">
          <span class="text">180102010201</span>
        </div>
      </div>
      <div class="unlogin" @click="goLogin" v-else>
        <img src="../../../src/assets/img/unlogin.jpg" alt="">
        <span class="text">未登录</span>
      </div>
    </div>
    <!-- 我的区域 -->
    <div class="my common">
      <h4>我的</h4>
      <div class="feel box" @click="showHandle">
        <span class="left">我的心得</span>
        <span class="right">></span>
      </div>
      <div class="score box" @click="showHandle">
        <span class="left">我的积分</span>
        <span class="right">></span>
      </div>
      <div class="imgs box" @click="showHandle">
        <span class="left">我的图片</span>
        <span class="right">></span>
      </div>
      <div class="record box" @click="showHandle">
        <span class="left">我的记录</span>
        <span class="right">></span>
      </div>
    </div>
    <!-- 退出登录区域 -->
    <div class="out common" v-if="isLogin">
      <h4>设置</h4>
      <div class="box">
        <span class="left">退出登录</span>
        <span class="right">></span>
      </div>
    </div>
    <!-- 后台模式区域 -->
    <div class="admin common" v-if="isAdmin">
      <h4>后台</h4>
      <div class="loginadm box">
        <span class="left">后台模式</span>
        <span class="right">进入 ></span>
      </div>
    </div>
    <!-- 弹出吐司层区域 -->
    <div class="toastcontainer" v-show="isShow" @click="toastOut">
      <div ref="toast" class="toast">123</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      isAdmin: true,
      isShow: false
    }
  },
  methods: {
    // 跳转登录页面方法
    goLogin() {
      this.$router.push({name:"Login"})
      // this.isLogin = true
      // this.isAdmin = false
    },
    // 弹出吐司层方法
    showHandle() {
      this.isShow = true
    },
    // 关闭吐司层区域
    toastOut(e) {
      if(e.target == this.$refs.toast) {
        return
      }
      this.isShow = false
    }
  },
  created() {
    var flag = window.sessionStorage.getItem('login')
    if(flag) {
      this.isLogin = true
    }
  }
}
</script>

<style scoped>
  .header{
    height: 30vh;
    position: relative;
    margin-bottom: 20px;
  }
  .unloginbac {
    background-color: rgb(11, 139, 139);
  }
  .header .hadlogin .bigimg img{
    width: 100%;
    height: 30vh;
    filter: blur(3px);
  }
  .header .hadlogin .info{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 34%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header .hadlogin .info img{
    margin-bottom: 10px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .header .hadlogin .info .text,
  .header .unlogin .text{
    font-weight: bold;
  }
  .header .unlogin{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 47%;
    display: flex;
    align-items: center;
  }
  .header .unlogin img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .common{
    margin: 8px;
    margin-bottom: 20px;
  }
  .common .box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid rgb(231, 228, 228);
    border-radius: 18px;
    font-size: 12px;
    box-shadow: 0 0 3px rgb(231, 228, 228);
  }
  .common .box .left{
    font-size: 16px;
    font-weight: bold;
  }
  .admin .box{
    border: none;
    margin-top: 5px;
  }
  .my .box .left,
  .out .box .left{
    font-size: 14px;
  }
  .toastcontainer{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 93vh;
    background-color: rgba(0, 0, 0, .3);
  }
  .toastcontainer .toast{
    width: 80%;
    height: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 18%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 15px #ccc;
    padding: 20px;
    box-sizing: border-box;
  }
</style>