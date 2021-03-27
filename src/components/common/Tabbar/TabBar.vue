<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>
<style scoped>
.tabbar{
  min-width:320px;
  max-height:750px;
  width: 750px;
  position:fixed;
  left:50%;
  bottom:0;
  transform: translateX(-50%);
  display:flex;
  flex-direction:row;
  background-color: rgb(243, 242, 242);
  justify-content: space-evenly;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, .5);
}
</style>