---
title: Vue-Router 简介
description: 'vue-router 入门简单介绍'
abbrlink: 30351
date: 2017-06-18 23:29:31
tags:
    - 前端
    - Vue
    - Vue-Router
categories:
    - 技术
---


# Vue-Router 简介


## 前端路由


> 指根据不同的url展示不同的内容或页面


### 优点

    用户体验好，
    不需要每次从服务器全部获取
    展示更加快速

### 缺点

    不利于SEO
    使用浏览器的前进后退功能时，会重新发请求，
    不能有效利用缓存

    单页面无法记住之前滚动的位置，
    无法在前进后退的时候记住之前的位置




## Vue路由 —— Vue-Router





### 概念


#### 动态路由

```

/user/:username
/user/:username/goodlist/:goodlist_id


username，goodlist_id 是变化的

$router.params

```



#### 嵌套路由

路由有子路由

```
export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList,
      children:[
        {
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'img',
          name: 'img',
          component: Image
        }
      ]
    }
  ]
})
```




#### 编程式路由


不通过< router-link >< /router-link >来跳转，而通过
事件触发，调用$router.push() API来跳转

```
$router.push("name")
$router.push({path:"name"})
$router.push({path:"name?a=123"})
$router.push({path:"name", query: {a:"123"}})
$router.go(1)  //前进1页  相当于 history.go(1)


< button @click="jump" >跳转到购物车页面< /button >

 methods:{
    jump() {
        //this.$router.push("cart")
        this.$router.push({path:'cart?goodsId=123'})
    }
}
```
    


#### 命名路由

给路由不同的名字，根据名字来进行匹配

```
import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '../views/GoodList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList,
      children:[
        {
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'img',
          name: 'img',
          component: Image
        }
      ]
    },
    {
        path: '/cart/:cartId',
        name: 'cart',
        component: Cart
    }
  ]
})


< router-link :to="{name:'cart',params:{cartId: 123}}" >跳转到购物车页面< /router-link >
```




#### 命名视图

给不同的router-view定义名字，通过名字进行对应组件的渲染


```
import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '../views/GoodList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodList',
      components: {
        default: GoodList,
        title: Title,
        img: Image 
      },
      children:[
        {
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'img',
          name: 'img',
          component: Image
        }
      ]
    },
    {
        path: '/cart/:cartId',
        name: 'cart',
        component: Cart
    }
  ]
})




< router-view class="main" >< /router-view>
< router-view name="title" class="left" >< /router-view>
< router-view name="img" class="right" >< /router-view>
```




#### 路由过渡



切换路由时有动画效果

```
< transition name="show" >
    < router-view name="login" >< /router-view >
< /transition>


.show-enter-active {
  transition: all .3s ease;
}

.show-leave-active {
  transition: all .2s ease-in;
}


.show-enter, .show-leave-active {
  transform: translateX(200px);
  opacity: 0;
}





api，组件

< router-link >< /router-link >
this.$router.push({path: ''})
< router-view >< /router-view >

```




### 使用


```

router 
    index.js

import Vue from 'vue'
import Router from 'vue-router'
const GoodList = resolve => require(['../views/GoodList.vue'], resolve)

Vue.use(Router)


Vue.use(Router)

const routes = [
    {
      path: '/goods/:goodsId/user/:name',
      name: 'GoodList',
      component: GoodList
    }
]


const router =  new Router({
  routes
})

export default router

export {
    router,
    routes
}



main.js

    import Vue from 'vue'
    import App from './App'
    import router from './router'
    
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})






```

## 参考资料

**Vue-Router文档**: https://router.vuejs.org/zh-cn/index.html