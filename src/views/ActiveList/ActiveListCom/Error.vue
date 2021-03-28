<template>
  <div id="err">
    <span>什么都没有哟！等待活动的发布中....</span>
  </div>
</template>

<script>
export default {
  name:"Error"
}
</script>

<style scoped>
  #err{
    width: 100%;
    height: 500px;
    text-align: center;
    line-height: 500px;
  }
  #err span{
    font-size: 18px;
    color: #999;
  }
  #err span::before{
    content: "/(ㄒoㄒ)/~~  ";
  }
</style>