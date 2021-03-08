<template>
  <div>
    <!-- 导航 -->
    <tab-bar>
      <tab-bar-item v-for="item in pathList" :key="item" :path="item.pathTo">
        <template #itemIco>
            <img :src="item.ico" alt="" />
        </template>
        <template #itemIcoActive>
            <img :src="item.activeIco" alt="" />
        </template>
        <template #itemText>
          <span>{{ item.name }}</span>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "../common/Tabbar/TabBar.vue";
import TabBarItem from "../common/Tabbar/TabBarItem.vue";

export default {
  components: { TabBar, TabBarItem },
  name: "AppTabBar",
  data() {
    return {
      pathList: [
        {
          name: "首页",
          pathTo: "/home",
          ico: require("../../assets/img/tabbarImg/home.png"),
          activeIco: require("../../assets/img/tabbarImg/homeA.png"),
        },
        {
          name: "活动列表",
          pathTo: "/activeList",
          ico: require("../../assets/img/tabbarImg/list.png"),
          activeIco: require("../../assets/img/tabbarImg/listA.png"),
        },
        {
          name: "排名",
          pathTo: "/rank",
          ico: require("../../assets/img/tabbarImg/rankfill.png"),
          activeIco: require("../../assets/img/tabbarImg/rankfillA.png"),
        },
        {
          name: "我的",
          pathTo: "/me",
          ico: require("../../assets/img/tabbarImg/my.png"),
          activeIco: require("../../assets/img/tabbarImg/myA.png"),
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>