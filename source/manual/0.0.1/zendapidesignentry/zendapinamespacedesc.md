---
layout: manual
subtype: normal
title: zendAPI 内部命名空间设计说明
---
为了提高`zendAPI`项目本身的可维护性和便于大家理解，我们将实现代码按照功能的不同定义在了特定的命名空间，定义了一下命名空间：

* zapi
* zapi::kernel
* zapi::lang
* zapi::ds
* zapi::stdext
* zapi::vm
* zapi::utils

### 命名空间作用的简单描述

#### zapi 命名空间

根命名空间，这个命名空间中我们一般只放经常被调用的函数或者类的定义，方便各个子命名空间使用一些通用的函数或者类。

#### zapi::kernel 命名空间

内核命名空间，定义一些底层的功能，比如说跟操作系统相关的函数或者类，或者跟`PHP`内部实现相关的一些接口的封装，屏蔽底层一些差异性，方便其他模块使用封装过的接口。

#### zapi::lang 命名空间

定义语言结构元信息描述类的命名空间，比如支持的语言结构元信息描述类有：`zapi::lang::Extension`,`zapi::lang::Class`或者`zapi::lang::Function`等等, 详情请参考下面的手册链接。

> [zapi::lang 命名空间手册](/api/namespacezapi_1_1lang.html)
> [语言结构元信息描述类术语定义](vocabularydesc.html#yu-yan-jie-gou-yuan-xin-xi-miao-shu-lei)

#### zapi::ds 命名空间

这个命名空间中，我们主要实现了对`PHP`常见变量类型的面向对象的封装，方便大家在开发扩展的时候重用。具体有哪些类型请点击下面的链接：
> [zapi::ds 命名空间手册](/api/namespacezapi_1_1ds.html)

#### zapi::stdext 命名空间

我们开发`zendAPI`项目的时候使用的最低的语言规范是`C++11`，但是我们在`zendAPI`实现的过程中使用了一些`C++14`和`C++17`标准才引入的一些类和函数。比如:

1. [std::invoke](http://en.cppreference.com/w/cpp/utility/functional/invoke) (C++17)
2. [std::tuple_cat](http://en.cppreference.com/w/cpp/utility/tuple/tuple_cat) (C++14)

我们现在的解决方案是自己实现一个跟标准库一样功能的等价的函数或者类，实现代码参考了`clang libcxx`标准库。 

#### zapi::utils 命名空间

这个命名空间我们主要存放一些工具类和工具函数的定义，在这个里面的类和函数大多特点是用的还算比较多，但是没有明确的归类。

#### zapi::vm 命名空间

这个命名空间里面主要存放跟`Zend Engine`交互的一些类，比如函数和方法派发，闭包实现，迭代器实现等等，属于底层一些功能，如果只是开发扩展的话不需要了解。