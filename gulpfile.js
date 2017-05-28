'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var blowserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');


gulp.task('sass',function(){
  gulp.src('src/assets/sass/*.scss')
  .pipe(plumber({errorHandler: notify.onError('<%- error.message %>')}))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dest/assets/css'));
});
