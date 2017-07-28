'use strict';

var config = {
  'jquery': '//cdn.bootcss.com/jquery/2.2.4/jquery.min.js',
  'jquery_lazyload': '//cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js',
  'img_placeholder': 'http://ww4.sinaimg.cn/large/e724cbefgw1etyppy7bgwg2001001017.gif'
}

if (hexo.config.image_stream) {
  for (var key in config) {
    if (hexo.config.image_stream[key] != null) {
      config[key] = hexo.config.image_stream[key];
    }
  }
}

hexo.extend.tag.register('stream', function(args, content){
  var result = '';
  if (config['jquery']) {
    result += '<script src="' + config['jquery'] + '"></script>';
  }
  if (config['jquery_lazyload']) {
    result += '<script src="' + config['jquery_lazyload'] + '"></script>';
  }
  result += '<div class="hexo-img-stream">';
  result += '<style type="text/css">';
  result += '.hexo-image-steam-lazy {display:block;transition: all 0.8s;opacity:1!important;}.hexo-img-stream{width:100%;max-width:90%;margin:3% auto}div.hexo-img-stream figure{background:#5bbccc;box-shadow:0 2px 4px rgba(34,25,25,0.4);margin: 0 0.5% 3%;padding-bottom:9px;display:inline-block;max-width:30%;position:relative;}div.hexo-img-stream figure:hover{box-shadow:0 4px 8px 2px rgba(34,25,25,0.6);}div.hexo-img-stream figure::before{content:"";position:absolute;right: 0;bottom: 0;left: 0;height: 20%;overflow: hidden;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),0 8px 0 -3px #5BBCCC,0 9px 1px -3px rgba(0, 0, 0, 0.2),0 16px 0 -6px #5BBCCC,0 17px 2px -6px rgba(0, 0, 0, 0.2);}div.hexo-img-stream figure:hover::after{content:"";position:absolute;right:3%;bottom:-9px;left:3%;height:10px;box-shadow:0 8px 16px -2px rgba(34,25,25,1);}div.hexo-img-stream figure img{padding-bottom:10px;margin-top:0.7em;max-width:84%;}div.hexo-img-stream figure figcaption{font-size:1em;color:#393b80;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align: center;}div.hexo-img-stream small{font-size:1rem;float:right;text-transform:uppercase;color:#aaa}div.hexo-img-stream small a{color:#666;text-decoration:none;transition:.4s color}@media screen and (max-width:750px){.hexo-img-stream{column-gap:0}}';
  result += '</style>';
  result += content;
  result += '</div>';
  result += '<script type="text/javascript">$(\'img.hexo-image-steam-lazy\').lazyload({ effect:\'fadeIn\' });</script>';
  return result;
}, {ends: true});

hexo.extend.tag.register('figure', function(args){
  var imgUrl = args.shift();
  //var title = args.join(' ');
  var placeholder = config['img_placeholder'];
  var wordUrl = args.shift();
  var title = args.shift();
  var result = '<figure>';
  
  result += '<a href="' + wordUrl + '" target="_blank" rel="external">'
  result += '<img class="hexo-image-steam-lazy nofancy" src="' + placeholder + '" data-original="' + imgUrl + '"/>';
  result += '<noscript><img src="' + imgUrl + '"/></noscript>' + '</a>';
  result += '<figcaption>' + hexo.render.renderSync({text: title, engine: 'markdown'}).replace(/<p>/, '').replace(/<.p>/, '') + '</figcaption>';
  result += '</figure>';
  return result;
});

);

