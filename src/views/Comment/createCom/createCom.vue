<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <nav-bar class="top">
      <template #left>
        <span class="back" @click="backHandle">&lt;</span>
      </template>
      <template #center>
        发布朋友圈
      </template>
    </nav-bar>
    <div class="main">
      <div class="top">
        <active-type @type='chooseType'></active-type>
      </div>
      <div class="text common">
        <active-area @text='textHandle'></active-area>
      </div>
      <div class="imgLoad common">
        <img-item @myChange="imgHandle"></img-item>
      </div>
      <button class="btn" @click="sub">发布</button>
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/common/Navbar/NavBar.vue'
import ActiveType from './activeType.vue'
import ActiveArea from './activeArea.vue'
import ImgItem from '../../ActivePush/imgItem.vue'
export default {
  components: { NavBar, ActiveType, ActiveArea, ImgItem },
  data() {
    return {
      files: {},
      textContent: '',
      type: ''
    }
  },
  methods: {

    backHandle() {
      this.$router.go(-1)
    },

    // 选择类型
    chooseType(e) {
      console.log(e)
    },

    // 文本处理
    textHandle(e) {
      console.log(e)
    },

    // 图片处理
    imgHandle(files) {
      console.log(files)
      this.files = files
    },

    // 发布
    sub() {
      const {headImg, name} = this.$store.state.obj
      console.log(headImg, name)
    }
  },
  created() {
    const obj = window.sessionStorage.getItem('userInfo')?JSON.parse(window.sessionStorage.getItem('userInfo')):{}
    this.$store.commit('loginStatus', obj)
  }
}
</script>

<style scoped>
  .container{
    overflow: hidden;
    position: relative;
    z-index: 99;
    background: #fff;
    padding-bottom: 40px;
    box-sizing: border-box;
  }
  .top{
    position: relative;
  }
  .top .back{
    position: absolute;
    left: 30px;
    cursor: pointer;
  }
  .main {
    height: 95%;
    overflow: auto;
  }
  .main .top{
    background: rgb(218, 218, 218);
    padding: 15px 20px 5px 20px;
  }
  .main .common{
    padding: 25px;
    border-bottom: 1px solid #ccc;
  }
  .main .btn{
    cursor: pointer;
    width: 100%;
    padding: 14px;
    background-color: #04BE02;
    color: #fff;
    font-size: 16px;
    margin-top: 50px;
  }
</style>