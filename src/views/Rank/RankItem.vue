<template>
  <div class="item">
    <span class="index">{{i+1}}</span>
    <div class="img">
      <img :src="obj.headImg||'../../../src/assets/img/headPics/userimg.jpg'" alt="">
    </div>
    <div class="name">{{obj.name}}</div>
    <div class="score">{{obj.point}}</div>
  </div>
</template>

<script>

export default {
  name:"RankItem",
  props: ['obj', 'i']
}
</script>

<style scoped>
  .item{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid rgb(241, 239, 239);
  }
  .item .name{
    flex: 1;
  }
  .item .img img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 10px 0 20px;
  }
  .item .name{
    font-size: 14px;
    margin-right: 20px;
  }
  .item .score{
    font-size: 12px;
    color: #888;
  }
</style>