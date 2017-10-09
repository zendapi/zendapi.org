---
layout: manual
subtype: normal
title: hello zapi 项目准备工作
---
在新手学堂里面，我们将从零基于`zendAPI`开发一个简单的`PHP`扩展，这个扩展的名字叫做`hellozapi`, 现在我们着手准备开发需要的环境吧。

> demo 的项目库地址 https://github.com/zendapi/demo
> 大家可以自行下载学习

#### hellozapi 开发环境详解

操作系统:`MacOS 10.12.6`
PHP: 安装的位置是`/usr/local/php-7.1.5`版本号:`7.1.5`
编译器:`clang 3.5`, 安装的位置`/usr/local/llvm-3.5`
CMake: 版本号:`3.7.2`
编辑器:`Qt Creator ﻿4.3.1`
zendAPI库: 版本`0.0.1`, 安装的位置`/usr/local`

#### hellzapi 的项目结构

```bash
├── CMakeLists.txt // 项目主编译脚本
├── README.md      // 项目说明文件
├── assets         // 用于存放项目静态资源
│   └── php.ini    // 用于测试的 PHP 配置文件
└── hellozapi      // 项目代码文件夹
    ├── defs.h     // hellozapi 头文件
    ├── impls.cpp   // hellozapi 实现文件
    └── entry.cpp  // hellozapi 入口文件
```

现在我们开始着手准备`hellozapi`的开发文件夹

```bash
cd ~/
mkdir zendapidemodevel
cd zendapidemodevel
mkdir assets
mkdir hellozapi
touch CMakeLists.txt
touch README.md
touch assets/php.ini
touch hellozapi/defs.h
touch hellozapi/impls.cpp
touch hellozapi/entry.cpp
```
创建项目编译文件夹
```bash
cd ../
mkdir build-zendapidemo-debug
```
到此我们的项目结构就准备完成，让我们开始我们的`zendAPI`扩展开发之旅吧。