<template>
  <div class="actives">
    <!-- 导航 -->
    <active-navbar  @goBack2Before="goBack2Before"/>
    <!-- 注释 -->
    <div class="note" v-show="showNote">
      <transition appear name="note">
        <span>{{ note }}</span>
      </transition>
    </div>
    <!-- 搜索框 -->
    <search ref="activeSearch" @activeSearch="activeSearch" />

    <!-- 活动列表 -->
    <active-item v-for="item in activeList" :key="item" :item="item" />

    <!-- 下一页 -->
    <footer class="foot">
      <div class="previous" v-show="currentPage !== nextPage" @click="changeThisPage(-1)">
        <span>上一页</span>
      </div>
      <div class="next" @click="changeThisPage(1)">
        <span>下一页</span>
      </div>
    </footer>
    
  </div>
</template>

<script>
import Search from "../../components/common/Search/Search";

import { requestActiveList } from "../../network/activeRequest";

import ActiveNavbar from "./ActiveListCom/ActiveNavbar";
import ActiveItem from "./ActiveListCom/ActiveItem";

export default {
  name: "ActiveList",
  components: {
    ActiveNavbar,
    ActiveItem,
    Search,
  },
  data() {
    return {
      showNote: false,
      note: "PS:以下志愿者活动由爬虫代码得来，仅仅作为项目需求，无其他用处！",
      activeList: [], // 活动列表
      currentPage: 5, // 当前页
      currentCount: 10, // 最大数
      nextPage: 5, // 下一页
    };
  },
  mounted() {
    this.showNote = true;

    // 更改搜索框的对象
    this.$refs.activeSearch.changeType("active");

  },
  created() {
    // 请求活动列表
    this.RequestActiveList(this.currentPage, this.currentCount);
  },
  updated() {
    setTimeout(() => (this.showNote = false), 6500);
  },
  methods: {
    RequestActiveList(currentPage, currentCount) {
      requestActiveList(currentPage, currentCount).then(
        (res) => (this.activeList = res.data.data)
      );
    },
    activeSearch(obj) {
      // 更改活动列表
      if (obj.status && obj.type == "active") {
        this.activeList = obj.data.data;
      }
    },
    goBack2Before(){
      this.RequestActiveList(this.currentPage, this.currentCount);
    },
    // 上一页 && 下一页
    changeThisPage(page) {
      this.nextPage = this.nextPage + parseInt(page)
      this.RequestActiveList(this.nextPage, this.currentCount)
      window.scrollTo(0, 0)
    },
  },
};
</script>

<style scoped>
.actives {
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 260vh;
}
.note-enter-from,
.note-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
.note-enter-active {
  transition: all 6s ease;
}
.note {
  margin: 10px 0;
  overflow: auto;
  font-size: 10px;
}
.note span {
  display: inline-block;
  color: #f0813c;
  white-space: nowrap;
  margin-bottom: 10px;
}
.foot {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.foot .next,
.foot .previous {
  margin: 0 10px;
}
</style>