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
        <active-type :list='activeThemaList' @type='chooseType'></active-type>
      </div>
      <div class="text common">
        <active-area @text='textHandle'></active-area>
      </div>
      <div class="imgLoad common">
        <img-item @myChange="imgHandle"></img-item>
      </div>
      <button class="btn" @click="sub">发布</button>
    </div>
    <s-toast class="err" v-show="isErr">{{errString}}</s-toast>
  </div>
</template>

<script>
import NavBar from '../../../components/common/Navbar/NavBar.vue'
import ActiveType from './activeType.vue'
import ActiveArea from './activeArea.vue'
import ImgItem from '../../ActivePush/imgItem.vue'
import SToast from '../../../components/common/Toast/SToast.vue'
import { sendTalk, sendTalkImg } from '../../../network/talkRequest.js'
import { getAllNewActive } from '../../../network/newRequest.js'
// import {addPointById} from '../../../network/peopleRequest';
export default {
  components: { NavBar, ActiveType, ActiveArea, ImgItem, SToast },
  data() {
    return {
      files: {},
      activeThemaList: [],
      sendContent: '',
      withActive: '',
      isErr: false,
      errString: '',
    }
  },
  methods: {

    backHandle() {
      this.$router.go(-1)
    },

    // 选择类型
    chooseType(e) {
      this.withActive = e
    },

    // 文本处理
    textHandle(e) {
      this.sendContent = e
    },

    // 图片处理
    imgHandle(files) {
      this.files = files
    },

    // 发布
    sub() {
      let flag = true
      const {_id} = this.$store.state.obj
      if(!this.sendContent.trim()) {
        return this.err('请填写完整')
      }
      sendTalk({
        sendId: _id,
        sendContent: this.sendContent,
        withActive: this.withActive
      }).then(res => {
        const {data} = res
        const id = data.data._id
        if(!data.status) {
          return this.err('发布失败')
        }
        if(this.files.length) {
          flag = false
          const formData = new FormData()
          for (const file of this.files) {
            formData.append("image", file)
          }
          sendTalkImg(formData, id).then(res => {
            const {data} = res
            if(!data.status) {
              return this.err('图片上传失败')
            }
            flag = true
            return this.$router.go(-1)
          })
        }
        // 加分逻辑

        if(flag) {
          this.$router.go(-1)
        }
      })
    },
    // 错误提示
     err(value) {
      this.errString = value
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      },1000)
    }
  },
  created() {
    const obj = window.sessionStorage.getItem('userInfo')?JSON.parse(window.sessionStorage.getItem('userInfo')):{}
    this.$store.commit('loginStatus', obj)
    getAllNewActive(0, 10).then(res => {
      const {data} = res
      if(!data.status) {
        return
      }
      this.activeThemaList = data.data
      this.withActive = data.data[0].activeThema
    })
  }
}
</script>

<style scoped>
  .err{
    color: red;
  }
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
    font-size: 30px;
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