'use strict';

const
    gulp = require('gulp'),
    read = require('fs-readdir-recursive')
;

/**
 * read files in ./gulp/*.js
 */
read('./gulp')
    .filter((file_) => {
        return (/\.js$/i).test(file_);
    })
    .map((file_) => {
        require('./gulp/' + file_);
    });

/**
 * for develop
 */
gulp.task('default', () => {
    gulp.start('build:tmp');
});

/**
 * for distribution
 */
gulp.task('dist', () => {
    gulp.start('build:dist');
});
