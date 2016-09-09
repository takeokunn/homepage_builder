'use strict';

const
    gulp        = require('gulp'),
    path        = require('path'),
    watch       = require('gulp-watch'),
    runSequence = require('run-sequence').use(gulp)
;

const conf = require('./conf');

/**
 * watch scss in src/app/--/*.scss
 */
gulp.task('watch:scss:tmp', () => {

    return watch(path.join(conf.paths.src, '/app/**/*.scss'), () => {
        runSequence(
            'style:tmp',
            'server:reload:tmp'
        );
    });
});

/**
 * watch script in src/app/--/*.js
 */
gulp.task('watch:script:tmp', () => {

    return watch(path.join(conf.paths.src, '/app/**/*.js'), () => {
        runSequence(
            'script:tmp',
            'server:reload:tmp'
        );
    });
});

/**
 * watch html in src/app/index.html
 */
gulp.task('watch:html:tmp', () => {

    return watch(path.join(conf.paths.src, '/index.html'), () => {
        runSequence(
            'copy:html:tmp',
            'inject:tmp',
            'server:reload:tmp'
        );
    });
});

/**
 * watch asset in src/assets/--/*
 */
 gulp.task('watch:asset:tmp', () => {

    return watch(path.join(conf.paths.src, '/assets/**/*'), () => {
        runSequence(
            'copy:assets:tmp',
            'server:reload:tmp'
        );
    });
});

gulp.task('watch:tmp', ['watch:scss:tmp', 'watch:script:tmp', 'watch:html:tmp', 'watch:asset:tmp']);
