---
title: Vue 简介
description: 'Vue 入门简单介绍'
abbrlink: 7418
date: 2017-06-06 22:46:11
tags: 
    - 前端
    - Vue
categories:
    - 技术
---

# Vue 简介

## 简介

> Vue 是一套构建用户界面的渐进式MVVM框架  
Vue 的核心库只关注视图层，将路由交给 Vue-Router ，状态管理交给 Vuex 


### 核心概念和关键词



template
data 
methods 
components 

计算属性 
watch


#### 计算属性 vs watch

> 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的 watcher。  
这是为什么 Vue 通过 watch 选项提供一个更通用的方法，来响应数据的变化。  
当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。  


指令 
插件 
生命周期 
响应式
过渡
混合 
过滤器



路由
状态管理
服务端渲染 
单元测试


api 
风格指南



生态


### 使用


安装好nodejs,有命令行工具

在命令行工具中


```
npm install -g vue-cli
vue init webpack myProject
cd myProject
npm install
npm run dev
```

浏览器会自动打开 http://localhost:8080/#/  (opn模块)

写完代码

npm run build 构建打包

生成的dist文件夹就是要发布的文件






#### 用到的文件

build 和 config 文件夹

webpack 配置，可以自己修改

一般改config/index.js的 build assetsPublicPath，这是打包后的静态文件的路径前添加的路径
因为线上路径和开发路径很多时候有所不同

如: assetsPublicPath: '/vue-CNode/dist/'



dev proxyTable

配置代理
用于解决开发时的跨域问题



```

proxyTable: {
      '/goods': {
          target: 'http://localhost:3000'
      },
      '/goods/*': {
          target: 'http://localhost:3000'
      },
      '/users/**': {
          target: 'http://localhost:3000'
      }
    },

```


src  编写代码

一种项目的录结构

   assets 静态资源
   Components 组件
   router 路由
   store vuex
   util 工具脚本
   views 路由组件
   App.vue 根组件
   main.js 入口文件

static 
  静态资源



#### assets 和 static 的区别


assets：
一般存放开发过程中自己写的静态资源
（image, css, js等，如：shop.css, car.png, roomListUtil.js）

static：
存放第三方静态资源（jquery.js, bootstrap.css等），
这里的资源一般是直接引用，当打包编译后assets中的静态资源也会编译到static目录下，
这样原来引用static资源的地址也不用改变。
最后编译发布的时候会将所有的静态资源整合到 /dist/static/ 目录下，当然也可以自定义其他路径。



index.html
    模板HTML文件 



#### Vue的页面架构流程


![vue.png](http://upload-images.jianshu.io/upload_images/3563580-ddbf4fee1d6de4c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




### 独立构建 运行时构建



一、独立构建包含模板编译器，运行时构建不包含模板编译器。
二、模板编译器的作用就是将template选项编译成render函数，render函数是渲染的关键。
三、鉴于以上两点，使用运行时构建时，不能出现template选项，因为此时没有模板编译器。
但是有一种情况除外：即webpack+vue-loader情况下单文件组件中出现template是可以的。
四、使用vue-cli生成项目时，会提醒使用哪种构建方式，npm包默认导出的是运行时构建，
如果需要使用独立构建，需要在webpack中配置alias(设置 alias 为 vue.common.js)
五、目前暂时发现的两者的应用场景上的区别有：

需要注意Vue实例化时的方式，运行时构建方式下实例化Vue时，不要出现template属性
index.html中不要出现template或者是通过vue-router渲染的route-view

运行时构建一定要render函数

```
new Vue({
    el: '#app',
    render: h => h(App)
})


独立构建，是指可以在 html 里放置模板，并在 Vue 实例选项中通过 el 指定模板元素（同时也是挂载元素）

```




## 框架对比

#### Vue 和 React 的共同点

使用 Virtual DOM
提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件
将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库




#### Vue的优势

在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，
所以系统能精确知晓哪个组件确实需要被重渲染。
React 由于 发生变化时会重新渲染整个组件树，所以需要做一些额外的优化工作
(PureComponent shouldComponentUpdate Immutable Reselect)


vue的template模板就是HTML写法，比起jsx更容易编写和理解

vue在每个单文件组件中可以访问自己独立的css module，
在style标签里添加一个属性scoped，不会污染全局

vue提供大量的指令来简化开发中的重复劳动
如：v-for 可以构建循环，在React中要自己写（使用map构建）

Vue 设置样式的默认方法是单文件组件里类似 style 的标签



#### Vue的劣势

生态比不上React

在原生开发中，Weex 还没有 React Native 成熟






#### Vue 与 Angular1


在 API 与设计两方面上 Vue.js 都比 AngularJS 简单得多


Vue.js 是一个更加灵活开放的解决方案。它允许你以希望的方式组织应用程序，
而不是在任何时候都必须遵循 AngularJS 制定的规则，这让 Vue 能适用于各种项目。


AngularJS 使用双向绑定，Vue 在不同组件间强制使用单向数据流。
这使应用中的数据流更加清晰易懂。


在 Vue 中指令和组件分得更清晰。指令只封装 DOM 操作，
而组件代表一个自给自足的独立单元——有自己的视图和数据逻辑。
在 AngularJS 中两者有不少相混的地方。

Vue 有更好的性能，并且非常非常容易优化，因为它不使用脏检查。





#### Vue 与 Angular2

Vue 和 TS 的整合可能不如 Angular 那么深入
在中小型规模的项目中，引入 TS 可能并不会带来太多明显的优势。
在这些情况下，用 Vue 会是更好的选择，
因为在不用 TS 的情况下使用 Angular 会很有挑战性。



## 参考资料

**Vue文档**: https://cn.vuejs.org/v2/guide/




