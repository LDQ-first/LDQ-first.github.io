function init() {
	var pswpElement = document.querySelectorAll('.pswp')[0];
	var $imgArr = document.querySelectorAll(('.article-entry img:not(.reward-img):not(.hexo-image-steam-lazy)'))

	$imgArr.forEach(($em, i) => {
		$em.onclick = () => {
			// slider展开状态
			// todo: 这样不好，后面改成状态
			if (document.querySelector('.left-col.show')) return
			var items = []
			$imgArr.forEach(($em2, i2) => {
				var img = $em2.getAttribute('data-idx', i2)
				var src = $em2.getAttribute('data-target') || $em2.getAttribute('src')
				var title = $em2.getAttribute('alt')
				items.push({
					src: src,
					w: $em2.width,
					h: $em2.height,
					title: title
				})
			})
			var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
				index: parseInt(i),
			});
			gallery.init()
		}
	})
}
init() 