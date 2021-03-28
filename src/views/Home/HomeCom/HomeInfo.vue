<template>
  <div class="info">
    <span class="title">{{ TypeTitle }}</span>
    <div
      v-for="(item, index) in TypeList"
      :key="index"
      class="item"
      @click="goCon(item.id)"
    >
      <div class="bj"></div>
      <span class="stitle">{{ item.title }}</span>
      <span class="timer">{{ filterTimer(item.timer) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeInfo",
  props: {
    TypeList: {
      // 类型数列
      type: Array,
      default() {
        return [];
      },
    },
    TypeTitle: {
      // 类型标题
      type: String,
      default: "",
    },
  },
  methods: {
    filterTimer(value) {
      return value.substring(0, 10);
    },
    goCon(id) {
      this.$router.push({
        name: "ActiveDetail",
        query: {
          id,
          from: "Home",
        },
      });
    },
  },
};
</script>

<style scoped>
.info {
  margin: 10px 5px;
  color: rgb(205, 105, 105);
  text-align: left;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(235, 173, 170);
}
.info .title {
  display: inline-block;
  font-size: 24px;
  margin: 20px 10px;
  border-bottom: 1px solid rgb(235, 173, 170);
  border-right: 1px solid rgb(235, 173, 170);
  padding: 10px;
}
.info .item {
  padding: 10px;
  cursor: pointer;
}
.info .stitle {
  font-size: 14px;
}
.info .bj {
  display: inline-block;
  width: 0px;
  height: 0px;
  border: 5px solid transparent;
  border-left-color: rgb(235, 173, 170);
}
.info .timer {
  float: right;
  font-size: 12px;
  transform: translateY(5px);
}
</style>