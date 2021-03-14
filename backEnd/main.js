 const express = require('express')
 const app = express()
 const bodyParser = require('body-parser')

 const Merouter = require('./router/MeRouter') // 处理我的页面
 const activeRouter = require('./router/ActiveRouter') // 处理活动列表


 const port = 3000

 app.use(bodyParser.urlencoded({
   extended: false
 }))

 app.use(bodyParser.json())

 // 跨域问题解决  cors  没啥效果 
 //  app.use(cors({
 //    origin:['*'], // 请求网址  母前只能用本地域名请求  * 表示所有
 //    methods:['GET', 'POST']
 //  }))

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


 app.listen(port, () => {
   console.log(`Listening on http://localhost:${port}`)
 })