---
title: Vue版CNode社区(一)
description: 'Vue版CNode社区总结'
abbrlink: 12169
date: 2017-06-20 09:43:59
tags:
    - 前端
    - Vue
    - SPA
categories:
    - 技术
---



# Vue版CNode社区介绍



## 预览地址

[预览地址](http://ldqblog.me/vue-CNode/dist/#/)

## 手机可访问二维码

![Vue版CNode](http://ldqblog.me/vue-CNode/static/img/mobile.png)  

## 源码
[GitHub](https://github.com/LDQ-first/vue-CNode)


---

## 起因

做Vue版CNode社区的原因：
    1. 学习Vue全家桶构建项目
    2. CNode社区提供了API
    3. 做一个属于自己的CNode社区，当然仅限于前端

## 技术栈

* **Vue2.2**: [ 前端框架 ]
* **Vuex**: [ 状态管理,组件通信 ] 
* **Vue-router**: [ 配置路由，组件切换 ]
* **Vue-lazyload**: [ 图片懒加载 ]
* **ES6/7**: [ JS版本 ]
* **Webpack**: [ 模块化处理，编译打包 ]
* **Express**: [ 服务器 ]
* **Axios**: [ 基于Promise处理HTTP请求 ]
* **SASS**(**SCSS**): [ css预处理器 ]
* **Normalize.css**: [ 处理浏览器默认样式 ]
* **Font-awesome**: [ 字体图标 ]
* **Moment.js**: [ 处理时间显示 ]
* **Simplemde**: [ markdown编辑器 ]
* **Highlight.js**: [ 语法高亮 ]
* **Flex**: [ 弹性布局 ]
* **Canvas**: [ 首页loading效果，按钮的波纹效果 ]
* **loaclStorge**: [ 本地存储用户信息 ]



### 项目结构

![项目结构思维导图](http://ldqblog.me/vue-CNode/static/img/项目结构.jpg)



### 效果图

![001](http://ldqblog.me/vue-CNode/static/result/001.jpg)  

![002](http://ldqblog.me/vue-CNode/static/result/002.jpg)  

![003](http://ldqblog.me/vue-CNode/static/result/003.jpg)  

![004](http://ldqblog.me/vue-CNode/static/result/004.jpg)  


## 成果

实现了
登录(使用官方提供的access token方法登录)，
回复，发帖，（支持Markdown）
滚动加载更多，（监听scroll事件）
收藏，点赞，
查看消息，（支持已读消息和未读消息）
更换主题色，(利用Vuex，四种主题色可更换)
退出登录
查看个人信息





## 问题

- 没有下拉刷新
- 图片点击查看大图不支持手指缩放，
导致移动端看大图体验差
- 利用Vuex实现的更换主题色方法比较繁琐，
考虑是否有其他更优的方法
- 项目结构有待改善，
纯组件和视图组件应分开，
sass文件单独出来，没有利用到scoped




## 未来

改善问题
优化代码



---

## 下一篇
[Vue版CNode社区(二)](http://ldqblog.me/2017/06/22/Vue%E7%89%88CNode%E7%A4%BE%E5%8C%BA-%E4%BA%8C/)



**感谢CNode社区提供API供人学习**



## 参考资料


**Vue文档**: https://cn.vuejs.org/v2/guide/
**CNode API**: https://cnodejs.org/api



