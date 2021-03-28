<template>
  <div class="item">
    <h3><slot></slot></h3>
    <textarea class="intro" name="" id=""  rows="8" :placeholder="tip" v-model="msg" @blur="blurHandle"></textarea>
  </div>
</template>

<script>
export default {
  props: ['tip'],
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    blurHandle() {
      this.$emit('textBlur', this.msg)
    }
  }
}
</script>

<style scoped>
  .item h3{
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .item .intro{
    width: 100%;
    resize: none
  }
</style>