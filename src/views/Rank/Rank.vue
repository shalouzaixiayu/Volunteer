<template>
  <div>
    志愿者排名
    {{msg}}
  </div>
</template>

<script>
import { bindType, login } from '../../network/peopleRequest.js'

export default {
  name:"Rank",
  data(){
    return{
      msg:''
    }
  },
  created() {
    bindType(this.$findType.image, 11110, '你好啊')
    login({sId:180102010301, password:123456}).then(res => console.log(res))
  }
}
</script>

<style scoped>

</style>