const express = require('express');
const NewRouter = express.Router();
const NewActive = require('../mongodb/newActive');
const multer = require('multer'); //   handle files   下载图片的第三方库
const fs = require('fs');
const path = require('path');

//  处理下载图片插件
const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/news')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: _storage
})

// 上传图片的接口
NewRouter.post('/image:id', upload.array('image', 10), (req, res) => {
  const {
    id
  } = req.params; //  解析 id
  // console.log(req.files);
  const files = req.files;

  // 更改文件名
  if (files.length <= 1) {
    const oldName = path.join('../backEnd', files[0].path);
    const newName = path.join('../backEnd', files[0].destination, `${id.substr(0, 8)}-${files[0].originalname}`);
    fs.rename(oldName, newName, (err) => {
      if (err) throw err;
      console.log('更改Ok')
    });
    // 发送事件
    NewActive.AddImageById(`http://localhost:3000/static/news/${id.substr(0, 8)}-${files[0].originalname}`, id, data => res.send(JSON.stringify(data)))
  } else {
    for (const file of files) {
      const oldName = path.join('../backEnd', file.path);
      const newName = path.join('../backEnd', file.destination, `${id.substr(0, 8)}-${file.originalname}`);
      fs.rename(oldName, newName, (err) => {
        if (err) throw err;
        console.log('更改Ok');
      });
      // 发送事件
      NewActive.AddImageById(`http://localhost:3000/static/news/${id.substr(0, 8)}-${file.originalname}`, id, data => res.send(JSON.stringify(data)))
    }
  }


})


// 管理员发布一个活动数据
NewRouter.post('/active/create', (req, res) => {
  const {
    obj
  } = {
    ...req.body
  }
  NewActive.createActive(obj, data => res.send(JSON.stringify(data)))
})


// 按照页数, 请求活动列表
NewRouter.get('/getNewList', (req, res) => {
  const {
    page,
    count
  } = req.query
  NewActive.getActiveList(page, count, data => {
    res.send(JSON.stringify(data))
  })
})


// 通过id请求某个活动列表
NewRouter.get('/searchById2', (req, res) => {
  // console.log(req.query)
  const {
    id
  } = req.query
  NewActive.searchId(id).then((data) => {
    if (data.length >= 1) {
      res.send(JSON.stringify(data))
    }else {
      res.send("no find id by this id")
    }
  })
})


// 通过主题请求某个活动列表
NewRouter.get('/searchByThema2', (req, res) => {
  const {
    thema
  } = req.query
  NewActive.findActiveThema(thema, true).then((data) => {
    if (data.length >= 1) {
      res.send(JSON.stringify(data))
    }else {
      res.send("no find id by this thema")
    }
  })
})

//  这人参加某活动
NewRouter.get('/enterActive',  (req, res) => {
  const {_id, pId} =  req.query
  NewActive.enterActive(_id, pId, (data) => res.send(JSON.stringify(data)))
})

// 我的活动  得到状态 数据库
NewRouter.get('/enterActive/me', (req, res) => {
  // 根据这个用户的id， 去模糊查询
  const {pId}  = req.query;
  //  算法还没实现 根据这个id  去查找所有活动  如果存在这个获得 就返回获得 
  NewActive.compareMeActive(pId, (data) => res.send(JSON.stringify(data)))
  
})


module.exports = NewRouter;