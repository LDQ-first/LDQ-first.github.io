---
title: HTTP缓存
description: ''
abbrlink: 45598
date: 2017-10-27 19:49:31
tags:  
    - HTTP 
    - 缓存 
    - 前端
categories:
    - 技术
---

HTTP通过一些请求和响应头来设置缓存

常见的有 Expires / Cache-Control / Last-Modified / Etag


## 强缓存
不会向服务器发起请求

> Expires / Cache-Control 

Expires HTTP/1.0 版本的标准
值为过期时间

Cache-Control HTTP/1.1 版本的标准

max-age: 相对时间的秒数
smax-age: 相对时间的秒数, 但仅适用于共享缓存，在私有缓存中被忽略
public: 响应可以被任何对象(客户端，代理服务器)缓存
private: 响应只能被单个用户缓存, 是非共享的，不能被代理服务器缓存
no-cache: 强制所有用户在请求时，向服务器发起请求
no-store: 禁止缓存，每次请求都要向服务器重新获取数据



Cache-Control优先级高于Expires

相对时间比绝对时间准



不经常改变的文件:

给 max-age 设置一个较大的值，一般设置 max-age=31536000


标准中规定 max-age 的值最大不超过一年，所以设成 max-age=31536000。
至于过期内容，缓存区会将一段时间没有使用的文件删除掉。

可能经常需要变动的文件:

Cache-Control: no-cache / max-age=0



## 协商缓存
会向服务器发起请求

> Last-Modified / if-Modified-Since


响应头：Last-Modified GMT时间

请求头：if-Modified-Since GMT时间

两个的值相同

请求时服务端会将if-Modified-Since的时间和资源最后修改时间做比较

如果响应头中有 Last-Modified ,没有Expires或Cache-Control时，
浏览器会有自己的算法来推算出缓存时间，不同浏览器不同，所以 Last-Modified 要配合
Expires / Cache-Control 使用



> ETag / if-None-Match


响应头：ETag hash值(取文件的hashCode或MD5) 

请求头：if-None-Match hash值(取文件的hashCode或MD5) 

两个的值相同


Last-Modified 只能精准到秒
ETag 通过MD5来验证，能精准到字节级别，优先级高




## 设置某个日期过期


响应头

Expires 过期时间的GMT时间


Cache-Control  max-age=从现在起距离过期时间的秒数


Last-Modified 服务器资源最后修改的GMT时间


ETag  hash值(取文件的hashCode或MD5) 




请求头

if-Modified-Since 服务器资源最后修改的GMT时间

if-None-Match hash值(取文件的hashCode或MD5) 


GMT时间

```
new Date('2017-10-27 20:46:02')
Fri Oct 27 2017 20:46:02 GMT+0800 (中国标准时间)
```






















