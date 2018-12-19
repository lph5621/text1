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

            if(pathname == '/api/list'){
                res.end(JSON.stringify({code:1,data:list}))
            }else{
                pathname = pathname =="/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname,"src",pathname)));
            }
        }
    }))
})
gulp.task('dev',gulp.series('sass','server','watch'))