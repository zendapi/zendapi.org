---
layout: manual
subtype: normal
title: zendAPI 初始化流程详解
---
`zendAPI`扩展初始化是在标准的`PHP`标准模块生命周期基础之上进行的，主要分为一下两个部分：
1. 语言结构元信息的注册
比如定义常量，函数，命名空间或者类等等语言元素的描述对象
2. 与`PHP`标准生命周期的整合
我们必须将我们自定义的语言元素对象整合进`Zend Engine`中，这样我们在`PHP`脚本程序才能使用我们自定义的类或者函数

如果您对`PHP`标准模块生命周期比较模糊，请参考：
> [PHP 标准模块生命周期](phpmoduleinitcycle.html)

### 语言结构元信息的注册
目前`zendAPI`支持的语言元素描述类有以下几种：
1. `zapi::lang::Extension`


### 与PHP标准生命周期的整合