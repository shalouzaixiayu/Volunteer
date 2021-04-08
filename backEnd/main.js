 const express = require('express')
 const app = express()
 const bodyParser = require('body-parser')
 const path = require('path');

 const Merouter = require('./router/MeRouter') // 处理我的页面
 const activeRouter = require('./router/ActiveRouter') // 处理活动列表
 const NewRouter  = require('./router/NewRouter')  // 处理新活动
 const talkRouter = require('./router/TalkRouter') // 处理评论圈

 const port = 3000

//  http://localhost:3000/static/news/1.png
 app.use('/static', express.static(path.join(__dirname, 'uploads')))


 
 app.use(bodyParser.urlencoded({
   extended: false
 }))

 app.use(bodyParser.json())

 // 跨域问题解决  cors  没啥效果 
 //  app.use(cors({
 //    origin:['*'], // 请求网址  母前只能用本地域名请求  * 表示所有
 //    methods:['GET', 'POST']
 //  }))

 // 搞定跨域问题
 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
   res.header('X-Powered-By', '3.2.1')
   if (req.method === 'OPTIONS') {
     res.send(200);
   } else {
     next();
   }
 });

 app.use(Merouter)
 app.use(activeRouter)
 app.use(NewRouter)
 app.use(talkRouter)


 app.listen(port, () => {
   console.log(`Listening on http://localhost:${port}`)
 })