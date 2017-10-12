---
title: Vuex 简介
description: 'Vuex 入门简单介绍'
abbrlink: 53016
date: 2017-06-24 23:57:24
tags:
    - 前端
    - Vue
    - Vuex
categories:
    - 技术
---


## Vuex


### 概念



vue 组件通过 dispatch 来触发 actions [这步可省略， 一般用于处理异步]
actions 再通过 commit 触发 mutations , 改变store上的 state 
最终改变 vue 组件 的 view 

常与 computed 结合 


state 是唯一数据来源

vuex 是单一状态树


### getters

getters 派生出一些新的状态


Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
且只有当它的依赖值发生了改变才会被重新计算。


```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

```


Getter 会暴露为 store.getters 对象：


store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
Getter 也可以接受其他 getter 作为第二个参数：

```
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1

```


我们可以很容易地在任何组件中使用它：

```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```


你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```
getters: {
  // ...
  getTodoById: (state, getters) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```



mapGetters 辅助函数 类似 mapState

在computed中使用...运算符获取getters





### mutations 

更改vuex的store中的状态的唯一方法是提交mutations


action通过mutations间接改变store的状态

acion处理异步操作



### modules

将store状态分割成模块（modules）
便于管理








### 一个简单的例子


```
store
  module 
    moduleHome.js
  mutations
    mutationsHome.js
  index.js




moduleHome.js

import mutations from '../mutations/mutationsHome.js'

export default {
    state: {
        isFullScreen: false
    },
    mutations: mutations()
}




mutationsHome.js

export default () => {
    return {
        FullScreen (state, isFullScreen) {
            state.isFullScreen = isFullScreen
        }
    }
}



index.js

import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import moduleHome from './module/moduleHome.js'


export default new Vuex.Store({
    modules: {
        home: moduleHome
    }
})   





main.js

import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false



new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

```


### 使用

```
const Sidebar = resolve => require(['../../components/Sidebar.vue'], resolve)
const MainContent = resolve => require(['../../components/MainContent.vue'], resolve)
const Buttons = resolve => require(['../../components/Button.vue'], resolve)

import { mapState } from 'vuex'

export default {
    name: 'Home',
    data () {
        return {

        } 
    },
    computed: {
        ...mapState({
            isFullScreen: state => state.home.isFullScreen
        })
        /*
            isFullScreen() {
                return this.$store.state.home.isFullScreen
            }
        */
    },
    components: {
        Buttons,
        Sidebar,
        MainContent
    },
    methods: {
        cancelFullScreen () {
            this.$store.commit('FullScreen', false)
        }
    }
}






```






### 对比 redux

```

都是基于Flux
吸取redux的优点
放弃强制的 immutability
api更简洁
性能较好
与vue契合度更高


```

![vuex.png](http://upload-images.jianshu.io/upload_images/3563580-c893179ac3e708f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 参考资料

**Vuex文档**: https://vuex.vuejs.org/zh-cn/
**尤大的答案**: https://www.zhihu.com/question/38546875/answer/76970954
