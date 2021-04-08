const express = require('express');
const talkRouter = express.Router();
const friends =  require('../mongodb/friendsTalk');


// 请求所有信息
talkRouter.get('/talk/getAll', (req, res) => {
  friends.findAllTalk().then(data => res.send(JSON.stringify(data)))
})

// 


module.exports = talkRouter;