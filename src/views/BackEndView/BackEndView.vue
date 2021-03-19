<template>
  <div class="end">
    <div class="bg">
      <!-- 管理信息 -->
      <back-info
        :AllPeople="AllPeople"
        class="info"
        title="成员操作"
      />
      <back-active
        :Allactive="Allactive"
        class="info2" 
        title="活动操作"
      />
    </div>
  </div>
</template>

<script>
import { requestAllPeople } from "../../network/peopleRequest";
import { requestActiveList } from "../../network/activeRequest";

import BackInfo from "./BackEndViewCom/BackInfo";
import BackActive from "./BackEndViewCom/BackActive";

export default {
  name: "BackEndView",
  components: {
    BackInfo,
    BackActive,
  },
  data() {
    return {
      AllPeople: [], // 默认人数
      Allactive: [], // 活动
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
  },
  methods: {
    // layer() {
    //   this.change = !this.change;
    // },
  },
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
  background: url("~@/assets/img/htbg.jpg");
  background-size: 100% 100%;
  position: relative;
}
.info {
  position: absolute;
  top: 40%;
  left: 2%;
}
.info2 {
  position: absolute;
  top: 45%;
  left: 2%;
}
.changeInfo {
  position: absolute;
  top: 70%;
  left: 2%;
}
</style>