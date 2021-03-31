<template>
  <div class="newDetail">
    <!-- 导航 -->
    <new-nav/>
    <!-- 活动内容  可以参加之类的东西   -->
    <new-info :id="id"/>
  </div>
</template>

<script>
import NewNav from './NewNav';
import NewInfo from  './NewInfo';
export default {
  name: "NewDetail",
  components: {
    NewNav,
    NewInfo
  },
  data(){
    return{
       id: "",
    }
  },
  created(){
    this.id = this.$route.query.id
  }
}
</script>
<style>

</style>