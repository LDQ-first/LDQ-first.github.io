---
title: Vue版商城(二)
description: ''
abbrlink: 64269
date: 2017-08-18 10:17:45
tags: 
    - 前端
    - Vue
    - SPA
categories:
    - 技术
---


# Vue版商城技术详情



## Vue

Vue配合Vue-Router，Vuex

实现路由跳转，路由过渡，状态管理


Vue-lazyload
头像图片懒加载


Vue-infinite-scroll
滚动加载


Vue-pull-to-refresh
自己开发的下拉刷新（实现插件）



## Axios 

实现api请求等的异步处理


## Express

后端服务器


获取数据get请求
操作数据post请求


利用中间件，路由实现后端逻辑





## MongoDB

数据库

MongoDB 是一个基于文档的数据库，所有数据是从磁盘上进行读写的。
MongoDB善长的是对无模式JSON数据的查询。
MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。
MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。
MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。




### Robomongo

可视化MongeDB工具



## Mongoose

连接数据库和Express

使用promise的调用方式


```

const mongoose = require('mongoose')
const Schema =  mongoose.Schema
mongoose.Promise = global.Promise

const productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    "checked": Number,
    "productNum": Number
})


module.exports = mongoose.model('Good', productSchema)


```


### Api

```
    插入数据
    save

    更新数据
    update

    查找
    find

    查找并更新
    findByIdAndUpdate

    移除
    remove

    数量查询
    count

    根据_id查询
    findById


```

### 变量 

```
　 $or　　　　或关系

　　$nor　　　 或关系取反

　　$gt　　　　大于

　　$gte　　　 大于等于

　　$lt　　　　 小于

　　$lte　　　  小于等于

　　$ne            不等于

　　$in             在多个值范围内

　　$nin           不在多个值范围内

　　$all            匹配数组中多个值

　　$regex　　正则，用于模糊查询

　　$size　　　匹配数组大小

　　$maxDistance　　范围查询，距离（基于LBS）

　　$mod　　   取模运算

　　$near　　　邻域查询，查询附近的位置（基于LBS）

　　$exists　　  字段是否存在

　　$elemMatch　　匹配内数组内的元素

　　$within　　范围查询（基于LBS）

　　$box　　　 范围查询，矩形范围（基于LBS）

　　$center       范围醒询，圆形范围（基于LBS）

　　$centerSphere　　范围查询，球形范围（基于LBS）

　　$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
```



### 使用

```
const Goods = require('../models/goods.js')
mongoose.Promise = global.Promise

var env = process.env.NODE_ENV || 'development'
if(env === 'development') {
    console.log('NODE_ENV: ', env)
    mongoose.connect('mongodb://IP:port/shopdb')
}
else {
  console.log('NODE_ENV: ', env)
  mongoose.connect('mongodb://用户.数据库:password@IP:port/shopdb')
}



router.get('/list', (req, res, next) => {
   const sort = req.query.sort
   const page = req.query.page
   const pageSize = req.query.pageSize
   const priceChecked = req.query.priceChecked
   let params = {}
   let priceGt = '', priceLte = ''
   if(priceChecked !== 'all') {
       switch(priceChecked) {
            case '0': priceGt = 0; priceLte=500; break;
            case '1': priceGt = 500; priceLte=1000; break;
            case '2': priceGt = 1000; priceLte=2000; break;
            case '3': priceGt = 2000; priceLte=4000; break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
        console.log(params)
   }
   
   const skip = (page - 1) * pageSize;
   const goodsModel = Goods.find(params).skip(skip).limit(parseInt(pageSize))

   goodsModel.sort({'salePrice': sort})

   goodsModel.exec((err, doc) => {
       if(err) {
           res.json({
               status: '404',
               msg: err.message
           })
       }
       else {
           res.json({
               status: '200',
               msg: 'OK',
               result: {
                   count: doc.length,
                   list: doc
               }
           })
       }
   })
})


```


### 根据环境连接数据库

```
var env = process.env.NODE_ENV || 'development'
var sessionUrl = ''
if(env === 'development') {
    console.log('app.NODE_ENV: ', env)
    sessionUrl = 'mongodb://IP:port/shopdb'
}
else {
  console.log('app.NODE_ENV: ', env)
  sessionUrl = 'mongodb://用户.数据库:password@IP:port/shopdb'
}

```




## Nginx

### 代理转发



```
upstream vue {
    server 本地IP:port;
}

server {
    listen port;
    # server_name *.主域名;
    server_name  外部IP;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://vue;
        proxy_redirect off;
    }
    location /goods/ {
        proxy_pass http://本地IP:port/goods/;
    }

    location /users/ {
        proxy_pass http://本地IP:port/users/;
    }
    location /vueshop/ {
        alias 路径;
    }
    location ~* ^.+\.(jpg|jpeg|gif|png|svg|ico|webp|css|js|map|pdf|txt)$ {
        root 路径;
    }
}


```


### 开启gzip压缩


sudo vi /etc/nginx/nginx.conf

```
##
# Gzip Settings
##

gzip on;
gzip_disable "msie6";
# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
gzip_min_length 1k;
# 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;
# gzip_proxied any;
# gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间
    gzip_comp_level 4;
    gzip_buffers 16 8k;
# gzip_http_version 1.1;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

```





## PM2

做守护进程, 发布更新项目


使用ecosystem.json 

 pm2 deploy ecosystem.json start

 可以配置服务器ip，指定github仓库
 实现代码更新后快速部署到服务器中

```
{
    "apps":[
        {
            "name":"vueshop",
            "script":"入口脚本",           
            "env": {              //传进去的变量
                "COMMON_VARIABLE": "true"
            },
            "env_production": {
                "NODE_ENV": "production"
            }
        }
    ],
    "deploy": { //部署任务
        "start": { //任务名
            "user": "",//服务器上用来发布应用的user
            "host": ["IP"],
            "port": "port",      
            "ref": "origin/master",
            "repo": "git仓库",
            "path": "", //服务器项目位置
            "ssh_options": "StrictHostKeyChecking=no", //取消key校验
            "post-deploy": "执行的命令行 && pm2 startOrRestart ../ecosystem.json --env production",
            "env": {
                "NODE_ENV": "production"
            }
        }
    }
}
```




## Echarts

数据可视化显示

显示价格趋势，数据来自数据库（自己编的）

显示订单详情



## Svg-captcha

验证码

在考虑要使用验证码时,发现许多相关的npm模块都要
安装其它支持库（C或C++编写，而且平台兼容性极差）

最终在CNode社区发现了以svg为基础的Svg-captcha
> 内部使用 opentype.js ， 把字符转换为 svg 路径，然后生成验证码

简单易用

```

const svgCaptcha = require('svg-captcha')

router.get('/captcha', (req, res, next) => {
  const captcha = svgCaptcha.create({
    background: "#3E96D6"
  })
  req.session.captcha = captcha.text

  res.set('Content-Type', 'image/svg+xml')
  res.json({
    status: '200',
    msg: 'OK',
    result: captcha
  })
})


router.get('/isCaptchaTrue', (req, res, next) => {
  const captcha = req.query.captcha.toLowerCase()
  if (req.session.captcha.toLowerCase() !== captcha) {
    res.json({
      status: '500',
      msg: '验证码有错',
      result: ''
    })
    return
  } else {
    res.json({
      status: '200',
      msg: '验证码正确',
      result: ''
    })
  }
})



```


## session

express 在 4.x 版本之后，session管理和cookies等许多模块都不再直接包含在express中，
而是需要单独添加相应模块。

express4 中操作 cookie 使用 cookie-parser 模块
express4 中操作 session 使用 express-session 模块

session 的运作通过一个 session_id 来进行。session_id 通常是存放在客户端的 cookie 中，
比如在 express 中，默认是connect.sid 这个字段，当请求到来时，
服务端检查 cookie 中保存的 session_id 并通过这个 session_id 与服务器端的 session data 关联起来，
进行数据的保存和修改。


这意思就是说，当你浏览一个网页时，服务端随机产生一个 1024 比特长的字符串，
然后存在你 cookie 中的 connect.sid字段中。
当你下次访问时，cookie 会带有这个字符串，然后浏览器就知道你是上次访问过的某某某，然
后从服务器的存储中取出上次记录在你身上的数据。
由于字符串是随机产生的，而且位数足够多，所以也不担心有人能够伪造。
伪造成功的概率比坐在家里编程时被邻居家的狗突然闯入并咬死的几率还低。



session 可以存放在 1）内存、2）cookie本身、3）redis 或 memcached 等缓存中，或者4）数据库中。


使用session验证用户
session存储在数据库中


app.js

```

配置
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)



app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串  
 //作为服务器端生成session  cookie的签名 ，防止篡改 ,
  //通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
 name: 'user',         
 // cookie的名字 保存 session 的字段名称,返回客户端的key的名称，默认为connect.sid,也可以自己设置。
 resave:  false,
 //强制保存session即使它并没有变化 （默认： true）
 //saveUninitialized:
 //初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
cookie:  { maxAge: 60 * 1000 * 60 * 24 * 7 },
//session cookie设置 设置返回到前端key的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
//genid - 生成新session ID的函数 （默认使用uid2库）
 //rolling: false,
 //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
//proxy: true,
// 当设置了secure cookies（通过”x-forwarded-proto” header ）时信任反向代理。当设定为true时，
//”x-forwarded-proto” header 将被使用。
//当设定为false时，所有headers将被忽略。当该属性没有被设定时，将使用Express的trust proxy。
saveUninitialized: false,
// 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于
//未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）
// unset
// 控制req.session是否取消（例如通过 delete，或者将它的值设置为null）。这可以使session保持存储
// 状态但忽略修改或删除的请求（默认：keep）
//session存储实例
  store: new mongoStore({
  //  db: 'VueShop',
    url: sessionUrl,
    collection: 'sessions'
  })
}))




```


使用

routes
    user.js



```


//登录
router.post('/login', (req, res, next) => {
  const captcha = req.body.captcha.toLowerCase()
  console.log(captcha)
  console.log(req.session.captcha.toLowerCase())
  if (req.session.captcha.toLowerCase() !== captcha) {
    res.json({
      status: '500',
      msg: '验证码有错',
      result: ''
    })
    return
  }
  console.log('param')
  const param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }

  User.findOne(param)
    .then(doc => {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7
        })

        req.session.user = {
          userName: doc.userName,
          userId: doc.userId
        }
        res.json({
          status: '200',
          msg: 'OK',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.json({
          status: '400',
          msg: '用户名或者密码错误',
          result: ''
        })
      }
    })
    .catch(err => {
      res.json({
        status: '404',
        msg: err.message,
        result: ''
      })
    })

})
```