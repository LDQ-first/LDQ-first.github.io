var bigfa_scroll={drawCircle:function(a,o,t){var l=$(a).width(),c=$(a).height(),e=parseInt(l/2.2),n=l,i=n/2,r=$(a)[0];a=a.split("#");var s=r.getContext("2d"),d=null,p=2*Math.PI,h=Math.PI/2;s.clearRect(0,0,l,c),s.beginPath(),s.strokeStyle=t,s.lineCap="square",s.closePath(),s.fill(),s.lineWidth=3,d=s.getImageData(0,0,n,n);!function(a,o){o.putImageData(d,0,0),o.beginPath(),o.arc(i,i,e,-h,p*a-h,!1),o.stroke()}(o/100,s)},backToTop:function(a){a.click(function(){return $("body,html").animate({scrollTop:0},800),!1})},scrollHook:function(a,o){o=o||"#000000",a.scroll(function(){var t=$(document).height()-$(window).height(),l=a,c=$(".per"),e=0;defaultScroll=l.scrollTop(),e=parseInt(defaultScroll/t*100);var n=$("#backtoTop");n.length>0&&(l.scrollTop()>200?n.addClass("button-show"):n.removeClass("button-show"),c.attr("data-percent",e),bigfa_scroll.drawCircle("#backtoTopCanvas",e,o))})}};$(document).ready(function(){$("body").append('<div id="backtoTop" data-action="gototop"><canvas id="backtoTopCanvas" width="48" height="48"></canvas><div class="per"></div></div>');var a=bigfa_scroll;a.backToTop($("#backtoTop")),a.scrollHook($(window),"#4094C7")});