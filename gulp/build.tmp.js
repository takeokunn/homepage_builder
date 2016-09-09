'use strict';

const
    gulp        = require('gulp'),
    del         = require('del'),
    path        = require('path'),
    runSequence = require('run-sequence').use(gulp)
;

const conf = require('./conf');

/**
 * delete .tmp folder
 */
gulp.task('clean:tmp', () => {
    return del([path.join(conf.paths.tmp, '/')]);
});

/**
 * copy from src/index.html to .tmp/server/index.html
 */
gulp.task('copy:html:tmp', () => {

    return gulp
        .src(path.join(conf.paths.src, '/index.html'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/server')))
    ;
});

/**
 * copy from src/assets/--/* to .tmp/server/assets/--/*
 */
gulp.task('copy:assets:tmp', () => {

    return gulp
        .src(path.join(conf.paths.src, '/assets/**/*'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/server/assets')))
    ;
});

/**
 * build .tmp folder and create some server
 */
gulp.task('build:tmp', () => {

    return runSequence(
        'clean:tmp',
        'copy:html:tmp',
        ['copy:assets:tmp', 'style:tmp', 'script:tmp'],
        'inject:tmp',
        ['server:start:tmp', 'watch:tmp']
    );
});
