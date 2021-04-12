<template>
    <ul>
      <li :class="activeIndex===i?'active':''" v-for="(item, i) in list" :key="i" @click="choose(item.activeThema, i)">{{item.activeThema}}</li>
    </ul>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    choose(value, i) {
      this.activeIndex = i
      this.$emit('type', value)
    }
  }
}
</script>

<style scoped>
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  ul li{
    width: 18%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding:0 5px;
    box-sizing: border-box;
  }
  .active{
    background-color: red;
    color: #fff;
  }
</style>