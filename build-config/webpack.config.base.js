"use strict";
/*
 * zendapi (http://www.zendapi.org/)
 *
 * @link      http://github.com/qcoreteam/zendapi for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.zendapi.org/license/new-bsd New BSD License
 */
const Utils = require("./utils");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_PATH = Utils.fullPath("../themes/zendapi");
const SRC_PATH = ROOT_PATH + "/devel";
const DIST_PATH = ROOT_PATH + "/source";
const NODE_MODULES_PATH = Utils.fullPath("../node_modules");
const JS_PATH = SRC_PATH + "/js";
const CACHE_DIR = Utils.fullPath("../cache");
const HEXO_LAYOUT_PATH = Utils.fullPath("../themes/zendapi/layout");

//const __DEVEL__ = process.env.NODE_ENV !== "production";

const args = process.argv;
const uglify = args.indexOf("--uglify") > -1;

const alias = {
   base : JS_PATH + "/base.js"
};

const config = {
   context : SRC_PATH,
   entry : {
      index : JS_PATH + "/pages/index.js",
      blog : JS_PATH + "/pages/blog.js",
      manual : JS_PATH + "/pages/manual.js",
      about : JS_PATH + "/pages/about.js",
      vender : ["jquery", "uikit"]
   },
   output : {
      path : DIST_PATH,
      filename: "statics/js/[name].js"
   },
   module: {},
   resolve: {
      alias: alias
   },
   plugins : [
      new webpack.DefinePlugin({
         "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //    names: ["common", "vender", "manifest"]
      // })
      new webpack.optimize.CommonsChunkPlugin({
         name: "common",
         filename: "statics/js/common.js",
         chunks: ["index", "blog", "manual", "about"]
      }),
      new webpack.optimize.CommonsChunkPlugin({
         name: "manifest"
      })
   ]
};

config.module.rules = [];

config.module.rules.push({
   test: /\.js$/,
   exclude: /(node_modules|bower_components)/,
   use: {
      loader: 'babel-loader',
      options: {
         presets: ['env'],
         cacheDirectory: CACHE_DIR
      }
   }
});

config.module.rules.push({
   test: /\.scss$/,
   use: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [{
         loader: "css-loader"
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
config.plugins.push(
   new ExtractTextPlugin({
      filename: "statics/css/[name].css",
      allChunks: true
   })
);

config.module.rules.push({
   test: /\.(?:jpg|gif|png|svg)$/,
   use: [{
      loader: "url?limit=8000&name=statics/images/[hash].[ext]"
   },{
      loader: "image-webpack"
   }]
});

if (uglify) {
   config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            warnings: false
         },
         output: {
            comments: false
         }
      })
   );
}

module.exports = config;