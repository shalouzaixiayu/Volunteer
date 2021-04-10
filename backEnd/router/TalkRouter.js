const express = require('express');
const talkRouter = express.Router();
const friends =  require('../mongodb/friendsTalk');
const multer = require('multer');  // 处理文件
const fs = require('fs');
const path = require('path');


//  处理评论圈图片函数
const _storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'uploads/talks')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storag:_storage
})


// 朋友圈评论图片 
talkRouter.post('/talk/imgTalk-:talkId', upload.array('image', 10), (req, res) => {
  const {talkId} = req.params;  // 拿到评论圈id信息
  const  files = req.files;

  // 更改文件名
  if (files.length <= 1) {
    const oldName = path.join('../backEnd', files[0].path);
    const newName = path.join('../backEnd', files[0].destination, `${talkId.substr(0, 8)}-${files[0].originalname}`);
    fs.rename(oldName, newName, (err) => {
      if (err) throw err;
      console.log('更改Ok')
    });
    // 发送事件
    friends.AddImageById(`http://localhost:3000/static/talks/${talkId.substr(0, 8)}-${files[0].originalname}`, talkId, data => res.send(JSON.stringify(data)))
  } else {
    for (const file of files) {
      const oldName = path.join('../backEnd', file.path);
      const newName = path.join('../backEnd', file.destination, `${talkId.substr(0, 8)}-${file.originalname}`);
      fs.rename(oldName, newName, (err) => {
        if (err) throw err;
        console.log('更改Ok');
      });
      // 发送事件
      friends.AddImageById(`http://localhost:3000/static/talks/${talkId.substr(0, 8)}-${file.originalname}`, 
      talkId, data => res.send(JSON.stringify(data)))
    }
  }
})


// 点赞或者取消
talkRouter.get('/talk/giveLike', (req, res) => {
  const {_id, mode, pId} = req.query;
  // 评论信息id， 模式， 人的id
  friends.AddLikeById(_id, mode, pId, (data) => res.send(JSON.stringify(data)))
})


// 追加评论信息
talkRouter.get('/talk/giveContent', (req, res) => {
  const {_id, pId, content} = req.query;
  // 评论信息的id 人的id  评论的内容
  friends.AddContentById(_id, pId, content, (data) => res.send(JSON.stringify(data)))
})






// 请求所有信息
talkRouter.get('/talk/getAll', (req, res) => {
  friends.findAllTalk().then(data => res.send(JSON.stringify(data)))
})

// 发布一个新的评论信息  创建评论信息
talkRouter.get('/talk/createTalk', (req, res) => {
  const {obj} = req.query;
  friends.createTalk(obj, (data) => res.send(JSON.stringify(data)))
})




module.exports = talkRouter;