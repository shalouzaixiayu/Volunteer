<template>
  <div class="info">
    <div class="title">
      <span class="iconfont icon-chuli1">{{ title }}</span>
      <span class="len iconfont icon-renshu"
        >总人数: {{ AllPeople.length }}</span
      >
    </div>

    <table class="tb">
      <tr class="oddrowcolor">
        <th>昵称</th>
        <th>学号</th>
        <th>是否为管理员</th>
        <th>更多操作</th>
      </tr>
      <tr
        v-for="(item, i) in AllPeople"
        :key="i"
        :class="{ oddrowcolor: i % 2 !== 0 ? true : false }"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.sId }}</td>
        <td>{{ item.isManager ? "是" : "否" }}</td>
        <td class="iconfont icon-chuli3" @click="showMore(item)"></td>
      </tr>
    </table>
    <!-- 模块框 -->
    <transition  class="mt" appear>
      <div v-show="showMt">
        <span @click="showMt = false">关闭</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "BackInfo",
  props: {
    kind: {
      // 操作的种类
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    AllPeople: {
      //  全部的人
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showMt: false,
    };
  },
  methods: {
    showMore(item) {
      this.showMt = true;
      console.log(item);
      return;
    },
  },
};
</script>

<style scoped>
.info {
  padding: 5px;
  font-size: 14px;
  width: 100vw;
  margin-bottom: 30px;
  position: relative;
}
.info .title {
  height: 20px;
  line-height: 20px;
  width: 80%;
}
.info .title .len {
  float: right;
}
table.tb {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
  text-align: center;
  margin: 20px 0;
}
table.tb th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
table.tb td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
}
.oddrowcolor {
  background-color: #d4e3e5;
}
.evenrowcolor {
  background-color: #c3dde0;
}
.mt {
  width: 90%;
  height: 300px;
  background-color: rgba(1, 1, 1, 0.4);
  position: absolute;
  top: 10px;
  left: 1%;
  border-radius: 15px;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.v-enter-active {
  animation: bounce-in .5s ease-out both;
}

.v-leave-active {
  animation: bounce-in .5s reverse ease-in both;
}
</style>