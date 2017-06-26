---
title: Hello world, 我们的小窝终于上线了！
date: 2017-06-26 10:03:32
tags:
---
经过两个星期的劳动，我们相关的官网网站终于跟大家见面了，这个也算是一个小小的里程碑吧，后面我们会继续完善网站的内容和继续打磨阅读体验，把更好的产品带给大家，继续加油！

### 在这里打个广告
>欢迎大家访问我们的github库, http://www.github.com/qcoreteam/zendapi

`嵩哥` 这个是markdown解析
```javascript
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
         "uikit",
         "uikit/dist/js/uikit-icons",
         "perfect-scrollbar"
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
```
下面是C++代码
```cpp
#include "zapi/lang/StdClass.h"
#include "zapi/lang/NotImplemented.h"
#include "zapi/lang/Variant.h"
#include "zapi/vm/StdClassImpl.h"

namespace zapi
{
namespace lang
{

/**
 * Overridable method that is called right before an object is destructed
 */
void StdClass::__destruct() const
{
   throw NotImplemented();
}

/**
 * Overridable method that is called to check if a property is set
 *
 * The default implementation does nothing, and the script will fall back
 * to accessing the regular object properties
 *
 * @param  key
 * @return bool
 */
bool StdClass::__isset(const Variant &key) const
{
   throw NotImplemented();
   return false;
}
} // zapi
} // lang
```
php代码

```php
function process_html_entities(array &$data, array $fields = array())
{
    foreach ($fields as $field) {
        if (isset($data[$field]) && is_string($data[$field])) {
            $data[$field] = htmlspecialchars($data[$field], ENT_QUOTES);
        }
    }
}
```