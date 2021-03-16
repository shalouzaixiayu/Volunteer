<template>
  <div class="home">
    <!-- 导航 -->
    <home-nav-bar />
    <!-- 轮播图 -->
    <home-slider />
    <div class="cl"></div>
    <!-- 小提示 -->
    <home-tip/>
    <!-- 随便加入的信息群 -->
    
    <div class="addpadding"></div>
    
  </div>
</template>

<script>
import HomeNavBar from "./HomeCom/HomeNavBar.vue";
import HomeSlider from "./HomeCom/HomeSlider";
import HomeTip  from './HomeCom/HomeTip';
export default {
  components: {
    HomeNavBar,
    HomeSlider,
    HomeTip,
  },
  name: "Home",
};
</script>

<style scoped>
.home {
  width: 100vw;
  overflow: hidden;
  min-height: 100vh;
  background-color:#f3f2f2;
}
.bg2{
  width: 100%;
  height: 120px;
}
.addpadding{
  padding-bottom: 100px;
}
.cl{
  height: 0;
  width: 0;
  border: 20px solid transparent;
  border-bottom-color: rgb(209, 78, 68);
  transform: translateY(10px);
}
</style>