var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');

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
            //var pathname = 

        }
    }))
})
gulp.task('dev',gulp.series('sass','server','watch'))