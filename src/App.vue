<template>
  <div>
    <router-view v-slot="{Component}" class="body">  
      <keep-alive include="ActiveList">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <app-tab-bar/>
  </div>
</template> 

<script>
import AppTabBar from "./components/content/AppTabBar.vue";
export default {
  components: { AppTabBar },
  data(){
    return{
      Component: this.$route.meta.isActive === true ? true: false
    }
  }
};
</script>

<style scoped>
  .body{
    min-width: 320px;
    max-width:750px;
    height: 100vh;
    margin: 0 auto;
    overflow-x:hidden;
  }
</style>