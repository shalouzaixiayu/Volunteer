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
  bindAutograph:{
    type:String,
    default: '',  // 个性签名
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
    new people({
        _id: i,
        name: `学生Test:${i+1}`,
        password: '123456',
        sId: `18010201030${i+1}`,
        faculty: "计算机信息工程",
        class: "计科三班",
        isVolunteer: true, //  注册人为真
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
function addPeople(info, callback) {
  let lastIndex = people.find().length
  info._id = lastIndex
  // 注册修改  isVolunteer 值 让它成为志愿者
  info.isVolunteer = true
  new people(info).save().then(data => callback(data))
}

// 注册志愿者信息
function register(info, callback) {
  // 先验证，后注册信息
  let obj = {
    data: null,
    msg: "",
    status: false
  }
  people.find({
    name: info.name
  }).then(data => data ? obj.msg = "用户名已存在" : "success")

  people.find({
    sId: info.sId
  }).then(data => data ? obj.msg = "学号已存在" : "success")

  if (obj.msg === "success") {
    addPeople(info, (data) => {
      obj.data = data
      obj.status = true
    })
    callback(obj)
  } else {
    callback(obj)
  }
}

// 登陆
function login(info, callback) {
  // 登陆使用 用户名， 密码， 学号 三个确定 
  let obj = {
    data: null,
    msg: "",
    status: false
  }
  people
    .find({
      // name: people.name,
      sId: info.sId,
      password: info.password,
    }).then(data => {
      obj.data = data
      obj.msg = "success"
      obj.status = true
      callback(obj)
    })
    .catch(err => {
      obj.msg = "未查找到该用户, 请仔细检查一下!"
      obj.err = err
      obj.data = null
      obj.status = false
      callback(obj)
    })

}
// 删除志愿者信息
function deletePeople(info, callback) {
  const {
    _id,
    sId,
    name
  } = info
  const obj = {}
  people.findOneAndRemove({
      _id,
      sId,
      name
    }).then(data => {
      obj.status = true
      obj.message = "success"
      obj.data = data
      callback(obj)
    })
    .catch(err => {
      obj.status = false
      obj.message = err
      obj.data = null
      callback(obj)
    })
}

// 绑定手机号
function bindNumber(id, phone, callback) {
  const _id = id
  const obj = {}

  people.findOneAndUpdate({
    _id,
  }, {
    phone,
  }).then(data => {
    obj.status = true
    obj.message = 'success',
    obj.data = data
    callback(obj)
  })
  .catch(err => {
    obj.status = false
    obj.message = err,
    obj.data = null
    callback(obj)
  })
}


// 绑定个性签名
function bindAutograph(id, msg, callback) {
  const _id = id
  const obj = {}

  people.findOneAndUpdate({
    _id,
  }, {
    bindAutograph:msg,
  }).then(data => {
    obj.status = true
    obj.message = 'success',
    obj.data = data
    callback(obj)
  })
  .catch(err => {
    obj.status = false
    obj.message = err,
    obj.data = null
    callback(obj)
  })
}

// 更改积分
function bindPoint(id, point, callback) {
  const _id = id
  const obj = {}

  people.findOneAndUpdate({
    _id,
  }, {
    point:point,
  }).then(data => {
    obj.status = true
    obj.message = 'success',
    obj.data = data
    callback(obj)
  })
  .catch(err => {
    obj.status = false
    obj.message = err,
    obj.data = null
    callback(obj)
  })
}




// 返回全部志愿者信息
function getAllPeople(callback) {
  const obj = {}
  people.find()
    .then(data => {
      obj.data = data
      obj.status = true
      obj.length = data.length
      obj.meg = "success"
      callback(data)
    })
    .catch(err => {
      obj.data = null
      obj.status = false
      obj.length = 0
      obj.meg = err
      callback(obj)
    })
}
/**
 *
 *
 * @param {*} id   id
 * @param {*} sId  学号
 * @param {*} callback   promise 
 */
function searchByIdAndSid(id, sId, callback) {
  const obj = {}
  people.find({
      _id: id,
      sId: sId
    })
    .then(data => {
      obj.data = data
      obj.status = true
      obj.msg = 'success'
      callback(obj)
    })
    .catch(err => {
      obj.data = null
      obj.status = false
      obj.msg = err
      callback(obj)
    })
}

module.exports = {
  generatePeople,
  getPeopleNumber,
  getAllPeople,
  login,
  register,
  deletePeople,
  searchByIdAndSid,
  bindNumber,
  bindAutograph,
  bindPoint,
}