<template>
  <div class="actives">
    <!-- 导航 -->
    <active-navbar @goBack2Before="goBack2Before" />
    <!-- 注释 -->
    <div class="note" v-show="showNote">
      <transition appear name="note">
        <span>{{ note }}</span>
      </transition>
    </div>
    <!-- 搜索框 -->
    <search
      ref="activeSearch"
      @activeSearch="activeSearch"
      @newSearch="newSearch"
    />

    <!-- 切换活动状态 -->
    <div class="toggleActive">
      <div
        v-for="(item, index) in ActiveType"
        :key="index"
        :class="{ active: index === currentType }"
        @click="toggleActive(index)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="content">
      <!-- 活动列表 现在要判断 是新的 还是已有的 -->
      <template v-if="currentType === 1">
        <active-item v-for="item in activeList" :key="item" :item="item" />
      </template>

      <template v-if="currentType === 0">
        <!-- 当没数据的时候显示这个  -->
        <error v-if="NewActiveList.length === 0" />
        <!-- 如果有数据就显示下面的 -->
        <template v-if="NewActiveList.length !== 0">
          <new-item v-for="item in NewActiveList" :key="item" :item="item" />
        </template>
      </template>

      <!-- 如果点击我的活动 跳转到我的活动界面  -->
      <template v-if="currentType === 2">
        <about-me>
          <!-- 如果没有登陆 -->
        </about-me>
      </template>

      <!-- 下一页 -->
      <footer class="foot">
        <div
          class="previous"
          v-show="currentPage !== nextPage"
          @click="changeThisPage(-1)"
        >
          <span>上一页</span>
        </div>
        <div class="next" @click="changeThisPage(1)">
          <span>下一页</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Search from "../../components/common/Search/Search";

import { requestActiveList } from "../../network/activeRequest";
import { getAllNewActive } from "../../network/newRequest";

import ActiveNavbar from "./ActiveListCom/ActiveNavbar";
import ActiveItem from "./ActiveListCom/ActiveItem";
import Error from "./ActiveListCom/Error";

import NewItem from "../NewActive/NewItem";
import AboutMe from "../NewActive/AboutMe";
// import NewActive from '../NewActive/NewActive';

export default {
  name: "ActiveList",
  components: {
    ActiveNavbar,
    ActiveItem,
    Search,
    Error,
    NewItem, // 新的item组件
    AboutMe, //  我的活动野蛮
  },
  data() {
    return {
      showNote: false,
      note: "PS:以下志愿者活动由爬虫代码得来，仅仅作为项目需求，无其他用处！",
      activeList: [], // 已有活动列表
      currentPage: 5, // 当前页
      currentCount: 10, // 最大数
      currentPage1: 0, //  新的活动当前页
      currentCount1: 10, // 新的活动最大数
      nextPage: 5, // 下一页
      nextPage1: 0, //  新的活动下一页
      NewActiveList: [], //  新创建的活动
      ActiveType: ["正在筹备", "以往内容", "我的活动"], //  活动类型 用于切换状态
      currentType: 1, //  现在是以往内容
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
    // requestActiveList(1, 20).then(res => console.log(res))

    this.GetAllNewActive(this.currentPage1, this.currentCount1);
  },
  updated() {
    setTimeout(() => (this.showNote = false), 6500);
    // this.GetAllNewActive(this.currentPage1, this.currentCount1);
  },
  methods: {
    // 请求原有的活动列表
    RequestActiveList(currentPage, currentCount) {
      requestActiveList(currentPage, currentCount).then(
        (res) => (this.activeList = res.data.data)
      );
    },
    // 请求新的活动列表
    GetAllNewActive(currentPage1, currentCount1) {
      getAllNewActive(currentPage1, currentCount1).then(
        (res) => (this.NewActiveList = res.data.data)
      );
    },

    activeSearch(obj) {
      // 更改活动列表
      if (obj.status && obj.type == "active") {
        this.activeList = obj.data.data;
      }
    },
    newSearch(obj) {
      //
      console.log(obj);
      // 更改新创建的活动列表
      this.NewActiveList = obj;
    },
    goBack2Before() {
      this.RequestActiveList(this.currentPage, this.currentCount);
    },
    // 上一页 && 下一页
    changeThisPage(page) {
      if (this.currentType === 1) {
        this.nextPage = this.nextPage + parseInt(page);
        this.RequestActiveList(this.nextPage, this.currentCount);
        // 移动到最上面
        document.querySelector(".content").scrollTo(0, 0);
      } else {
        this.nextPage1 = this.nextPage1 + parseInt(page);
        this.GetAllNewActive(this.nextPage1, this.currentCount1);
        // 移动到最上面
        document.querySelector(".content").scrollTo(0, 0);
      }
    },
    // 切换当前活动状态
    toggleActive(index) {
      this.currentType = index;
      // 同步刷新列表
      if (this.currentType === 0) {
        // 更改搜索框的搜索路径
        this.$refs.activeSearch.changeType("nowActive");
        this.GetAllNewActive(this.currentPage1, this.currentCount1);
      } else if (this.currentType == 1) {
        this.RequestActiveList(this.currentPage, this.currentCount);
        // 更改搜索框的对象
        this.$refs.activeSearch.changeType("active");
      }
    },
  },
};
</script>

<style scoped>
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
.toggleActive {
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
  transform: translateY(-10px);
  font-size: 16px;
  color: #a90000;
  cursor: pointer;
}
.toggleActive div {
  padding: 10px;
  margin-right: 10px;
  background-color: #fff;
  opacity: 0.8;
}
.toggleActive div.active {
  background-color: #a90000;
  color: #fff;
}
.foot {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  padding-bottom: 40px;
  cursor: pointer;
}
.foot .next,
.foot .previous {
  margin: 0 10px;
}
.content {
  height: calc(100vh - 219px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>