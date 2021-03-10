<template>
  <div class="content">
    <div class="back" @click="backHandle">&lt;</div>
    <template v-if="!isRegister">
      <div class="formcontainer">
        <div>
          <div class="item usernum">
            <i class="iconfont icon-xuehao"></i>
            <input type="text" placeholder="请输入学号">
          </div>
          <div class="error">账号错误</div>
        </div>
        <div>
          <div class="item password">
            <i class="iconfont icon-mima"></i>
            <input type="text" placeholder="请输入密码">
          </div>
          <div class="error">密码错误</div>
        </div>
        <div>
          <div class="item checkcode">
            <div class="box">
              <i class="iconfont icon-zhucedengluyanzhengma"></i>
              <input @focus="focusHandle" type="text" placeholder="验证码">
            </div>
            <div class="random" v-if="checkIsFocus">1234</div>
          </div>
          <div class="error">验证码错误</div>
        </div>
        <div class="btn">
          <button @click="loginHandle">登录</button>
        </div>
      </div>
      <div class="register">
          没有账号？<span @click="goRegister">立即注册 ></span>
      </div>
    </template>
    <template v-else>
      <div class="formcontainer">
        <div>
          <div class="item username">
            <i class="iconfont icon-yonghuming"></i>
            <input type="text" placeholder="请输入用户名">
          </div>
          <div class="error">账号错误</div>
        </div>
        <div>
          <div class="item usernum">
            <i class="iconfont icon-xuehao"></i>
            <input type="text" placeholder="请输入学号">
          </div>
          <div class="error">账号错误</div>
        </div>
        <div class="gradebox">
          <div class="grade" @click="chooseGradeList">
            <span :class="['left', !isChoose?'':'font']"> <i class="iconfont icon-guanxibushu"></i>{{gradeString}}</span>
            <span class="choose">请选择></span>
          </div>
          <div class="gradeerror">未选择年级系部</div>
          <div class="gradelist" v-show="showGradeList">
            <ul class="department" v-show="isDepartment">
              <li v-for="(item, i) in departmentList" :key="i" @click="chooseDepartment(item)">{{item}}</li>
            </ul>
            <ul class="class" v-show="isClass">
              <li v-for="(item, i) in classList" :key="i" @click="chooseClass(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <div>
          <div class="item password">
            <i class="iconfont icon-mima"></i>
            <input type="text" placeholder="请输入密码">
          </div>
          <div class="error">密码错误</div>
        </div>
        <div>
          <div class="item password">
            <i class="iconfont icon-mima"></i>
            <input type="text" placeholder="请确认密码">
          </div>
          <div class="error">密码错误</div>
        </div>
        <div class="btn">
          <button @click="registerHandle">注册</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name:"ActiveDetail",
  data() {
    return {
      checkIsFocus: false,
      isRegister: false,
      isDepartment: false,
      isClass: false,
      showGradeList: false,
      isChoose: false,
      classList: [],
      gradeString: '系部',
      departmentList: ['计算机信息工程学院', '外国语学院', '人文学院', '机电工程学院', '美术学院', '航天航空学院', '新能源学院']
    }
  },
  methods: {
    backHandle() {
      this.$router.go(-1)
    },
    focusHandle() {
      this.checkIsFocus = true
    },
    loginHandle() {
      window.sessionStorage.setItem('login', 'ok')
      this.$router.go(-1)
    },
    goRegister() {
      this.isRegister = true
    },
    chooseGradeList() {
      this.showGradeList = this.isDepartment =  true
    },
    chooseDepartment(value) {
      this.gradeString = ''
      this.gradeString += value
      switch (value) {
        case '计算机信息工程学院': this.classList = ['计科1班', '计科2班', '计科3班', '软件1班', '软件2班', '大数据1班']
          break;
        case '外国语学院': this.classList = ['外语1班', '外语2班', '外语3班', '对外1班', '对外2班', '外语文化1班']
          break;
        case '人文学院': this.classList = ['语文1班', '语文2班', '语文3班', '数学1班', '数学2班', '幼儿1班']
          break;
      }
      this.isDepartment = false
      this.isClass = true
    },
    chooseClass(value) {
      this.gradeString += value
      this.showGradeList = this.isClass = false
      this.isChoose = true
      console.log(this.gradeString)
    },
    registerHandle() {
      this.isRegister = false
    }
  }
}
</script>

<style scoped>
  .content{
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: rgb(243, 240, 240);
    z-index: 10;
  }
  .back{
    height: 40px;
    line-height: 60px;
    text-align: left;
    padding-left: 16px;
    font-size: 26px;
    cursor: pointer;
    margin-bottom: 56px;
  }
  .formcontainer{
    padding: 32px;
    background-color: #fff;
  }
  .formcontainer .error,
  .formcontainer .gradeerror{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: red;
    padding-left: 5px;
  }
  .formcontainer .item{
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 7px;

  }
  .formcontainer .item input{
    padding: 14px 8px 14px 14px;
    width: 82%;
    font-size: 16px;
  }
  .formcontainer .item .iconfont,
  .formcontainer .grade .iconfont{
    font-size: 25px;
  }
  .formcontainer .checkcode{
    border: none;
    padding-left: 0;
    justify-content: space-between;
  }
  .formcontainer .checkcode .box{
    display: flex;
    align-items: center;
    margin-right: 5px;
    flex: 3;
    border: 1px solid #ccc;
    padding-left: 20px;
  }
  .formcontainer .checkcode input{
    width: 50%;
  }
  .formcontainer .checkcode .random{
    box-sizing: border-box;
    flex: 2;
    padding: 15px;
    border: 1px solid #ccc;
    text-align: center;
    background-color: rgb(238, 238, 238);
  }
  .formcontainer .btn{
    margin-bottom: 30px;
  }
  .formcontainer .btn button{
    width: 100%;
    padding: 14px;
    background-color: #04BE02;
    color: #fff;
    font-size: 16px;
  }
  .register{
    margin-top: 133px;
    text-align: center;
    font-size: 12px;
  }
  .register span{
    color: #04BE02;
  }
  .formcontainer .grade{
    padding: 15px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .formcontainer .grade .left{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    color:rgb(95, 94, 94);
  }
  .formcontainer .grade .left.font{
    font-size: 12px;
  }
  .formcontainer .grade .left .iconfont{
    margin-right: 10px;
  }
  .formcontainer .gradebox{
    position: relative;
  }
  .formcontainer .gradebox .gradelist{
    position: absolute;
    height: 120px;
    left: 0;
    top: 55px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: 1px solid #fff;
    box-sizing: border-box;
    padding: 5px 10px 0 10px;
    overflow: hidden;
  }
  .formcontainer .gradebox .gradelist ul{
    padding:0 12px ;
    height: 100%;
    overflow: scroll;
  }
  .formcontainer .gradebox .gradelist li{
    margin-bottom: 16px;
  }
</style>