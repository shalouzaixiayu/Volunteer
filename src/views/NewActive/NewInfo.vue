<template>
  <div class="info">
    <div class="one">
      <div class="title">主题: {{ obj.activeThema }}</div>
      <section class="pz">
        <div>
          举办人: <span>{{ obj.activeManager }}</span>
        </div>
        <div>
          创建时间:<span>{{
            obj.activeTimer && obj.activeTimer.split("T")[0]
          }}</span>
        </div>
      </section>
    </div>
    <div class="two">
      <div class="js">
        <span>活动介绍:</span>
        <p>
          {{ obj.activeIntroduce }}
        </p>
        <div class="bz">
          <span>活动备注:</span>
          <span>{{ obj.activeBZ }}</span>
        </div>
      </div>
      <img v-for="img in obj.activeImage" :key="img" :src="img" title="活动"  class="showImg"/>
    </div>

    <div class="three">
      <ul>
        <li>
          <span>预计人数:</span>
          <span>{{ obj.activeNumber }}</span>
        </li>
        <li>
          <span>预定地点: </span>
          <span>{{ obj.activeAddress }}</span>
        </li>
        <li>
          <span>已参加人数: </span>
          <span>{{ obj.activeProposer && obj.activeProposer.length }}</span>
        </li>
      </ul>
    </div>
    <!-- 我要参加 -->
    <div class="enter" @click="handleEvent">
      <span>我要参加</span>
    </div>

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
import { searchNewById, enterActive } from "../../network/newRequest";
import { addPointById } from "../../network/peopleRequest";
export default {
  name: "NewInfo",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      obj: {}, // 当前 活动 id 对象
      showSmall: false, // 是否显示状态信息
      msg: "你还没登录哟！",
    };
  },
  created() {
    searchNewById(this.id).then((res) => (this.obj = res.data && res.data[0]));
  },
  methods: {
    // 跳转登陆  传入id
    goLogin() {
      this.$router.push({
        name: "Login",
        query: { id: this.obj._id, from: "NewDetail" },
      });
    },
    handleEvent() {
      if (!this.$store.state.isLogin) {
        this.showSmall = !this.showSmall;
        setTimeout(() => {
          this.showSmall = !this.showSmall;
        }, 3000);
        // 利用浏览器来记录
        const obj = window.sessionStorage.getItem("userInfo")
          ? JSON.parse(Window.sessionStorage.getItem("userInfo"))
          : {};
        this.$store.commit("loginStatus", obj);
      } else {
        // NewDetail
        // 参加  然后  进入 审核状态
        // 然后进行状态的更改
        this.msg = "已参加\n等待审核...";
        this.showSmall = !this.showSmall;

        // 发送事件 去审核这个活动
        enterActive(this.obj._id, this.$store.state.obj._id).then((res) => {
          if (res.data.status) {
            // 如果成功
            this.obj = res.data.data;

            // 加分逻辑
            addPointById(this.$store.state.obj._id, 5, (data) => {
              if (data) {
              console.log(data)
              }
              
            });
              window.location.reload();
          }
        });

        setTimeout(() => {
          this.showSmall = !this.showSmall;
        }, 2200);
      }
    },
  },
};
</script>

<style scoped>
.info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.one,
.two,
.three {
  flex: 1;
  height: 200px;
}
.one .title {
  font-size: 40px;
  color: #ba3333;
  margin-bottom: 20px;
}
.one .pz {
  display: flex;
  font-size: 12px;
  color: #ba3333;
  opacity: 0.6;
  justify-content: space-around;
}
.two {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.two .js {
  color: #ba3333;
  opacity: 0.8;
  font-size: 22px;
  margin: 8px 0;
}
.two .js p {
  margin-top: 10px;
  line-height: 34px;
  padding: 5px;
  text-indent: 20px;
}
.two img {
  margin-top: 20px;
  width: 100%;
}
.two .js .bz {
  opacity: 0.99;
  margin-top: 40px;
  font-size: 14px;
  line-height: 24px;
}
.two .js .bz span:nth-child(2) {
  margin: 0 30px;
}
.three ul {
  margin-top: 30px;
  display: flex;
}
.three ul li {
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: 300;
  width: 230px;
  height: 50px;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.4;
}
.three ul li:nth-child(1) {
  border-right: 3px solid #e4e4e4;
}
.three ul li:hover {
  color: #fff;
  background-color: #ba3333;
}
.three ul li span {
  margin-left: 20px;
}
.enter {
  margin-top: 40px;
  padding-bottom: 200px;
}
.enter span {
  display: block;
  text-align: center;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: all 0.4;
}
.enter span:hover {
  background-color: #ba3333;
  color: #fff;
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
  cursor: pointer;
}

</style>