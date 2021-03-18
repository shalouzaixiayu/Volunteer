<template>
  <div class="info">
    <div class="title" @click="showTb">
      <span class="iconfont icon-chuli1">{{ title }}</span>
      <span class="len iconfont icon-renshu"
        >总数: {{ Allactive.length }}</span
      >
    </div>
    <div id="tb" v-show="isShowTb">
      <table class="tb">
        <tr class="oddrowcolor">
          <th>标题</th>
          <th>组织</th>
          <th>时间</th>
          <th>更多操作</th>
        </tr>
        <tr
          v-for="(item, i) in Allactive"
          :key="i"
          :class="{ oddrowcolor: i % 2 !== 0 ? true : false }"
        >
          <td class="btWidth">{{ item.title }}</td>
          <td>{{ item.sponsor }}</td>
          <td>{{ item.timer }}</td>
          <td class="iconfont icon-chuli3" @click="showMore(item)"></td>
        </tr>
      </table>
    </div>
    <!-- 模块框 -->
    <div class="mt" v-show="showMt">
      <div class="changeInfo">
        <span class="iconfont icon-chuli1 one">{{ currentObj.title }}</span>
        <div v-for="(value, key) in currentObj" :key="key" class="change">
          <span class="title">{{ changeKey(key) }}: </span>
          <textarea v-if="key === 'content'" 
           v-model.lazy="currentObj[key]" cols="30" rows="10"></textarea>
          <input v-else type="text" v-model.lazy="currentObj[key]" />
        </div>
      </div>
      <footer>
        <span class="tip">修改之后就可以点击提交进行更改.</span>
        <div class="handle">
          <span @click="_updateActive">提交</span>
          <span @click="_deleteActive">删除</span>
          <span @click="showMt = false">关闭</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { updateActive, deleteActive } from "../../../network/activeRequest";
export default {
  name: "BackActive",
  props: {
    title: {
      type: String,
      default: "",
    },
    Allactive: {
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
      isShowTb: false,
      currentObj: {}, // 当前操作的活动
    };
  },
  methods: {
    showTb(){
      this.isShowTb = !this.isShowTb;
    },
    changeKey(key) {
      switch (key) {
        case 'id':
          return '序号'
        case "otherMsg":
          return "感受";
        case "sponsor":
          return "组织机构";
        case "timer":
          return "创建时间";
        case "title":
          return "标题";
        case "image":
          return "图片";
        case "content":
          return "内容";
        case "_id":
          return "ID";
        case "totalPeople":
          return "预计人数";
      }
    },
    showMore(item) {
      this.showMt = true;
      this.currentObj = item;
      return;
    },
    _updateActive(){
      updateActive(this.currentObj._id, this.currentObj).then(res => {
         if (res.data.status === true) {
          this.showMt = false;
          window.location.reload();
        }
      })
    },
    _deleteActive() {
      deleteActive(this.currentObj._id).then((res) => {
        if (res.data.status === true) {
          this.showMt = false;
          window.location.reload();
        }
      });
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

#tb{
  height: 39vh;
  overflow: auto;
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
  width: 70px;
  overflow:hidden
}
.oddrowcolor {
  background-color: #d4e3e5;
}
.evenrowcolor {
  background-color: #c3dde0;
}
.mt {
  width: 80%;
  height: 300px;
  background-color: rgba(1, 1, 1, 0.3);
  position: absolute;
  top: 10px;
  left: 5%;
  border-radius: 15px;
  z-index: 2;
  overflow: auto;
}
.changeInfo {
  padding: 10px;
  color: rgba(222, 222, 222);
}
.change textarea{
  resize: none;
  vertical-align: middle;
  background-color: rgba(222, 222, 222);
}
.changeInfo .one {
  font-size: 18px;
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.changeInfo .change {
  padding: 5px;
}
.changeInfo .change input {
  background-color: rgba(222, 222, 222);
  border-radius: 15px;
  text-align: center;
  width: 100px;
  transition: width 0.6s ease;
  font-size: 14px;
}
.changeInfo .change input:focus {
  width: 210px;
}
footer {
  color: rgba(222, 222, 222);
  text-align: center;
}
footer .tip {
  display: block;
  font-size: 12px;
  margin-bottom: 10px;
}
footer .tip:before {
  content: "提示: ";
}
footer .handle {
  padding-bottom: 40px;
  display: flex;
}
footer .handle span {
  color: #fff;
  opacity: 0.8;
  flex: 1;
  border-bottom: 1px solid;
  padding: 10px;
}
</style>