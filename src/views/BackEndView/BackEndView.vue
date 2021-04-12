<template>
  <div class="end">
    <div class="bg">
      <!-- 管理信息 -->
      <back-info :AllPeople="AllPeople" class="info"
        title="成员操作"/>
      <back-active :Allactive="Allactive" class="info2" 
        title="活动操作" />
      <back-enter :Allenter="Allenter" class="info3" 
        title="审核操作"/>

    </div>
  </div>
</template>

<script>
import { requestAllPeople } from "../../network/peopleRequest";
import { requestActiveList } from "../../network/activeRequest";
// 请求所有创建的活动
import {getAllNewActive} from '../../network/newRequest';


import BackInfo from "./BackEndViewCom/BackInfo";
import BackActive from "./BackEndViewCom/BackActive";
import BackEnter from './BackEndViewCom/BackEnter';

export default {
  name: "BackEndView",
  components: {
    BackInfo,
    BackActive,
    BackEnter,
  },
  data() {
    return {
      AllPeople: [], // 默认人数
      Allactive: [], // 活动
      Allenter:[], // 创建参加的活动
      change: false,
    };
  },
  created() {
    requestAllPeople().then((res) => {
      if (res.status === 200) {
        this.AllPeople = res.data;
      }
    }),
    requestActiveList(2, 40).then((res) => {
      if (res.status === 200) {
        this.Allactive = res.data.data;
      }
    });
    getAllNewActive(0, 30).then((res) => {
      if(res.status === 200){
        this.Allenter = res.data.data;
      }
    })

  },
  methods: {
   
  },
};
</script>

<style scoped>
.end {
  overflow-x: hidden;
  overflow-y: auto;
}
.bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(left top, #e2d8d9,#e2d8d9);

}
.info {
  position: absolute;
  top: 10%;
  left: 2%;
}
.info2 {
  position: absolute;
  top: 20%;
  left: 2%;
}
.info3 {
  position: absolute;
  top: 25%;
  left: 2%;
}

</style>