---
layout: manual
subtype: normal
title: 这是一个从 CPP 的世界通往 PHP 的世界的神奇的地方
---
`zendAPI` 项目不提供任何底层的功能，只是封装了 `zend engine` 提供的功能，对上提供一个易用的编程接口。这篇文章中，我们将介绍 `C++` 世界与 `C` 世界交汇的地方，在这里也是 `zendAPI` 的接口与 `zend engine` 进行整合的地方，非常重要。
每一个 `PHP` 扩展必须有一个描述对象，在 `zendAPI` 中我们 `zapi::lang::Extension` 类主要的作用主要完成这个功能。现在我们来看一个最简单的 `zendAPI` 项目的入口文件长什么样子: 

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
怎么样很简单吧，一个空的 `PHP` 扩展就完成了，现在我们就详细解释下每行的作用。

```cpp
﻿#include "zapi/ZendApi.h"
```
在开发基于 `zendAPI` 的项目时候，我们只需要包含这个头文件就可以了，在这个头文件中，我们会引入 `zendAPI` 日常开发需要的必要的头文件，您不用自己一个一个自己去引入。

```cpp
﻿extern "C"
{}
```

在 `CPP` 代码与 `C` 代码进行连接的时候我们一般会加上 `extern wrapper`, 因为如果不加的话 `CPP` 编译器会对函数名称进行 `name mangling`，这个会导致连接的时候提示符号不存在的错误。

```cpp
﻿ZAPI_DECL_EXPORT void *get_module();
```
`ZAPI_DECL_EXPORT` 表示我们扩展导出符号 `get_module` 给其他库使用。函数 `get_module` 这个函数非常重要，他是 `zendAPI` 与 `zend engine` 进行集成的入口，我们必须在这个函数中设置好我们扩展的一切，然后将扩展描述对象的指针返回。
在这里我先简单描述下 `PHP` 加载扩展这部分的过程：
在 `PHP` 初始化的过程中调用的函数有：(这里我们以 `cli SAPI` 为例进行说明)
1. php_cli_startup
2. php_module_startup
3. php_ini_register_extensions
4. php_load_extension
5. get_module = (zend_module_entry *(*)(void)) DL_FETCH_SYMBOL(handle, "_get_module");
6. 调用 get_module，获取﻿zend_module_entry 对象指针

简单来说我们可以这样理解，在 `PHP` 模块初始化的时候，`PHP` 会去读取我们在 `php.ini` 文件中注册的扩展, 比如咱们的 `hellozapi` 就在 `php.ini` 注册了一行 `extension=hellozapi.so`。如果相关的扩展文件存在，`PHP` 使用 `﻿dlopen` 平台接口进行动态加载，成功的话, 获取 `_get_module` 符号，然后进行调用，最终获取一个 `﻿zend_module_entry` 指针。

```cpp
static zapi::lang::Extension hellozapi("hellozapi", "1.0");
```
这行代码实例化一个扩展对象，第一个参数是咱们的扩展的名称，一般需要跟在 `CMake` 脚本中定义的项目名字保持一致，第二个参数指定扩展的版本号，这里我们定义为 `1.0`，这些信息我们都可以在 `PHP` 脚本中通过反射技术获取同时也会出现在 `phpinfo()` 函数的输出中。
*特别提醒：这里的 `static` 关键字不能去掉，去掉了我们就返回了一个悬空指针。（dangle pointer）*

```cpp
return hellozapi;
```
新手可能会有疑问，我们的 `get_module` 明明是返回一个 `void *`，而我们这里返回 `zapi::lang::Extension` 对象怎么也可以啊 ？原理很简单，因为我们的 `zapi::lang::Extension` 定义了一个转换运算符，`C++` 编译器会自动进行类型转换。

到这里，我们这个空的 `PHP` 扩展就完成了，怎么样，简单吧？休息一下我们继续。

#### 文章使用的编程文档的引用连接

> [ZAPI_DECL_EXPORT](/api/file_compiler_detection_8h.html#1a6483198f166d8060fb07d99604ef1cfe)
> [zapi::lang::Extension](/api/classzapi_1_1lang_1_1_extension.html)