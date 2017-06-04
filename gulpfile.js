'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');
var runsequence = require('run-sequence');


gulp.task('sass',function(){
  gulp.src('src/assets/sass/*.scss')
  .pipe(plumber({errorHandler: notify.onError('<%- error.message %>')}))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dest/assets/css'));
});

gulp.task('js',function(){
  gulp.src('src/assets/js/**/*.js')
  .pipe(plumber({errorHandler: notify.onError('<%- error.message %>')}))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dest/assets/js'));
});

gulp.task('html',function(){
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('dest/'));
});

gulp.task('copy',function(){
  gulp.src('src/assets/fonts/**/*')
  .pipe(gulp.dest('dest/assets/fonts'));
  gulp.src('srcc/assets/img/**/*')
  .pipe(gulp.dest('dest/assets/img'));
  gulp.src('src/assets/data/**/*')
  .pipe(gulp.dest('dest/assets/data'));
});

gulp.task('clean',function(cb){
  return rimraf('dest', cb);
});

gulp.task('build', ['clean'],function(callback){
  return runsequence(
    'copy',
    ['html','sass','js'],
    callback
  );
});

// gulp.task('reload', function(){
//   browserSync.reload();
// });
gulp.task('reload', function() {
  browserSync.reload();
});

// gulp.task('default', function(){
//   browserSync({
//     server: {baseDir: 'dest'}
//   });
//   gulp.watch('src/**/*.html', ['reload']);
//   gulp.watch('src/**/*.html', ['html']);
//   gulp.watch('src/assets/sass/*.sass', ['sass']);
// });

// watchするタスク
gulp.task('watch', function() {
  gulp.watch('src/**/*.html', ['reload']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/assets/sass/*.scss', ['sass']);
  gulp.watch('src/assets/js/**/*.js', ['js']);
  gulp.watch('src/assets/fonts/**/*', ['copy']);
  gulp.watch('src/assets/img/**/*', ['copy']);
  gulp.watch('src/assets/data/**/*', ['copy']);
  gulp.watch('src/**/*.html', ['reload']);
  browserSync({
    server: {baseDir: 'dest'}
  });
});

// gulpコマンドでwatch実行
gulp.task('default', ['watch']);
