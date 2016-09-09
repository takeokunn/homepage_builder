'use strict';

const notifier = require('node-notifier');

/**
 * main paths in my project
 */
exports.paths = {
    src  : 'src',
    tmp  : '.tmp',
    root : __dirname,
    dist : 'dist'
};

/**
 * server port
 */
exports.port = 5000;

/**
 * plumber config
 */
exports.plumber = {
    errorHandler: (error) => {
        let title    = 'es6/scss error';
        let errorMsg = 'error: ' + error.message;
        console.log(error);
        notifier.notify({
            title   : title,
            message : errorMsg,
            time    : 5000
        });
    }
};

/**
 * eslint config using in ./script.js
 */
exports.eslint = {
    'extends': 'eslint:recommended',
    'env': {
        'browser' : true,
        'es6'     : true
    },
    "rules":{
        "no-console":0
    }
};

/**
 * webpack config using in ./script.js
 */
exports.webpack = (filename_) => {
    return {
        devtool: 'inline-source-map',
        module: {
            loaders: [{
                loader : 'babel-loader',
                exclude: /node_modules/,
                query  : {
                    presets: ['es2015']
                }
            }],
        },
        output: {
            filename: filename_
        }
    };
};

/**
 * html minimize config using in ./inject.js
 */
exports.htmlmin = {
    collapseWhitespace : true,
    removeComments     : true
}
