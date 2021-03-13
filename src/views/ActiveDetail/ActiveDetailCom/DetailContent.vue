<template>
  <div class="detail">
    <h1>{{ detailObj.title }}</h1>
    <div class="info">
      <span class="sponsor">{{ detailObj.sponsor }}</span>
      <span class="timer">{{ detailObj.timer }}</span>
    </div>

    <div class="content">
      <p v-for="(p, pIndex) in detailObj.content"
        :key="pIndex">
        {{p}}
        <img :src="detailObj.image[pIndex] || defaultImg" 
          v-show="pIndex < 3 ">
      </p>
    </div>
    <div class="addSreenHeight"></div>
  </div>
</template>

<script>
export default {
  name: "DetailContent",
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    defaultImg() {
      return require("../../../assets/img/defaultImg.jpg");
    },
  },
};
</script>

<style scoped>
  .detail{
    width: 100%;
    /* height: 100%; */
    margin: 20px 5px;
    color: #a90000;
    }
  .detail h1{
    opacity:1;
    font-size: 28px;
    font-weight: 500;
    text-align:center;
  }
  .info{
    text-align: center;
    font-size: 12px;
    margin: 12px;
  }
  .info .timer{
    margin-left: 8px;
  }
  .content p{
    opacity:.75;
    text-indent: 32px;
    line-height: 20px;
    font-size: 16px;
    /* padding: 0 3px; */
  }
  .content img{
    height: 350px;
    width: 350px;
    margin: 10px 5px;
  }
  .addSreenHeight{
    padding: 100px 0;
  }
</style>