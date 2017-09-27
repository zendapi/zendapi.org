---
layout: manual
subtype: normal
title: 都 PHP7 啦，别告诉我你没用过命名空间
---
在编程界有个笑话，所谓的编程语言鄙视链中 `PHP` 貌似最惨，好像所有使用XX语言的工程师都鄙视咱们的 `PHP` 工程师，要我说管他的反正 `PHP` 是世界上最好的语言的，他们是嫉妒我们。哈哈哈，笑话归笑话，目前 `PHP` 已经都 `7` 了，您要在您的代码中还是没有使用命名空间，您真的就 `OUT` 了。
`PHP` 发展之初，强调的就是灵活，简单，要的就是开发效率，这个绝对是 `PHP` 的一大优点，但是这个也绝对是一把双刃剑，造成了代码质量低下，风格混乱，代码的可维护不高，导致被别人鄙视了。
命名空间的作用，我想不用我说，您使用任何一个搜索引擎搜索，无数的文章进行解说，所以我就不在我们这里阐述了。
在前面的章节，我们定义的常量，函数和类都是没有命名空间限制的，他们默认都在 `PHP` 的全局命名空间里面。在 `zendAPI` 中定义命名空间依旧很简单，我们这本篇文章中演示以下几种情况：
1. 在命名空间里面定义一个常量
2. 在命名空间里面定义一个函数
3. 在命名空间里面定义一个类
4. 在两层嵌套命名空间定义一个函数

#### 背景知识学习
在 `zendAPI` 项目中，我们使用 `zapi::lang::Namespace` 类来描述一个命名空间的元信息，这个类的构造函数非常简单，接受一个命名空间的名字作为参数。

##### 使用范例
```cpp
#include "zapi/lang/Namespace.h"

zapi::lang::Namespace zapi("zapi");
```
一个名叫 `zapi` 的命名空间就定义好了，然后我们就可以调用相应的注册方法给这个名称空间添加常量，函数和类了，是不是很简单啊, 下面我们开始我们的命名空间之旅。

> [zapi::lang::Namespace 参考手册](/api/classzapi_1_1lang_1_1_namespace.html)
> [zapi::lang::Namespace::registerConstant 参考手册](/api/classzapi_1_1lang_1_1_namespace.html#1a05c185dcf4aa979b5136ddfa38ab9e86)
> [zapi::lang::Namespace::registerFunction 参考手册](/api/classzapi_1_1lang_1_1_namespace.html#1ae7756e0f825464242887dbb08e59c005)
> [zapi::lang::Namespace::registerClass 参考手册](/api/classzapi_1_1lang_1_1_namespace.html#1aa018413878e86568cd89cead69b22912)

#### 特别说明
为了使我们的代码尽量简单，我们这里演示注册的函数是我们在学习定义函数那篇文章中定义的函数，类的话是上一篇我们定义的 `Person` 类。
我们的定义代码定义在 `get_module` 函数里面，紧跟在 `Person` 类注册下面。

> [没有函数怎么行，看我怎么定义函数](/manual/0.0.1/getstarted/definehellozapifunction.html)
> [来一点更高级的试试，定义我们的第一个原生 Class](/manual/0.0.1/getstarted/definehellozapiclass.html)

#### 定义 `hellozapi` 命名空间对象
为了简便，我们在入口文件 `entry.cpp` 中加上
```cpp
using zapi::lang::Namespace;
```
定义命名空间对象实例
```cpp
Namespace hellozapiNs("hellozapi");
```
#### 在命名空间里面定义一个常量
```cpp
hellozapiNs.registerConstant(Constant("DEVEL_TEAM", "qcoreteam"));
hellozapiNs.registerConstant(Constant("RELEASE_ADDRESS", "beijing"));
```
怎么样，上面的代码我们就实现了向 `hellozapi` 命名空间中定义了常量 `DEVEL_TEAM` 和常量 `RELEASE_ADDRESS`。
#### 在命名空间里面定义一个函数
```cpp
hellozapiNs.registerFunction<decltype(print_project_name), print_project_name>
    ("print_project_name", {
        ValueArgument("prefix", zapi::lang::Type::String)
    });
hellozapiNs.registerFunction<decltype(print_develop_team), print_develop_team>
    ("print_develop_team");
hellozapiNs.registerFunction<decltype(get_version), get_version>("get_version");
hellozapiNs.registerFunction<decltype(add_two_num), add_two_num>
    ("add_two_num", {
        ValueArgument("num1", zapi::lang::Type::Numeric),
        ValueArgument("num2", zapi::lang::Type::Numeric)
    });
```
上面的代码我们实现了向命名空间里面注册了原型如下的 `PHP` 函数
1. print_project_name($prefix);
2. print_develop_team();
3. get_version();
4. add_two_num($num1, $num2);

简单吧，心细的同学可能要说了，这个代码怎么这么熟悉啊，貌似在哪里见过，没错您说对了，这个代码我们在前面讲向扩展注册函数的时候用过，这里这不过将扩展对象换成了命名空间对象。

#### 在命名空间里面定义一个类
```cpp
hellozapiNs.registerClass(﻿personClass);
```
您没看错，上面这行代码就实现了将 `Person` 类注册到 `hellozapi` 命名空间中。

#### 在两层嵌套命名空间定义一个函数和一个常量
```cpp
Namespace kernelNs("kernel");
kernelNs.﻿registerConstant(Constant("KERNEL_VERSION", "v0.0.1"));
kernelNs.registerFunction<decltype(print_develop_team), print_develop_team>
    ("print_develop_team");
hellozapiNs.﻿registerNamespace(kernelNs);
```
上面代码完成了一个嵌套命名空间 `kernel`，并且向里面注册了常量 `KERNEL_VERSION` 和函数 `print_develop_team`, 然后将 `kernel` 命名空间注册到 `hellozapi` 命名空间里面。

#### 将名称空间注册到 `hellozapi` 扩展中
```cpp
﻿hellozapi.registerNamespace(hellozapiNs);
```
到这里我们的命名空间就设置完成了，下面我们在 `PHP` 代码里面进行使用吧。
```php
<?php
if (defined("\hellozapi\DEVEL_TEAM")) {
    echo \hellozapi\DEVEL_TEAM;
}
echo "\n";
if (defined("\hellozapi\RELEASE_ADDRESS")) {
    echo \hellozapi\RELEASE_ADDRESS;
}
echo "\n";
if (function_exists("\hellozapi\print_project_name")) {
    \hellozapi\print_project_name("hi,");
}
echo "\n";
if (function_exists("﻿\hellozapi\print_develop_team")) {
    ﻿\hellozapi\print_develop_team();
}
if (function_exists("﻿\hellozapi\get_version")) {
    $version = ﻿\hellozapi\get_version();
    echo $version;
}
echo "\n";
if (function_exists("﻿\hellozapi\add_two_num")) {
    $sum = ﻿\hellozapi\add_two_num(1, 2);
    echo $sum;
}
echo "\n";
if (class_exists("﻿\hellozapi\Person")) {
    echo "Person class exists\n";
    $p1 = new ﻿\hellozapi\Person("xiaomi", 22, "beijing");
    $p2 = new ﻿\hellozapi\Person("xiaohong", 27, "shanghai");
    echo $p1->getName();
    echo "\n";
    echo $p1->getAge();
    echo "\n";
    echo $p1->getAddress();
    echo "\n";
    echo $p1->getName();
    echo "\n";
    echo $p1->getAge();
    echo "\n";
    echo $p1->getAddress();
    // change some value
    $p1->setName("zzu_softboy");
    echo $p1->getName();
    echo "\n";
    $p2->setAge(33);
    echo $p2->getAge();
}
echo "\n";
if (defined("\hellozapi\kernel\KERNEL_VERSION")) {
    echo \hellozapi\kernel\KERNEL_VERSION;
}
echo "\n";
if (function_exists("﻿\hellozapi\kernel\print_develop_team")) {
    ﻿\hellozapi\print_develop_team();
}
// you will get out put
// qcoreteam
// beijing
// you will get output:
// hi, hellozapi
// ﻿qcoreteam
// ﻿v1.0.2
// 3  
// xiaomi
// 22
// beijing
// xiaohong
// 27
// shanghai
// zzu_softboy
// 33
// v0.0.1
// ﻿qcoreteam
```