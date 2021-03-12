<template>
  <div>
    志愿者排名
    {{msg}}
  </div>
</template>

<script>
import { test } from '../../network/peopleRequest.js'

export default {
  name:"Rank",
  data(){
    return{
      msg:''
    }
  },
  created() {
    test().then(data => this.msg = data.data)
  }
}
</script>

<style scoped>

</style>