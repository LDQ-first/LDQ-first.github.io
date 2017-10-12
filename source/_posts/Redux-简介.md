---
title: Redux 简介
description: 'Redux 入门简单介绍'
abbrlink: 7244
date: 2017-07-23 00:29:31
tags: 
    - 前端
    - React
    - Redux
categories:
    - 技术
---


# Redux

## 概念


```

redux react-redux

const 文件
action 
aciton creator
reducer
store
state
dispatch
combineReducers

connect
mapStateToProps
mapDispatchToProps
middleware

```


## store
    保存数据的一个单一状态树
    
要通过 createStore 方法生成    
    
```
import { createStore } from 'redux'
const store = createStore(fn)

```



## action
  Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。
  其他属性可以自由设置。

```
  const action = {
    type: 'ADD_TODO',
    payload: 'Learn Redux'
  }
```

## action creator
    每次手写action很麻烦，于是要定义一个函数来生成action，该函数就是
    action creator

```
const chooseNav = (index) => {
    return {
        type: CHOOSE_NAV,
        index
    }
}

const action = chooseNav(1)
```

## store.dispatch
  要触发action，就要使用store.dispatch

```
import { createStore } from 'redux';
const store = createStore(fn)

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
})
```

## const 文件
  将 action.type 定义为常量
  reducer 通过 action.type 判断是哪个action


## reducer
  更新数据， 返回新的state

```
const initState = {

}
  
const reducer = (state = initState, action) => {
    switch(action.type) {
        case xxx:
            xxx
            break
        case yyy:
            yyy
            break
        default 
           return state 
         
    }
}
```


## combineReducers
    合并多个reducer

```
import { combineReducers } from 'redux'


const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default chatReducer
```



## 创建stroe

```
import chatReducer from './xxx'


const store = createStore(
    chatReducer
)

export default store
```


## Provider
   store 添加在Provider组件

```
import store from './yyy'
import {Provider} from 'react-redux'



ReactDOM.render(
    < Provider store={store} >
       ...
    < /Provider >, 
document.getElementById('root'))
```




## 在组件中使用
     mapStateToProps 传 props 给组件
     mapDispatchToProps 传 dispatch 方法 给组件
     通过 connect 传个组件 


例子

```
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentList from '../components/CommentList.js'
import { initComments, deleteComment} from '../reducers/comments.js'
import {connect} from 'react-redux'



class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        deleteComment: PropTypes.func
    }

    componentWillMount() {
        this._loadComments()
    }

    _loadComments() {
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        this.props.initComments(comments)
    }

    handleDeleteComment(index) {
        const {comments} = this.props
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if(this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            < CommentList 
                comments = {this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
            / >
        )
    }
}

// 评论列表从 state.comments 中获取
const mapStateToProps = state => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // 提供给 CommentListContainer
        // 当从 LocalStorage 加载评论列表以后就会通过这个方法
        // 把评论列表初始化到 state 当中
        initComments: (comments) => {
            dispatch(initComments(comments))
        } ,
        // 删除评论
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
}


// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)

```




## middleware
   强化 redux 的功能


原理
   改写store.dispatch 
   
因为 reducer是纯函数，只承担计算 State 的功能，不合适承担其他功能
View与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。


compose
  从右到左来组合多个函数。


这是函数式编程中的方法，为了方便，被放到了 Redux 里。 
当需要把多个 store 增强器 依次执行的时候，需要用到它。


例子

```
import {createStore, applyMiddleware, compose} from 'redux'
import reducers from './reducers.js'
import thunkMiddleware  from 'redux-thunk'
import createLogger from 'redux-logger'



export default () => {
    const middleware = [thunkMiddleware, createLogger]


    const composeEnhancers = 
        process.env.NODE_ENV !== 'production' &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
                }) 
            : compose

    const enhancers =  composeEnhancers(
        applyMiddleware(...middleware)
    )

    const store = createStore(
        reducers,
        enhancers
    )

    return store
}




```







### 处理异步

```


redux-think + async/await
    redux-think 让 dispatch 能接受 函数作为参数 （原来参数只能是对象）
    利用 async/await 的调用方式处理异步

redux-promise
    利用promise的调用方式处理异步


redux-promise-middleware
    优化 redux-promise


redux-saga (generator/yield)
     利用generator/yield的调用方式处理异步
     提供大量的api


redux-observable (RxJS)
     利用RxJS的调用方式处理异步
     提供大量的api


redux-loop


```





### 其他中间件 

```

redux-logger



```








### 最佳实践

[看看 dva 的前身 React + Redux 最佳实践，知道 dva 是怎么来的](https://github.com/sorrycc/blog/issues/1)






### 优秀的相关框架

[dva](https://github.com/dvajs/dva)




## 参考资料

**理解 React**: https://www.zhihu.com/question/41312576?sort=created
**Redux 入门教程（一）—— 阮一峰**: http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html




