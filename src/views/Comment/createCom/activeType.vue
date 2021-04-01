<template>
    <ul>
      <li :class="activeIndex===i?'active':''" v-for="(item, i) in list" :key="i" @click="choose(item, i)">{{item}}</li>
    </ul>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      list: ['睡觉', '吃饭', '学习', '植树', '其他']
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
    padding: 7px 26px;
    background-color: #fff;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .active{
    background-color: red;
    color: #fff;
  }
</style>