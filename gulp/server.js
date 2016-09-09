'use strict';

const
    gulp        = require('gulp'),
    path        = require('path'),
    browserSync = require('browser-sync').create()
;

const conf = require('./conf');

/**
 * create dev server using browser-sync
 */
gulp.task('server:start:tmp', () => {

    return browserSync.init({
        port   : conf.port,
        server : {
            baseDir : path.join(conf.paths.tmp, '/server')
        },
    });
});

/**
 * reload dev server
 */
gulp.task('server:reload:tmp', () => {
    return browserSync.reload();
});
