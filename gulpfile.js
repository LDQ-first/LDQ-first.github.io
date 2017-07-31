const gulp = require('gulp');

//Plugins模块获取
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');

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
// es6语法导致出错？
gulp.task('minify-js', function() {
    return gulp.src('./public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});


// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html','minify-css'
]);