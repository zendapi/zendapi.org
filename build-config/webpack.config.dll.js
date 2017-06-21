"use strict";
/*
 * zendapi (http://www.zendapi.org/)
 *
 * @link      http://github.com/qcoreteam/zendapi for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.zendapi.org/license/new-bsd New BSD License
 */
const path = require("path");
const Utils = require("./utils");
const webpack = require("webpack");
const ROOT_PATH = Utils.fullPath("../themes/zendapi");
const SRC_PATH = ROOT_PATH + "/devel";
const DIST_PATH = ROOT_PATH + "/source";
const NODE_MODULES_PATH = Utils.fullPath("../node_modules");
//const __DEVEL__ = process.env.NODE_ENV !== "production";

const config = {
   context : SRC_PATH,
   entry : {
      vendors : [
         "jquery",
         "react",
         "react-dom",
         "uikit"
      ]
   },
   output : {
      path : DIST_PATH,
      filename: "statics/js/[name].js",
      // filename: "[name].[chunkhash].js",
      // library: "[name]_[chunkhash]",
      library: "[name]"
   },
   plugins : [
      new webpack.DllPlugin({
         context : DIST_PATH+"/statics",
         path: DIST_PATH+"/statics/manifest.json",
         name: "[name]"
      })
   ]
};


module.exports = config;