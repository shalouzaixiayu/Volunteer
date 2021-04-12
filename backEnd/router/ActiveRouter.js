const express = require('express');
const activeRouter = express.Router();
const activeDb = require('../mongodb/active');


activeRouter.get('/getActiveList', (req, res) => {
  const info = req.query
  const {
    page,
    count
  } = info // 得到参数
  activeDb.getActiveList(page, count, data => {
    res.send(JSON.stringify(data))
  })
})

activeRouter.get('/searchActive', (req, res) => {
  const info = req.query
  const {reTitle, maxCount} = info
  activeDb.searchActiveByTitle(reTitle, maxCount, obj => {
    res.send(JSON.stringify(obj))
  })
})


activeRouter.get('/idSearch', (req, res) => {
  const id = parseInt(req.query.id)
  activeDb.searchActiveById(id, obj => {
    res.send(JSON.stringify(obj))
  })
})


// 删除
activeRouter.get('/deleteActive', (req, res) => {
  const {_id} = req.query
  activeDb.deleteActive(_id, data => res.send(JSON.stringify(data)))
 })

 // 更新
 activeRouter.get('/updateActive', (req, res) => {
  const {_id, newObj} = req.query
  activeDb.updateActive(_id, newObj, data => res.send(JSON.stringify(data)))
 })

module.exports = activeRouter