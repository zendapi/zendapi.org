---
layout: manual
subtype: normal
title: 听说每个扩展都会定义自己常量，不要担心我们也行
---
大家如果经常阅读`PHP`官方手册的话会发现，在扩展那一章里面的每个扩展的介绍的时候，都有一节是`Predefined Constants`预定义常量，这些常量是不需要您在`PHP`里面进行定义就可以使用的。
> 比如`Mysqli`扩展的 Predefined Constants [http://php.net/manual/en/mysqli.constants.php](http://php.net/manual/en/mysqli.constants.php)

那么我们必须也在我们`hellozapi`扩展中也定义几个常量玩玩啊，其实真的很简单，不信？那咱们走着看。

回到我们上节介绍的定义项目入口代码：

```cpp
#include "zapi/ZendApi.h"

extern "C" {

ZAPI_DECL_EXPORT void *get_module() 
{
   static zapi::lang::Extension hellozapi("hellozapi", "1.0");
   return hellozapi;
}

}
```
咱们定义如下几个常量：(不要太纠结实际意义，哈哈，本身我们的这个扩展都是臆想出来的)
1. HELLO_ZAPI_VERSION (int)
2. HELLO_ZAPI_NAME (string)
3. HELLO_DEBUG_MODE (bool)
4. HELLO_ZAPI_PI (double)

#### zendAPI 常量描述类简单介绍
在`zendAPI`里面我们使用`zapi::lang::Constant`来描述一个常量的元信息，使用起来很简单，他的构造函数接受两个参数，第一个参数是常量名称，第二个参数是常量的值。例如我们使用下面代码去定义一个`ROOT_DIR`常量, 常量值是`/srv/www`。

```cpp
using zapi::lang::Constant;
Constant dirConst("ROOT_DIR", "/srv/www");
```
> [zapi::lang::Constant API 手册参考](/api/classzapi_1_1lang_1_1_constant.html)

现在大家学习完背景知识，让我们撸起袖子写代码吧。
##### C++ Code
```cpp
#include "zapi/ZendApi.h"

﻿using zapi::lang::Constant;

extern "C" {

ZAPI_DECL_EXPORT void *get_module() 
{
   static zapi::lang::Extension hellozapi("hellozapi", "1.0");
   ﻿Constant hellozapiVersionConst("HELLO_ZAPI_VERSION", 0x010002);
   Constant hellozapiNameConst("HELLO_ZAPI_NAME", "Hello zendAPI!");
   Constant helloDebugModeConst("HELLO_DEBUG_MODE", true);
   Constant helloPiConst("HELLO_ZAPI_PI", 3.14);
   hellozapi.registerConstant(std::move(hellozapiVersionConst));
   hellozapi.registerConstant(std::move(hellozapiNameConst));
   hellozapi.registerConstant(std::move(helloDebugModeConst));
   hellozapi.registerConstant(std::move(helloPiConst));
   return hellozapi;
}

}
```
如果您对`std::move`感到陌生，您可以阅读 cpp reference 手册
> [std::move 用户手册](http://en.cppreference.com/w/cpp/utility/move)

怎么样，就这么几行，咱们的预定义常量就算定义好了，现在当执行我们`PHP`脚本的时候就可以直接使用了。

##### PHP Code
```php
if (defined("HELLO_ZAPI_VERSION")) {
    echo HELLO_ZAPI_VERSION;
}
echo "\n";
if (defined("HELLO_ZAPI_NAME")) {
    echo HELLO_ZAPI_NAME;
}
echo "\n";
if (defined("HELLO_DEBUG_MODE")) {
    if (HELLO_DEBUG_MODE) {
        echo "true";
    } else {
        echo "false";
    }
}
echo "\n";
if (defined("HELLO_ZAPI_PI")) {
    echo HELLO_ZAPI_PI;
}
// you will get
// ﻿65538
// Hello zendAPI!
// true
// 3.14
```
好了，到这里我们就把预定义常量就讲完了，我没有骗您吧，真的很简单，稍作调整让我们继续前进！