var gulp = require('gulp');

var browserify = require('browserify');
var babelify   = require('babelify');

var less   = require('gulp-less');
var mincss = require('gulp-minify-css');
var rename = require('gulp-rename');

var concat = require('gulp-concat');

gulp.task('www', function() {
    gulp
      .src('www/**')
      .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', function() {
    browserify()
        .transform(babelify.configure({ optional: ["es7.asyncFunctions"] }))
        .require('./src/app.js')
        .bundle()
        .on('error', function(err) { console.error(err) })
        .pipe(require('fs').createWriteStream('./dist/app.js'));
});

gulp.task('style', function() {
    gulp
      .src('style/*.less')
      .pipe(less())
      .pipe(mincss())
      .pipe(rename(function(path) { path.extname = '.min' + path.extname }))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['scripts', 'www', 'style']);

gulp.task('watch', function() {
    gulp.watch('src/',   ['scripts']);
    gulp.watch('www/',   ['www']);
    gulp.watch('style/', ['style']);
});
