require([], function () {
    var isMobileInit = false;
    var loadMobile = function () {
        require(['js/mobile.js'], function (mobile) {
            mobile.init();
            isMobileInit = true;
        });
    };
    var isPCInit = false;
    var loadPC = function () {
        require([yiliaConfig.rootUrl + 'js/pc.js'], function (pc) {
            pc.init();
            isPCInit = true;
        });
    };
    var browser = {
        versions: function () {
            var u = window.navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') == -1,
                weixin: u.indexOf('MicroMessenger') == -1
            };
        }()
    };
    $(window).bind('resize', function () {
        if (isMobileInit && isPCInit) {
            $(window).unbind('resize');
            return;
        }
        var w = $(window).width();
        if (w >= 1050) {
            loadPC();
        } else {
            loadMobile();
        }
    });
    if (!!browser.versions.mobile || $(window).width() < 1150) {
        loadMobile();
    } else {
        loadPC();
    }
    resetTags = function () {
        var tags = $('.tagcloud a');
        for (var i = 0; i < tags.length; i++) {
            var num = Math.floor(Math.random() * 7);
            tags.eq(i).addClass('color' + num);
        }
        $('.article-category a:nth-child(-n+2)').attr('class', 'color0');
    };
    if (!!yiliaConfig.fancybox) {
        require([yiliaConfig.fancybox_js], function (pc) {
            var isFancy = $('.isFancy');
            if (isFancy.length != 0) {
                var imgArr = $('.article-inner img');
                for (var i = 0, len = imgArr.length; i < len; i++) {
                    var src = imgArr.eq(i).attr('src');
                    var title = imgArr.eq(i).attr('alt');
                    if (typeof title == 'undefined') {
                        var title = imgArr.eq(i).attr('title');
                    }
                    var width = imgArr.eq(i).attr('width');
                    var height = imgArr.eq(i).attr('height');
                    imgArr.eq(i).replaceWith('<a href=\'' + src + '\' title=\'' + title + '\' rel=\'fancy-group\' class=\'fancy-ctn fancybox\'><img src=\'' + src + '\' width=' + width + ' height=' + height + ' title=\'' + title + '\' alt=\'' + title + '\'></a>');
                }
                $('.article-inner .fancy-ctn').fancybox({ type: 'image' });
            }
        });
    }
    if (!!yiliaConfig.animate) {
        if (!!yiliaConfig.isHome) {
            require([yiliaConfig.scrollreveal], function (ScrollReveal) {
                var animationNames = [
                        'pulse',
                        'fadeIn',
                        'fadeInRight',
                        'flipInX',
                        'lightSpeedIn',
                        'rotateInUpLeft',
                        'slideInUp',
                        'zoomIn'
                    ], len = animationNames.length, randomAnimationName = animationNames[Math.ceil(Math.random() * len) - 1];
                if (!window.requestAnimationFrame) {
                    $('.body-wrap > article').css({ opacity: 1 });
                    if (navigator.userAgent.match(/Safari/i)) {
                        function showArticle() {
                            $('.article').each(function () {
                                if ($(this).offset().top <= $(window).scrollTop() + $(window).height() && !$(this).hasClass('show')) {
                                    $(this).removeClass('hidden').addClass('show');
                                    $(this).addClass('is-hiddened');
                                } else {
                                    if (!$(this).hasClass('is-hiddened')) {
                                        $(this).addClass('hidden');
                                    }
                                }
                            });
                        }
                        $(window).on('scroll', function () {
                            showArticle();
                        });
                        showArticle();
                    }
                    return;
                }
                var animateScope = '.body-wrap > article';
                var $firstArticle = $('.body-wrap > article:first-child');
                if ($firstArticle.height() > $(window).height()) {
                    var animateScope = '.body-wrap > article:not(:first-child)';
                    $firstArticle.css({ opacity: 1 });
                }
                ScrollReveal({
                    duration: 0,
                    afterReveal: function (domEl) {
                        $(domEl).addClass('animated ' + randomAnimationName).css({ opacity: 1 });
                    }
                }).reveal(animateScope);
            });
        } else {
            $('.body-wrap > article').css({ opacity: 1 });
        }
    }
    if (yiliaConfig.toc) {
        require(['toc'], function () {
        });
    }
    var colorList = [
        '#6da336',
        '#ff945c',
        '#66CC66',
        '#99CC99',
        '#CC6666',
        '#76becc',
        '#c99979',
        '#918597',
        '#4d4d4d'
    ];
    var id = Math.ceil(Math.random() * (colorList.length - 1));
    $('table').wrap('<div class=\'table-area\'></div>');
    $(document).ready(function () {
        if ($('#comments').length < 1) {
            $('#scroll > a:nth-child(2)').hide();
        }
    });
    if (yiliaConfig.isArchive || yiliaConfig.isTag || yiliaConfig.isCategory) {
        $(document).ready(function () {
            $('#footer').after('<button class=\'hide-labels\'>TAGS</button>');
            $('.hide-labels').click(function () {
                $('.article-info').toggle(200);
            });
        });
    }
    $('ul > li').each(function () {
        var taskList = {
            field: this.textContent.substring(0, 2),
            check: function (str) {
                var re = new RegExp(str);
                return this.field.match(re);
            }
        };
        var string = [
            '[ ]',
            [
                '[x]',
                'checked'
            ]
        ];
        var checked = taskList.check(string[1][0]);
        var unchecked = taskList.check(string[0]);
        var $current = $(this);
        function update(str, check) {
            var click = [
                'disabled',
                ''
            ];
            $current.html($current.html().replace(str, '<input type=\'checkbox\' ' + check + ' ' + click[1] + ' >'));
        }
        if (checked || unchecked) {
            this.classList.add('task-list');
            if (checked) {
                update(string[1][0], string[1][1]);
                this.classList.add('check');
            } else {
                update(string[0], '');
            }
        }
    });
});
define('main', [], function () {
    return;
});