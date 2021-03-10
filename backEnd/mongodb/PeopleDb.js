const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const PeoScheme = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  sId: {
    type: String,
    required: true // 学号
  },
  faculty: {
    type: String,
    required: true, // 院系
  },
  class: {
    type: String,
      required: true // 班级
  },
  headImg: {
    type: String, // 头像
    required: false,
    default: ""
  },
  phone: {
    type: String,
    required: false,
    default: "", // 手机号， 默认无
  },
  activeList: {
    type: Array,
    required: false,
    default: []
  },
  isVolunteer: {
    type: Boolean,
    default: false // 是否是志愿者
  },
  point: {
    type: Number,
    default: 0 // 个人积分
  },
  isBad: {
    type: Boolean,
    default: false, // 是否失信 报名没去参加  bad
  },
  createTime: {
    type: Date,
    default: Date.now,
  }
})

const people = new mongoose.model('People', PeoScheme)

function generatePeople(num = 3, callback) {
  // 生成三个学生数据
  for (let i = 0; i < num; i++) {
    console.log(num)
    new people({
        _id: i,
        name: `学生Test:${i+1}`,
        password: '123456',
        sId: 'LT00000001',
        faculty: "计算机信息工程",
        class: "计科三班"
      })
      .save()
      .then(data => {
        callback(data)
      })
  }
}
// 返回志愿者数量
function getPeopleNumber(callback) {
  people.find().then(data => callback(data))
}

// 添加一个志愿者
function addPeople(people, callback) {
  let lastIndex = people.find().length
  people._id = lastIndex
  new people(people).save().then(data => callback(data))
}

// 注册志愿者信息
function register(people, callback) {
  // 先验证，后注册信息
  let obj = {
    data: null,
    msg: "",
    code: 0
  }
  people.find({
    name: people.name
  }).then(data => data ? obj.msg = "用户名已存在" : "success")

  people.find({
    sId: people.sId
  }).then(data => data ? obj.msg = "学号已存在" : "success")

  if (obj.msg === "success") {
    addPeople(people, (data) => {
      obj.data = data
      obj.code = 1
    })
    callback(obj)
  } else {
    callback(obj)
  }
}

// 登陆
function login(people, callback) {
  // 登陆使用 用户名， 密码， 学号 三个确定 
  let obj = {
    data: null,
    msg: "",
    code: 0
  }
  people.findOne({
    // name: people.name,
    sId: people.sId,
    password: people.password,
  }).then(data => {
    if (data) {
      obj.data = data
      obj.msg = "success"
      obj.code = 1
      callback(obj)
    } else {
      obj.msg = "未查找到该用户, 请仔细检查一下!"
      callback(obj)
    }
  })

  // people.findOne({
  //   phone: people.phone,
  //   password: people.password,
  //   sId: people.sId
  // }).then(data => data ? msg.phone = true : false)
}
// 删除志愿者信息
function deletePeople(people, callback) {
  const _id = people.id
  const sId = people.sId
  const name = people.name

  people.findOneAndRemove({
    _id,
    sId,
    name
  }).then(data => callback(data))
}

// 绑定手机号
function bindNumber(people, callback) {
  const _id = people.id
  const sId = people.sId
  const phone = people.phone

  people.findOneAndUpdate({
    _id,
    sId
  }, {
    phone: phone
  }).then(data => callback(data))
}

// 返回全部志愿者信息
function getAllPeople(callback) {
  people.find()
    .then(data => {
      // data.length = data.length
      callback(data)
    })
    .catch(err => callback(err))
}

module.exports = {
  generatePeople,
  getPeopleNumber,
  getAllPeople,
  login,
  register,
  deletePeople,
  bindNumber
}