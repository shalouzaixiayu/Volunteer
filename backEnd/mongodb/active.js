const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const activeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: "" // 标题
  },
  sponsor: {
    type: String,
    default: "" // 执行人
  },
  timer: {
    type: String,
    default: ""
  },
  image: {
    type: Array,
    default: [], // 活动图片
  },
  content: {
    type: Array,
    default: [], // 活动内容
  },
  totalPeople: {
    type: Number, // 活动可以报名人数
    default: 30
  },
  otherMsg: {
    type: String,
    default: "", // 活动其他事项
  }
})

const active = new mongoose.model("Active", activeSchema)
/**
 * @param {*} page  页面参数  
 * @param {*} count 数量参数  
 * @param {*} callback 
 */
function getActiveList(page, count, callback) {
  const obj = {}
  active.find({
      id: {
        '$gte': page * count,
        '$lt': (parseInt(page) + 1) * count,
      }
    }).sort({
      id: -1
    }).then(data => {
      console.log(data)
      obj.status = true,
      obj.msg = 'success',
      obj.length = data.length,
      obj.data = data,
      obj.page = page,
      obj.count = count,
      callback(obj)
    })
    .catch(err => {
      obj.status = false,
      obj.msg = err,
      obj.length = 0,
      obj.data = null,
      obj.page = page,
      obj.count = count,
      callback(obj)
    })
}

module.exports = {
  getActiveList,
}