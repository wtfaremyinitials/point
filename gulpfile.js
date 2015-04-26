var gulp = require('gulp');

var browserify = require('browserify');
var babelify   = require('babelify');

gulp.task('etc', function() {
    gulp
      .src('etc/**')
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

gulp.task('default', ['scripts', 'etc']);

gulp.task('watch', function() {
    gulp.watch('src/', ['scripts']);
    gulp.watch('etc/', ['etc']);
});
