const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const activeSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  thema: {
    type: String,
    default: "" // 主题
  },
  goal: {
    type: String,
    default: "" // 目的
  },
  timer: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: "", // 活动地点
  },
  totalPeople:{
    type:Number, // 活动可以报名人数
    default: 30
  },
  otherMsg:{
    type:String,
    default:"", // 活动其他事项
  }  
})

new active = new mongoose.model("Active", activeSchema)