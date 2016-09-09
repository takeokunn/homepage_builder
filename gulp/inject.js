'use strict';

const
    gulp    = require('gulp'),
    path    = require('path'),
    inject  = require('gulp-inject'),
    replace = require('gulp-replace'),
    htmlmin = require('gulp-htmlmin'),
    wiredep = require('wiredep').stream
;

const conf = require('./conf');

/**
 * inject my css/javascript files into .tmp/server/index.html
 */
gulp.task('inject:tmp', () => {

    return gulp
        .src(path.join(conf.paths.tmp, '/server/index.html'))
        .pipe(wiredep())
        .pipe(replace('../../bower_components', '/bower_components'))
        .pipe(inject(gulp.src(path.join(conf.paths.tmp, '/server/app/index.js'))))
        .pipe(inject(gulp.src(path.join(conf.paths.tmp, '/server/app/index.css'))))
        .pipe(replace('/.tmp/server/', './'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/server/')))
    ;
});

/**
 * inject my css/javascript files into dist/index.html and minimize
 */
 gulp.task('inject:dist', () => {

    return gulp
        .src(path.join(conf.paths.dist, '/index.html'))
        .pipe(inject(gulp.src(
            [
                path.join(conf.paths.dist, '/css/bower.css'),
                path.join(conf.paths.dist, '/css/index.min.css')
            ]
        )))
        .pipe(inject(gulp.src(
            [
                path.join(conf.paths.dist, '/js/bower.js'),
                path.join(conf.paths.dist, '/js/index.min.js')
            ]
        )))
        .pipe(replace('/dist/', './'))
        .pipe(htmlmin(conf.htmlmin))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        ;
});
