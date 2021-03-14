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
  let info = req.body
  peopleDb.login(info, obj => {
      res.send(JSON.stringify(obj))
  })
})

// 注册 post 
Merouter.post('/register', (req, res, next) => {
  let info = req.body
  let status = info.name && info.password &&
    info.sId && info.faculty && info.class || undefined
  if (status) {
    PeopleDb.register(info, obj => {
      res.send(JSON.stringify(obj))
    })
  } else {
    res.send("注册有误!")
  }
})

module.exports = Merouter