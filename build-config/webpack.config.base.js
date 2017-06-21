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
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_PATH = Utils.fullPath("../themes/zendapi");
const SRC_PATH = ROOT_PATH + "/devel";
const DIST_PATH = ROOT_PATH + "/source";
const DIST_STATICS_PATH = DIST_PATH + "/statics";
const NODE_MODULES_PATH = Utils.fullPath("../node_modules");
const JS_LIB_PATH = SRC_PATH + "/libs";
const DEPLOY_JS_PATH = DIST_STATICS_PATH + "/js";
const CACHE_DIR = Utils.fullPath("../cache");
const DEPLOY_LAYOUT_PATH = Utils.fullPath("../themes/zendapi/layout");
const LAYOUT_PATH = SRC_PATH + "/layout";
const SITE_STATIC_PATH = "/statics";
//const __DEVEL__ = process.env.NODE_ENV !== "production";

const args = process.argv;
const uglify = args.indexOf("--uglify") > -1;

const alias = {
   Js: JS_LIB_PATH
};

const config = {
   context : SRC_PATH,
   entry : {
      index : LAYOUT_PATH + "/index.jsx",
      blog : LAYOUT_PATH + "/blog.jsx",
      manual : LAYOUT_PATH + "/manual.jsx",
      about : LAYOUT_PATH + "/about.jsx",
      layout: LAYOUT_PATH + "/layout.jsx"
   },
   output : {
      path : DEPLOY_JS_PATH,
      filename: "pages/[name].js"
   },
   module: {},
   resolve: {
      alias: alias,
      extensions: [".js", "jsx"]
   },
   plugins : [
      new webpack.DefinePlugin({
         "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
      }),
      new webpack.optimize.CommonsChunkPlugin({
         name: "common",
         filename: "../js/common.js",
         chunks: ["index", "blog", "manual", "about"]
      }),
      new webpack.optimize.CommonsChunkPlugin({
         name: "manifest",
         filename: "../js/manifest.js"
      }),
      new webpack.DllReferencePlugin({
         context: SITE_STATIC_PATH,
         manifest: require(DIST_PATH+"/statics/manifest.json"),
         name: "vendors", 
      })
   ],
   devtool: "eval-source-map"
};

config.module.rules = [];

config.module.rules.push({
   test: /\.(js|jsx)$/,
   exclude: /(node_modules|bower_components)/,
   use: {
      loader: "babel-loader",
      options: {
         presets: ["env","react"],
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
      filename: "../css/[name].css",
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