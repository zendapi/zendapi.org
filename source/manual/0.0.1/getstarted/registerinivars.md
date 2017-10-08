---
layout: manual
subtype: normal
title: 注册 php.ini 变量，您的扩展也可以
---
大多数的扩展，在 `PHP` 的手册说明里面都一个项 `Runtime Configuration`，这个里面描述自己这个扩展的配置文件变量的文档，感觉很高大上，那么我们的 `hellozapi` 能否也加上一些值的配置变量呢？
答案肯定是必须能啊！下面我们马上满足您的需求。
在 `hellozapi` 扩展中，我准备定义以下的 `ini` 配置项：

1. cache_dir
2. enable_log
3. expire_seconds

哈哈，大家不要刻意的去理解为什么取这些名字，因为这个是我瞎编的，不废话了，让我们开始吧。

#### 背景知识学习
##### zapi::lang::Ini 类
在 `zendAPI` 项目中，我们主要是使用 `zapi::lang::Ini` 来描述一个配置变量的元信息, 这个类的构造函数使用起来很简单，暂时我们只需要传递两个参数，一个是配置项的名称，一个是配置项的值。
例子：
```cpp
zapi::lang::Ini dirCfg("runtime_dir", "/var/somedirname");
zapi::lang::Ini expireCfg("expire_seconds", 123);
```
> [zapi::lang::ini 参考手册](/api/classzapi_1_1lang_1_1_ini.html)

##### zapi::lang::IniValue 类
这个类定义一个配置项的值，一般不自己用，当我们读取我们定义的配置项的时候 `zapi::ini_get` 函数就返回相应的配置项的实例。
这个类只要有几个转换方法，比如：
1. int64_t getNumericValue() const; 将配置项按照整型读取
2. bool getBoolValue() const; 将配置项按照布尔类型读取
3. std::string getStringValue() const; 将配置项按照字符串类型读取

> [zapi::lang::IniValue 参考手册](/api/classzapi_1_1lang_1_1_ini_value.html)

##### zapi::ini_get 函数
上面我们定义两个配置变量，那么在 `hellozapi` 项目中怎么读取呢？我们在主要使用 `zapi::ini_get` 函数进行配置项的读取。
这个函数接受一个参数，需要读取的配置项的名字，沿用上面定义的配置项，我们在这里演示怎么读取。
```cpp
std::string runtimeDir = zapi::ini_get("runtime_dir").getStringValue();
int expireSeconds = zapi::ini_get("expire_seconds").getNumericValue();
```
> [zapi::ini_get 参考手册](/api/namespacezapi.html#1a3485bfdd50835e6ec7f9b170640e7a19)

好了背景知识介绍完成，我们现在开始定义我们的 `hellozapi` 配置项。
打开 `hellozapi/entry.cpp` 文件，然后我们在 `get_module` 函数里面加入如下代码：
```cpp
zapi::lang::Ini cacheDir("cache_dir", "/var/cache");
zapi::lang::Ini expireCfg("expire_seconds", 123);
zapi::lang::Ini enableLog("enable_log", true);
﻿hellozapi.registerIni(std::move(cacheDir));
hellozapi.registerIni(std::move(expireCfg));
hellozapi.registerIni(std::move(enableLog));
```
下面我们在 `hellozapi` 的扩展中使用 `C++` 进行获取
```cpp
#include <iostream>
#include <string>

std::string cacheDir = zapi::ini_get("cache_dir").getStringValue();
int expireSeconds = zapi::ini_get("expire_seconds").getNumericValue();
bool enableLog = zapi::ini_get("enable_log").getBoolValue();

std::cout << cacheDir << std::endl;
std::cout << expireSeconds << std::endl;
std::cout << enableLog << std::endl;
// you will get output
// /var/cache
// 123
// 1
```

同样我们在 `PHP` 脚本里面进行获取，看看我们的配置项是否成功
```php
<?php
echo ﻿ini_get("cache_dir");
echo "\n";
echo ﻿ini_get("expire_seconds");
echo "\n";
echo ini_get("enable_log");
// you will get output
// /var/cache
// 123
// On
```
怎么样，没什么难度吧。