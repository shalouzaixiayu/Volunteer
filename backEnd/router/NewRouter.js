const express = require('express');
const NewRouter = express.Router();
const NewActive = require('../mongodb/newActive');
const multer = require('multer'); //   handle files
const path = require('path');

function changeFileName(name) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/news')
    },
    filename: function (req, file, cb) {
      cb(null, name.substring(0, 10) + '-' + file.originalname)
    }
  })
}

// 函数更改图片的保存位置
const _storage = changeFileName('123456')

const upload = multer({
  storage: _storage
})


// 管理员发布一个活动数据
NewRouter.post('/active/create', (req, res, next) => {
  const {
    obj
  } = {
    ...req.body
  }
  NewActive.createActive(obj, data => res.send(JSON.stringify(data)))
})


// 按照页数, 请求活动列表
NewRouter.get('/getNewList', (req, res, next) => {
  const { page, count } = req.query 
  NewActive.getActiveList(page, count, data => {
    res.send(JSON.stringify(data))
  })
})


// 上传图片的接口
NewRouter.post('/image:num', upload.array('image', 10), (req, res, next) => {
  // console.log(req.params)
  console.log(req.files)
})



module.exports = NewRouter;