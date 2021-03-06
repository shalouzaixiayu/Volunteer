const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

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
  isManager: {
    type: Boolean,
    default: false, // 是否是管理员
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
    default: '这家伙很懒，什么都没写.', // 个性签名
  },
  createTime: {
    type: Date,
    default: Date.now,
  }
})

const people = new mongoose.model('People', PeoScheme)

const headPicList = ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2118582514,3082357895&fm=26&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2172435215,840313269&fm=26&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2899335337,2471522323&fm=26&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1198700900,3240457758&fm=26&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3633693073,3344238293&fm=26&gp=0.jpg'
]

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
        isManager: true, // 是管理员
        point: 10 * (i + 1) + i,
        headImg:headPicList[i], // 头像地址
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
      addPeople(info, (data) => {
        const obj = {}
        obj.data = data
        obj.status = true
        obj.msg = 'success'
        callback(obj)
      })
    } else {
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
// 更新信息
function updatePeople(id, info, callback) {
  const _id = id
  const newObj = JSON.parse(info)
  const obj = {}
  people.findOneAndUpdate({
    _id
  }, newObj).then(data => {
    if (data) {
      obj.status = true
      obj.message = "success"
      obj.data = data
    } else {
      obj.status = false
      obj.message = '错误'
      obj.data = null
    }
    callback(obj)
  })
}
// 删除志愿者信息
function deletePeople(info, callback) {
  const _id = info
  const obj = {}
  people.findOneAndRemove({
    _id,
  }).then(data => {
    if (data) {
      obj.status = true
      obj.message = "success"
      obj.data = data
    } else {
      obj.status = false
      obj.message = '错误'
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
    if (data) {
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
    if (data) {
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

// 获取现在的个人信息 return promise 
function getInfoById(_id) {
  return people.find({
    _id: _id,
  })
}


// 给用户追加头像信息
// 这个只有一张， 只会覆盖的加  
async function AddImageById(filename, _id, callback){
  const obj = await getInfoById(_id);
  const _obj = obj[0];
  _obj.headImg = filename; //  直接更换图片信息
  const state = {
    status:false,
    data:null,
    msg:"",
  };
  people.findOneAndUpdate({
    _id,
  }, _obj).then(res => {
    if (res) {
      // console.log(res)
      state.status = true;
      state.data = res;
      state.msg = 'success'
    } else {
      state.msg = '错误'
    }
    callback(state)
  })


}




// getInfoById('604db78ba9b8012e204f291d', data => console.log(data[0].point))

// bindPoint("604db78ba9b8012e204f291d")
// 更改积分
async function bindPoint(id, point, callback) {
  const _id = id
  const obj = {}
  const nowPoint = await getInfoById(id).then(data => data[0].point)
  people.findOneAndUpdate({
    _id,
  }, {
    point: nowPoint + parseInt(point),
  }).then(data => {
    if (data) {
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

// 绑定学习记录
async function bindStudy(id, info, callback) {
  let nowActiveList = await getInfoById(id).then(data => data[0].activeList)
  const _info = JSON.parse(info)
  nowActiveList.push(_info)
  const obj = {}
  people.findOneAndUpdate({
    _id: id
  }, {
    activeList: nowActiveList,
  }).then(data => {
    if (data) {
      obj.data = data
      obj.status = true
      obj.message = 'success'
      callback(obj)
    } else {
      obj.data = null
      obj.status = false
      obj.message = 'id验证错误'
      callback(obj)
    }
  })
}

// 绑定评论
async function bindCom(id, info, callback) {
  const _info = JSON.parse(info)
  let nowActiveList = await getInfoById(id).then(data => data[0].activeList)
  nowActiveList.push(_info)
  const obj = {}
  people.findOneAndUpdate({
    _id: id
  }, {
    activeList: nowActiveList,
  }).then(data => {
    if (data) {
      obj.data = data
      obj.status = true
      obj.message = 'success'
      callback(obj)
    } else {
      obj.data = null
      obj.status = false
      obj.message = 'id验证错误'
      callback(obj)
    }
  })
}

// 绑定头像  await 可以直接拿到 promise 的 then 值
async function bindImage(id, info, callback) {
  const _info = JSON.parse(info)
  const obj = {}
  people.findOneAndUpdate({
    _id: id
  }, {
    headImg: _info.headImg, // 待修改
  }).then(data => {
    if (data) {
      obj.data = data
      obj.status = true
      obj.message = 'success'
      callback(obj)
    } else {
      obj.data = null
      obj.status = false
      obj.message = 'id验证错误'
      callback(obj)
    }
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
 * @param {*} callback   promise 
 */
function searchByIdAndSid(id, callback) {
  const obj = {}
  people.find({
      _id: id,
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


//  给用户加分 
async function addPointById(_id, point, callback){
  // 拿到旧的分数
  const perviousInfo = await getInfoById(_id);
  const perPoint = perviousInfo[0].point;
  const obj = {
    data: null,
    msg:"",
  }
  people.findOneAndUpdate({
    _id,
  }, {
    point: parseInt(perPoint) + parseInt(point)
  }).then(res => {
    if(res){
      obj.data = res;
      obj.msg = "success";
      callback(obj);
    }else{
      callback(obj)
    }
  })


}



module.exports = {
  addPointById,
  generatePeople,
  getPeopleNumber,
  getAllPeople,
  login,
  register,
  deletePeople,
  updatePeople,
  searchByIdAndSid,
  bindNumber,
  bindAutograph,
  bindPoint,
  bindStudy,
  bindCom,
  bindImage,
  AddImageById,
}