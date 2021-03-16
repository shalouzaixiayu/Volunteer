<template>
  <div class="navBar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:"NavBar"
}
</script>

<style scoped>
  .navBar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #c82519;  
    opacity: .8;
    color:#fff;
    justify-content: center;
  }
  .left, .right{
    width: 25%;
  }
  .center{
    flex: 1;
    text-align: center;
  }
</style>