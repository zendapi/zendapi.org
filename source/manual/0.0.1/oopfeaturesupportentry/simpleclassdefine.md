---
layout: manual
subtype: normal
title: 原生类定义详细文档
---
php跟c++都支持面向对象特性，但是c++定义的类并不能完全的被php调用，而zendAPI就解决了这个问题。
PS:本章采用php官网文档[类与对象](http://php.net/manual/zh/language.oop5.php)章节一样的示例来演示zendAPI对php面向对象特性的全面支持
#### 简单类定义
本示例为一个简单的类SimpleClass,类包含一个属性var，和一个返回var属性值的方法getVar
##### php实现类定义
```php
<?php
class SimpleClass
{
    // property declaration
    public $var = 'a default value';

    // method declaration
    public function displayVar() {
        echo $this->var;
    }
}
?>
```
##### zendApi实现
zendAPI实现php类定义分为两步
1. 定义一个继承`zapi::lang::StdClass`的类`SimpleClass`
2. 定义扩展对象，并通过`zapi::lang::Class`注册定义的类`SimpleClass`中需要暴露给php的属性和方法到扩展

```cpp
#include "zapi/ZendApi.h"
#include "zapi/lang/Type.h"
#include "simpleClass.h"

using zapi::lang::Class;
using zapi::ds::StringVariant;

class SimpleClass : public zapi::lang::StdClass
{
public:
    StringVariant var = "a default value";
    StringVariant getVar()
    {
        return this->var;
    }
};

extern "C" {

ZAPI_DECL_EXPORT void *get_module()
{
   // 定义扩展
   static zapi::lang::Extension hellozapi("hellozapi", "1.0");
   Class<SimpleClass> simpleClass("SimpleClass");
   // 注册属性 后面会详细讲解属性定义
   simpleClass.registerProperty("var", "a default value");
   // 注册函数 后面会详细讲解函数定义
   simpleClass.registerMethod<decltype(&SimpleClass::getVar), &SimpleClass::getVar>
           ("getVar");
   // 注册类到扩展
   hellozapi.registerClass(simpleClass);
   return hellozapi;
}
```
##### SimpleClass测试
```
<?php
$a = new SimpleClass();
echo $a->getVar();  // 输出 "a default value"
?>
```
#### 类定义实现原理
php加载扩展模块的时候会调用回调函数`module_startup_func`，而类的注册就是在这个阶段。
在[初始化流程详情](http://www.zendapi.org/manual/0.0.1/zendapidesignentry/zendapiinitcycle.html)中已经讲解过，zendAPI开发模块的`module_startup_func`即为如下函数
```cpp
// line numer 429, src/lang/Extension.cpp
int ExtensionPrivate::processStartup(INIT_FUNC_ARGS)
{
   ZEND_INIT_MODULE_GLOBALS(zapi, init_globals, nullptr);
   Extension *extension = find_module(module_number);
   return BOOL2SUCCESS(extension->initialize(module_number));
}
```
上面的`extension->initialize(module_number)`最终会调用如下代码，注册所有的类
```
   // line number 514, src/lang/Extension.cpp
   // here we register all global classes and interfaces
   iterateClasses([moduleNumber](AbstractClass &cls) {
      cls.initialize(moduleNumber);
   });
}
```
更加详细的内容可以看项目源码。
下一篇我们会详细讲解类属性的定义，欢迎大家进一步阅读。
