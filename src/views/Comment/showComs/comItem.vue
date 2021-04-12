<template>
  <div class="item">
    <div class="left">
      <img :src="userObj.headImg" alt="">
    </div>
    <div class="right">
      <h4 class="user">{{userObj.name}}</h4>
      <p class="text">{{obj.sendContent}}</p>
      <ul class="img">
        <li v-for="(item, i) in obj.sendImg" :key="i">
          <img :src="item" alt="" @click="prew(item)" >
        </li>
      </ul>
      <div class="opt">
        <span class="time">{{obj.sendTimer.slice(0, 10)}}</span>
        <div class="discuss" @click="showToast">
          <i  class="iconfont icon-dian"></i>
          <div class="opttoast" v-show="isShowToast">
            <span class="left" @click.stop="likeHanle"><i class="iconfont icon-aixin"></i>{{isLike?'赞':'取消'}}</span>
            <span class="left" @click.stop="commentHandle"><i class="iconfont icon-pinglun"></i>评论</span>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="like" v-show="likeList.length">
          <i class="iconfont icon-aixin"></i>
          <span v-for="(item, i) in likeList" :key="i">{{item}}</span>
        </div>
        <ul class="comments">
        <li v-for="(item, i) in comList" :key="i">
          <span class="from">{{item.name}}：</span>
          <span class="contents">{{item.content}}</span>
        </li>
      </ul>
      </div>
    </div>
    <!-- 吐司 -->
    <div class="toastcontainer" v-show="isShow" @click.self="isShow=false">
      <div class="toast">
        <div class="common">
          <h4>评论</h4>
          <textarea class="commoninput"  rows="10" placeholder="请输入评论" v-model="comment"></textarea>
          <button class="commonbutton" @click="pushComment" >发表</button>
        </div>
      </div>
    </div>
    <div class="imgprew" v-show="isBigImg" @click="isBigImg=false">
      <img :src="url" alt="">
    </div>
  </div>
</template>

<script>
import { requestPeopleById } from '../../../network/peopleRequest.js'
import { giveLikeOrCancel, giveContent } from '../../../network/talkRequest.js'
export default {
  props: ['obj'],
  data() {
    return {
      comment: '',
      isLike: true,
      isShowToast: false,
      userObj: {},
      likeList: [],
      comList: [],
      isShow: false,
      timer: null,
      isBigImg: false,
      url: ''
    }
  },
  methods: {
    // 弹出点赞吐司
    showToast() {
      this.isShowToast = !this.isShowToast
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isShowToast = false
      }, 2000)
    },
    // 点赞处理
    likeHanle() {
      clearTimeout(this.timer)
      const _id = this.obj._id
      const pId = this.$store.state.obj._id
      const mode = this.isLike
      giveLikeOrCancel(_id, mode, pId).then(res => {
        const { data } = res
        if(!data.status) {
          return
        }
        if(mode) {
          this.likeList.push(this.$store.state.obj.name)
        } else {
          const i = this.likeList.findIndex(item => item == this.$store.state.obj.name)
          this.likeList.splice(i, 1)
        }
        this.isLike = !this.isLike
        this.close()
      })
    },

    // 评论处理
    commentHandle() {
      clearTimeout(this.timer)
      this.isShow =true
      this.close()
    },

    // 发表评论
    pushComment() {
      if(!this.comment.trim()) {
        return
      }
      const _id = this.obj._id
      const pId = this.$store.state.obj._id
      const content = this.comment
      giveContent(_id, pId, content).then(res => {
        const { data } = res
        if(!data.status) {
          return
        }
        this.comList.push({
          name: this.$store.state.obj.name,
          content 
        })
      })
      this.isShow = false
      this.comment = ''
    },
    
    // 关闭点赞吐司
    close() {
      setTimeout(() => {
        this.isShowToast = false
      }, 500)
    },

    // 获取用户
    findUserById(_id, cb) {
      requestPeopleById(_id).then(res => {
        const {data} = res
        if(data.status) {
          cb(data)
        }
    })
    },

    prew(url) {
      this.isBigImg = true
      this.url = url
    }
  },
  created() {
    // 获取头像名字
    this.findUserById(this.obj.sendId, data => {
      this.userObj = data.data[0]
    })
    // 获取点赞名字
    this.obj.giveLike.forEach(item => {
      this.findUserById(item, data => {
        this.likeList.push(data.data[0].name)
        if(data.data[0].name == this.$store.state.obj.name) {
          this.isLike = false
        }
      })
    })
    // 获取评论名字
    this.obj.giveContent.forEach(item => {
      this.findUserById(item.pId, data => {
        this.comList.push({name: data.data[0].name, content: item.content})
      })
    })
  }
}
</script>

<style scoped>
  .item{
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
  }
  .item .right{
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
  .item .left img{
    width: 60px;
    height: 60px;
    border-radius: 6px;
  }
  .item .right .user{
    color:rgb(32, 74, 151);
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .item .right .text{
    word-break:break-all;
    line-height: 1.5;
  }
  .item .right .img{
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .item .right .img img{
    width: 119px;
    height: 119px;
    margin-right: 3px;
    margin-bottom: 3px;
  }
  .item .right .opt{
    margin: 10px 0;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item .right .opt .time{
    color: #666;
  }
  .item .right .opt .discuss{
    padding: 5px 10px;
    border-radius: 5px;
    background-color: rgb(235, 235, 235);
    cursor: pointer;
    position: relative;
  }
  .item .right .opt .discuss .opttoast{
    width: 100px;
    display: flex;
    position: absolute;
    right: 36px;
    top: -5px;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, .9);
    border-radius: 5px;
    color: #fff;
  }
  .item .right .box{
    background-color: rgb(235, 235, 235);
    border-radius: 5px;
    font-size: 14px;
  }
  .item .right .comments li{
    line-height: 1.4;
    margin-bottom: 5px;
    padding: 4px 8px;
    word-break:break-all;
  }
  .item .right .comments li .from{
    font-weight: bold;
    color: rgb(32, 74, 151);
  }
  .item .right .box .like{
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
    padding: 4px 8px 6px 8px;
    color: rgb(32, 74, 151);
    font-weight: bold;
    line-height: 1.4;
  }
  .item .right .box .like .iconfont,
  .item .right .box .like span{
    margin-right: 5px;
  }
  .item .right .box .like span::after{
    content: ', ';
  }
  .item .right .box .like span:last-child::after{
    content: '';
  }
  .iconfont{
    font-size: 13px;
    margin-right: 5px;
  }
  .common{
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }
  .common .commoninput{
    padding: 15px;
    box-sizing: border-box;
    background-color: rgb(247, 247, 247);
    border-radius: 5px;
    box-shadow: 0 0 5px #fff inset;
    resize: none;
  }
  .common .commonbutton{
    cursor: pointer;
    padding: 15px;
    margin-top: 22px;
    background-color: #04BE02;
    border-radius: 5px;
    color: #fff;
  }
  .common h4{
    color: #999;
    text-align: center;
    margin-bottom: 15px;
  }
  .toastcontainer{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    width: 750px;
    height: 100vh;
    background-color: rgba(0, 0, 0, .3);
    z-index: 99;
  }
  .toastcontainer .toast{
    width: 80%;
    max-height: 400px;
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
  .imgprew{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .96);
    text-align: center;
    z-index: 100;
  }
  .imgprew img{
    height: 100%;
  }
</style>