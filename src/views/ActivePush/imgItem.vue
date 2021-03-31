<template>
  <div class="item">
    <h3><slot>活动图片</slot></h3>
    <div class="content">
      <div class="box">
        <div class="show">
          <i class="iconfont icon-image"></i>
          <span>活动图片</span>
        </div>
        <input type="file"  placeholder="请上传图片" multiple @change="loadImghandle">
      </div>
      <ul>
          <li v-for="(item, i) in imgList" :key="i" >
            <img :src="item" alt="">
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: []
    }
  },
  methods: {
    loadImghandle(e) {
      this.imgList = []
      // const {files} = e.srcElement
      const {files} = e.target;
      files.forEach(item => {
        const imgURL = window.URL.createObjectURL(item)
        this.imgList.push(imgURL)
      })
      this.$emit('myChange', files)
    }
  }
}
</script>

<style scoped>
  .item h3{
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .content{
    display: flex;
  }
  .content ul{
    display: flex;
    margin-left: 20px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 7px;
  }
  .content ul li{
    cursor: pointer;
    position: relative;
    margin-right: 12px;
  }
  .content ul li img{
    width: 60px;
    height: 60px;
    border-radius: 3px;
  }
  .item .box{
    width: 70px;
    height: 70px;
    position: relative;
    margin-bottom: 10px;
  }
  .item .box .show{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(243, 240, 240);
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    color: #999;
    font-size: 12px;
  }
  .item .box input{
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .iconfont{
    font-size: 37px;
  }
</style>