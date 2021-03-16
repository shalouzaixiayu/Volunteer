<template>
  <div>
    <nav-bar>
      <template #left> 
        <span class="lt" @click="goback">&lt;</span>
      </template>
      <template #center>
        <span>活动详情</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/Navbar/NavBar.vue'

export default {
  components: { NavBar },
  name:"DetailNavbar",
  methods: {
    goback(){
      this.$router.go(-1);
    }  
  }
}
</script>

<style scoped>
  .lt{
    font-size: 30px;
    font-weight: 300;
    margin-left:-25px;
  }
</style>