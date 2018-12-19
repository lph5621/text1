var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var list = require("./mock/data.json");

gulp.task('sass',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})
gulp.task('watch',function(){
    return gulp.watch("./src/scss/*.scss",gulp.series('sass'))
})
gulp.task('server',function(){
    return gulp.src("./src")
    .pipe(server({
        port:9700,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url).pathname;

            if(pathname == '/favicon.ico'){
                res.end('')
                return;
            }
            
            if(pathname == '/api/list'){ 
                var pagenum = url.parse(req.url,true).query.pagenum; //第一页
                var limit = url.parse(req.url,true).query.limit; //每页5条
                //console.log(pagenum)
                var total = Math.ceil(list.length/limit) //总共要多少页
                
                var start = (pagenum-1)*limit;
                var end = pagenum * limit;

                var newArr = list.slice(0); //克隆新数组
                var target = newArr.slice(start,end);

                res.end(JSON.stringify({code:1,data:target,total:total}))
            }else{
                pathname = pathname =="/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname,"src",pathname)));
            }
        }
    }))
})
gulp.task('dev',gulp.series('sass','server','watch'))