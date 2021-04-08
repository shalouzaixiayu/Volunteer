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
     //重新请求这个id活动
    if(this.$route.params._id){
      this.id = this.$route.params._id
      // console.log(this.$route.params._id)
    }
  }
}
</script>
<style>

</style>