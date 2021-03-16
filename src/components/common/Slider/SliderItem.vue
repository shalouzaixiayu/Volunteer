<template>
  <div class="sitem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SliderItem"
}
</script>

<style>
  .sitem{
    flex-shrink: 0;
    width: 100vw;
    height:200px;
  }
  .sitem img{
    width: 100%;  
    height: 100%;
  }
</style>