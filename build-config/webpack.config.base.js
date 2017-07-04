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
   Js: JS_LIB_PATH,
   Components: SRC_PATH + "/components",
   Scss: SRC_PATH + "/scss"
};

const config = {
   context : SRC_PATH,
   entry : {
      index : LAYOUT_PATH + "/index.jsx",
      blog : LAYOUT_PATH + "/blog.jsx",
      manual : LAYOUT_PATH + "/manual.jsx",
      about : LAYOUT_PATH + "/about.jsx",
      article: LAYOUT_PATH + "/article.jsx",
      "api/index": LAYOUT_PATH + "/api/index.jsx",
      "api/modules": LAYOUT_PATH + "/api/modules.jsx",
      "api/namespaces": LAYOUT_PATH + "/api/namespaces.jsx",
      "api/globals": LAYOUT_PATH + "/api/globals.jsx",
      "api/module_content" : LAYOUT_PATH + "/api/module_content.jsx",
      "api/namespace_content" : LAYOUT_PATH + "/api/namespace_content.jsx"
   },
   output : {
      path : DIST_PATH,
      filename: "statics/js/pages/[name].js"
   },
   module: {},
   resolve: {
      alias: alias,
      extensions: [".js", ".jsx"]
   },
   plugins : [
      new webpack.optimize.CommonsChunkPlugin({
         name: "common",
         filename: "statics/js/common.js"
      }),
      new ExtractTextPlugin({
         filename: "statics/css/[name].css",
         allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
         name: "manifest",
         filename: "statics/js/manifest.js"
      }),
      new webpack.DllReferencePlugin({
         context: DIST_PATH+"/statics",
         manifest: require(DIST_PATH+"/statics/manifest.json"),
         name: "vendors",
      }),
      new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery",
         "window.jQuery": "jquery",
         "window.$": "jquery"
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
   test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
   use: [{
      loader: 'file-loader',
      options: {
         name: 'statics/fonts/[name].[ext]',
         publicPath: "/"
      }
   }]
});

config.module.rules.push({
   test: /\.svg(\?[a-z0-9]+)?$/,
   use: [{
      loader: 'file-loader',
      options: {
         useRelativePath: false,
         name: 'statics/images/[path]/[name].[ext]',
         publicPath: "/"
      }
   }]
});


config.module.rules.push({
   test: /\.(?:jpg|gif|png|jpeg)$/,
   use: [{
      loader: "url-loader",
      options: {
         limit: 8192,
         useRelativePath: false,
         name: 'statics/images/[path]/[name].[ext]'
      }
   }]
});


module.exports = config;