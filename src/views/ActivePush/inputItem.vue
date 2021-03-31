<template>
  <div class="item">
    <div class="left"><slot></slot></div>
    <div class="right">
      <input :type="type" v-model="msg" @blur="blurHandle">
    </div>
  </div>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    blurHandle() {
      this.$emit('myBlur', this.msg)
    }
  }
}
</script>

<style scoped>
  .item{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .item .left{
    flex: 1;
    font-weight: bold;
    box-sizing: border-box;
  }
  .item .right{
    flex: 3;
  }
  .item .right input{
    background-color:rgb(243, 240, 240);
    padding: 10px 5px 10px 15px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
  }
</style>