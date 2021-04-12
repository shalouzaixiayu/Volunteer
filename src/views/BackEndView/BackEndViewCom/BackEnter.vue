/* eslint-disable vue/valid-v-model */
<template>
  <div class="infos">
    <div class="title" @click="showTb">
      <span class="iconfont icon-chuli1">{{ title }}</span>
      <span class="len iconfont icon-renshu">总数: {{ Allenter.length }}</span>
    </div>
    <div id="tb2" v-show="isShowTb" :class="{ addPadding: isShowTb }">
      <table class="tb">
        <tr class="oddrowcolor">
          <th>标题</th>
          <th>组织</th>
          <th>时间</th>
          <th>更多操作</th>
        </tr>
        <tr
          v-for="(item, i) in Allenter"
          :key="i"
          :class="{ oddrowcolor: i % 2 !== 0 ? true : false }"
        >
          <td class="btWidth">{{ item.activeThema }}</td>
          <td>{{ item.activeManager }}</td>
          <td>{{ hanldeTimer(item.activeTimer) }}</td>
          <td class="iconfont icon-chuli3 point" @click="showMore(item)"></td>
        </tr>
      </table>
    </div>
    <!-- 模块框 -->
    <div class="mt" v-show="showMt">
      <div class="changeInfo">
        <span class="iconfont icon-chuli1 one">{{
          currentObj.activeThema
        }}</span>
        <div
          v-for="(value, key) in currentObj"
          :key="key"
          class="change"
          :class="{ bigText: key === 'activeIntroduce' }"
        >
          <span class="title">{{ changeKey(key) }}: </span>
          <textarea
            v-if="key === 'activeIntroduce' || key === 'activeImage'"
            v-model.lazy="currentObj[key]"
          ></textarea>
          <!-- // 处理审核情况 -->
          <div v-else-if="key === 'activeProposer'">
            <!-- 搭建状态 更改结构 -->
            <ul class="stu_status">
              <li v-for="item in currentObj[key]" :key="item">
                <div>
                  <span>姓名:</span><span>{{ handleNameById(item.sId) }}</span>
                </div>
                <div>
                  <span>初始状态:</span>
                  <select v-model="item.status">
                    <option :selected="item.status === 'pending'"
                     value="pending">{{hanldeStatus("pending")}}</option>
                    <option :selected="item.status === 'fulfilled'"
                    value="fulfilled">{{hanldeStatus("fulfilled")}}</option>
                    <option :selected="item.status === 'rejected'"
                    value="rejected">{{hanldeStatus("rejected")}}</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>

          <input v-else type="text" v-model.lazy="currentObj[key]" />
        </div>
      </div>
      <footer>
        <span class="tip">修改之后就可以点击提交进行更改.</span>
        <div class="handle">
          <span @click="_updateActive" class="point">提交</span>
          <span @click="_deleteActive" class="point">删除</span>
          <span @click="showMt = false" class="point">关闭</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import  {requestPeopleById} from '../../../network/peopleRequest';
import {deleteNewActive, updateNewActive} from '../../../network/newRequest';
export default {
  name: "BackEnter",
  props: {
    title: {
      type: String,
      default: "",
    },
    Allenter: {
      //  全部的 参加活动  信息
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
      name:"", //  志愿者的名字
    };
  },
  methods: {
    // 通过id 去查找这个人的名字
    handleNameById(_id){
      requestPeopleById(_id).then(res => {
        if(res.status === 200){
          this.name = res.data.data[0] && res.data.data[0].name;
        }
      })
      // console.log(this.name);
      return this.name;
    },
    hanldeStatus(status){
      // 处理状态信息
      switch (status){
        case "fulfilled":
          return "审核通过";
        case "pending":
          return "审核等待";
        case "rejected":
          return "审核失败";
      }
    },
    hanldeTimer(timer) {
      // 处理时间
      return timer.split("T")[0];
    },
    showTb() {
      this.isShowTb = !this.isShowTb;
    },
    changeKey(key) {
      switch (key) {
        case "activeAddress":
          return "地址";
        case "activeBZ":
          return "备注";
        case "activeTimer":
          return "创建时间";
        case "activeThema":
          return "标题";
        case "activeManager":
          return "负责人";
        case "activeIntroduce":
          return "活动介绍";
        case "_id":
          return "ID";
        case "activeNumber":
          return "预计人数";
        case "activeImage":
          return "活动图片";
        case "activeProposer":
          return "参加情况";
      }
    },
    showMore(item) {
      this.showMt = true;
      this.currentObj = item;
      return;
    },
    _updateActive() {
      updateNewActive(this.currentObj._id, this.currentObj).then((res) => {
        if (res.status === 200) {
          this.showMt = false;
          window.location.reload();
        }
      });
    },
    _deleteActive() {
      deleteNewActive(this.currentObj._id).then((res) => {
        if (res.status === 200) {
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
  padding-bottom: 100px;
}
.point {
  cursor: pointer;
}
.infos {
  font-size: 14px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
}
.infos .title {
  text-align: center;
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.infos .title span:nth-child(1) {
  width: 40%;
}
.infos .title span:nth-child(2) {
  width: 40%;
}

#tb2 {
  height: 55vh;
  overflow-x: hidden;
  overflow-y: auto;
  width: 700px;
  background-color: rgb(226, 216, 217);
}
table.tb {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #a9c6c9;
  border-collapse: collapse;
  text-align: center;
  margin: 40px 20px;
}
table.tb tr {
  display: flex;
}
table.tb tr th {
  flex: 1;
  border-width: 1px;
  padding: 10px;
  border-style: solid;
  border-color: #a9c6c9;
}

table.tb tr td.btWidth {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
table.tb td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
  flex: 1;
  overflow: hidden;
}
.oddrowcolor {
  background-color: #d4e3e5;
}
.evenrowcolor {
  background-color: #c3dde0;
}
.mt {
  width: 90%;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: rgba(1, 1, 1, 0.3);
  position: absolute;
  top: -20%;
  left: 5%;
  border-radius: 15px;
  z-index: 3;
  text-align: center;
}
.changeInfo {
  padding: 10px;
  color: rgba(222, 222, 222);
}
.changeInfo span {
  margin-bottom: 3px;
}

.change textarea {
  width: 350px;
  height: 300px;
  text-indent: 30px;
  line-height: 20px;
  /* display: block; */
  border-radius: 15px;
  padding-top: 20px;
  resize: none;
  vertical-align: middle;
  background-color: rgba(222, 222, 222);
  transition: all 0.5s ease;
  margin-bottom: 20px;
}
.change textarea:focus {
  width: 400px;
  height: 400px;
}
.bigText {
  height: 400px !important;
}
.changeInfo .one {
  font-size: 18px;
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.changeInfo .change {
  padding: 5px;
  font-size: 18px;
  /* height: 50px; */
}
.changeInfo .change input {
  background-color: rgba(222, 222, 222);
  border-radius: 15px;
  text-align: center;
  width: 250px;
  transition: width 0.8s ease;
  font-size: 14px;
  line-height: 25px;
  margin-left: 10px;
}
.changeInfo .change input:focus {
  width: 350px;
}
/* 状态信息 */
.stu_status {
  padding: 10px;
}
.stu_status li {
  margin-bottom: 5px;
}
.stu_status li div {
  margin: 5px;
}
.stu_status li div:nth-child(2) {
  display: flex;
  justify-content: center;
  height: 33px;
  line-height: 33px;
}
.stu_status li div:nth-child(2) select {
  margin-left: 15px;
  padding: 5px;
  border-radius: 16.5px;
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