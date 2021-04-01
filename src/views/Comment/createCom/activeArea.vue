<template>
  <div class="item">
      <textarea class="intro" name="" id=""  rows="15" placeholder="这一刻的想法" v-model="msg" @blur="blurHandle"></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    blurHandle() {
      this.$emit('text', this.msg)
    }
  }
}
</script>

<style scoped>
  .item .intro{
    width: 100%;
    resize: none
  }
</style>