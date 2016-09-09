'use strict';

const
    gulp      = require('gulp'),
    path      = require('path'),
    uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat'),
    cssmin    = require('gulp-cssmin'),
    rename    = require('gulp-rename'),
    filter    = require('gulp-filter'),
    bowerfile = require('gulp-main-bower-files')
;

const conf = require('./conf');

/**
 * concat bower component and put in dist/js|css/bower.js|css
 */
gulp.task('bower:dist', () => {

    let jsfilter  = filter('**/*.js',  {restore: true}),
        cssfilter = filter('**/*.css', {restore: true})
    ;

    return gulp
        .src('bower.json')
        .pipe(bowerfile())

        // js file
        .pipe(jsfilter)
        .pipe(uglify())
        .pipe(concat('bower.js'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/js/')))
        .pipe(jsfilter.restore)

        // css file
        .pipe(cssfilter)
        .pipe(cssmin())
        .pipe(concat('bower.css'))
        .pipe(gulp.dest(path.join(conf.paths.dist, '/css/')))
    ;
});
