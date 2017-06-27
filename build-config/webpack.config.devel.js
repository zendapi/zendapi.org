"use strict";
/*
 * zendapi (http://www.zendapi.org/)
 *
 * @link      http://github.com/qcoreteam/zendapi for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.zendapi.org/license/new-bsd New BSD License
 */
const webpack = require('webpack');
const config = require('./webpack.config.base');

const args = process.argv;
const watch = args.indexOf('--watch') > -1;
const online = args.indexOf('--deploy=online') > -1;

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

// if (watch) {
//    compiler.watch({}, callback);
// } else {
//    compiler.run(callback);
// }
compiler.run(callback);