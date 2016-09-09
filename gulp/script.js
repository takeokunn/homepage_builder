'use strict';

const
    gulp    = require('gulp'),
    path    = require('path'),
    uglify  = require('gulp-uglify'),
    eslint  = require('gulp-eslint'),
    plumber = require('gulp-plumber'),
    webpack = require('webpack-stream')
;

const conf = require('./conf');

/**
 * concat my javascript files and compile es6 into es5 and put in .tmp/server/app/index.js
 */
gulp.task('script:tmp', () => {

    return gulp
        .src(path.join(conf.paths.src, '/app/**/*.js'))
        .pipe(plumber(conf.plumber))
        .pipe(eslint(conf.eslint))
        .pipe(webpack(conf.webpack('index.js')))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/server/app/')))
    ;
});

/**
 * concat my javascript files and compile es6 into es5 and uglify and put in dist/index.min.js
 */
gulp.task('script:dist', () => {

    return gulp
        .src(path.join(conf.paths.src, '/app/**/*.js'))
        .pipe(eslint(conf.eslint))
        .pipe(webpack(conf.webpack('index.min.js')))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/js/')))
    ;
});
