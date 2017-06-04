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

// SassファイルをCSSにコンパイル
gulp.task('sass', function() {
  // タスクを定義する
  gulp.src('src/assets/sass/*.scss')
  // エラー通知
  .pipe(plumber({errorHandler: notify.onError('<%- error.mesagge %>')}))
  // タスクを実行するファイルを指定
  .pipe(sass())
  // 実行する処理
  .pipe(autoprefixer())
  // ベンダープレフィックス付与
  .pipe(cssmin())
  // css圧縮
  .pipe(rename({suffix: '.min'}))
  // minにリネーム
  .pipe(gulp.dest('dest/assets/css'));
  // 出力先の指定
});

// JSファイルの圧縮
gulp.task('js', function() {
  gulp.src('src/assets/js/**/*.js')
  .pipe(plumber({errorHandler: notify.onError('<%- error.mesagge %>')}))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dest/assets/js'));
});

// HTMLファイルをdestに出力する
gulp.task('html', function() {
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('dest/'));
});

// 静的ファイルをコピー
gulp.task('copy', function() {
  gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('dest/assets/fonts'));
  gulp.src('src/assets/img/**/*')
    .pipe(gulp.dest('dest/assets/img'));
  gulp.src('src/assets/data/**/*')
    .pipe(gulp.dest('dest/assets/data'));
});

// 出力先のdestを一度空にする
gulp.task('clean', function(cb) {
  return rimraf('dest', cb);
});

// gulp buildで様々なタスクを実行させる
gulp.task('build', ['clean'], function(callback) {
  return runsequence(
    'copy',
    ['html', 'sass', 'js'],
    callback
  );
});

gulp.task('reload', function() {
  browserSync.reload();
});

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
