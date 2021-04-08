<template>
  <div>
    <!-- 关于我的页面 -->
    <div v-show="showSmall">你还未登陆....</div>
    <div
      class="tip"
      v-show="enterList.length === 0 && !showSmall"
      @click="showME"
    >
      点我刷新...
    </div>

    <!-- 做一个列表 展示现在的状态 -->
    <ul class="zlist">
      <li v-for="item in enterList" :key="item" @click="goActive(item._id)"> 
        <div>活动主题:  {{item.activeThema}}</div>
        <div>管理人:  {{item.activeManager}}</div>
        <!-- 活动状态 -->
        <div class="status" v-for="(pp, index) in item.activeProposer"  :key="index">
          <span v-if="pp.sId === pId">
            {{changestatus(pp.status)}}
          </span>
        </div>
      </li>
    </ul>

    <!-- 跳转登陆 -->
    <div class="small" v-show="showSmall">
      <span class="tp">{{ msg }}</span>
      <div class="like" @click="goLogin" v-show="!$store.state.isLogin">
        <span>点击登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { compareMe } from "../../network/newRequest";
export default {
  name: "AboutMe",
  data() {
    return {
      showSmall: false, // 是否显示
      msg: "", // 弹出信息
      enterList: [], //  参加的活动列表
      pId: "", // 志愿id
    };
  },
  created() {
    //  进行状态判断
    if (!this.$store.state.isLogin) {
      this.showSmall = !this.showSmall;
    }
  },
  methods: {
    // 点击加载数据
    showME() {
      //  获得志愿id
      this.pId = this.$store.state.obj._id;
      compareMe(this.pId).then(res => {
        // console.log(res)
        if (res.data.status){
          this.enterList = res.data.data;
        }
      });
    },
    // 跳转登陆  传入id
    goLogin() {
      this.$router.push({
        name: "Login",
        query: { from: "AboutMe" },
      });
      this.showSmall = !this.showSmall;
    },
    // 状态更改
    changestatus(status){
      switch (status){
        case "pending":
          return '等待中...';
        case 'fulfilled':
          return '审核通过';
        case 'rejected':
          return '审核失败';
        default:
          return '未知错误'
      }
    },
    // 活动跳转回去
    goActive(_id){
      this.$router.push({
        name:"NewDetail",
        params: {
          _id
        }
      })
    }
  },
};
</script>

<style scoped>
.tip {
  cursor: pointer;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #eee;
  transition: all 0.4;
}
/* 状态信息 */
.small {
  z-index: 20;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20%;
  background-color: rgba(1, 1, 1, 0.1);
  padding-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
}
.small span {
  color: #000;
  font-size: 18px;
  font-weight: 550;
  padding: 20px;
}
.small .tp {
  display: inline-block;
  margin-top: 15px;
}
.small .like span {
  color: #f00;
  opacity: 0.5;
  cursor: pointer;
}
.zlist{
  padding: 30px;
}
.zlist li {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: rgba(1, 1, 1, 0.1);
  margin-bottom: 2px;
  cursor: pointer;
  transition: all .6s;
}
.zlist li div:nth-child(1){
  width:40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.zlist li div:nth-child(2){
  width:30%;
}
.zlist li div:nth-child(3){
  width:30%;
}
.zlist li:hover{
  /* color: #fff; */
  background-color: rgba(1, 1, 1, 0.3);
}
</style>