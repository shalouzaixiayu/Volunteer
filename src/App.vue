<template>
  <div>
    <router-view v-slot="{Component}"> 
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
</style>