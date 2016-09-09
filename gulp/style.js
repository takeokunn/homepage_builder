'use strict';

const
    gulp         = require('gulp'),
    path         = require('path'),
    sass         = require('gulp-sass'),
    cssmin       = require('gulp-cssmin'),
    concat       = require('gulp-concat'),
    plumber      = require('gulp-plumber'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer')
;

const conf = require('./conf');

/**
 * compile scss into css and concat my scss files and put in .tmp/serer/app/index.css
 */
gulp.task('style:tmp', () => {

    return gulp
        .src(path.join(conf.paths.src, '/app/**/*.scss'))
        .pipe(plumber(conf.plumber))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(plumber.stop())
        .pipe(concat('index.css'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/server/app/')))
    ;
});

/**
 * compile scss into css and concat my scss files and minimize and put in dist/index.min.css
 */
gulp.task('style:dist', () => {

    return gulp
        .src(path.join(conf.paths.src, '/app/**/*.scss'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('index.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/css/')))
    ;
});
