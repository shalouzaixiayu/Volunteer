const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const manager = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // 名字
  },
  password:{
    type: String,
    required: true  
  },
  faculty: {
    type: String,
    required: true,  // 院系
  },
  headImg: {
    type: String, // 头像
    required: false,
    default: ""
  },
  isManager:{
    type:Boolean,
    default: true, // 是否是管理员
  },
  createTime: {
    type: Date,
    default: Date.now,
  }
})


const manager = new mongoose.model('Manager', manager)