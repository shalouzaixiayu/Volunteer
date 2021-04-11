// 朋友圈的数据库信息
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/Volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false);


// 数据库架构
const peopleSchema =  new mongoose.Schema({
  // 发布人名字
  // sendName:{
  //   type:String,
  //   default: ""
  // },
  // // 发布i人头像 图片地址
  // sendHeadImg:{
  //   type:String,
  //   default:"",
  // }, 
  // 发布的人 id 其他信息去请求出来 反正图片也要弄接口
  sendId:{
    type:String,
    default:"",
  },
  // 发布的内容
  sendContent:{
    type:String,
    default:"",
  },
  // 发布的时间
  sendTimer:{
    type:Date,
    default: Date.now,
  },
  // 发送内容图片
  sendImg:{
    type:Array,
    default: [],
  },
  // 点赞的人  [{id:''}, {id:''}]
  giveLike:{
    type:Array,
    default:[]
  },
  // 评论人 和 评论信息
  //  [{id:'',  content: ""}]
  giveContent:{
    type:Array,
    default:[]
  },
  // 评论的 相关活动信息
  withActive:{
    type:String,
    default:""
  }
})

const peopleModel = new mongoose.model('peopleTalk', peopleSchema)

// new一个评论信息
function newTalk(obj){
  const _obj = obj instanceof Object ? obj : JSON.parse(obj);
  return  new peopleModel(_obj).save()
}

/**
 *
 * 创建评论信息
 * @param {*} obj  活动对象
 */
 function createTalk(obj, callback) {
  const _obj = obj instanceof Object ? obj : JSON.parse(obj);
  const start = {
    data: null,
    msg: "",
    status: false,
  }
  findTalkById(_obj._id).then(res => {
    if (res.length >= 1) {
      start.msg = "该评论信息已存在！";
      callback(start);
    } else {
      newTalk(_obj).then(data => {
        start.data = data;
        start.msg = 'success';
        start.status = true;
        callback(start);
      })
    }
  })
}

// 发布的图片信息
/**
 *
 * @exports   通过id查找到活动列表，向里面追加活动图片
 * @param {*} nowFileName 图片地址
 * @param {*} id 活动id
 */
 async function AddImageById(nowFileNameList, id, callback) {
  const obj = await findTalkById(id)
  const _obj = obj[0]
  const state = {
    status: false,
    data: null,
    msg: ''
  }
  // 循环加上
  for (const file of nowFileNameList) {
    _obj.sendImg.push(file)
  }
  peopleModel.findOneAndUpdate({
    _id: id
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


// 通过id查找这条评论信息
function findTalkById(_id){
  return peopleModel.find({_id})
}

// 查找所有的评论信息 
function findAllTalk(callback){
  const obj = {
    data:null,
    msg:""
  }
  peopleModel.find().sort({
    sendTimer:-1
  }).then(res => {
    obj.data = res;
    obj.msg = 'success';
    callback(obj);
  })
}

// 点赞  || 取消点赞
/**
 *
 * @exports   通过id查找到活动列表，向里面追加点赞的信息
 * @param {*} _id   活动id
 * @param {*} mode  true 表示 点赞  false 表示取消点赞
 * @param {*} pId  点赞的人id
 */
 async function AddLikeById(_id, mode, pId, callback) {
  const obj = await findTalkById(_id)
  const _obj = obj[0]
  const state = {
    status: false,
    data: null,
    msg: ''
  }
  // 判断是 点赞 还是 取消点赞
  const flag =  _obj.giveLike.filter(item => item === pId);
  if (Array.isArray(flag) && flag.length === 0){
    //  表示没有重复操作
    if (mode === 'true'){
      _obj.giveLike.push(pId)
    }
  }else {
    // 重复操作了  但是可以取消
    if(mode === 'false'){
      _obj.giveLike.splice(_obj.giveLike.findIndex(item => item === pId), 1);
    }
  }

  peopleModel.findOneAndUpdate({
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

// 评论信息
/**  giveContent
 *
 * @exports   通过id查找到活动列表，向里面追加评论的信息
 * @param {*} _id   活动id
 * @param {*} pId  评论人的id
 * @param {*} content 评论人的内容
 */
 async function AddContentById(_id, pId, content,  callback) {
  const obj = await findTalkById(_id)
  const _obj = obj[0]
  const state = {
    status: false,
    data: null,
    msg: ''
  }
  _obj.giveContent.push({pId, content})
  peopleModel.findOneAndUpdate({
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

// 删除评论




module.exports = {
  findTalkById,
  findAllTalk,
  createTalk,
  AddImageById,
  AddLikeById,
  AddContentById,
}

