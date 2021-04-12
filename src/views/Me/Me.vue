<template>
  <div class="content">
    <!-- 头部区域 -->
    <div :class="[!$store.state.isLogin?'unloginbac':'', 'header']">
      <div class="hadlogin" v-if="$store.state.isLogin">
        <div class="bigimg">
          <img :src="$store.state.obj.headImg||$store.state.headPicList[picIndex]" alt="图片加载错误">
        </div>
        <div class="info">
          <img :src="$store.state.obj.headImg||$store.state.headPicList[picIndex]" alt="图片加载错误">
          <span class="text">{{$store.state.obj.sId}}</span>
        </div>
      </div>
      <div class="unlogin" @click="goLogin" v-else>
        <img src="../../../src/assets/img/headPics/unlogin.jpg" alt="">
        <span class="text">未登录</span>
      </div>
    </div>
    
    <!-- 我的区域 -->
    <div class="my common">
      <h4>我的</h4>
      <div class="signature box" @click="comments">
        <span class="left"><i class="iconfont icon-tubiaozhizuo-"></i>朋友圈</span>
        <span class="right">></span>
      </div>
      <div class="signature box" @click="showHandle('signature')">
        <span class="left"><i class="iconfont icon-qianming"></i>个性签名</span>
        <span class="content">{{$store.state.isLogin?$store.state.obj.bindAutograph:''}}</span>
        <span class="right">></span>
      </div>
      <div class="score box" @click="showHandle('score')">
        <span class="left"><i class="iconfont icon-jifen"></i>我的积分</span>
        <span class="right">></span>
      </div>
      <div class="imgs box" @click="showHandle('imgs')">
        <span class="left"><i class="iconfont icon-image"></i>绑定头像</span>
        <span class="right">></span>
      </div>
      <div class="comment box" @click="showHandle('comment')">
        <span class="left"><i class="iconfont icon-pinglun"></i>学习与评论</span>
        <span class="right">></span>
      </div>
      <div class="phone box" @click="showHandle('phone')">
        <span class="left"><i class="iconfont icon-shouji"></i>绑定手机</span>
        <span class="right">></span>
      </div>
    </div>
    <!-- 退出登录区域 -->
    <div class="out common" v-if="$store.state.isLogin" @click="logOut">
      <h4>设置</h4>
      <div class="box">
        <span class="left"><i class="iconfont icon-denglu"></i>退出登录</span>
        <span class="right">></span>
      </div>
    </div>
    <!-- 发布志愿者活动 -->
    <div class="admin common" v-if="$store.state.obj.isManager" @click="pushActive">
      <h4>后台</h4>
      <div class="loginadm box">
        <span class="left"><i class="iconfont icon-fabu"></i>发布志愿者活动</span>
        <span class="right">去发布 ></span>
      </div>
    </div>
    <!-- 后台模式区域 -->
    <div class="admin common" v-if="$store.state.obj.isManager" @click="goAdmin">
      <div class="loginadm box">
        <span class="left"><i class="iconfont icon-guanli"></i>后台模式</span>
        <span class="right">进入 ></span>
      </div>
    </div>
    <!-- 弹出吐司层区域 -->
    <b-toast class="toast">
      <!-- 绑定手机号区域 -->
      <div v-show="isBindPhone&&$store.state.isLogin" class="bindphone common">
        <h4>手机号绑定</h4>
        <input type="text" class="commoninput" placeholder="请输入手机号" v-model="phone">
        <p class="commonp">{{error}}</p>
        <button class="commonbutton" @click="bindPhoneHandle">绑定</button>
      </div>
      <!-- 上传图片区域 -->
      <div class="loadimg common" v-show="isLoadImg&&$store.state.isLogin&&$store.state.isLogin">
        <h4>绑定头像</h4>
        <input type="file" class="commoninput" placeholder="请上传图片" @change="loadImghandle">
        <p class="commonp">{{error}}</p>
        <ul>
          <li v-for="(item, i) in imageList" :key="i" @click="previewImg(i)">
            <img :src="item" alt="">
          </li>
        </ul>
        <button class="commonbutton" @click="subLoadImg">绑定</button>
      </div>
      <!-- 学习与评论区域 -->
      <div class="comment common" v-show="isComment&&$store.state.isLogin">
        <h4>学习与评论</h4>
        <ul>
          <li v-for="(item, i) in $store.state.obj.activeList" :key="i" @click="goComment(item.activeId)">
            <span class="left">{{item.comMsg}}</span>
            <span class="right">{{item.time}}</span>
          </li>
        </ul>
        <div class="nocomment" v-show="$store.state.obj.activeList?!$store.state.obj.activeList.length:true">还没有评论哦</div>
      </div>
      <!-- 我的签名 -->
      <div class="signature common" v-show="isSignature&&$store.state.isLogin">
        <h4>编辑签名</h4>
        <input type="text" class="commoninput" placeholder="请输入签名" v-model="signature">
        <button class="commonbutton" @click="pushSignature" >发布</button>
      </div>
      <!-- 我的积分 -->
      <div class="score common" v-show="isScore&&$store.state.isLogin">
        <h4>我的积分</h4>
        <p>当前积分为：{{$store.state.obj.point}}</p>
      </div>
      <!-- 未登录提示 -->
      <div class="unlogin" v-show="!$store.state.isLogin">
        你还未登录，请先登录
      </div>
    </b-toast>
    <!-- 通知小吐司层 -->
    <s-toast :class="{'red': isRed}" v-show="isSuccess">{{successStr}}</s-toast>
    <!-- 图片预览区域 -->
    <div class="previewimg" v-show="isPreviewImg">
      <img ref="img" :src="previewImgUrl" alt="" @click="closePreviewImg">
    </div>
  </div>
</template>

<script>
import SToast from '../../components/common/Toast/SToast.vue'
import BToast from '../../components/common/Toast/BToast.vue'
import { bindTypeAndGet, requestPeopleById, addHeadImgBysId } from '../../network/peopleRequest.js'
export default {
  components: { SToast, BToast },
  data() {
    return {
      // isAdmin: true,
      isBindPhone: true,
      isLoadImg: false,
      phone: this.$store.state.obj.phone,
      error: '',
      imageList: [],   // imageList最终渲染的图片列表
      successStr: '',
      isSuccess: false,
      isPreviewImg: false,
      previewImgUrl: '',
      picIndex:0,
      isComment: false,
      isSignature: false,
      signature: '',
      isScore: false,
      isRed: false,
      files: {}
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
    showHandle(type) {
      // 初始化响应数据
      this.$store.commit('changeToastStatus')
      this.isBindPhone = this.isLoadImg = this.isComment = this.isSignature = this.isScore = false
      this.error = ''
      this.phone = this.$store.state.obj.phone
      switch (type) {
        case 'phone':this.isBindPhone = true
          break;
        case 'imgs':this.isLoadImg = true
          break;
        case 'comment':this.isComment = true
          break;
        case 'signature': this.isSignature = true
          break
        // case 'study': this.isStudy = true
        //   break
        case 'score': this.isScore = true
          break
      }
    },


    // 绑定手机操作
    bindPhoneHandle() {
      // 匹配手机号的正则
      const phoneReg = /^[1][3|5|7|8][0-9]{9}$/
      if (!phoneReg.test(this.phone)) {
          this.error = '请输入正确的手机号'
          this.phone = ''
          return
      }
      bindTypeAndGet(this.$findType.phone, this.$store.state.obj._id, this.phone)
      .then(res => {
        if(res.data.status) {
          requestPeopleById(this.$store.state.obj._id).then(res2 => {
            const {data} = res2.data
            window.sessionStorage.setItem('userInfo', JSON.stringify(data[0]))
            this.$store.commit('loginStatus', data[0])
            this.success('绑定成功', false)
            this.$store.commit('changeToastStatus')
            this.isBindPhone = false
          })
        }
      })
    },


    // 上传图片 注：不能将第一次上传的图片再一次上传 即第二次不能重复第一次的操作，可能是这个input的规定
    loadImghandle(e) {
      this.error = ''
      this.imageList = []
      const {files} = e.srcElement
      this.files = files
      files.forEach(item => {
        const imgURL = window.URL.createObjectURL(item)
        this.imageList.push(imgURL)
      })
    },

    // 提交上传图片
    subLoadImg() {
      if(!this.imageList.length) {
        this.error = '请先选择图片在绑定'
        return
      }
      const formData = new FormData()
      for (const file of this.files) {
        formData.append("image", file)
      }
      // 上传头像接口 执行完成 之后刷新
      addHeadImgBysId(formData, this.$store.state.obj._id).then(res => {
        if(res.status == 200){
          this.success('上传成功', false);
          window.location.reload();
        }
      })

    },


    // 预览图片
    previewImg(i) {
      this.isPreviewImg = true
      this.previewImgUrl = this.imageList[i]
    },


    // 关闭图片预览
    closePreviewImg() {
      this.isPreviewImg = false
    },


    // 发布签名
    pushSignature() {
    // 请求接口改变签名
      bindTypeAndGet(this.$findType.autograph, this.$store.state.obj._id, this.signature)
      .then((res) => {
        if(res.data.status) {
          requestPeopleById(this.$store.state.obj._id).then(res2 => {
            const {data} = res2.data
            window.sessionStorage.setItem('userInfo', JSON.stringify(data[0]))
            this.$store.commit('loginStatus', data[0])
            this.success('发布成功', false)
            this.$store.commit('changeToastStatus')
          })
        }
      })
    },


    // 成功弹框函数
    success(value, isError) {
      this.isRed = isError
      this.successStr = value
      this.isSuccess = true
      setTimeout(() => {
        this.isSuccess = false
      },1000)
    },


    // 退出登录
    logOut() {
      this.$store.commit('switchLoginStatus')
      this.$store.commit('out')
      window.sessionStorage.setItem('userInfo', '')
      window.sessionStorage.setItem('picIndex', '')
    },


    // 后台模式
    goAdmin() {
      this.$router.push(
        {name:"BackEndView"}
      )
    },
    // 发布志愿者活动
    pushActive() {
      this.$router.push('/ActivePush')
    },

    // 跳转评论页面
    goComment(id) {
      this.$router.push({name: 'ActiveDetail', query: {id}})
      this.$store.commit('changeToastStatus')
    },

    // 去朋友圈
    comments() {
      if(!this.$store.state.isLogin){
        return this.success('请先登录', true)
      }
      this.$router.push('/ShowComs')
    }
  },
  created() {
    // 以下两行代码可让页面刷新依然保持登录状态
    const obj = window.sessionStorage.getItem('userInfo')?JSON.parse(window.sessionStorage.getItem('userInfo')):{}
    this.$store.commit('loginStatus', obj)
    this.picIndex = +window.sessionStorage.getItem('picIndex') || this.picIndex
    requestPeopleById(this.$store.state.obj._id).then(res => {
      if(!res.data.status) {
        return
      }
      window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.data[0]))
      this.$store.commit('loginStatus', res.data.data[0])
    })
  }
}
</script>

<style scoped>
  .red{
    color: red;
  }
  .previewimg{
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
  }
  .previewimg img{
    cursor: pointer;
    width: 100vw;
    height: 100vh;
  }
  .header{
    height: 30vh;
    position: relative;
  }
  .unloginbac {
    background-color: #a90000;
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
    cursor: pointer;
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
  }
  .common .signature.box .content{
    flex: 1;
    margin: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translateX(30px);
  }
  .common.score p{
    text-align: center;
  }
  .common .box{
    cursor: pointer;
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
    margin-top: 5px;
  }
  .my .box .left,
  .out .box .left{
    font-size: 14px;
  }
  .toast .common{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }
  .toast .common .commoninput{
    padding: 15px 15px 15px 20px;
    background-color: rgb(236, 233, 233);
    border-radius: 5px;
    box-shadow: 0 0 5px #fff inset;
  }
  .toast .common .commonp{
    color: red;
    margin-top: 9px;
    font-size: 12px;
    height: 12px;
  }
  .toast .common .commonbutton{
    cursor: pointer;
    padding: 15px;
    margin-top: 22px;
    background-color: #04BE02;
    border-radius: 5px;
    color: #fff;
  }
  .toast .common h4{
    color: #999;
    text-align: center;
    margin-bottom: 34px;
  }
  .toast .loadimg ul{
    display: flex;
    flex-wrap: wrap;
  }
  .toast .loadimg ul li{
    cursor: pointer;
    position: relative;
    margin-right: 12px;
  }
  .toast .loadimg ul li img{
    width: 45px;
    height: 45px;
    border-radius: 3px;
  }
  .toast .comment.common{
    margin-top: 0;
  }
  .toast .comment.common h4{
    margin-bottom: 18px;

  }
  .toast .comment ul{
    max-height: 306px;
    overflow: scroll;
    padding-right: 6px;
  }
  .toast .comment li{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .toast .comment li .left{
    flex: 1;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 20px;
  }
  .toast .comment li .right{
    margin-right: 10px;
  }
  .toast .unlogin{
    text-align: center;
    color: red;
  }
  .nocomment{
    text-align: center;
  }
  .iconfont{
    margin:0 20px 0 5px;
  }
</style>