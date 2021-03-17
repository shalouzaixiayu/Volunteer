<template>
  <div class="end">
    <div class="bg">
      <!-- 管理信息 -->
      <back-info  :AllPeople="AllPeople"
      class="info" title="成员操作"/>
    </div>
  </div>
</template>

<script>
import {requestAllPeople} from '../../network/peopleRequest';

import BackInfo from "./BackEndViewCom/BackInfo";

export default {
  name: "BackEndView",
  components: {
    BackInfo,
  },
  data(){
    return{
      AllPeople:[],  // 默认人数  
    }
  },
  created() {
    requestAllPeople().then(res => {
      if(res.status === 200){
        this.AllPeople  = res.data
      }
    })
  }
};
</script>

<style scoped>
.end {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.bg {
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/htbg.jpg');
  background-size: 100% 100%;
  position: relative;
}
.info{
  position: absolute;
  top:40%;
  left: 2%;
}
</style>