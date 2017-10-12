const gulp = require('gulp');

//Plugins模块获取
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');
const imagemin  = require('gulp-imagemin');


// 压缩 public 目录 css文件
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});

// 压缩 public 目录 html文件
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
});



// 压缩 public/js 目录 js文件
// AMD语法导致出错？
gulp.task('minify-js', function() {
    return gulp.src('./public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});


gulp.task('img', function(){
    return gulp.src('./public/**/**.*')
               .pipe(imagemin ({
                    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                    multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
               }))
            .pipe(gulp.dest('./public'));
})


// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html','minify-css','minify-js','img'
]);