<template>
  <div class="content">
    <!-- 返回区域 -->
    <nav-bar class="backbox">
      <template #left>
        <span class="back" @click="backHandle">&lt;</span>
      </template>
    </nav-bar>
    <!-- 登录区域 -->
    <template v-if="!isRegister">
      <div class="formcontainer">
        <!-- 学号表单区域 -->
        <div>
          <div class="item usernum">
            <i class="iconfont icon-xuehao"></i>
            <input type="text" placeholder="请输入学号" @blur="blurHandle('usenum')" v-model="userNum">
          </div>
          <div class="error">{{numError}}</div>
        </div>
        <!-- 密码表单区域 -->
        <div>
          <div class="item password">
            <i class="iconfont icon-mima"></i>
            <input type="password" placeholder="请输入密码" @blur="blurHandle('password')" v-model="passWord">
          </div>
          <div class="error">{{passWordError}}</div>
        </div>
        <!-- 验证码表单区域 -->
        <div>
          <div class="item checkcode">
            <div class="box">
              <i class="iconfont icon-zhucedengluyanzhengma"></i>
              <input @focus="focusHandle" type="text" placeholder="验证码" @blur="blurHandle('checkcode')" v-model="checkNum">
            </div>
            <div class="random" v-if="checkIsFocus" @click='newRandom'>{{random}}</div>
          </div>
          <div class="error">{{checkError}}</div>
        </div>
        <!-- 登录按钮区域 -->
        <div class="btn">
          <button @click="loginHandle" :disabled='!userNum.trim() || !passWord.trim() || !checkNum.trim()'>登录</button>
        </div>
      </div>
      <!-- 底部切换注册区域 -->
      <div class="register">
          没有账号？<span @click="goRegister">立即注册 ></span>
      </div>
    </template>
    <!-- 注册区域 -->
    <template v-else>
      <div class="formcontainer">
        <!-- 用户名表单区域 -->
        <div>
          <div class="item username">
            <i class="iconfont icon-yonghuming"></i>
            <input type="text" placeholder="请输入3-10位用户名" @blur="blurHandle('username')" v-model="userName">
          </div>
          <div class="error">{{usernameError}}</div>
        </div>
        <!-- 学号表单区域 -->
        <div>
          <div class="item usernum">
            <i class="iconfont icon-xuehao"></i>
            <input type="text" placeholder="请输入学号" @blur="blurHandle('usenum')" v-model="userNum">
          </div>
          <div class="error">{{numError}}</div>
        </div>
        <!-- 选择专业班级区域 -->
        <div class="gradebox">
          <div class="grade" @click="chooseGradeList">
            <span :class="['left', !isChoose?'':'font']"> <i class="iconfont icon-guanxibushu"></i>{{gradeString}}</span>
            <span class="choose">请选择&gt;</span>
          </div>
          <div class="gradeerror">{{gradeError}}</div>
          <div class="gradelist" v-show="showGradeList">
            <ul class="department" v-show="isDepartment">
              <li v-for="(item, i) in departmentList" :key="i" @click="chooseDepartment(item)">{{item}}</li>
            </ul>
            <ul class="class" v-show="isClass">
              <li v-for="(item, i) in classList" :key="i" @click="chooseClass(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <!-- 密码表单区域 -->
        <div>
          <div class="item password">
            <i class="iconfont icon-mima"></i>
            <input type="password" placeholder="请输入6-12位密码" @blur="blurHandle('password')" v-model="passWord">
          </div>
          <div class="error">{{passWordError}}</div>
        </div>
        <!-- 确认密码区域 -->
        <div>
          <div class="item password">
            <i class="iconfont icon-mima"></i>
            <input type="password" placeholder="请确认密码" @blur="blurHandle('confirmpassword')" v-model="confirmPassWord">
          </div>
          <div class="error">{{confirmPassWordError}}</div>
        </div>
        <!-- 注册区域 -->
        <div class="btn">
          <button @click="registerHandle" :disabled='!userNum.trim() || !passWord.trim() || !userName.trim() || !confirmPassWord.trim()'>注册</button>
        </div>
      </div>
    </template>
    <!-- 成功吐司 -->
    <s-toast v-show="isSuccess">{{successString}}</s-toast>
  </div>
</template>

<script>
import NavBar from '../../components/common/Navbar/NavBar.vue'
import SToast from '../../components/common/Toast/SToast.vue' 
export default {
  components: { NavBar, SToast },
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
      departmentList: ['计算机信息工程学院', '外国语学院', '人文学院', '机电工程学院', '美术学院', '航天航空学院', '新能源学院'],
      random: null,
      userNum: '',
      passWord: '',
      checkNum: '',
      userName: '',
      numError: '',
      passWordError: '',
      checkError: '',
      usernameError: '',
      confirmPassWord: '',
      confirmPassWordError: '',
      gradeError: '',
      successString: '',
      isSuccess: false
    }
  },
  methods: {
    // 退回me页面
    backHandle() {
      this.$router.go(-1)
    },


    // 验证码聚焦
    focusHandle() {
      this.checkIsFocus = true
    },


    // 登录
    loginHandle() {
      if(+this.checkNum !== this.random) {
        this.checkError = '验证码错误'
        this.checkNum = ''
        this.getRandom()
        return
      }
      this.successString = '登录成功'
      this.isSuccess = true
      setTimeout(() => {
        this.isSuccess = false
      },1000)
      window.sessionStorage.setItem('login', 'ok')
      this.$store.commit('switchLoginStatus')
      console.log(this.userNum, this.passWord)
      this.$router.go(-1)
    },


    // 切换至注册区域
    goRegister() {
      this.isRegister = true
      this.userNum = this.passWord = this.checkNum = this.userName = this.confirmPassWord = this.numError = this.passWordError = this.checkError = this.usernameError = this.gradeError = this.confirmPassWordError =  ''
      this.gradeString = '系部'
      this.checkIsFocus = false
      this.getRandom()
    },


    // 选择学院班级
    chooseGradeList() {
      this.showGradeList = this.isDepartment =  true
    },


    // 选择学院
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


    // 选择班级
    chooseClass(value) {
      this.gradeString += value
      this.showGradeList = this.isClass = false
      this.isChoose = true
      this.gradeError = ''
    },


    // 注册操作
    registerHandle() {
      if(this.gradeString == '系部') {
        this.gradeError = '请选择系部班级'
        return
      }
      if(this.passWord !== this.confirmPassWord) {
        this.confirmPassWordError = '与密码不一致'
        this.confirmPassWord = ''
        return
      }
      console.log(this.userName, this.userNum, this.gradeString, this.passWord, this.confirmPassWord)
      this.userNum = this.passWord = this.checkNum = this.userName = this.confirmPassWord = this.numError = this.passWordError = this.checkError = this.usernameError = this.gradeError = this.confirmPassWordError =  ''
      this.gradeString = '系部'
      this.isRegister = false
      this.successString = '注册成功'
      this.isSuccess = true
      setTimeout(() => {
        this.isSuccess = false
      },1000)
    },


    // 获取随机验证码
    getRandom() {
      this.random =  parseInt(Math.random()*8999 + 1000)
    },


    // 表单失焦预验证
    blurHandle(value) {
      switch (value) {
        case 'usenum':
          if(!this.userNum.trim()) {
            this.numError = '学号不能为空'
            this.userNum = ''
            return
          }
          var regs1 = /^[0-9]{12}$/
          if(!regs1.test(+this.userNum)) {
            this.numError = '请输入12位的学号'
            this.userNum = ''
            return
          }
          this.numError = ''
          break;
        case 'password':
          if(!this.passWord.trim()) {
            this.passWordError = '密码不能为空'
            this.passWord = ''
            return
          }
          var regs2 = /^[a-zA-Z0-9_]{6,12}$/
          if(!regs2.test(+this.passWord)) {
            this.passWordError = '密码长度为6-12位'
            this.passWord = ''
            return
          }
          this.passWordError = ''
          break;
        case 'checkcode':
          if(!this.checkNum.trim()) {
            this.checkError = '验证码不能为空'
            this.checkNum = ''
            return
          }
          this.checkError = ''
          break;
        case 'username':
          if(!this.userName.trim()) {
            this.usernameError = '用户名不能为空'
            this.userName = ''
            return
          }
          var regs3 = /^[a-zA-Z0-9_]{3,6}$/
          if(!regs3.test(this.userName)) {
            this.usernameError = '用户名长度为3-10位'
            this.userName = ''
            return
          }
          this.usernameError = ''
          break;
        case 'confirmpassword':
          if(!this.confirmPassWord.trim()) {
            this.confirmPassWordError = '确认密码不能为空'
            this.confirmPassWord = ''
            return
          }
          this.confirmPassWordError = ''
          break;
      }
    },

    
    // 获取新的验证码
    newRandom() {
      this.getRandom()
    }
  },
  created() {
    this.getRandom()
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
  .backbox{
    background-color: rgb(243, 240, 240);
  }
  .back{
    text-align: left;
    font-size: 26px;
    color: #000;
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
    padding-left: 24px;
    border-radius: 7px;
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