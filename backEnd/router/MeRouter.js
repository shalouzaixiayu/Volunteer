const express = require('express')
const Merouter = express.Router()
const peopleDb = require('../mongodb/PeopleDb')

// 关于我的页面的接口请求操作

// 先生成一些数据
Merouter.get('/test', (req, res, next) => {
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
Merouter.post('/login', (req, res, next) => {
  const info = req.body.obj
  peopleDb.login(info, obj => {
    res.send(JSON.stringify(obj))
  })
})

// 注册 post 
Merouter.post('/register', (req, res, next) => {
  let info = req.body.obj
  PeopleDb.register(info, obj => {
    res.send(JSON.stringify(obj))
  })
})

// 查找所有人
Merouter.get('/allPeople', (req, res, next) => {
  PeopleDb.getAllPeople(data => res.send(JSON.stringify(data)))
})

// 查找一个人 根据 id  和 学号
Merouter.get('/onePeople', (req, res, next) => {
  const info = req.query
  const {
    _id,
    sId
  } = info
  peopleDb.searchByIdAndSid(_id, sId, data => res.send(JSON.stringify(data)))
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

Merouter.get('/bind/:type/:id', (req, res, next) => {
  const {type, id} =  req.params   // 拿到 匹配路由值
  const {payload} = req.query  //  拿到其他值
  switch (type){
    case 1:
      peopleDb.bindAutograph(id, payload, data => res.send(JSON.stringify(data)))
      break;
    case 2:
      peopleDb.bindPoint(id, payload, data => res.send(JSON.stringify(data)))
      break;
    case 6:
      peopleDb.bindNumber(id, payload, data => res.send(JSON.stringify(data)))
      break;
    default: console.log(payload, type, id)
  }
})


module.exports = Merouter