'use strict';

const
    del         = require('del'),
    gulp        = require('gulp'),
    path        = require('path'),
    runSequence = require('run-sequence').use(gulp)
;

const conf = require('./conf');

/**
 * delete dist folder
 */
gulp.task('clean:dist', () => {
    return del([path.join(conf.paths.dist, '/')]);
});

/**
 * copy from src/index.html to dist/index.html
 */
gulp.task('copy:html:dist', () => {

    return gulp
        .src(path.join(conf.paths.src, '/index.html'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    ;
});

/**
 * copy from src/assets/--/* to dist/assets/--/*
 */
gulp.task('copy:assets:dist', () => {

    return gulp
        .src(path.join(conf.paths.src, '/assets/**/*'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/assets')))
    ;
});

/**
 * build dist folder
 */
gulp.task('build:dist', () => {

    return runSequence(
        'clean:dist',
        ['copy:html:dist', 'copy:assets:dist', 'style:dist', 'script:dist',],
        'inject:dist'
    );
});
