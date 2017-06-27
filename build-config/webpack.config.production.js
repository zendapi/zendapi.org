"use strict";
/*
 * TopJs Framework (http://www.topjs.org/)
 *
 * @link      http://github.com/qcoreteam/topjs for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.topjs.org/license/new-bsd New BSD License
 */
const path = require("path");
const Utils = require("./utils");
const webpack = require('webpack');
const config = require('./webpack.config.base');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_PATH = Utils.fullPath("../themes/zendapi");
const SRC_PATH = ROOT_PATH + "/devel";
const NODE_MODULES_PATH = Utils.fullPath("../node_modules");

config.plugins.push(
   new webpack.DefinePlugin({
      'process.env': {
         NODE_ENV: JSON.stringify('production')
      }
   }),
   new webpack.optimize.UglifyJsPlugin({
      compress: {
         warnings: false
      },
      output: {
         comments: false
      }
   })
);

config.module.rules.push({
   test: /\.scss$/,
   use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [{
         loader: "css-loader",
         options: {
            minimize: true
         }
      }, {
         loader: "sass-loader",
         options: {
            includePaths: [
               SRC_PATH+"/scss",
               NODE_MODULES_PATH
            ],
         }
      }]
   })
});

const compiler = webpack(config);

function callback(err, stats) {
   if (err) {
      console.log(err);
   } else {
      console.log(stats.toString({
         colors: true,
         chunks: false,
         children: false,
      }));
   }
}

compiler.run(callback);