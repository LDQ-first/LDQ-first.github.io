---
title: glup 简介
description: ''
abbrlink: 61438
date: 2017-09-01 19:28:20
tags: 
    - 前端
    - Glup
categories:
    - 技术
---



## glup


### 简介

```

打造前端工作流
打包，压缩，合并，git，远程操作


本质：将命令行转变成js代码来执行


思想
   数据流
   流水线

   操作过的文件，不输出
   下次再操作时，操作流水线
   最后才输出

```



### 使用


```
    npm install gulp-cli -g

    npm install gulp -D

    touch gulpfile.js

    gulp --help

```


编写glupfile.js文件


```
var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');



gulp.task('html', function(){
  return gulp.src('client/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/html'))
});

gulp.task('css', function(){
  return gulp.src('client/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', [ 'html', 'css' ]);
```

 



常用 API

```
task
src
pipe
dest

```



gulp.src(globs[, options])

globs 字符串/数组
数据流


pipe
传数据流


task(name, deps, callback)
创建任务
deps 并行执行


watch 监听文件改动





常用插件


```

gulp-htmlmin
gulp plugin to minify HTML.


gulp-cssnano
Minify CSS with cssnano.

gulp-clean-css
gulp plugin to minify CSS, using clean-css

gulp-less
gulp-sass
gulp-requirejs-optimize


gulp-concat
合并数据流


gulp-uglify
Minify JavaScript with UglifyJS2.

gulp-imagemin 
Minify PNG, JPEG, GIF and SVG images with imagemin

gulp-rename
gulp-rename is a gulp plugin to rename files easily.

gulp-clean
Removes files and folders.


gulp-eslint
A gulp plugin for ESLint.


gulp-jslint
It's JSLint for Gulp.js.

gulp-postcss
PostCSS gulp plugin to pipe CSS through several plugins, but parse CSS only once.

glob-stream 
A Readable Stream interface over node-glob.

gulp-typescript 
A gulp plugin for handling TypeScript compilation workflow. 
The plugin exposes TypeScript's compiler options to gulp using TypeScript API.


gulp-filter 
Filter files in a Vinyl stream

Enables you to work on a subset of the original files
 by filtering them using glob patterns. 
 When you're done and want all the original files back 
 you just use the restore stream.


gulp-sourcemaps
Write inline source maps
Inline source maps are embedded in the source file.


gulp-if
A ternary gulp plugin: conditionally control the flow of vinyl objects.

Note: Badly behaved plugins can often get worse when used with gulp-if.
 Typically the fix is not in gulp-if.

Note: Works great with lazypipe, see below


gulp-autoprefixer
Prefix CSS with Autoprefixer


gulp-babel
Use next generation JavaScript, today, with Babel

gulp-rev
添加版本号

gulp-rev-replace
版本号替换

gulp-useref
解析html资源定位


```


## 参考

**glup文档**: https://gulpjs.com/
