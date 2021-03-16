<template>
  <div class="detail">
    <!-- 导航 -->
    <detail-navbar/>
    <!-- 内容 -->
    <detail-content :detailObj="obj"/>

  </div>
</template>

<script>
import {searchActiveById} from '../../network/activeRequest';

import DetailNavbar from './ActiveDetailCom/DeatilNavbar';
import DetailContent from './ActiveDetailCom/DetailContent';
export default {
  name:"ActiveDetail",
  components:{
    DetailNavbar,
    DetailContent
  },
  data(){
    return{
      id: this.$route.params.id || 0,
      obj: {},   // 传入的对象
    }  
  },
  created(){
    searchActiveById(this.id).then(data => {
      this.obj = {...{...data.data.data}[0]}
    })
  
  },
  methods:{

  }

}
</script>

<style scoped>
  .detail{
    /* height: 280vh; */
    width: 100vw;
    overflow: hidden;
  }
</style>