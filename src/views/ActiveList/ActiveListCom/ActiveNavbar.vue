<template>
  <div>
    <!-- 导航 -->
    <nav-bar>
      <template #center>
        <span>{{ msg }}</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/Navbar/NavBar.vue";
export default {
  name: "ActiveNavbar",
  components: {
    NavBar
  },
  computed: {
    msg(){
      return this.$route.meta.title;
    }  
  }
};
</script>

<style>
</style>