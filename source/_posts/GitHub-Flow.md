---
title: GitHub Flow
description: ''
abbrlink: 8335
date: 2017-10-27 21:29:26
tags: 
    - Git
    - GitHub 
categories:
    - 技术
---


## Git FLow 

五条分支

两条长期分支

- 主分支 master
- 开发分支 develop

三条短期分支

- 功能分支 feature 
- 补丁分支 hotfix
- 预发分支 release

> 一旦完成开发，它们就会被合并进develop或master，然后被删除

相对复杂，需要经常切换分支
不便于持续发布


## Github Flow

Git Flow 简化版

一条长期分支
- master



1. 开发时，从项目中Fork出一条新分支
2. 修改后向master分支提交一个pull request（PR）
3. 经过审查后决定是否合并提交的pull request
4. 合并master后重新部署，删除分支


合并master分支后不代表可以立刻发布，需要审核
于是线上版本和master分支版本会有不一致
所以又需要一个production分支



























