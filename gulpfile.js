const gulp = require('gulp');

//Plugins模块获取
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');
const amdOptimize = require("amd-optimize"); 

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


gulp.task("main", function () {  
  return gulp.src("./public/js/*.js")   
    // Traces all modules and outputs them in the correct order.   
    .pipe(amdOptimize("main"))   //主入口文件    
    .pipe(uglify()) 
    .pipe(gulp.dest("./public/js"))  //输出目录  
});  

gulp.task("pc", function () {  
  return gulp.src("./public/js/*.js")   
    // Traces all modules and outputs them in the correct order.   
    .pipe(amdOptimize("pc"))   //主入口文件    
    .pipe(uglify()) 
    .pipe(gulp.dest("./public/js"))  //输出目录  
}); 

gulp.task("mobile", function () {  
  return gulp.src("./public/js/*.js")   
    // Traces all modules and outputs them in the correct order.   
    .pipe(amdOptimize("mobile"))   //主入口文件    
    .pipe(uglify()) 
    .pipe(gulp.dest("./public/js"))  //输出目录  
}); 

// 压缩 public/js 目录 js文件
// es6语法导致出错？
gulp.task('minify-js', function() {
    return gulp.src('./public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});


// 执行 gulp 命令时执行的任务
gulp.task('default', [
    'minify-html','minify-css', 'main', 'pc', 'mobile','minify-js'
]);