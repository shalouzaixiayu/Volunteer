<template>
  <div class="success"><slot></slot></div>
</template>

<script>
export default {
  name:"SamllToast"
}
</script>

<style scoped>
  .success{
    z-index: 99;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    padding: 5px;
    background-color: #fff;
    box-shadow: 0 0 3px #ccc;
    border-radius: 5px;
    font-weight: bold;
    color: #04BE02;
  }
</style>