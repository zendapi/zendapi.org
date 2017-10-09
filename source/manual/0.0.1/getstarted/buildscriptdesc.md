---
layout: manual
subtype: normal
title: 您写的代码都是这个脚本给编译器发指令生成的
---
因为`zendAPI`采用的是`CMake`进行编译，所以我们的`hellozapi`项目也采用`CMake`进行编译，但是如果您有更擅长的`build system`您也可以按照自己的情况进行选择。只要您能保证能正常的找到`zendAPI`的头文件，`PHP`的头文件和`zendAPI`的动态链接库即可。

#### hellozapi 项目 CMake 编译脚本整体代码
```cmake
﻿cmake_minimum_required(VERSION 3.4.3 FATAL_ERROR)
project(hellozapi CXX)
set(CMAKE_CXX_STANDARD 11)
# register zapi cmake modules, you must modify 
# this according to your self zapi install prefix 
list(APPEND CMAKE_PREFIX_PATH "/usr/local/lib/cmake/zapi")
# here find zendAPI lib
find_package(zendAPI 0.0.1 EXACT REQUIRED CONFIG)
add_library(hellozapi MODULE 
    hellozapi/defs.h
    hellozapi/defs.cpp
    hellozapi/entry.cpp)
set_target_properties(hellozapi PROPERTIES 
    OUTPUT_NAME hellozapi
    PREFIX "")
target_link_libraries(hellozapi ${ZAPI_LIBRARY})
install(TARGETS hellozapi DESTINATION ${ZAPI_PHP_EXTENSION_DIR})

```

#### CMake 编译脚本逐行解说

```cmake
cmake_minimum_required(VERSION 3.4.3 FATAL_ERROR)
```
我们推荐的`CMake`版本是`3.4.3`, 这里如果您的版本低于`3.4.3`的话，`CMake`会报错。

```cmake
project(hellozapi CXX)
```
这里我们定义我们的项目名称为`hellozapi`, 使用的编程语言为`CXX`。

```cmake
set(CMAKE_CXX_STANDARD 11)
```
基于`zendAPI`的扩展开发必须开启`c++11`标准的选项，否则在编译的时候我们的`build system`会报错。这行代码的意思就是指示编译器使用`c++11`的标准对代码进行编译。

```cmake
list(APPEND CMAKE_PREFIX_PATH "/usr/local/lib/cmake/zapi")
```
在我们进行编译`zendAPI`库的时候我们导出了`zapi`的`CMake Targets`，设置了这个`Target`的一些很重要的属性，这些文件我们都安装在`zendAPI`的安装路径下，比如在我的`MacOS`环境下，`zendAPI`安装在`/usr/local`
那么我们的导出`Target`文件的路径为`/usr/local/lib/cmake/zapi`。
一般情况下，这个路径不在`CMake Module`的搜索路径下，这行代码的作用就是将其添加到`CMake Module`的搜索路径列表中。
> list 命令详解：https://cmake.org/cmake/help/v3.9/command/list.html

```cmake
find_package(zendAPI 0.0.1 EXACT REQUIRED CONFIG)
```
这行代码探测我们系统中安装的`zendAPI`库相关信息，`zendAPI`只支持以`CMake CONFIG`模式寻找，这里我们寻找我们系统中是否安装有`zendAPI 0.0.1`版的库，如果没有的话，`build system`在这里会报错。
如果成功寻找到`zendAPI 0.0.1`版的库，`build system`会设置一个`CMake Import Target`。
同时`find_package`会设置如下变量，方便您的使用：
1. ZAPI_INCLUDE_DIRS`zapi`库的头文件路径
2. ZAPI_PHP_INCLUDE_PATHS 系统探测出的`PHP`的头文件路径
3. ZAPI_LIBRARY`zendAPI`动态链接库名字
4. ZAPI_PHP_EXTENSION_DIR 系统探测出的`PHP`默认扩展安装路径

> find_package 命令详解：https://cmake.org/cmake/help/v3.9/command/find_package.html
> import target 命令详解：https://cmake.org/cmake/help/v3.9/command/add_library.html#imported-libraries

```cmake
add_library(hellozapi MODULE hellozapi/defs.h
                             hellozapi/defs.cpp
                             hellozapi/entry.cpp)
```
这行代码的主要作用是向`build system`添加一个`MODULE`类型的`CMake Target`，如果对`MODULE`类型不了解，您可以点击下面的连接进行学习。因为`PHP`扩展是被`Zend Engine`使用`dlopen`进行加载的，所以我们的类型
是`MODULE`而不是`SHARED`。在`hellozapi`项目中我们主要有三个文件，在这里进行添加。
> add_library 命令详解：https://cmake.org/cmake/help/v3.9/command/add_library.html

```cmake
set_target_properties(hellozapi PROPERTIES 
    OUTPUT_NAME hellozapi
    PREFIX "")
```
一般我们的`PHP`扩展的名为`extname.so`的格式，但是默认的情况下`CMake build system`的`MODULE Target`的名字格式为`libextname.so`,这行代码的作用就是将我们的扩展`MODULE Target`的输出名字设置为`hellozapi.so`。
> set_target_properties 命令详解：https://cmake.org/cmake/help/v3.9/command/set_target_properties.html

```cmake
target_link_libraries(hellozapi ${ZAPI_LIBRARIES})
```
这行代码的作用是将`hellozapi`扩展与`zendAPI`库进行连接，如果没有这一行，而您的代码的时候又使用了`zendAPI`里面的相关接口，会导致在运行时平台的动态库加载器`ld`报出符号不存在的错误。
> target_link_libraries 命令详解：https://cmake.org/cmake/help/v3.9/command/target_link_libraries.html

```cmake
install(TARGETS hellozapi DESTINATION ${ZAPI_PHP_EXTENSION_DIR})
```
这行代码指示`build system`把编译好的`hellozapi Target`安装到`PHP`默认的扩展路径下。
> install 命令详解：https://cmake.org/cmake/help/v3.9/command/install.html#installing-targets

恭喜您，坚持看完了编译脚本的教程，接下来稍作休息，我们继续正式进入扩展代码编写环节，相信您已经快等不及了，好了不废话了， Let's go!