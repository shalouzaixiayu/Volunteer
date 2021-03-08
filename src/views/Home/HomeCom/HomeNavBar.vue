<template>
  <div>
    <nav-bar>
      <template #center>
        <span>{{title}}</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/Navbar/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  name: "HomeNavBar",
  data(){
    return{
      title: this.$route.meta.title
    }
  }
};
</script>

<style>
</style>