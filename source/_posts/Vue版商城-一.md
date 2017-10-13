---
title: Vue版商城(一)
description: ''
abbrlink: 15273
date: 2017-08-15 10:10:51
tags: 
    - 前端
    - Vue
    - SPA
    - Express
    - MongoDB
    - Mongoose
    - Linux
    - 阿里云
    - Nginx
categories:
    - 技术
---



# Vue版商城介绍


## 预览地址

[预览地址](http://39.108.141.131/vueshop/#/)


## 部署

> 部署在阿里云  
> 采用Nginx进行代理转发  
> PM2做守护进程



![注意](http://ldqblog.me/Vue-shop/static/font/%E6%B3%A8%E6%84%8F.svg)

<h2 style="font-size: 26px; color: red;">注意存在的问题</h2>
<p style="font-size: 24px; line-height: 1.5; font-weight: bold;"> 
    由于域名没有备案，所以用ip访问，防止被阿里云封<br>
    由于没有使用Https[国内的免费证书都要备案域名]<br>  
    Chrome，Firefox等遇到 &lt;input type="password"&gt; 会报不安全<br>  
    并非代码本身有问题<br>  
</p>



## 源码
[GitHub](https://github.com/LDQ-first/Vue-shop)

---

## 起因


做Vue版商城的原因：
    1. 了解前后端通信
    2. 了解服务器部署
    3. 了解MongoDB
    4. 了解Nginx






## 技术栈
* **Vue2.3**: [ 前端框架 ]
* **Vuex**: [ 状态管理,组件通信 ] 
* **Vue-router**: [ 配置路由，组件切换 ]
* **Vue-lazyload**: [ 图片懒加载 ]
* **Vue-infinite-scroll**: [ 滚动加载 ]
* **Vue-pull-to-refresh**: [ 自己开发的下拉刷新 ]
* **ES6/7**: [ JS版本 ]
* **Webpack**: [ 模块化处理，编译打包 ]
* **Express**: [ 服务器 ]
* **Mongoose**: [ 连接MongoDB数据库 ]
* **Nginx**: [ 代理转发，gzip压缩等 ]
* **PM2**: [ 做守护进程, 发布更新项目 ]
* **Axios**: [ 基于Promise处理HTTP请求 ]
* **SASS**(**SCSS**): [ css预处理器 ]
* **Flex**: [ 弹性布局 ]
* **loaclStorge**: [ 本地存储用户信息 ]
* **Echarts**: [ 数据可视化显示 ]
* **Svg-captcha**: [ 验证码 ]



### 效果图

![01](http://ldqblog.me/Vue-shop/img/VShop/01.jpg) 



## 成果

实现登录，注册，
添加删除购物车，添加删除地址，
完成订单，查看订单详情， 
下拉刷新



## 问题



没有备案, 没有使用HTTPS，导致chrome提示不安全




## 参考资料


**Vue文档**: https://cn.vuejs.org/v2/guide/
**Mongoose文档**: http://mongoosejs.com/
**Mongodb文档**: https://docs.mongodb.com/



