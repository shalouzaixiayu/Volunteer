<template>
  <div class="home">
    <!-- 导航 -->
    <home-nav-bar />
    <img class="bg2" src="https://lh3.googleusercontent.com/proxy/eDHlXjiJDso4eWv6HHCJFeTM2-Cr2VUq38FnmmENz02wcw-JjYCmiqbgPT-uWW24Lx-NOn09amLZml4ZBUy3JNkjKgzmLtBZ74kX"  alt="">
    <!-- 轮播图 -->
    <home-slider />
    <!-- 小提示 -->
<<<<<<< HEAD
    <home-tip/>
=======
    <!-- <home-tip/> -->
>>>>>>> pug

  </div>
</template>

<script>
import HomeNavBar from "./HomeCom/HomeNavBar.vue";
import HomeSlider from "./HomeCom/HomeSlider";
<<<<<<< HEAD
import HomeTip  from './HomeCom/HomeTip';
=======
// import HomeTip  from './HomeCom/HomeTip';
>>>>>>> pug
export default {
  components: {
    HomeNavBar,
    HomeSlider,
<<<<<<< HEAD
    HomeTip,
=======
    // HomeTip,
>>>>>>> pug
  },
  name: "Home",
};
</script>

<style scoped>
.home {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color:#fff;
}
.bg2{
  width: 100%;
  height: 120px;
}
</style>