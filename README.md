# 我爱我志愿

## 技术栈:
  🔥基于Vue、Node.js(Express)、MongoDB搭建的志愿者移动端&后台系统admin
  
## 下载开始
+ 以git打开终端环境
+ `mkdir volunteer`
+ `git clone git@github.com:shalouzaixiayu/Volunteer.git`
+ `cd Volunteer`


## 项目开始
+ 下载插件依赖
```
npm install 
```

+ 开启express  ` cd .\backEnd\`   `nodemon .\main.js`
+ 输入网站 `http://localhost:3000/test` 生成本次数据库的集合， 同时生成五个超级管理员帐号信息.
+ 自行安装mongodb 并将项目中的 [测试文件](./Volunteer.actives.json)  导入到本次数据库中。
+ 开启Vue.js   `npm run serve`
+ 开启mongodb  `mongod --dbpath (数据库文件)[eg: D:\mongodb\data\db]`
+ 连接数据库   `mongo`
+ 打开网站 `http://localhost:8080/`
+ 开启服务