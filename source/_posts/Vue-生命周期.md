---
title: vue 生命周期
description: ''
abbrlink: 1776
date: 2017-06-25 09:46:46
tags: 
    - 前端
    - Vue
categories:
    - 技术
---


## 生命周期 





### 生命周期钩子的函数

实例化

beforeCreate  
实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前

created       
实例创建完成后

beforeMount   
挂载前

mounted       
挂载

beforeUpdate  
数据更新前，发生在虚拟 DOM 重新渲染和打补丁之前

updated       
数据更新，虚拟 DOM 重新渲染和打补丁后

activated     
keep-alive 组件激活时

deactivated   
keep-alive 组件停用时

beforeDestroy 
实例销毁前

destroyed     
实例销毁后




### 实际场景应用



beforeCreate  
实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前

读取不到数据(data)和方法(methods)


created       
实例创建完成后

在这一步，实例已完成以下的配置：数据观测 (data observer)，
属性和方法的运算，watch/event 事件回调。
然而，挂载阶段还没开始，$el 属性目前不可见。

可以调用实例的数据 和 方法

如：异步函数的调用, 初始化

异步数据获取后的dom操作可以用
vue.$nextTick方法操作
可以对不同的异步数据做不同的dom操作
某个数据的某一次变化



对某个数据的变化做统一处理可以用watch



beforeMount   
挂载前




mounted       
挂载

有初始数据的dom渲染,可以获取dom




beforeUpdate  
数据更新前，发生在虚拟 DOM 重新渲染和打补丁之前



updated       
数据更新，虚拟 DOM 重新渲染和打补丁后
数据更新后的操作

所有数据更新后做统一的操作



activated     
keep-alive 组件激活时




deactivated   
keep-alive 组件停用时




beforeDestroy 
实例销毁前



destroyed     
实例销毁后


vue.$destroyed 主动触发





