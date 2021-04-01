<template>
  <div class="content">
    <!-- 顶部导航栏 -->
    <nav-bar class="top">
      <template #left>
        <span class="back" @click="backHandle">&lt;</span>
      </template>
      <template #center>
        朋友圈
      </template>
      <template #right>
        <span class="push" @click="goCreate">发布</span>
      </template>
    </nav-bar>
    <div class="main">
      <com-item></com-item>
      <com-item></com-item>
      <com-item></com-item>
      <com-item></com-item>
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/common/Navbar/NavBar.vue'
import ComItem from './comItem.vue'
export default {
  components: { NavBar, ComItem },
  methods: {

    backHandle() {
      this.$router.go(-1)
    },

    // 去发布
    goCreate() {
      this.$router.push('/CreateCom')
    }
  },
  created() {
    const obj = window.sessionStorage.getItem('userInfo')?JSON.parse(window.sessionStorage.getItem('userInfo')):{}
    this.$store.commit('loginStatus', obj)
  }
}
</script>

<style scoped>
  .content{
    overflow: hidden;
    position: relative;
    z-index: 99;
    background: rgb(240, 240, 240);
    padding-bottom: 40px;
    box-sizing: border-box;
  }
  .top{
    /* position: relative; */
  }
  .back{
    font-size: 30px;
    /* position: absolute; */
    /* left: 30px; */
    cursor: pointer;
    
  }
  .top .push{
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
  .main{
    height: 95%;
    overflow: auto;
  }
</style>