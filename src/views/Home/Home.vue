<template>
  <div class="home">
    <!-- 导航 -->
    <home-nav-bar />
    <!-- 轮播图 -->
    <home-slider />
    <div class="content">
      <div class="cl"></div>
      <!-- 小提示 -->
      <home-tip />
      <!-- 随便加入的信息群 -->
      <home-info :TypeList="list1" TypeTitle="志愿观察" />
      <home-info :TypeList="list2" TypeTitle="志愿快播" />

      <!-- 结尾标题 -->
      <div class="end">
        <img src="@/assets/logoko.png" alt="" />
        <div class="msg">
          <span>志愿者之家</span>
        </div>
      </div>
      <div class="github">{{ endMsg }}</div>

      <div class="addpadding"></div>
    </div>
  </div>
</template>

<script>
import HomeNavBar from "./HomeCom/HomeNavBar.vue";
import HomeSlider from "./HomeCom/HomeSlider";
import HomeTip from "./HomeCom/HomeTip";
import HomeInfo from "./HomeCom/HomeInfo";

import { requestActiveList } from "../../network/activeRequest";

export default {
  components: {
    HomeNavBar,
    HomeSlider,
    HomeTip,
    HomeInfo,
  },
  name: "Home",
  data() {
    return {
      list1: [], // 志愿观察
      list2: [], // 志愿快播
      endMsg: "GitHub@shalouzaixiayu && xiaoxiong-yg",
    };
  },
  created() {
    this._requestActiveList1(5, 10);
    this._requestActiveList2(2, 10);
  },
  methods: {
    _requestActiveList1(page, count) {
      requestActiveList(page, count).then((data) => {
        if (data.status) {
          this.list1 = data.data.data;
        }
      });
    },
    _requestActiveList2(page, count) {
      requestActiveList(page, count).then((data) => {
        if (data.status) {
          this.list2 = data.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
.home {
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  background-color: #f3f2f2;
}
.content{
  height: calc(100vh - 294px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding-left: 9px;
}
.bg2 {
  width: 100%;
  height: 120px;
}
.addpadding {
  padding-bottom: 80px;
}
.cl {
  height: 0;
  width: 0;
  border: 20px solid transparent;
  border-bottom-color: rgb(209, 78, 68);
  transform: translateY(10px);
}
.end {
  text-align: center;
}
.end img {
  transform: translateX(-20px);
}
.end .msg {
  background-color: rgb(243, 242, 242);
  height: 100px;
  line-height: 100px;
  width: 100%;
  transform: translateY(-40px);
  text-align: center;
}
.end .msg span {
  font-family: "华文行楷";
  color: rgb(209, 78, 68);
  font-size: 45px;
  border-bottom: 3px double;
}
.github {
  font-size: 12px;
  text-align: center;
  color: rgb(209, 78, 68);
  border-bottom: 1px solid;
  padding-bottom: 40px;
}
</style>