// 管理员发布的新活动主题
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 规范集合的数据源
const newActiveSchema = new mongoose.Schema({
  // 活动主题
  activeThema: {
    type: String,
    required: true,
    default: ""
  },
  // 活动时间
  activeTimer: {
    type: Date,
    required: false,
    default: Date.now,
  },
  // 需求人数
  activeNumber: {
    type: Number,
    required: true,
    default: 30
  },
  // 活动负责人
  activeManager: {
    type: String,
    required: true,
    default: ""
  },
  // 活动地址
  activeAddress: {
    type: String,
    required: true,
    default: ""
  },
  // 活动介绍
  activeIntroduce: {
    type: String,
    required: false,
    default: ""
  },
  // 活动备注
  activeBZ: {
    type: String,
    required: false,
    default: ""
  },
  // 创建时间 
  activeCreateTimer: {
    type: Date,
    default: Date.now,
  }
})

const newActiveModel = new mongoose.model('newActive', newActiveSchema);

// 操作数据的api
/**
 *
 *  通过主题来查询新建的活动
 * @param {*} thema  这是一个对象 {thema: ....}
 */
function findActiveThema(thema) {
  return newActiveModel.find({
    activeThema: thema
  })
}
/**
 *
 * 创建一个新的活动
 * @param {*} obj  活动参数
 */
function newActiveView(obj) {
  const _obj =  obj instanceof Object ? obj : JSON.parse(obj);
  return new newActiveModel(_obj).save()
}
/**
 *
 * 创建一个新的活动
 * @param {*} obj  活动对象
 */
function createActive(obj, callback) {
  const _obj = obj instanceof Object ? obj : JSON.parse(obj);
  const start = {
    data: null,
    msg: "",
    status: false,
  }
  findActiveThema(_obj.activeThema).then(res => {
    if (res.length >= 1) {
      start.msg = "该活动主题已存在！";
      callback(start);
    } else {
      newActiveView(_obj).then(data => {
        console.log(data)
        start.data = data;
        start.msg = 'success';
        start.status = true;
        callback(start);
      })
    }
  })
}


  // const obj = {
  //   activeThema: '看电视',
  //   activeTimer,
  //   activeNumber: 30,
  //   activeManager: '张人',
  //   activeAddress: '北京',
  //   activeIntroduce:'好玩的',
  //   activeBZ:'备注信息'
  // }
  // createActive(obj, (res) => console.log(res))





module.exports = {
  findActiveThema,
  createActive,
  newActiveView,
}