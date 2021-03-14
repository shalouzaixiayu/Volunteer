<template>
  <div class="content">
    <div :class="['item',i==0?'first':'',i==1?'second':'',i==2?'third':'']" v-for="(item, i) in list" :key="item.id" v-show="i < 3">
      <span class="index">{{i+1}}</span>
      <div class="img">
        <img src="../../../src/assets/img/headPics/userimg.jpg" alt="">
      </div>
      <div class="name">{{item.name}}</div>
      <div class="score">{{item.point}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name:"RankItem",
  props: ['list']
}
</script>

<style scoped>
  .content{
    padding-bottom: 10px;
    display: flex;
    border-bottom: 6px solid rgb(241, 239, 239);
    position: relative;
    height: 207px;
  }
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0 22px 0;
    justify-content: flex-end;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    flex: 1;
  }
  .item .index{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 43%;
    width: 15px;
    height: 15px;
    line-height: 15px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    border-radius: 50%;
  }
  .item.first .index{
    top: 47%;
    width: 20px;
    height: 20px;
    line-height: 20px;
    background-color: rgb(218, 218, 4);
    font-size: 14px;
  }
  .item.second .index{
    background-color: orangered;
  }
  .item.third .index{
    background-color: green;
  }
  .item.first{
    left: 50%;
    transform: translateX(-50%);
    flex: 2;
  }
  .item.second{
    left: 23px;
  }
  .item.third{
    right: 23px;
  }
  .item.first .img img{
    width: 100px;
    height: 100px;
  }
  .item .img img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .item .name{
    font-size: 16px;
    margin: 10px 0 20px 0;
  }
  .item .score{
    font-size: 18px;
    color: skyblue;
  }
</style>