---
layout: manual
subtype: normal
title: 没有函数怎么行，看我怎么定义函数
---
在上一篇中我们在`hellozapi`扩展中我们定义了几个常量，但是一个有用的扩展，必须得有函数，没有函数的扩展啥用没有，如果您觉得定义函数很难的话，您又错了，`zendAPI`就是为了让您生活变得美好而生的，而不会让事情变得复杂。
说到函数，咱们就不得不说函数最重要的两个组成部分，一个是函数的参数，另一个是函数的返回值。因为`C++`是静态语言，所以咱们的函数的类型必须在编译时就要确定，不像`PHP`语言中那么灵活。
`zendAPI`主要支持如下几种函数原型：
1. 有返回值, 无参数
2. 有返回值, 有参数
3. 有返回值, 可变参数
4. 无返回值, 无参数
5. 无返回值, 有参数
6. 无返回值, 可变参数

> 说明：`zendAPI`支持引用类型的参数传递

考虑到我们是新手学堂，在本篇中我们就不介绍可变参数和引用传参了，这部分我们放在我们的高级教程部分讲。
我们会在`hellozapi`中定义以下`PHP`原型的函数：（PHP 语言描述）

1. print_project_name($prefix);
2. print_develop_team();
3. get_version();
4. add_two_num($num1, $num2);

下面我们声明这几个`PHP`函数对应的`C++`函数原型

#### C++ Code
```cpp
using zapi::ds::Variant;
using zapi::ds::NumericVaraint;
using zapi::ds::StringVariant;

void print_project_name(const StringVariant &prefix);
void print_develop_team();
Variant get_version();
Variant add_two_num(const NumericVariant &num1, const NumericVariant num2);
```

#### 背景知识学习
在上面的`C++`函数的原型声明中出现两个陌生的类`Variant`和`NumericVariant`, 不要担心，现在我们简单介绍一下这两个类。

##### zapi::ds::Variant
在`zendAPI`中，`zapi::ds::Variant`类的一个对象就代表`PHP`的一个变量，您可以将`zapi::ds::Variant`想象成一个容器，它将常见的`C++`类型包装成一个`zapi::ds::Variant`对象，方便跟`zend engine`整合。
您可以用这个类去包装如下类型:
1. 常见的整形 (int, std::int8_t, std::int16_t, std::int32_t, long ... )
2. 浮点型 (float, double)
3. 布尔型 (true, false)
4. 字符串 (std::string, char *, char [])
5. 空指针 (std::nullptr_t)

上面说的既然`zapi::ds::Variant`可以包装一切必要的类型，是不是就够了呢？答案是否定的，虽然`zapi::ds::Variant`可以容纳`C++`的这些数据类型，但是它不提供任何特定类型的计算，比如常见的四则运算，字符串连接，函数调用等等。
那么问题又来了，你可能会问，为什么不提供这样的接口呢？接下来我就来解释下为什么不在`zapi::ds::Variant`为什么不提供这些接口，原因有如下几点：
1.`zapi::ds::Variant`设计的目的就是充当一个容器，方便`zendAPI`向`zend engine`进行数据传递，它强调的数据传递而不是数据的计算。
2.`zendAPI`的设计理念是，单一的类完成单一的任务，把字符串操作和整形操作甚至函数调用等等杂在一起违背了这个理念。

##### 使用范例
```cpp
using zapi::ds::Variant;

Varaint nullVar(nullptr);
Variant numVar(123);
Variant doubleVar(3.14);
```

##### zapi::ds::NumericVariant
根据上面讨论的，看着名字不用我说，大家都能猜出这个类的作用吧，没错，您猜的是对的，这个是对`zapi::ds::Variant`再次封装，为数值类型的`zapi::ds::Variant`提供数值计算的能力，比如四则运算, 大小比较运算。

##### 使用范例
```cpp
using zapi::ds::NumericVariant;

NumericVariant num1(123);
NumericVariant num2(321);
NumericVariant sum = num1 + num2;
long rawSum = sum.toLong();
bool cmp = num1 < num2; // cmp is true

std::int32_t raw32int1 = 123;
std::int16_t raw32int2 = 23;
NumericVariant num3(raw32int1); // value is 123
NumericVariant num4(raw32int2); // value is 23
sum = num3 + num4; // sum is 146
```
> [zapi::ds::NumericVariant 参考手册](/api/classzapi_1_1ds_1_1_numeric_variant.html)

##### zapi::ds::StringVariant
这个类跟`zapi::ds::NumericVariant`一样，看名字我们就知道这个类是为字符串操作而设计的，它为我们提供了常见的字符串接口，拼接，子串查找，替换等等。下面我们就举几个常见的使用的范例:

##### 使用范例
```cpp
using zapi::ds::StringVariant;

StringVariant str1("hello zapi"); // str1 is hello zapi
str1 += ", hello"; // now hello zapi, hello
char c = str1[0]; // c is h
std::string upperStr1 = str1.﻿toUpperCase();
str1.﻿replace("zapi", "zendAPI"); // str1 is hello zendAPI, hello
str1.prepend("=> "); // str1 now is => hello zendAPI, hello
```
> [zapi::ds::StringVariant 参考手册](/api/classzapi_1_1ds_1_1_string_variant.html)

好了数据类型了解完毕，我们下面开始进入实现环节。

#### 第一步
打开`hellozapi`项目下的`hellozapi/defs.h`文件，在文件中输入我们的`C++`函数的原型声明代码。

```cpp
﻿#ifndef ZAPI_HELLOZAPI_DEFS_H
#define ZAPI_HELLOZAPI_DEFS_H

﻿#include "zapi/ZendApi.h"

using zapi::ds::Variant;
using zapi::ds::﻿NumericVariant;
using zapi::ds::StringVariant;

void print_project_name(const StringVariant &prefix);
void print_develop_team();
Variant get_version();
Variant add_two_num(const ﻿NumericVariant &num1, const ﻿NumericVariant &num2);

#endif // ZAPI_HELLOZAPI_DEFS_H
```

#### 第二步
打开`hellozapi`项目下的`hellozapi/impls.cpp`文件，在文件中输入我们的`C++`函数的实现代码。

```cpp
﻿#include "defs.h"
#include <iostream>

void print_project_name(const StringVariant &prefix)
{
   zapi::out << prefix << " " << "hellozapi" << std::endl;
}

void print_develop_team()
{
   zapi::out << "qcoreteam" << std::endl;
}

Variant get_version()
{
   return "v1.0.2";
}

Variant add_two_num(const NumericVariant &num1, const NumericVariant &num2)
{
   return num1 + num2;
}

```

#### 第三步
将我们的实现的`C++`函数与`zend engine`进行整合。打开我们的入口文件`hellozapi/entry.cpp`，输入我们的函数注册代码。
```cpp
﻿#include "zapi/ZendApi.h"
#include "defs.h"

using zapi::lang::Constant;
using zapi::lang::ValueArgument;

extern "C" {

ZAPI_DECL_EXPORT void *get_module() 
{
   static zapi::lang::Extension hellozapi("hellozapi", "1.0");
   Constant hellozapiVersionConst("HELLO_ZAPI_VERSION", 0x010002);
   Constant hellozapiNameConst("HELLO_ZAPI_NAME", "Hello zendAPI!");
   Constant helloDebugModeConst("HELLO_DEBUG_MODE", true);
   Constant helloPiConst("HELLO_ZAPI_PI", 3.14);
   hellozapi.registerConstant(std::move(hellozapiVersionConst));
   hellozapi.registerConstant(std::move(hellozapiNameConst));
   hellozapi.registerConstant(std::move(helloDebugModeConst));
   hellozapi.registerConstant(std::move(helloPiConst));
   
   hellozapi.registerFunction<decltype(print_project_name), print_project_name>
         ("print_project_name", {
             ValueArgument("prefix", zapi::lang::Type::String)
          });
   hellozapi.registerFunction<decltype(print_develop_team), print_develop_team>
         ("print_develop_team");
   hellozapi.registerFunction<decltype(get_version), get_version>("get_version");
   hellozapi.registerFunction<decltype(add_two_num), add_two_num>
         ("add_two_num", {
             ValueArgument("num1", zapi::lang::Type::Numeric),
             ValueArgument("num2", zapi::lang::Type::Numeric)
          });
   return hellozapi;
}

}
```
到这里，代码稍稍有些复杂了，但是细心的同学会发现，其实代码是很有规律的，只是重复调用而已，在这段代码中我们引入了几个新的类型，下面我先将这样类型做些讲解，然后我们再对这个代码段进行解释。

##### zapi::lang::Type 类型
`zendAPI`对`zend engine`的宏类型定义重新用`enum class`进行了重新定义，方便实施`C++`的类型检查，比如常用的类型有：
1. zapi::lang::Type::Undefined
2. zapi::lang::Type::Null
3. zapi::lang::Type::False
4. zapi::lang::Type::True
5. zapi::lang::Type::Long 
6. zapi::lang::Type::String

> [zapi::lang::Type 参考手册](/api/namespacezapi_1_1lang.html#1a15bd083a614363a9decc92d672454ffa)

##### zapi::lang::ValueArgument 类型
`zendAPI`支持的参数传递有两种，按值传参和按引用传参。`zapi::lang::ValueArgument`类型就是为了支持按值传递参数机制，它的构造函数很简单，第一个参数是传递的参数的名字，第二个参数是这个参数的类型，第三个参数设置这个参数是否是必须的参数。
比如下面的代码我们定义了一个名叫`arg1`的参数，类型是字符串并且是非必要参数
```cpp
ValueArgument("arg1", zapi::lang::Type::String, false);
```
> [zapi::lang::ValueArgument 参考手册](/api/classzapi_1_1lang_1_1_value_argument.html)

##### zapi::lang::Extension::registerFunction 函数接口
为了支持不同类型的函数，`zapi::lang::Extension::registerFunction`被设计成了一个模板函数，在这篇文章中我们暂时使用了用于注册非成员函数指针的部分。
传递的模板参数有：
1. 函数的类型 (一般我们不定义函数的类型，使用`decltype`进行获取)
2. 函数指针值 (会被`zendAPI`在运行时进行调用)

> [decltype 参考手册](http://en.cppreference.com/w/cpp/language/decltype)

传递的调用参数有：
1. 函数的名字
2. 函数接受的参数列表`std::initializer_list<zapi::lang::Argument>`

*这里的 zapi::lang::Argument 是 zapi::lang::ValueArgument 的基类，一般不直接使用。*

> [zapi::lang::Extension::registerFunction 参考手册](/api/classzapi_1_1lang_1_1_extension.html#1a82065cc95e784e659a3cc697f34bfece)
> [std::initializer_list 参考手册](http://en.cppreference.com/w/cpp/utility/initializer_list)

有了上面的背景知识，现在我们解释函数注册代码就简单多了，您也很容易就能理解。

```cpp 
hellozapi.registerFunction<decltype(print_project_name), print_project_name>
      ("print_project_name", {
             ValueArgument("prefix", zapi::lang::Type::String)
      });
```
这行代码注册一个原型为`print_project_name($prefix);`的`PHP`函数，当这个函数被`zend engine`执行的时候，我们的`C++`函数`void print_project_name(const StringVariant &prefix);`将被运行时调用。

```cpp
hellozapi.registerFunction<decltype(print_develop_team), print_develop_team>
     ("print_develop_team");
         
```
这行代码注册一个原型为`print_develop_team`的`PHP`函数，当这个函数被`zend engine`执行的时候，我们的`C++`函数`void print_develop_team();`将被运行时调用。

```cpp
hellozapi.registerFunction<decltype(get_version), get_version>("get_version");
   
```
这行代码注册一个原型为`get_version`的`PHP`函数，当这个函数被`zend engine`执行的时候，我们的`C++`函数`Variant get_version();`将被运行时调用。

```cpp
hellozapi.registerFunction<decltype(add_two_num), add_two_num>
     ("add_two_num", {
        ValueArgument("num1", zapi::lang::Type::Numeric),
        ValueArgument("num2", zapi::lang::Type::Numeric)
     });
```
这行代码注册一个原型为`add_two_num`的`PHP`函数，当这个函数被`zend engine`执行的时候，我们的`C++`函数`Variant add_two_num(const ﻿NumericVariant &num1, const ﻿NumericVariant &num2);`将被运行时调用。

我们走到这里，函数注册就完成了，虽然有些小长，但是您不也坚持看完了吗？
下面让我们在`PHP`代码中愉快的进行调用吧。

```php
<?php
if (function_exists("print_project_name")) {
    print_project_name("nb, ");
}
if (function_exists("﻿print_develop_team")) {
    ﻿print_develop_team();
}
if (function_exists("﻿get_version")) {
    $version = ﻿get_version();
    echo $version;
}
echo "\n";
if (function_exists("﻿add_two_num")) {
    $sum = ﻿add_two_num(1, 2);
    echo $sum;
}

// you will get output:
// nb, hellozapi
// ﻿qcoreteam
// ﻿v1.0.2
// 3
```

怎么样，实现函数也不过如此吧，根本没啥难度，哈哈哈，您到时候也能自豪的说，我也能没事的试试写写扩展啦，给`PHP`语言添加几个原生函数了。下一篇，我们来点更刺激的，教大家怎么实现原生的`Class`。