const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const PeoScheme = new mongoose.Schema({
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
  bindAutograph: {
    type: String,
    default: '', // 个性签名
  },
  createTime: {
    type: Date,
    default: Date.now,
  }
})

const people = new mongoose.model('People', PeoScheme)

function generatePeople(num = 5, callback) {
  // 生成五个学生数据
  for (let i = 0; i < num; i++) {
    new people({
        name: `学生Test:${i+1}`,
        password: '123456',
        sId: `18010201030${i+1}`,
        faculty: "计算机信息工程",
        class: "计科三班",
        isVolunteer: true, //  注册人为真
        point: 10 * (i + 1) + i
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
  // 注册修改  isVolunteer 值 让它成为志愿者
  info.isVolunteer = true
  new people(info).save().then(data => {
    callback(data)
  })
  // .catch(error => console.log(error + '错误信息'))
}

// 注册志愿者信息
function register(info, callback) {
  // 先验证，后注册信息
  // let obj = {
  //   data: null,
  //   msg: "",
  //   status: false
  // }
  people.find({
    $or: [{
        name: info.name
      },
      {
        sId: info.sId
      }
    ]
  }).then(data => {
    if (data.length === 0) {
      console.log('111')
      addPeople(info, (data) => {
        callback(data)
      })
    } else {
      console.log('222')
      const obj = {}
      obj.data = null
      obj.msg = "用户名或学号已存在"
      obj.status = false
      callback(obj)
    }
  })
}

// 登陆
function login(info, callback) {
  // 登陆使用  密码， 学号 确定 
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
      if (data.length >= 1) {
        obj.data = data
        obj.msg = "success"
        obj.status = true
      } else {
        obj.msg = "未查找到该用户, 请仔细检查一下!"
        obj.data = null
        obj.status = false
      }
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
    if (data.length >= 1) {
      obj.status = true
      obj.message = "success"
      obj.data = data
    } else {
      obj.status = false
      obj.message = err
      obj.data = null
    }
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
    if (data.length >= 1) {
      obj.status = true
      obj.message = 'success',
        obj.data = data
    } else {
      obj.status = false
      obj.message = "未找到该用户信息!",
        obj.data = null
    }
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
    bindAutograph: msg,
  }).then(data => {
    if (data.length >= 1) {
      obj.status = true
      obj.message = 'success',
        obj.data = data
    } else {
      obj.status = false
      obj.message = "未找到该用户信息!",
        obj.data = null
    }
    callback(obj)
  })
}

// 获取个人积分信息
function getPoint(_id, callback) {
  people.find({
    _id,
  }).then(data => {
    callback(data)
  })
}

// getPoint('604db78ba9b8012e204f291d', data => console.log(data))

// 更改积分
function bindPoint(id, point, callback) {
  const _id = id
  const obj = {}

  people.findOneAndUpdate({
    _id,
  }, {
    point: point,
  }).then(data => {
    if (data.length >= 1) {
      obj.status = true
      obj.message = 'success',
        obj.data = data
    } else {
      obj.status = false
      obj.message = "未找到该用户信息!",
        obj.data = null
    }
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
      if (data.length >= 1) {
        obj.status = true
        obj.message = 'success',
          obj.data = data
      } else {
        obj.status = false
        obj.message = "未找到该用户信息!",
          obj.data = null
      }
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