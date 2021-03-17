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
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  flex-direction:row;
  background-color: rgb(243, 242, 242);
  justify-content: space-evenly;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, .5);
  width:100vw;
}
</style>