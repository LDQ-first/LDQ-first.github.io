---
title: Promise 简介
description: ''
abbrlink: 601
date: 2017-05-28 19:34:22
tags: 
    - 前端
    - JavaScript
    - Promise 
categories:
    - 技术
---


## Promise


Promise 对象用于一个异步操作的最终完成（或失败）及其结果值的表示。

 简单点说就是处理异步请求。



## API

```

Promise.all(iterable)
Promise.prototype.catch(onRejected)
Promise.prototype.then(onFulfilled, onRejected)
Promise.race(iterable)
Promise.reject(reason)
Promise.resolve(value)
```



## 属性

Promise.length
长度属性，其值总是为 1 (构造器参数的数目).

Promise.prototype
表示 Promise 构造器的原型.



## Promise 有几种状态

- pending: 初始状态
- fulfilled: 成功
- rejected: 失败

pending 状态的 Promise 对象可能触发fulfilled 状态并传递一个值给相应的状态处理方法，
也可能触发失败状态（rejected）并传递失败信息。
当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用
（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。
当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，
当Promise状态为rejected时，调用 then 的 onrejected 方法， 
所以在异步操作的完成和绑定处理方法之间不存在竞争）。

then
能处理成功和失败

catch
处理失败




Promise.all(iterable)
Promise.all接收一个Promise对象组成的数组作为参数，
当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，
它才会去调用then方法。

```

var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var url1 = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-06-10';

function renderAll() {
    return Promise.all([getJSON(url), getJSON(url1)])
}

renderAll().then(function(value) {
    console.log(value)  //[{…}, {…}]
})

function getJSON(url) {
    return new Promise(function(resolve, reject) {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.send();

        XHR.onload = () => {
            resolve(JSON.parse(XHR.responseText))
        }

        XHR.error = () => {
            reject()
        }
        <!--XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                if (XHR.status === 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        }-->
    })
}

```



Promise.race(iterable)


与Promise.all相似的是，Promise.race都是以一个Promise对象组成的数组作为参数，
不同的是，只要当数组中的其中一个Promsie状态变成resolved或者rejected时，
就可以调用.then方法了。而传递给then方法的值也会有所不同，


```


function renderRace() {
    return Promise.race([getJSON(url), getJSON(url1)])
}

renderRace().then(function(value) {
    console.log(value)  //{ret: 0, items: {…}, serverTime: 1507396689646}
})




Promise.prototype.catch(onRejected)

Promise.prototype.then(onFulfilled, onRejected)




Promise.reject(reason)


Promise.reject("Testing static reject")
       .then(function(reason) {
            // 未被调用
        }, function(reason) {
            console.log(reason)  // "测试静态拒绝"
        })


Promise.reject(new Error("fail"))
       .then(function(error) {
            // 未被调用
        }, function(error) {
            console.log(error)  // 堆栈跟踪
        })



Promise.resolve(value)


//thenable
Promise.resolve({
    then: (resolve, reject) => {
        resolve()
    }
}).then( res => {
    console.log(res)
})


Promise.resolve("Success")
       .then(function(value) {
            console.log(value) // "Success"
        }, function(value) {
            // 不会被调用
        })



//对一个数组进行resolve

var p = Promise.resolve([1,2,3])

p.then(function(v) {
  console.log(v[0]) // 1
})


//Resolve另一个promise对象

var original = Promise.resolve(true)
var cast = Promise.resolve(original)
cast.then(function(v) {
  console.log(v) // true
})

```




## 例子

```

const fs = require('fs')
const markdown = require('markdown').markdown



readFile(markdown)
        .then( mdStr => {
            return markdown.toHTML(mdStr)
        })
        .then( html => {
            writeFile('b.html', html)
        }).catch( err => {
            console.log(err)
        })



const readFile = url => {
    const promise = new Promise(( resolve, reject ) => {
        fs.readFile(url, 'utf-8', (err, str) => {
            if (err) {
                reject(new Error('readFile error'))
            } else {
                resolve(str)
            }
        })
    })
    return promise
}


const writeFile = (url, data ) => {
    const promise = new Promise((resolve, reject ) => {
        fs.writeFile( url, data, ( err, str) => {
            if(err) {
                reject(new Error('writeFile error'))
            } else {
                resolve()
            }
        })
    })

    return promise
}




```
