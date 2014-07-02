var gulp = require('gulp'),
  buildConfig = require('./config/build.config'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  argv = require('minimist')(process.argv.slice(2)),
  footer = require('gulp-footer'),
  header = require('gulp-header'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  karma = require('karma').server,
  //karmaConf = require('./config/karma.conf.js'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch');

gulp.task('build', function () {
  return gulp.src(buildConfig.jsFiles)
    .pipe(concat(buildConfig.filename))
    .pipe(header(buildConfig.closureStart))
    .pipe(footer(buildConfig.closureEnd))
    .pipe(header(buildConfig.banner))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(buildConfig.dist));
});

gulp.task('sass', function() {
  gulp.src('src/scss/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build', 'sass'], function() {
  gulp.watch(['src/js/**/*.js', 'src/scss/**/*.scss'], ['build', 'sass']);
});

gulp.task('default', ['build', 'sass']);
