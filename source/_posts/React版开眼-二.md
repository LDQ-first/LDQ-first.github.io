---
title: React版开眼(二)
description: ''
abbrlink: 60958
date: 2017-09-25 10:18:44
tags: 
    - 前端
    - React
    - SPA
categories:
    - 技术
---


# React版开眼技术详情


## React 


配合React-Router 4 , Redux, Immutable, Reselect 使用

React 层面分为路由组件（views文件夹中）
和非路由组件（components文件夹中）

利用Redux进行路由组件的状态管理，
利用Redux-think（让dispatch接受函数做参数），
 async/await（处理异步）
与 componentWillMount 等生命周期实现api请求


利用Prop进行路由组件和非路由组件的通信, 
propTypes作为Prop的类型检查

```
 static get propTypes() { 
        return { 
            location: PropTypes.obj.isRequired,
            history: PropTypes.obj.isRequired,
            match: PropTypes.obj.isRequired,
            IndexData: PropTypes.object,
            getIndexData: PropTypes.func,
            getSearchData: PropTypes.func,
        }
    }

```


利用Bundle组件实现路由异步加载（官网有示例）

利用Immutable(不可变的数据结构), Reselect(避免不必要的stroe更新)优化Redux



## 第三方UI框架

使用Material-UI框架中的组件
配合Styled-components使用
提高开发效率



## 跨域

利用 https://bird.ioliu.cn 跨域

理由
    开眼api不支持jsonp跨域，
    第三方API实现CORS跨域，需要使用服务端
     https://bird.ioliu.cn 简单易用




## Immutable(不可变的数据结构)

[文档](http://facebook.github.io/immutable-js/docs/#/)

> Immutable.js是一个完全独立的库，并非React一家独有，无论基于什么框架都可以用它。 
弥补了Javascript没有不可变数据结构的问题
Immutable Data是指一旦被创造后，就不可以被改变的数据
Immutable.js提供了7种不可变的数据结构：List, Stack, Map, OrderedMap, Set, OrderedSet, Record 


在JS中，由于引用类型会指向同一个地址,所以更新一个会影响其他的
在复杂开发中会影响性能

```
a = { a: 1 }
b = a 
b.a = 10
a.a => 10

```

解决方法有利用浅拷贝和深拷贝的

```
var  defaultObj = { /* 默认值 */}
var Obj = $.extend({}, defaultObj, initObj) // jQuery用法。initObj是自定义值
var Obj = $.extend(true, {}, defaultObj, initObj) // 如果对象是多层的，就用到深拷贝了

```

Object.assign 和Object.freeze 是浅拷贝

利用ImmutableJS

```
var defaultObj = Immutable.fromJS({/* 默认值 */})
var Obj = defaultObj.merge(initObj) //defaultObj不会改变，返回新值给Obj
var Obj = defaultObj.mergeDeep(initObj) //深merge
```


ImmutableJS的性能在于通过通过structural sharing, 改变父子节点关系来更新数据
修改数据的时候就检查差异，不变返回原引用，有变化则直接返回一个新的引用
深拷贝需要递归遍历整个对象




### 为什么要在React.js中使用Immutable.js

React.js是一个UI = f(states)的框架，为了解决更新的问题，
React.js使用了virtual dom，virtual dom通过diff修改dom，来实现高效的dom更新。
但是当state更新时，如果数据没变，也会去做virtual dom的diff，这就产生了浪费。

可以利用PureRenderMixin，但PureRenderMixin只是简单的浅比较，不使用于多层比较

所以使用Immutable.js 实现 Immutable Data



![000](http://ldq-first.github.io/img/Immutable/000.gif)



## Reselect(避免不必要的stroe更新)


mapStateToProps也被叫做selector，在store发生变化的时候就会被调用，
而不管是不是selector关心的数据发生改变它都会被调用，
所以如果selector计算量非常大，每次更新都重新计算可能会带来性能问题。



Reselect能帮你省去这些没必要的重新计算。
Reselect 提供 createSelector 函数来创建可记忆的 selector。

createSelector 接收一个 input-selectors 数组和一个转换函数作为参数。

如果 state tree 的改变会引起 input-selector 值变化，那么 selector 会调用转换函数，
传入 input-selectors 作为参数，并返回结果。

如果 input-selectors 的值和前一次的一样，
它将会直接返回前一次计算的数据，而不会再调用一次转换函数。
这样就可以避免不必要的计算，为性能带来提升。





```
export const eyeSelector = createSelector(
    selectGolbal,
    appState => appState.get('eye')
)

export const IndexDataSelector = createSelector(
    eyeSelector,
    eyeState => {
        if(!eyeState) return
        return eyeState.get('IndexData')
    }
)


const mapStateToProps = (state) => ({
    IndexData: IndexDataSelector(state)
})


static get propTypes() { 
    return { 
        IndexData: PropTypes.object
    }
}
```


## Webpack

用于搭建React脚手架






## 参考

**immutable.js文档**: http://facebook.github.io/immutable-js/docs/#/
**immutable.js 在React、Redux中的实践以及常用API简介**: https://yq.aliyun.com/articles/69516


