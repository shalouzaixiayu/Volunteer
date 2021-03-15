<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav-bar>
      <template #center>志愿者排名</template>
    </nav-bar>
    <div class="container">
      <!-- 前三名 -->
      <rank-head :list="list"></rank-head>
      <!-- 四名之后 -->
      <div class="main">
        <rank-item
          v-for="(item, i) in list"
          :key="item.id"
          :obj="item"
          :i="i"
          v-show="i > 2"
        ></rank-item>
      </div>
    </div>
  </div>
</template>

<script>
import {
  bindTypeAndGet,
  login,
  register,
} from "../../network/peopleRequest.js";

import RankHead from "./RankHeader.vue";
import RankItem from "./RankItem.vue";
import NavBar from "../../components/common/Navbar/NavBar.vue";
export default {
  components: { RankItem, RankHead, NavBar },
  name: "Rank",
  data() {
    return {
      list: [
        { name: "张三", point: 20, id: 1 },
        { name: "李四", point: 29, id: 2 },
        { name: "王五", point: 23, id: 3 },
        { name: "赵六", point: 22, id: 4 },
        { name: "aaa", point: 27, id: 5 },
        { name: "bbb", point: 9, id: 6 },
        { name: "ccc", point: 10, id: 7 },
        { name: "ddd", point: 5, id: 8 },
        { name: "eee", point: 17, id: 9 },
        { name: "fff", point: 14, id: 10 },
      ],
    };
  },
  methods: {
    // 排名方法
    filter() {
      this.list.sort(function (a, b) {
        return b.point - a.point;
      });
      // console.log(this.list);
    },
  },
  created() {
    bindTypeAndGet(this.$findType.image, 11110, "你好啊");
    login({ sId: "180102010302", password: "123456" });
    register({
      name: "王五帅",
      sId: "180102010310",
      class: "计科三班",
      faculty: "计算机信息工程",
      password: "123445",
    }).then((res) => console.log(res));
    this.filter();
  },
};
</script>

<style scoped>
.container {
  padding-bottom: 50px;
  height: 85vh;
  display: flex;
  flex-direction: column;
}
.container .main {
  flex: 1;
  overflow: auto;
}
</style>