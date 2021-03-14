<template>
  <div>
    志愿者排名
    {{msg}}
  </div>
</template>

<script>
import { bindTypeAndGet, login } from '../../network/peopleRequest.js'

export default {
  name:"Rank",
  data(){
    return{
      msg:''
    }
  },
  created() {
    bindTypeAndGet(this.$findType.image, 11110, '你好啊')
    login({sId:"180102010301", password:"123s456"}).then(res => console.log(res))
  }
}
</script>

<style scoped>

</style>