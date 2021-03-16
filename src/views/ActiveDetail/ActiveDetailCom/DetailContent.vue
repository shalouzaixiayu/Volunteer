<template>
  <div class="detail">
    <h1>{{ detailObj.title || sliderProps.title }}</h1>
    <div class="info">
      <span class="sponsor">{{
        detailObj.sponsor || sliderProps.sponsor
      }}</span>
      <span class="timer">{{ detailObj.timer || sliderProps.timer }}</span>
    </div>

    <div class="content">
      <p
        v-show="sliderProps.id > 0"
        v-for="(p, pIndex) in sliderProps.content"
        :key="pIndex"
      >
        {{ p }}
        <img
          :src="sliderProps.image[pIndex] || defaultImg"
          v-show="pIndex < 2"
        />
      </p>

      <p
        v-for="(p, pIndex) in detailObj.content"
        :key="pIndex"
        v-show="detailObj.id > 0"
      >
        {{ p }}
        <img :src="detailObj.image[pIndex] || defaultImg" v-show="pIndex < 2" />
      </p>
    </div>
    <!-- 点赞 -->
    <div class="like" @click="handleEvent('like')">
      <span>{{ likeMsg }}</span>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <textarea
        v-model.lazy="comMsg"
        autofocus
        cols="40"
        rows="10"
        placeholder="阅读完成试着评论哟！"
      ></textarea>
    </div>
    <!-- 提交 -->
    <div class="like" @click="handleEvent('com')">
      <span>{{ sendMsg }}</span>
    </div>

    <!-- 跳转登陆 -->
    <div class="small" v-show="showSmall">
      <span class="tp">你还没登录哟！</span>
      <div class="like" @click="goLogin">
        <span>点击登录</span>
      </div>
    </div>
    <div class="addSreenHeight"></div>
  </div>
</template>

<script>
import { searchActiveById } from "../../../network/activeRequest.js";
import { bindTypeAndGet } from "../../../network/peopleRequest";

export default {
  name: "DetailContent",
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      likeMsg: "向他们学习",
      sendMsg: "提交评论",
      comMsg: "",
      showSmall: false,
      sliderProps: {}, // 轮播跳转对象
    };
  },
  computed: {
    defaultImg() {
      return require("../../../assets/img/defaultImg.jpg");
    },
  },
  methods: {
    handleEvent(type) {
      if (!this.$store.state.isLogin) {
        this.showSmall = !this.showSmall;
        setTimeout(() => {
          this.showSmall = !this.showSmall;
        }, 2000);
      } else {
        const id = this.$store.state.obj._id;
        // const id = "604f2e06f086391848e2e365";
        if (type === "like") {
          bindTypeAndGet(this.$findType.study, id, {
            activeId: this.detailObj.id,
            comMsg: "什么都没评论哟！"
          }).then((res) => {
            this.likeMsg = res.data.status ? "我已经学习" : this.likeMsg;
            // console.log(res.data) // 没这个值
          });
          // 添加学习记录 加分
        } else if (type === "com") {
          // 添加评论记录  加分
          bindTypeAndGet(this.$findType.comment, id, {
            activeId: this.detailObj.id,
            comMsg: this.comMsg,
          }).then(res => {
            this.sendMsg = res.data.status ? "提交成功" : this.sendMsg;
            // console.log(res)  // 这个有问题
          });
        }
      }
    },
    goLogin() {
      // 跳转登陆  传入id
      this.$router.push({ name: "Login", query: { id: this.detailObj.id } });
    },
    // 请求轮播跳转对象
    getSliderProps() {
      const sliderId = this.$route.query.id || 0;
      console.log(sliderId + '活动详情')
      searchActiveById(sliderId).then((res) => {
        this.sliderProps = { ...res.data.data[0] };
      });
    },
  },
  created() {
    this.getSliderProps();
  },
};
</script>

<style scoped>
.detail {
  width: 100%;
  /* height: 100%; */
  margin: 20px 5px;
  color: #a90000;
}
.detail h1 {
  opacity: 1;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
}
.info {
  text-align: center;
  font-size: 12px;
  margin: 12px;
}
.info .timer {
  margin-left: 8px;
}
.content p {
  opacity: 0.75;
  text-indent: 32px;
  line-height: 20px;
  font-size: 16px;
  /* padding: 0 3px; */
}
.content img {
  height: 350px;
  width: 350px;
  margin: 10px 5px;
}
.addSreenHeight {
  padding: 80px 0;
}
.like {
  margin: 20px 0;
  text-align: center;
}
.like span {
  background-color: rgba(169, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  font-size: 14px;
  line-height: 14px;
  border-radius: 12px;
}
.comment {
  margin: 30px 0;
  overflow-y: auto;
  text-align: center;
}
.comment textarea {
  border: 1px solid #ccc;
  resize: none;
}
.small {
  z-index: 99;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40%;
  padding: 5px;
  background-color: rgba(1, 1, 1, 0.1);
  border-radius: 5px;
  height: 100px;
  width: 200px;
  text-align: center;
  margin-top: 10px;
}
.small span {
  color: #000;
  font-size: 14px;
  font-weight: 450;
}
.small .tp {
  display: inline-block;
  margin-top: 15px;
}
.small .like span {
  color: #fff;
}
</style>