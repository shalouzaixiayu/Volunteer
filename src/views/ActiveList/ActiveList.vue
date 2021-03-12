<template>
  <div>
    <!-- 导航 -->
    <active-navbar />
    <!-- 注释 -->
    <div class="note" v-show="showNote">
      <transition appear name="note">
        <span>{{ note }}</span>
      </transition>
    </div>
    <!-- 活动列表 -->
    

  </div>
</template>

<script>
// import {requestActiveList} from '../../network/activeRequest';
import ActiveNavbar from "./ActiveListCom/ActiveNavbar";
export default {
  name: "ActiveList",
  components: {
    ActiveNavbar,
  },
  mounted() {
    this.showNote = true;
  },
  created() {
    // requestActiveList(1, 20).then(res => console.log(res))
  },
  data() {
    return {
      showNote: false,
      note:
        "PS:以下志愿者活动由爬虫代码得来，仅仅作为比赛需求，无其他用处！",
    };
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
  transition: all 8s ease;
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
</style>