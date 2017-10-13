---
title: React 简介
description: 'React 入门简单介绍'
abbrlink: 14778
date: 2017-07-13 00:15:33
tags:
    - 前端
    - React
categories:
    - 技术
---

# React 简介


> React.js是一个UI = f(states)的框架，为了解决更新的问题，
React.js使用了virtual dom，virtual dom通过diff修改dom，来实现高效的dom更新。


## 概念




### JSX

一般写在render生命周期函数里

语法:

```
return (
    写HTML 

    注意 有些 属性要改写 
    如 ： class =》 className 

    标签要闭合 < img src="" > =》 < img src="" /> 

    可以添加js
    但要用 {} 括起来 


)
```

### 组件

```
import React, { Component } from 'react'

class NotFound extends Component {

    render () {

        return (


        )
    }
}
```


例子

```
import React, { Component } from 'react'


export default class NotFound extends Component {

    render() {

        return (
            < Container className="noPadding" >
               < NotFoundDiv >
                   < h1 className="title" >404< /h1 >
               < /NotFoundDiv >
            < /Container >
        )
    }
}

```





### ref 
获取dom元素

```
< div className="contactContent" 
    ref={contact => this._contact = contact} >       
< /div >
```


### state 
数据

```
constructor(props) {
    super(props) 
    this.state = {
        
    }
} 
```

### setState
   更新state 

注意：
   1. setState不会立刻改变React组件中state的值
   2. 函数式的setState用法


看这篇文章
   https://zhuanlan.zhihu.com/p/25954470



### props 

子组件接受父组件的数据
```
const { _this } = this.props
```


### PropTypes


props 类型检查

```
import PropTypes from 'prop-types'


static get propTypes() {
    return {
        _this: PropTypes.object
    }
}
```

#### classNames(第三方库)

 处理各类名

```
import classNames from 'classnames'

const { isSpread } = this.state

className={classNames('toggle', {active: isSpread})

```



### event

事件
React 支持许多事件
官方文档有列出
https://reactjs.org/docs/events.html#supported-events

```

<a href="javascript:;" className='toggle'} 
onClick={() => { this._toggle() }}>
    <i className="bar"></i>
</a>

```





### lists key map 

循环

```

const { navArr} = this.state

const navs = navArr.map((item, index) => {
    return (
        <li key={index} className='nav'} >
            {item.name}
        </li>
    )
})

<ul className='navs'>
    {navs ? navs : null}
</ul>








```




### 使用 

```
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start

```

浏览器自动打开 http://localhost:3000/

写完

npm run build 构建打包

生成的build文件夹就是要发布的文件





#### 文件夹结构

```

my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js

```

在src中编写代码



也可以自己搭建一个脚手架








## 参考资料

**React文档**: https://reactjs.org/

