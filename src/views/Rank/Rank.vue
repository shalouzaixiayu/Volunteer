<template>
  <div>
    志愿者排名
    {{msg}}
  </div>
</template>

<script>
import { bindTypeAndGet, login, register } from '../../network/peopleRequest.js'

export default {
  name:"Rank",
  data(){
    return{
      msg:''
    }
  },
  created() {
    bindTypeAndGet(this.$findType.image, 11110, '你好啊')
    login({sId:"180102010302", password:"123456"})
    register({name:"王大帅", sId:'180102010306', class:"计科三班", faculty:'计算机信息工程',
    password:"123445"}).then(res => console.log(res))
  }
}
</script>

<style scoped>

</style>