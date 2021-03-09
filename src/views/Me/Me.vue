<template>
  <div>
    我的
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '我是me组件'
    }
  },
  created() {
    console.log(this.msg)
  }
}
</script>

<style scoped>

</style>