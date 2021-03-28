<template>
  <!-- 主体区域 -->
  <div class="container">
    <!-- 导航栏区域 -->
    <nav-bar class="top">
      <template #left>
        <span class="back" @click="backHandle">&lt;</span>
      </template>
      <template #center>
        发布活动
      </template>
    </nav-bar>
    <div class="main">
      <!-- 信息区域 -->
      <div class="info common">
        <input-item @myBlur="Handle('title', $event)"><i class="iconfont icon-zhuti"></i>活动主题</input-item>
        <input-item @myBlur="Handle('time', $event)"><i class="iconfont icon-shijian"></i>活动时间</input-item>
        <input-item @myBlur="Handle('num', $event)"><i class="iconfont icon-renshu"></i>需求人数</input-item>
        <input-item @myBlur="Handle('charge', $event)"><i class="iconfont icon-yaoqing-fuzeren"></i>活动负责人</input-item>
        <input-item @myBlur="Handle('adr', $event)"><i class="iconfont icon-ziyuan"></i>地址</input-item>
      </div>
      <!-- 介绍区域 -->
      <div class="introduce common">
        <text-area tip="请输入活动内容" @textBlur="textHandle('intro', $event)">活动介绍</text-area>
      </div>
      <!-- 备注区域 -->
      <div class="common">
        <text-area tip="请输入活动注意事项" @textBlur="textHandle('remark', $event)">活动备注 *</text-area>
      </div>
      <!-- 发布按钮 -->
      <button class="btn" @click="sub">发布</button>
    </div>
    <s-toast class="err" v-show="isErr">{{errString}}</s-toast>
  </div>
</template>

<script>
import InputItem from './inputItem.vue'
import TextArea from './textareaItem.vue'
import NavBar from '../../components/common/Navbar/NavBar.vue'
import SToast from '../../components/common/Toast/SToast.vue'
export default {
  components: { InputItem, NavBar, TextArea, SToast },
  data() {
    return {
      params: {
        title: '',
        time: '',
        num: '',
        charge: '',
        adr: '',
        intro: '',
        remark: ''
      },
      isErr: false,
      errString: ''
    }
  },
  methods: {
    // 返回上一级
    backHandle() {
      this.$router.go(-1)
    },

    // 处理输入框拿到参数
    Handle(tip, e) {
      switch (tip) {
        case 'title':
          this.params.title = e
          break;
        case 'time':
          this.params.time = e
          break;
        case 'num':
          this.params.num = e
          break;
        case 'charge':
          this.params.charge = e
          break;
        case 'adr':
          this.params.adr = e
          break;
      }
    },

    // 文本域参数处理
    textHandle(tip, e) {
      switch (tip) {
        case 'intro':
          this.params.intro = e
          break;
        case 'remark':
          this.params.remark = e
          break;
      }
    },

    // 提交处理
    sub() {
      for(var key in this.params) {
        if(!this.params[key].trim()) {
          return this.err('请填写完整的信息')
        }
      }
      console.log(this.params)
      // this.$router.go(-1)
    },

    // 错误弹框
    err(value) {
      this.errString = value
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      },1000)
    }
  }
}
</script>

<style scoped>
  .container{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 99;
  }
  .container .top{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 105.9%;
  }
  .container .back{
    cursor: pointer;
    position: absolute;
    left: 42px;
    font-size: 30px;
  }
  .container .main{
    height: 95%;
    overflow: auto;
    width: 100%;
    background-color:rgb(243, 240, 240);
    padding: 20px 20px 90px 20px;
    box-sizing: border-box;
  }
  .container .main .common{
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .container .main .btn{
    cursor: pointer;
    width: 100%;
    padding: 14px;
    background-color: #04BE02;
    color: #fff;
    font-size: 16px;
  }
  .err{
    color: red;
  }
  .iconfont {
    margin-right: 20px;
  }
  .iconfont.icon-renshu{
    margin-right: 15px;
  }
</style>