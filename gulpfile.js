'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass',function(){
  gulp.src('src/assets/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dest/assets/css'));
});
