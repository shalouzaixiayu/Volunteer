const express = require('express');
const activeRouter = express.Router();
const activeDb = require('../mongodb/active');


activeRouter.get('/getActiveList', (req, res, next) => {
  const info = req.query
  const {
    page,
    count
  } = info // 得到参数
  activeDb.getActiveList(page, count, data => {
    res.send(JSON.stringify(data))
  })
})

activeRouter.get('/searchActive', (req, res, next) => {
  const info = req.query
  const {reTitle, maxCount} = info
  activeDb.searchActiveByTitle(reTitle, maxCount, obj => {
    res.send(JSON.stringify(obj))
  })
})


activeRouter.get('/idSearch', (req, res, next) => {
  const id = parseInt(req.query.id)
  activeDb.searchActiveById(id, obj => {
    res.send(JSON.stringify(obj))
  })
})


module.exports = activeRouter