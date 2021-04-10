const express = require('express');
const Merouter = express.Router();
const peopleDb = require('../mongodb/PeopleDb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


//  处理下载图片插件
const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/headImgs')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: _storage
})

// 给用户上传头像
Merouter.post('/addHeadImg-:_id', upload.array('image', 1), (req, res) => {
  const {_id} = req.params; //  解析 id
  const files = req.files;

  // 更改文件名
  if (files.length <= 1) {
    const oldName = path.join('../backEnd', files[0].path);
    const newName = path.join('../backEnd', files[0].destination, `${_id.substr(0, 8)}-${files[0].originalname}`);
    fs.rename(oldName, newName, (err) => {
      if (err) throw err;
      console.log('更改Ok')
    });
    // 发送事件
    peopleDb.AddImageById(`http://localhost:3000/static/headImgs/${_id.substr(0, 8)}-${files[0].originalname}`, _id, data => res.send(JSON.stringify(data)))
  } 
})





// 关于我的页面的接口请求操作








// 先生成一些数据
Merouter.get('/test', (req, res) => {
  peopleDb.getPeopleNumber(data => {
    if (data.length < 5) {
      peopleDb.generatePeople(5, data => res.send(JSON.stringify(data)))
    } else {
      peopleDb.getAllPeople(data => {
        res.send(JSON.stringify(data))
      })
    }
  })
})
// 登陆 Post
Merouter.post('/login', (req, res) => {
  const info = req.body.obj
  peopleDb.login(info, obj => {
    res.send(JSON.stringify(obj))
  })
})

// 注册 post 
Merouter.post('/register', (req, res) => {
  let info = req.body.obj
  peopleDb.register(info, obj => {
    res.send(JSON.stringify(obj))
  })
})

// 查找所有人
Merouter.get('/allPeople', (req, res) => {
  peopleDb.getAllPeople(data => res.send(JSON.stringify(data)))
})

// 查找一个人 根据 id  和 学号
Merouter.get('/onePeople', (req, res) => {
  const info = req.query
  const {
    _id,
  } = info
  peopleDb.searchByIdAndSid(_id, data => res.send(JSON.stringify(data)))
})


// 删除学生信息
Merouter.get('/deletePeople', (req, res) => {
  const {_id} = req.query
  peopleDb.deletePeople(_id, data => res.send(JSON.stringify(data)))
 })

 // 更新学生信息
 Merouter.get('/updatePeople', (req, res) => {
  const {_id, newObj} = req.query
  peopleDb.updatePeople(_id, newObj, data => res.send(JSON.stringify(data)))
 })

// 各种杂项
// const findType = {
//   autograph: '/bind/1', // 个性签名
//   point: '/bind/2', // 积分
//   image: '/bind/3', // 图片
//   comment: '/bind/4', // 评论
//   study: '/bind/5', //学习记录
//   phone: '/bind/6', // 绑定手机
// }

Merouter.get('/bind/:type/:id', (req, res) => {
  const {type, id} =  req.params   // 拿到 匹配路由值
  const {payload} = req.query  //  拿到其他值
  switch (parseInt(type)){
    case 1:
      peopleDb.bindAutograph(id, payload, data => res.send(JSON.stringify(data)))
      break;
    case 2:
      peopleDb.bindPoint(id, payload, data => res.send(JSON.stringify(data)))
      break;
    case 3:
      peopleDb.bindImage(id, payload, data => res.send(JSON.stringify(data)))
      break;
    case 4:
      peopleDb.bindCom(id, payload, data => res.send(JSON.stringify(data)))
      break;
    case 5:
      peopleDb.bindStudy(id, payload, data => res.send(JSON.stringify(data)))
      break;
    case 6:
      peopleDb.bindNumber(id, payload, data => res.send(JSON.stringify(data)))
      break;
    // default: console.log(type, payload)
  }
})


module.exports = Merouter