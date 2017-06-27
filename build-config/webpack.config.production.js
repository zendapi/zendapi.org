"use strict";
/*
 * TopJs Framework (http://www.topjs.org/)
 *
 * @link      http://github.com/qcoreteam/topjs for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.topjs.org/license/new-bsd New BSD License
 */
const webpack = require('webpack');
const config = require('./webpack.config.base');

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