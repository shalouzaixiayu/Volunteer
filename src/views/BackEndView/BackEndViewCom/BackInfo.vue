<template>
  <div class="infos">
    <div class="title" @click="showTb">
      <span class="iconfont icon-chuli1">{{ title }}</span>
      <span class="len iconfont icon-renshu">总数: {{ AllPeople.length }}</span>
    </div>
    <div id="tb" v-show="isShowTb" :class="{addPadding:isShowTb}">
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
          <td class="iconfont icon-chuli3 point" @click="showMore(item)"></td>
        </tr>
      </table>
    </div>

    <!-- 模块框 -->
    <div class="mt" v-show="showMt">
      <div class="changeInfo">
        <span class="iconfont icon-chuli1 one">{{ currentObj.name }}</span>
        <div v-for="(value, key) in currentObj" :key="key" class="change">
          <span class="title">{{ changeKey(key) }}: </span>
          <input type="text" v-model.lazy="currentObj[key]" />
        </div>
      </div>
      <footer>
        <span class="tip">修改之后就可以点击提交进行更改.</span>
        <div class="handle">
          <span @click="_updatePeople" class="point">提交</span>
          <span @click="_deletePeople" class="point">删除</span>
          <span @click="showMt = false" class="point">关闭</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { deletePeople, updatePeople } from "../../../network/peopleRequest";
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
      isShowTb: false,
      currentObj: {}, // 当前操作的人
    };
  },
  methods: {
    showTb() {
      this.isShowTb = !this.isShowTb;
    },
    changeKey(key) {
      switch (key) {
        case "headImg":
          return "头像";
        case "phone":
          return "电话";
        case "activeList":
          return "学习记录";
        case "isVolunteer":
          return "志愿者";
        case "isManager":
          return "管理员";
        case "point":
          return "得分";
        case "isBad":
          return "失信";
        case "bindAutograph":
          return "个性签名";
        case "name":
          return "姓名";
        case "password":
          return "密码";
        case "sId":
          return "学号";
        case "faculty":
          return "院系";
        case "class":
          return "班级";
        case "createTime":
          return "创建时间";
        case "_id":
          return "ID";
        case "__v":
          return "其他";
      }
    },
    showMore(item) {
      this.showMt = true;
      this.currentObj = item;
      return;
    },
    _updatePeople() {
      updatePeople(this.currentObj._id, this.currentObj).then((res) => {
        if (res.data.status === true) {
          this.showMt = false;
          window.location.reload();
        }
      });
    },
    _deletePeople() {
      deletePeople(this.currentObj._id).then((res) => {
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
.addPadding {
  padding-bottom:100px;
}
.point{
  cursor: pointer;
}
.infos {
  font-size: 14px;
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  text-align: center;
}
.infos .title {
  margin-top: 20px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.infos .title span:nth-child(1){
  width: 40%;
}
.infos .title span:nth-child(2) {
  width: 40%;
}
#tb {
  height: 45vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  z-index: 2;
  background-color: rgb(226, 216, 217);
}
table.tb {
  width: 90%;
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
  text-align: center;
  margin: 40px 20px;
}
table.tb th {
  border-width: 1px;
  padding: 10px;
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
  overflow: scroll;
  background-color: rgba(1, 1, 1, 0.3);
  position: absolute;
  top: 10px;
  left: 5%;
  border-radius: 15px;
  z-index: 5;
  overflow: auto;
}
.changeInfo {
  padding: 10px;
  color: rgba(222, 222, 222);
}
.changeInfo .one {
  font-size: 18px;
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.changeInfo .change {
  padding: 5px;
  height: 40px;
  font-size: 18px;
}
.changeInfo .change input {
  background-color: rgba(222, 222, 222);
  border-radius: 15px;
  margin-left: 10px;
  text-align: center;
  width: 200px;
  line-height: 25px;
  transition: width 0.6s ease;
  font-size: 14px;
}
.changeInfo .change input:focus {
  width: 300px;
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