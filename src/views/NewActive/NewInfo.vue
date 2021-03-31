<template>
  <div class="info">
    {{id}}
  </div>
</template>

<script>
import {searchNewById} from '../../network/newRequest';
export default {
  name: "NewInfo",
  props: {
    id:{
      type:String,
      default: ""
    }
  },
  data(){
    return{
      obj:{},   // 当前 活动 id 对象
    }
  },
  created() {
    searchNewById(this.id).then(res => this.obj = res.data && res.data[0])
  }
}
</script>

<style scoped>

</style>