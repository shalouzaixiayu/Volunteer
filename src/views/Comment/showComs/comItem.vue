<template>
  <div class="item">
    <div class="left">
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3359744892,2081027568&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="right">
      <h4 class="user">我是一只小猪</h4>
      <p class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
      <ul class="img">
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3359744892,2081027568&fm=26&gp=0.jpg" alt="">
        </li>
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3359744892,2081027568&fm=26&gp=0.jpg" alt="">
        </li>
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3359744892,2081027568&fm=26&gp=0.jpg" alt="">
        </li>
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3359744892,2081027568&fm=26&gp=0.jpg" alt="">
        </li>
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3359744892,2081027568&fm=26&gp=0.jpg" alt="">
        </li>
        <li>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3359744892,2081027568&fm=26&gp=0.jpg" alt="">
        </li>
      </ul>
      <div class="opt">
        <span class="time">2021-01-01</span>
        <div class="discuss" >
          <i @click="showToast" class="iconfont icon-dian"></i>
          <div class="opttoast" v-show="isShowToast">
            <span class="left" @click="likeHanle"><i class="iconfont icon-aixin"></i>{{str}}</span>
            <span class="left" @click="commentHandle"><i class="iconfont icon-pinglun"></i>评论</span>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="like">
          <i class="iconfont icon-aixin"></i>
          <span>张三</span>
          <span>张三</span>
          <span>张三</span>
          <span>张三</span>
          <span>张三</span>
        </div>
        <ul class="comments">
        <li>
          <span class="from">张三：</span>
          <span class="contents">你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒</span>
        </li>
        <li>
          <span class="from">张三：</span>
          <span class="contents">你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒</span>
        </li>
        <li>
          <span class="from">张三：</span>
          <span class="contents">你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒你很棒</span>
        </li>
      </ul>
      </div>
    </div>
    <!-- 吐司 -->
    <b-toast>
      <div class="common">
        <h4>评论</h4>
        <input type="text" class="commoninput" placeholder="请输入评论" v-model="comment">
        <button class="commonbutton" @click="pushComment" >发表</button>
      </div>
    </b-toast>
  </div>
</template>

<script>
import BToast from '../../../components/common/Toast/BToast.vue'
export default {
  components: { BToast },
  data() {
    return {
      comment: '',
      str: '赞',
      isShowToast: false
    }
  },
  methods: {
    // 弹出点赞吐司
    showToast() {
      this.isShowToast = !this.isShowToast
    },
    // 点赞处理
    likeHanle() {
      this.str = this.str === '赞' ? '取消' : '赞' 
      this.close()

    },

    // 评论处理
    commentHandle() {
      this.$store.commit('changeToastStatus')
      this.close()
    },

    // 发表评论
    pushComment() {
      this.$store.commit('changeToastStatus')
    },
    
    // 关闭点赞吐司
    close() {
      setTimeout(() => {
        this.isShowToast = false
      }, 500)
    }
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
    padding: 15px 15px 15px 20px;
    background-color: rgb(236, 233, 233);
    border-radius: 5px;
    box-shadow: 0 0 5px #fff inset;
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
    margin-bottom: 34px;
  }
</style>