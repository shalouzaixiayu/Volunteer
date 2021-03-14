<template>
  <div class="home">
    <!-- 导航 -->
    <home-nav-bar/>
    
    <img class="bg2" src="@/assets/img/homeSlider.jpg"  alt="">
    
  </div>
</template>

<script>
import HomeNavBar from './HomeCom/HomeNavBar.vue'
export default {
  components: { HomeNavBar },
  name:"Home"
}
</script>

<style scoped>
  .home{
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
  }
  .bg2{
    width:100%;
  }
</style>