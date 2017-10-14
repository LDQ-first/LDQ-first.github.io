---
title: react 生命周期
description: 'react 生命周期梳理'
abbrlink: 52152
date: 2017-09-26 09:40:21
tags:
    - 前端
    - React
categories:
    - 技术
---

## 生命周期 



- 每个生命周期钩子的调用例子讲解的比较详细

[一个react生命周期例子](https://github.com/LDQ-first/react-lifecycle)


[源码](https://github.com/LDQ-first/react-lifecycle)




生命周期钩子的函数

React 的生命周期包括三个阶段：mount（挂载）、update（更新）和 unmount（移除）


mount阶段


```
 constructor()   - 初始化 props 和 state
 componentWillMount() - 将要挂载了!
 render()             - 将return里的内容挂载到页面中
 componentDidMount()  - 挂在完了要干点什么?

```


update阶段


```
componentWillReceiveProps(nextProps) - 我要读取 props 啦！
shouldComponentUpdate(nextProps, nextState) - 请问要不要更新组件？true / false
componentWillUpdate() - 我要更新组件啦！
render() - 更新！
componentDidUpdate() - 更新完毕啦！

```


unmount阶段


```
componentWillUnmount() - 我要死啦！

```





setState 应该放在哪？

一般，我们只在这几个钩子里 setState：


```
componentWillMount  -  一个组件只执行一次
componentDidMount   -  一个组件只执行一次
componentWillReceiveProps  - 每次数据更新时执行一次

```

因为在componentWillUpdate 和 componentDidUpdate 里 setState 后
又会触发这两个钩子，最终会导致call stack 溢出



