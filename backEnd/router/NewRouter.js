const express = require('express');
const NewRouter = express.Router();
const NewActive = require('../mongodb/newActive');


// NewRouter.get('/new/active', (req, res, next)=>{
//   res.send('Hello 这是新的路由环境')
//   console.log(req.query)
// })


// 管理员发布一个活动数据
NewRouter.post('/active/create', (req, res, next) => {
  const {obj} = {...req.body}
  NewActive.createActive(obj, data => res.send(JSON.stringify(data)))
})



module.exports = NewRouter;
