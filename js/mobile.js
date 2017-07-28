define([], function(){
    var _isShow = false;
    var $tag, $aboutme, $friends;

    var ctn,radio,scaleW,idx,basicwrap;

    //第一步 -- 初始化
    var reset = function() {
        //设定窗口比率
        radio = document.body.scrollHeight/document.body.scrollWidth;
        //设定一页的宽度
        scaleW = document.body.scrollWidth;
        //设定初始的索引值
        idx = 0;
    };
    //第一步 -- 组合
    var combine = function(){
        if($tag){
            document.getElementById("js-mobile-tagcloud").innerHTML = $tag.innerHTML;
        }
        if($aboutme){
            document.getElementById("js-mobile-aboutme").innerHTML = $aboutme.innerHTML;
        }
        if($friends){
            document.getElementById("js-mobile-friends").innerHTML = $friends.innerHTML;
        }
    }
    //第三步 -- 根据数据渲染DOM
    var renderDOM = function(){
        //生成节点
        var $viewer = document.createElement("div");
        $viewer.id = "viewer";
        $viewer.className = "hide";
        $tag = document.getElementById("js-tagcloud");
        $aboutme = document.getElementById("js-aboutme");
        $friends = document.getElementById("js-friends");
        function menuList(name) {
            return $("link.menu-list").attr(name);
        };
        var tagStr = $tag?'<span class="viewer-title">'+ menuList("tags") + '</span><div class="viewer-div tagcloud" id="js-mobile-tagcloud"></div>':"";
        var friendsStr = $friends?'<span class="viewer-title">'+ menuList("friends") + '</span><div class="viewer-div friends" id="js-mobile-friends"></div>':"";
        var aboutmeStr = $aboutme?'<span class="viewer-title">'+ menuList("about") + '</span><div class="viewer-div aboutme" id="js-mobile-aboutme"></div>':"";

        $viewer.innerHTML = '<div id="viewer-box">\
        <div class="viewer-box-l">\
            <div class="viewer-box-wrap">'+aboutmeStr+friendsStr+tagStr+'</div>\
        </div>\
        <div class="viewer-box-r"></div>\
        </div>';

        //主要图片节点
        document.getElementsByTagName("body")[0].appendChild($viewer);
        var wrap = document.getElementById("viewer-box");
        basicwrap = wrap;
        wrap.style.height = document.body.scrollHeight + 'px';
    };

    var show = function(target, idx){
        document.getElementById("viewer").className = "";
        setTimeout(function(){
            basicwrap.className = "anm-swipe";
        },0);
        _isShow = true;
        document.ontouchstart=function(e){
            if(e.target.tagName != "A"){
                return false;
            }
        }
    }

    var hide = function(){
        document.getElementById("viewer-box").className = "";
        _isShow = false;
        document.ontouchstart=function(){
            return true;
        }
    }

    var IsPC =  function() {  
        var userAgentInfo = navigator.userAgent;  
        var Agents = ['Android', 'iPhone', 'Windows Phone', 'iPad'];  
        var flag = true;  
        for (var i = 0; i < Agents.length; i++) {  
            if (userAgentInfo.indexOf(Agents[i]) != -1) {  
                flag = false;  
                break;  
            }  
        }  
        return flag;  
    }  


    //第四步 -- 绑定 DOM 事件
    var bindDOM = function(){
        var scaleW = scaleW;
        
        //滑动隐藏
        document.getElementById("viewer-box").addEventListener("webkitTransitionEnd", function(){

            if(_isShow == false){
                document.getElementById("viewer").className = "hide";
                _isShow = true;
            }else{
            }
            
        }, false);

        //点击展示和隐藏
        ctn.addEventListener("touchend", function(){
            show();
        }, false);

        var $right = document.getElementsByClassName("viewer-box-r")[0];
        var touchStartTime;
        var touchEndTime;
        $right.addEventListener("touchstart", function(){
            touchStartTime = + new Date();
        }, false);
        $right.addEventListener("touchend", function(){
            touchEndTime = + new Date();
            if(touchEndTime - touchStartTime < 300){
                hide();
            }
            touchStartTime = 0;
            touchEndTime = 0;
        }, false);

        if(IsPC()) {
            $(".slider-trigger").click(function(){
                show();
            })
            $(".viewer-box-r").click(function(){
                hide();
            })
        }
        

        //滚动样式
        var $overlay = $("#mobile-nav .overlay");
        var $header = $(".js-mobile-header");
        window.onscroll = function(){
            var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
            if(scrollTop >= 69){
                $overlay.addClass("fixed");
            }else{
                $overlay.removeClass("fixed");
            }
            if(scrollTop >= 160){
                $header.removeClass("hide").addClass("fixed");
            }else{
                $header.addClass("hide").removeClass("fixed");
            }
        };
        $header[0].addEventListener("touchstart", function(){
            $('html, body').animate({scrollTop:0}, 'slow');
        }, false);
    };

    if (yiliaConfig.search) {
        var search = function(){
            require([yiliaConfig.rootUrl + 'js/search.js'], function(){
                var inputArea = document.querySelector("#local-search-inputs");
                var $HideWhenSearch = $("#toc, #tocButton, .post-list, #post-nav-button a:nth-child(2)");
                var $resetButton = $("#mobile-nav #search-form .fa-times");
                var $resultArea = $("#local-search-results");

                var getSearchFile = function(){
                    var search_path = "search.xml";
                    var path = yiliaConfig.rootUrl + search_path;
                    searchFunc(path, 'local-search-inputs', 'local-search-results');
                }

                var getFileOnload = inputArea.getAttribute('searchonload');
                if (yiliaConfig.search && getFileOnload === "true") {
                    getSearchFile();
                } else {
                    inputArea.onfocus = function(){ getSearchFile() }
                }

                var HideTocArea = function(){
                    $HideWhenSearch.css("visibility","hidden");
                    $resetButton.show();
                }
                inputArea.oninput = function(){ HideTocArea() }
                inputArea.onkeydown = function(){ if(event.keyCode==13) return false}

                resetSearch = function(){
                    $HideWhenSearch.css("visibility","initial");
                    $resultArea.html("");
                    document.querySelector("#mobile-nav #search-form").reset();
                    $resetButton.hide();
                    $("#mobile-nav .no-result").hide();
                }

                $resultArea.bind("DOMNodeRemoved DOMNodeInserted", function(e) {
                    if (!$(e.target).text()) {
                        $("#mobile-nav .no-result").show(200);
                    } else {
                      $("#mobile-nav .no-result").hide();
                    }
                })
            })
        }()
    }

    return{
        init: function(){
            //构造函数需要的参数
            ctn = document.getElementsByClassName("slider-trigger")[0];
            //构造四步
            reset();
            renderDOM();
            combine();
            bindDOM();
            resetTags();
        }
    }
})