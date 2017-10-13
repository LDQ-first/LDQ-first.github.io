---
title: Vue版CNode社区(二)
description: ''
abbrlink: 61229
date: 2017-06-22 10:10:32
tags:
    - 前端
    - Vue
    - SPA
categories:
    - 技术
---


# Vue版CNode社区技术详情


## Vue

Vue配合Vue-Router，Vuex

实现路由跳转，路由过渡，状态管理


Vue-lazyload
头像图片懒加载



## Axios 

实现api请求等的异步处理


## Moment.js

处理时间的显示


## Simplemde

用于实现markdown方式回复，发帖



## loaclStorge

用于存储用户的登录信息
防止刷新或重开网页后登录失效


## 滚动加载

通过监听scroll事件来实现



```

 scroll(e) {
            if(e.target.clientHeight  > e.target.scrollTop) {
                const e = this.$refs.articles;
                bus.$emit('isShowTop', {isShow: false, e});
            }
            else {
                  const e = this.$refs.articles;
                bus.$emit('isShowTop', {isShow: true, e});
            }
            const pathArr = ['/', '/articleList/all', '/articleList/good', '/articleList/share', '/articleList/ask', '/articleList/job', '/articleList/dev'];
            if(pathArr.indexOf(this.$route.path) === -1) {
                return;
            }
            if(!this.over && !this.isLoading) {
                let isOver = e.target.clientHeight + Math.ceil(e.target.scrollTop) >= e.target.scrollHeight - 100;
                if(isOver) {
                    console.log(this.page)
                    this.page ++;
                    this.$store.commit('changeMore', true);
                    this.$store.commit('changeTab',{isLoading: true});
                    axios.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.tab}`)
                          .then(result =>result.data.data)
                          .then(articleList => {
                              if(!articleList.length) {
                                  this.$store.commit('Over', true);
                                  this.$store.commit('changeMore', false);
                                  return ;
                              }
                              this.$store.commit('changeTab',
                               {articleList: this.articleList.concat(articleList), isLoading: false});
                          })
                          .then(() => this.$store.commit('changeMore', false));
                }
            }
        },

```



## Canvas loading


利用  window.requestAnimationFrame  做动画

画个白色的圆  whiteCircle() 

画文字 text()

画蓝色的圆形进度条 blueCircle()



```

    data() {
        return {
            canvas: {},
            context: {},
            centerX: 0,
            centerY: 0,
            radius: 80,
            rad: 0,
            speed: 0.1,
            timer: '',
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const canvas = this.$refs.canvasLoading;
            const context = canvas.getContext('2d');

            this.canvas = canvas;
            this.context = context;
            this.centerX = canvas.width/2;
            this.centerY = canvas.height/2;
            this.rad = 2*Math.PI/100;
            this.speed = 0.2;

             window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    window.oRequestAnimationFrame      || 
                    window.msRequestAnimationFrame     || 
                   function ( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

             window.cancelAnimationFrame = (function(){
            return  window.cancelAnimationFrame       ||
                    window.webkitCancelAnimationFrame ||
                    window.mozCancelAnimationFrame    ||
                    window.oCancelAnimationFrame      || 
                    window.msCancelAnimationFrame     || 
                    function(){
                        window.clearTimeout(this.timer);
                    };
            })();
            this.loading();
        },  
        loading() {
            this.timer = requestAnimationFrame(this.loading, this.canvas);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.whiteCircle();
            this.text();
            this.blueCircle();
            if(this.speed > 100) {
                this.speed = 0;
                cancelAnimationFrame(this.timer);                
            this.$emit('BeginLoading');
            }
            else {
                this.speed += 0.4;
            }
        },
        whiteCircle() {
            this.context.save();
            this.context.beginPath();
            this.context.strokeStyle = '#FFF';
            this.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false );
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        },
        text() {
            this.context.save();
            this.context.strokeStyle = '#FFF';
            this.context.font = '30px Arial';
            const text = this.speed.toFixed(0) + '%';
            const textWidth = this.context.measureText(text).width;
            const translateWidth = (textWidth/2).toFixed(0);
             this.context.strokeText(text, 
                this.centerX - translateWidth + 5, this.centerY + 10);

            this.context.stroke();
            this.context.restore();
        },
        blueCircle() {
            this.context.save();
            this.context.strokeStyle = 'rgba(3,169,244,1)';
            this.context.lineWidth = 10;
            this.context.beginPath();
            this.context.arc(this.centerX, this.centerY, this.radius,
             -Math.PI/2, -Math.PI/2 + this.speed * this.rad, false );
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        },
        
    }

```


