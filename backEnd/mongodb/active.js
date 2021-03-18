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
    timer: -1
  }).then(data => {
    obj.status = true,
      obj.msg = 'success',
      obj.length = data.length,
      obj.data = data,
      obj.page = page,
      obj.count = count,
      callback(obj)
  })
}
/**
 *
 *
 * @param {*} reTitle  String title by re
 * @param {*} maxCount  
 * @param {*} callback
 */
function searchActiveByTitle(reTitle, maxCount, callback) {
  const obj = {}
  active.find({
      title: {
        $regex: eval(`/.*${reTitle}.*/ig`)
      }
    })
    .sort({
      timer: -1
    })
    .limit(parseInt(maxCount))
    .then(data => {
      if (data.length >= 1) {
        obj.status = true,
          obj.msg = 'success',
          obj.data = data,
          obj.reTitle = reTitle,
          obj.maxCount = maxCount,
          callback(obj)
      } else {
        obj.status = false,
          obj.msg = '没找到',
          obj.data = null,
          obj.reTitle = reTitle,
          obj.maxCount = maxCount,
          callback(obj)
      }
    })
}
/**
 *
 *
 * @param {*} id
 * @param {*} callback  promise
 */
function searchActiveById(id, callback) {
  const obj = {}
  // console.log(id + "这里的")
  active.find({
      id,
    })
    .then(data => {
      if (data.length >= 1) {
        obj.status = true
        obj.msg = "success"
        obj.data = data
        callback(obj)
      } else {
        obj.status = false
        obj.msg = '未找到该信息'
        obj.data = null
        callback(obj)
      }
    })
}


// 更新信息
function updateActive(id, info, callback) {
  const  _id  = id
  const newObj = JSON.parse(info)
  const obj = {}
  active.findOneAndUpdate({_id}, newObj).then(data => {
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
function deleteActive(info, callback) {
  const  _id  = info
  const obj = {}
  active.findOneAndRemove({_id,}).then(data => {
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
module.exports = {
  getActiveList,
  searchActiveByTitle,
  searchActiveById,
  deleteActive,
  updateActive
}
