---
title: Webpack 简介
description: ''
abbrlink: 2853
date: 2017-09-02 19:18:10
tags: 
    - 前端
    - Webpack
categories:
    - 技术
---


## Webpack


### 简介


> 一切皆模块的思想
将前端的资源通过各种loader处理成浏览器可使用的资源





### 使用

```
npm install --save-dev webpack
npm install --save-dev webpack@<version>
npm install --save-dev webpack-dev-server //webpack 基于 express 的服务器 可以不要

"scripts": {
    "start": "webpack --config webpack.config.js"
}

```

主要工作就是编写webpack.config.js
和下载loader，plugin

plugin分webpack自带的和第三方的





### 例子

```

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')


//分离css文件
const extractCSS = new ExtractTextPlugin({
    filename: 'static/css/main.[name].[contenthash:8].css'
})
const extractSASS = new ExtractTextPlugin({
    filename: 'static/css/sass.[name].[contenthash:8].css'
})


module.exports = {
    devtool: 'cheap-module-eval-source-map', //source-map 用于debugger 时能否看到源码
    entry: {  //入口文件
        app: [
            path.join(__dirname, '../src/index.js') 
        ],
    }, 
    output: {  //出口文件
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].js',
        publicPath: '/'          //静态资源路径前要添加的路径                 
    },
    resolve: { //扩展名，别名
        extensions: ['.js', '.jsx', '.json'],
        alias: {
        // ================================
        // 自定义路径别名
        // ================================
        '@': path.join(__dirname, '../src')
        }
    },
     module: {
        rules: [{  //loader配置
            test: /\.(js|jsx)$/,
            use: [{
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                    plugins: ['syntax-dynamic-import']                         
                }
            }, 'eslint-loader'],
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/
        }, {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: false                         
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }]
                })
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, // 10KB 以下使用 base64
                            name: 'img/[name].[sha512:hash:base64:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)((-|\?)?.*)?$/,
                exclude: /static\/img/,
                loader: 'url-loader',
                options: {
                    name: 'css/fonts/[name].[hash:8].[ext]'
                }
            },{
                test: /\.json$/,
                exclude: '/node_modules/',
                loader: 'json-loader'
            }]
    },
    plugins: [  //插件
        new webpack.BannerPlugin("author by ldq-first"),
        extractCSS,
        extractSASS,
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: require('autoprefixer')
            }
        }),
        new HtmlWebpackPlugin({
            template:  path.join(__dirname, '../index.html')
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../static'),
                to: path.join(__dirname, '../dist/static/'),
              //  ignore: ['.*']
            }
        ]),
        new webpack.HashedModuleIdsPlugin(),
        //这个plugin是用于引入dll里生成的json的。
        new webpack.DllReferencePlugin({  
            context: __dirname,
            manifest: require('../static/public/js/vendor-mainfest.json')  // 指向这个json
        })
    ],
    devServer: {  //webpack-dev-server
        historyApiFallback: true,
        host: '0.0.0.0',  //手机局域网访问 如：http://10.30.4.227:5050
        hot: true,
        port: 5050
    }
}



```


### 常用loader

[loader](https://webpack.js.org/loaders/)

```

babel-loader
style-loader
css-loader
sass-loader
url-loader
json-loader
less-loader
html-loader
postcss-loader
eslint-loader



```





### 常用plugin

[插件列表](https://webpack.js.org/plugins/)

```

html-webpack-plugin
extract-text-webpack-plugin
copy-webpack-plugin
copy-webpack-plugin

webpack.BannerPlugin
webpack.LoaderOptionsPlugin
webpack.HashedModuleIdsPlugin
webpack.DllReferencePlugin
webpack.DefinePlugin
webpack.optimize.OccurrenceOrderPlugin
webpack.optimize.UglifyJsPlugin


```

### webpack.DllReferencePlugin




提取不变的第三方代码，提高打包速度，减少打包文件大小，
防止首屏加载的单个js文件太大，影响用户体验，还能利用缓存



编写配置文件
webpack.dll.config.js

```
在webpack.config.js的plugin中添加

//这个plugin是用于引入dll里生成的json的。
new webpack.DllReferencePlugin({  
    context: __dirname,
    manifest: require('../static/public/js/vendor-mainfest.json')  // 指向这个json
})

```


运行命令

```
webpack --config ./build/webpack.dll.config.js

在index.html中引入最终的js文件
< script src="./static/public/js/vendor.dll.js" >< /script >
```


例子

```
const webpack = require('webpack')
const path = require('path')


module.exports = {
    entry: {
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux',
         'react-router-redux', 'prop-types', 'history', 'styled-components', 
         'redux-thunk']
    },
    output: {
        path: path.join(__dirname , '../static/public/js'),
        filename: '[name].dll.js', // 输出的文件，将会根据entry命名为vendor.dll.js
        library: '[name]_library' // 暴露出的全局变量名
    },
    plugins: [
        new webpack.DllPlugin({
             //path 是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包
            path: path.join(__dirname, '../static/public/js/', '[name]-mainfest.json'),
            //是 dll 暴露的对象名，要跟 output.library 保持一致
            name: '[name]_library', 
            //context 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致
            context: __dirname
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                warnings: false
            }
        })
    ]
}






```



### Happypack


它可以建立线程，加速我们的rebuild，并很好的利用缓存。首次build时速度甚至会变慢，
这是由于happypack在进行分析和配置，当进入开发阶段，
改动代码后的rebuild会快到让你吓一跳。

未来可尝试一下




### 代码分割



Webpack支持两种按需拆分，切入点分别是import()和require.ensure()，
首选前者，它是ECMAScript的建议，import也是es6的关键词；后者是webpack所特有的。



动态导入import

Webpack把import()作为拆分点，把导入的模块放在单独的chunk中。
import()接收模块名作为参数并返回Promise：import(name) -> Promise。



用于演示的目录结构：

```
demo
├── index.html
├── index.js
└── webpack.config.js
```


index.js



```
function test(){
  import(/* webpackChunkName: "my-chunk-name" */'moment').then(function(moment){
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  }).catch(function(err){
    console.log(err);
  }); 
}
test();




webpack.config.js

module.exports = { 
  entry: './index.js',
  output: {
      filename: 'dist.js',
  },  
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: 'es2015',
          plugins: ['syntax-dynamic-import']
        }
      }]  
    }]  
  }
}
```

index.html

```
<!doctype html>
< script src="0.dist.js" >< /script >
< script src="dist.js" >< /script >
```

由于使用动态的导入，因此需要使用插件syntax-dynamic-import

```
npm install --save-dev babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015 webpack
npm install --save moment
```


## 参考

**webpack文档**: https://webpack.js.org/guides/installation/
