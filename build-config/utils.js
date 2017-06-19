"use strict";
/*
 * zendapi (http://www.zendapi.org/)
 *
 * @link      http://github.com/qcoreteam/zendapi for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.zendapi.org/license/new-bsd New BSD License
 */
var glob = require("glob");
var path = require("path");

exports.pickFiles = function (options)
{
   var files = glob.sync(options.pattern);
   return files.reduce(function(data, filename) {
      var matched = filename.match(options.id);
      var name = matched[1];
      data[name] = path.resolve(__dirname, filename);
      return data;
   }, {});
};

exports.fullPath = function (dir)
{
   return path.resolve(__dirname, dir);
};