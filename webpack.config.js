"use strict";

var path = require('path');

module.exports = {
    entry: './themes/zendapi/devel/js/index.js',
    output: {
        filename: 'base.js',
        path: path.resolve(__dirname, 'themes/zendapi/source/js')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
        },{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    }
};