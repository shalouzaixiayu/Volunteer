<template>
  <div class="nav">
    <nav-bar>
      <template #left>
        <div class="back" @click="goback">
          <span>&lt;</span>
        </div>
      </template>
      <template #center>
        <span>活动详情</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/Navbar/NavBar.vue'

export default {
  name: "NewNav",
  components: {
    NavBar
  },
  methods: {
    goback(){
      this.$router.go(-1);
    }
  }
}
</script>
<style>
 .back span{
   font-size: 33px;
   line-height: 44px;
 }
</style>