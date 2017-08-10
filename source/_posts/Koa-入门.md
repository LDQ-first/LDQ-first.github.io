---
title: Koa 入门
description: '参考阮一峰老师的Koa入门教程'
abbrlink: d0f2c321
date: 2017-08-10 13:56:00
tags: 
   - node 
   - Koa
   - 后端
categories: 
   - 技术
---


# Koa入门

## 准备

> Node版本必须7.6以上

克隆代码库

> git clone https://github.com/ruanyf/koa-demos.git

## 一、基本用法

### 1 开启HTTP服务器

```
const Koa = require('koa');
const app = new Koa();

app.listen(3000);
```

### 2 Context对象

Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容。

```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);
```

![image.png](http://upload-images.jianshu.io/upload_images/3563580-32b69cd94b58aced.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


ctx.response 代表 HTTP Response
ctx.request 代表 HTTP Request

### 3 response 类型

Koa 默认的返回类型是text/plain


![image.png](http://upload-images.jianshu.io/upload_images/3563580-cec6dc9a5a3d7674.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


ctx.request.accepts 用来判断客户端希望接受什么数据
ctx.response.type 指定返回类型

```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {

if (ctx.request.accepts('xml')) {

    ctx.response.type = 'xml';

    ctx.response.body = '<data>Hello World</data>';

} else if (ctx.request.accepts('json')) {

    ctx.response.type = 'json';

    ctx.response.body = { data: 'Hello World' };

} else if (ctx.request.accepts('html')) {

    ctx.response.type = 'html';

    ctx.response.body = '<p>Hello World</p>';

} else {

    ctx.response.type = 'text';

    ctx.response.body = 'Hello World';

}

};

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-83caa8dd754ae06e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-df6ccc66b21c55da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-0d84b50c0498d5dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 4 读取模板文件

```
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

const main = ctx => {

ctx.response.type = 'html';

ctx.response.body = fs.createReadStream('./demos/template.html');

};

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-6cfaa24a42e6277d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 二、路由

### 1 原生路由

ctx.request.path
可获取用户请求的路径

```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {

if (ctx.request.path !== '/') {

ctx.response.type = 'html';

ctx.response.body = '<a href="/">Index Page</a>';

} else {

        ctx.response.body = 'Hello World';

}

};

app.use(main);
app.listen(3000);
```

![image.png](http://upload-images.jianshu.io/upload_images/3563580-efda28165ef1c82e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![image.png](http://upload-images.jianshu.io/upload_images/3563580-6e9b906b2762e116.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 2 koa-router

route.get(path, callback)
callback 指定ctx.response.type 和 ctx,response.body

```
const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const about = ctx => {

ctx.response.type = 'html';

ctx.response.body = '<a href="/">Index Page</a>';

};

const main = ctx => {
        ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-6ba08211d1b585a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-ae9d621c3e1b02a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-6e274232aaba6562.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-52627f567dc12140.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 3 静态资源

koa-static处理静态资源

```
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-51fc1d1d22dd591b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-c10a8f130e9bef9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-32fb0ac20d841137.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 4 302重定向

ctx.response.redirect()

```
const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const redirect = ctx => {
    ctx.response.redirect('/');
};

const main = ctx => {
    ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/redirect', redirect));

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-d49041f899983618.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 三、 中间件

### 1 logger

打印日志

```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {

console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);

ctx.response.body = 'Hello World';

};

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-e3ba60c3e0d8d612.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 2 中间件的概念

logger函数就叫做"中间件"（middleware），因为它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。

基本上，Koa 所有的功能都是通过中间件实现的，前面例子里面的main也是中间件。
参数 context 对象， next 函数 （将执行权限交给下一个中间件）

```
const Koa = require('koa');
const app = new Koa();

const logger = (ctx, next) => {

console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);

next();

}

const main = ctx => {
ctx.response.body = 'Hello World';
};

app.use(logger);
app.use(main);
app.listen(3000);
```

### 3 中间件栈

多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

> 1. 最外层的中间件首先执行。
> 2. 调用next函数，把执行权交给下一个中间件。    
> 3. ...  
> 4. 最内层的中间件最后执行。  
> 5. 执行结束后，把执行权交回上一层的中间件。  
> 6. ...  
> 7. 最外层的中间件收回执行权之后，执行next函数后面的代码。  

```
const Koa = require('koa');
const app = new Koa();

const one = (ctx, next) => {

console.log('>> one');

next();

console.log('<< one');

}

const two = (ctx, next) => {

console.log('>> two');

next();

console.log('<< two');

}

const three = (ctx, next) => {

console.log('>> three');

next();

console.log('<< three');

}

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-578836fa12375529.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


如果没有next，中间件就不会往内层的中间件执行 而会返回外层中间件

把two的next注释掉


![image.png](http://upload-images.jianshu.io/upload_images/3563580-5f85230c6e1857aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 4 异步中间件

```
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async function (ctx, next) {
ctx.response.type = 'html';
ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};

app.use(main);
app.listen(3000);
```

async await 处理异步

### 5 中间件的合成

koa-compose将多个中间件合并成一个

```
const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const logger = (ctx, next) => {

console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);

next();

}

const main = ctx => {
    ctx.response.body = 'Hello World';
};

const middlewares = compose([logger, main]);

app.use(middlewares);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-022a1b9a9ed7ab00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-a2cebd71f3c7e6ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 四、错误处理

### 500错误

500状态码 —— 代码运行错误

ctx.throw 抛出错误

ctx.throw(500) 抛出500错误

```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-a8b4b900929fc3d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-5735b99604f5fe9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](http://upload-images.jianshu.io/upload_images/3563580-759028ee17851586.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-20eff4f2acbc2499.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 2 404错误

ctx.response.status = 404 相当于 ctx.throw(404) 返回404错误

```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
};

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-efbe181b5321d060.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-feb318b8207c51a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 3 处理错误的中间件

让最外层中间件负责处理所有中间件的错误

```
const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-b6a9a47929347e68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-1e9ed4f3b201c457.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 4 error 事件的监听

监听error事件也可以处理错误

```
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(500);
};

app.on('error', (err, ctx) => {
  console.error('server error', err);
});

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-5a622ff8b674cb25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-f0dd9f99ad67697b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 5 释放error事件

被try ... catch 捕获的错误不会触发error事件

要调用ctx.app.emit(),手动释放error事件

```
const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx);
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.on('error', function(err) {
  console.log('logging error ', err.message);
  console.log(err);
});

app.use(handler);
app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-7d43b2ac6e8bbf7e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-506388f40095a28d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](http://upload-images.jianshu.io/upload_images/3563580-ace175d9f131f842.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 五、Web App的功能

### 1 Cookies

ctx.cookies 读写Cookie
ctx.cookies.get() 获得Cookie
ctx.cookies.set() 设置Cookie

```
const Koa = require('koa');
const app = new Koa();

const main = function(ctx) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + ' views';
}

app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-36da76974f1f7466.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-1dd21f5fa547ce7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-6878538e8bc07385.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> 每刷新一次就会跟增加一次

![image.png](http://upload-images.jianshu.io/upload_images/3563580-f291e8cb41e4a452.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-fbbf9a5527cfc00a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-1f41e0f27dbcf93f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 2 表单

Web 应用离不开处理表单。本质上，表单就是 POST 方法发送到服务器的键值对。

koa-body 用来从POST请求体中提取键值对

```
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const main = async function(ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name };
};

app.use(koaBody());
app.use(main);
app.listen(3000);
```


![image.png](http://upload-images.jianshu.io/upload_images/3563580-b1b4ea7178e40045.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![image.png](http://upload-images.jianshu.io/upload_images/3563580-5a56b2cd0f4e2c0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

POST 方法向服务器发送一个键值对，会被正确解析。如果发送的数据不正确，就会收到错误提示。

打开新的命令行窗口

输入

curl -X POST --data "name=Jack" localhost:3000


![image.png](http://upload-images.jianshu.io/upload_images/3563580-1f6bd2a2ae6af739.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

curl -X POST --data "name" localhost:3000


![image.png](http://upload-images.jianshu.io/upload_images/3563580-bdee1f7139fdeb35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 3 文件上传

koa-body 处理文件上传

```
const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');

const app = new Koa();

const main = async function(ctx) {
  const tmpdir = os.tmpdir();
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    console.log(filePath)
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(main);
app.listen(3000);
```

在新的命令行窗口输入

curl --form upload=@/path/to/file http://localhost:3000

/path/to/file替换成真实路径

curl --form upload=@/D:/Nodejs/other/koa-demos/demos/21.js http://localhost:3000


![image.png](http://upload-images.jianshu.io/upload_images/3563580-7c57a9a9333dccf7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)   





## 参考资料 

**Koa 框架教程 by 阮一峰**：<http://www.ruanyifeng.com/blog/2017/08/koa.html>

 
