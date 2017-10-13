---
title: React版动态简历
description: ''
abbrlink: 27968
date: 2017-08-23 10:19:10
tags: 
    - 前端
    - React
categories:
    - 技术
---

**[预览地址](http://ldqblog.me/react-animating-resume/build/)**

## 技术

- React  前端框架
- ES6/7 采用最新JS语法
- Async/Await Promise 用于处理异步事件流
- Marked 识别markdown语法
- Prismjs/react-prism 实现语法高亮
- styled-components 在JS中写CSS
- classnames 处理className
- Express create-react-app 自带服务器
- icomoom.css 字体图标


## 总结
> 利用 Async/Await Promise 实现按步骤绘制动态简历  
> 实现了加速、播放、暂停、跳过、重来、下载PDF等功能
> 用于FireFox显示pdf排版有错，所以遇到Firefox时，点击下载PDF后没有预览而采用直接下载


## 原理

定时的在页面添加字符串

用一定的方法解析字符串

如字符串内容为CSS就添加到style标签中

如字符串内容为HTML和markdown就用marked模块解析






