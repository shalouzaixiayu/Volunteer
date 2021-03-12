const express = require('express');
const activeRouter = express.Router();
const activeDb = require('../mongodb/active');


activeRouter.get('/getActiveList', (req, res, next)=>{
  const info = req.query
  const {page, count} = info    // 得到参数
  activeDb.getActiveList(page, count, data => {
    res.send(JSON.stringify(data))
  })
})

module.exports = activeRouter