const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Merouter = require('./router/MeRouter') // 处理我的页面
const port = 8080

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(Merouter)

app.listen(port, () =>{
  console.log(`Listening on http://localhost:${port}`)
})
