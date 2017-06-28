"use strict";
let PathUtils = require("path");
let Clone = require("clone");
hexo.extend.helper.register('manual_key_from_path', function(path){
   return PathUtils.basename(path, ".html");
});

hexo.extend.helper.register('clone', function(source){
   return Clone(source);
});