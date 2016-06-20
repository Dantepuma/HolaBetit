'use strict';
var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var del = require('del');
// var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src(['./public/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// cmd: #gulp browserify
gulp.task('browserify', function() {
    return browserify('./app/app.js')
        // bundle it and create main.js file
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/'));
})

// copy html and css file(s) to public folder
// cmd: #gulp copy
gulp.task('copy', ['browserify','scss'], function() {
    gulp.src(['./app/**/*.html','./assets/**/*.css'])
        .pipe(gulp.dest('./public'))
		.pipe(browserSync.stream())
});

// Create css file(s) from scss(s) and save it to stylesheet folder
// cmd: #gulp scss
gulp.task('scss', function() {
    gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/stylesheet/'));
});

// delete public folder file(s)
gulp.task('clean:public', function() {
  return del.sync('public');
})

// setup a build task with subtasks
gulp.task('build',['clean:public', 'lint', 'scss', 'copy']);

gulp.task('browser-sync', ['build'], function() {
    browserSync.init({
    server: {
        baseDir: "./public",
        // options comment:
  			// The key is the url to match
  			// The value is which folder to serve (relative to your current working directory)
  			routes: {
  				"/node_modules": "node_modules"
  			}
      },
    // open with google chrome or firefox
	  browser:"google chrome"
    });
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("./app/**/*.*", ["build"]);
  gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});
