<template>
  <div>
    <slider>
      <slider-item v-for="(item, index) in sliderList" :key="index">
        <div @click="goActiveContent(index)">
          <img :src="item.image[0] || defaultImg" alt="" />
        </div>
      </slider-item>
    </slider>
  </div>
</template>

<script>
import { requestActiveList } from "../../../network/activeRequest";
import {
  Slider,
  SliderItem,
} from "../../../components/common/Slider/slider.js";
export default {
  name: "HomeSlider",
  components: {
    Slider,
    SliderItem,
  },
  computed: {
    defaultImg() {
      return require("../../../assets/img/defaultImg.jpg");
    },
  },
  data() {
    return {
      sliderList: [], // 轮播活动列表
    };
  },
  methods: {
    goActiveContent(index){
      const _id =  this.sliderList[index].id
      this.$router.push({
        name:"ActiveDetail",
        query:{
          id:_id
        }
      })
    }
  },
  created() {
    requestActiveList(3, 5).then((res) => (this.sliderList = res.data.data));
  },
};
</script>

<style>
</style>