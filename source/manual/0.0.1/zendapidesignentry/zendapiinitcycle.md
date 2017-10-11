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
扩展元信息描述类
2. `zapi::lang::Constant`
常量元信息描述类
3. `zapi::lang::Function`
函数元信息描述类
4. `zapi::lang::Method`
类方法元信息描述类
5. `zapi::lang::Interface`
接口元信息描述类
6. `zapi::lang::Namespace`
命名空间元信息描述类
7. `zapi::lang::Argument`
参数元信息描述类
8. `zapi::lang::Ini`
`INI` 配置变量元信息描述类
9. `zapi::lang::Class`
类(`PHP`)元信息描述类(`C++`)

这些类我们都会在后面有独立的章节进行详细的描述，在这里我们就不详细展开了，总而言之，这些元信息类的作用就是在`C++`领域使用面向对象的方式对`PHP`的原生类，常量和函数等等实体进行描述, 使用类型安全的方式进行扩展开发，提高代码的可维护性。

### 与PHP标准生命周期的整合
上一节我们讲了元信息描述类，我们在扩展里面使用这些类去描述`PHP`实体结构之后下一步就是将其与`Zend Engine`进行整合，否则我们是没办法在`PHP`脚本中进行使用的。在《[PHP 标准模块生命周期](phpmoduleinitcycle.html)》这篇文章中我们介绍了标准的扩展的生命周期。基于`zendAPI`开发的扩展也不例外，也是要严格遵守这个生命周期的规定。
以前使用`PHP`官方开发扩展的人应该知道，`Zend Engine`在管理模块生命周期的时候，会在不同的阶段调用我们指定的回调函数。
首先我们分析下`PHP`的`﻿_zend_module_entry`结构体，以`PHP 7.1.5`为例子：
```c
﻿struct _zend_module_entry {
	unsigned short size;
	unsigned int zend_api;
	unsigned char zend_debug;
	unsigned char zts;
	const struct _zend_ini_entry *ini_entry;
	const struct _zend_module_dep *deps;
	const char *name;
	const struct _zend_function_entry *functions;
	int (*module_startup_func)(INIT_FUNC_ARGS);
	int (*module_shutdown_func)(SHUTDOWN_FUNC_ARGS);
	int (*request_startup_func)(INIT_FUNC_ARGS);
	int (*request_shutdown_func)(SHUTDOWN_FUNC_ARGS);
	void (*info_func)(ZEND_MODULE_INFO_FUNC_ARGS);
	const char *version;
	size_t globals_size;
#ifdef ZTS
	ts_rsrc_id* globals_id_ptr;
#else
	void* globals_ptr;
#endif
	void (*globals_ctor)(void *global);
	void (*globals_dtor)(void *global);
	int (*post_deactivate_func)(void);
	int module_started;
	unsigned char type;
	void *handle;
	int module_number;
	const char *build_id;
};
```
在结构体里面定义的这几个函数指针就是关键：

1. `int (*module_startup_func)(INIT_FUNC_ARGS);`
开始加载扩展的时候会调用这个函数指针所指的回调函数。
2. `int (*module_shutdown_func)(SHUTDOWN_FUNC_ARGS);`
扩展被卸载的时候会调用这个函数指针所指的回调函数。
3. `int (*request_shutdown_func)(SHUTDOWN_FUNC_ARGS);`
每次请求开始的时候会调用这个函数指针所指的回调函数。
4. `int (*request_shutdown_func)(SHUTDOWN_FUNC_ARGS);`
每次请求结束的时候会调用这个函数指针所指的回调函数。

介绍完`PHP`描述一个扩展的结构体之后，我们下面说说`zendAPI`项目是怎么将相关元信息注册进`Zend Engine`的。
首先我们先介绍下两个比较重要的两个全局变量：(定义在`src/lang/Extension.cpp`文件中)
```cpp
std::map<std::string, Extension *> name2extension; // line number 57
std::map<int, Extension *> mid2extension; // line number 58
```
`name2extension`提供按照模块的名称查找对应的扩展对象指针的功能
`mid2extension`提供按照模块的编号查找对应的扩展对象指针的功能
我们为什么需要这两个全局变量呢？应为在`PHP`的生命周期回调函数里面传递的参数中之后模块的标号，为了方便我们在项目中查找对应的模块，所以引入了这两个全局变量。
*特别说明：这种全局标量的方式可能不是线程安全的，在多线程环境下对其进行操作可能会有问题，我们会在以后的版本中进行优化。*
```cpp
﻿Extension::Extension(const char *name, const char *version, int apiVersion)
   : m_implPtr(new ExtensionPrivate(name, version, apiVersion, this))
{
   name2extension[name] = this;
}
```
在`zapi::lang::Extension`的构造函数里面，我们将相应的扩展信息注册到`name2extension`。
现在我们来看`zendAPI`里面的生命周期处理函数：
```cpp
// line numer 288, src/lang/Extension.cpp
m_entry.module_startup_func = &ExtensionPrivate::processStartup;
m_entry.module_shutdown_func = &ExtensionPrivate::processShutdown;
m_entry.request_startup_func = &ExtensionPrivate::processRequestStartup;
m_entry.request_shutdown_func = &ExtensionPrivate::processRequestShutdown;
```
在代码中已经明确可以看出我们针对`PHP`的生命周期设置的回调函数了，下面我们接着分析这四个函数。

#### ExtensionPrivate::processStartup
在这个方法里面，我们进行了对应模块的初始化。
```cpp 
// line numer 429, src/lang/Extension.cpp
﻿int ExtensionPrivate::processStartup(INIT_FUNC_ARGS)
{
   ZEND_INIT_MODULE_GLOBALS(zapi, init_globals, nullptr);
   Extension *extension = find_module(module_number);
   return BOOL2SUCCESS(extension->initialize(module_number));
}
```
首先我们对`Zend Engine`要求的全局数据结构进行初始化。
*特别说明：在 zendAPI 项目中其实我们并没有使用这个全局变量，但是我们必须进行初始化，Zend Engine 强制要求*
然后我们扩展的编号或获取扩展对象的指针，调用`initialize`方法进行初始化。
下面我们来看`﻿ExtensionPrivate::initialize`方法，真正的初始化代码都在这个里面。
```cpp
// line numer 461, src/lang/Extension.cpp
﻿bool ExtensionPrivate::initialize(int moduleNumber)
{
   m_zendIniDefs.reset(new zend_ini_entry_def[getIniQuantity() + 1]);
   int i = 0;
   // fill ini entry def
   iterateIniEntries([this, &i, moduleNumber](Ini &iniEntry){
      zend_ini_entry_def *zendIniDef = &m_zendIniDefs[i];
      iniEntry.setupIniDef(zendIniDef, moduleNumber);
      i++;
   });
   memset(&m_zendIniDefs[i], 0, sizeof(m_zendIniDefs[i]));
   zend_register_ini_entries(m_zendIniDefs.get(), moduleNumber);
   
   iterateConstants([moduleNumber](Constant &constant) {
      constant.initialize(moduleNumber);
   });
   // here we register all global classes and interfaces
   iterateClasses([moduleNumber](AbstractClass &cls) {
      cls.initialize(moduleNumber);
   });
   // work with register namespaces
   
   for (std::shared_ptr<Namespace> &ns : m_namespaces) {
      ns->initialize(moduleNumber);
   }
   // initialize closure class
   zapi::vm::Closure::registerToZendNg(moduleNumber);
   
   // remember that we're initialized (when you use "apache reload" it is
   // possible that the processStartup() method is called more than once)
   m_locked = true;
   if (m_startupHandler) {
      m_startupHandler();
   }
   return true;
}
```
在这个方法里面我们对`INI`变量，然后是常量定义，类的定义，命名空间以及闭包调用上下文对象进行了相应的初始化，最后调用了我们注册`m_startupHandler`回调函数，我们在这里就不对这些最底层的初始化代码进行展开了，这些函数套路很简单，就是根据元信息描述类的数据去调用`Zend Engine`底层的相应注册函数，有兴趣的同学可以自行查阅相关的代码。

#### ExtensionPrivate::processShutdown
在这个方法中跟初始化比较像，通过扩展的编号获取扩展对象的指针，然后调用扩展对象的`shutdown`方法。
```cpp
﻿// line numer 436, src/lang/Extension.cpp
int ExtensionPrivate::processShutdown(SHUTDOWN_FUNC_ARGS)
{
   Extension *extension = find_module(module_number);
   mid2extension.erase(module_number);
   return BOOL2SUCCESS(extension->m_implPtr->shutdown(module_number));
}
```
下面我们分析一下`bool ExtensionPrivate::shutdown(int moduleNumber);`方法
```cpp
// line numer 498, src/lang/Extension.cpp
﻿bool ExtensionPrivate::shutdown(int moduleNumber)
{
   zend_unregister_ini_entries(moduleNumber);
   m_zendIniDefs.reset();
   if (m_shutdownHandler) {
      m_shutdownHandler();
   }
   zapi::vm::Closure::unregisterFromZendNg();
   m_locked = false;
   return true;
}
```
这个方法里面我们主要完成了`INI`配置变量的注销，以及闭包调用上下文的注销和调用注册的`m_shutdownHandler`回调函数指针。

#### ExtensionPrivate::processRequestStartup
这个方法很简单，在请求开始的时候被`Zend Engine`进行调用, 主要是根据扩展的编号获取扩展对象的指针，然后调用预先注册的`﻿m_requestStartupHandler`函数指针。
```cpp
﻿// line numer 409, src/lang/Extension.cpp
﻿int ExtensionPrivate::processRequestStartup(INIT_FUNC_ARGS)
{
   Extension *extension = find_module(module_number);
   if (extension->m_implPtr->m_requestStartupHandler) {
      extension->m_implPtr->m_requestStartupHandler();
   }
   return BOOL2SUCCESS(true);
}
```

#### ExtensionPrivate::processRequestShutdown
这个方法也很简单，在请求结束的时候被`Zend Engine`主要是根据扩展的编号获取扩展对象的指针，然后调用预先注册的`﻿m_﻿m_requestShutdownHandler`函数指针。
跟`ExtensionPrivate::processRequestStartup`不一样的地方，这个方法里面我们不仅仅调用了预先注册的回调函数，而且还释放函数和方法派发过程中生成的上下文数据。
> [普通函数派发机制](commonfunctiondispatch.html)
> [类方法派发机制](commonmethoddispatch.html)

```cpp
﻿// line numer 418, src/lang/Extension.cpp
﻿int ExtensionPrivate::processRequestShutdown(SHUTDOWN_FUNC_ARGS)
{
   Extension *extension = find_module(module_number);
   if (extension->m_implPtr->m_requestShutdownHandler) {
      extension->m_implPtr->m_requestShutdownHandler();
   }
   // release call context
   AbstractClassPrivate::sm_contextPtrs.clear();
   return BOOL2SUCCESS(true);
}
```
### zendAPI 生命周期回调函数的介绍
在上文中，我们主要讲了`zendAPI`本身与`PHP`生命周期的整合，那么我们基于`zendAPI`开发的扩展怎么在响应的生命周期加入自定义的处理逻辑呢？哈哈，当然没问题，主要由以下几个方法进行注册：
1. `Extension::setStartupHandler`
2. `Extension::setShutdownHandler`
3. `﻿Extension::setRequestStartupHandler`
4. `﻿Extension::setRequestShutdownHandler`

大家看名字看方法名字都能知道是什么意思，这里我就不详细解释了。
> [Extension::setStartupHandler 接口文档](/api/classzapi_1_1lang_1_1_extension.html#1a8d8c8682c2190eee42697e3c2a1b0fff)
> [Extension::setShutdownHandler 接口文档](/api/classzapi_1_1lang_1_1_extension.html#1a15820307ace768fce9280d1adbe10161)
> [Extension::setRequestStartupHandler 接口文档](/api/classzapi_1_1lang_1_1_extension.html#1ab773d19d5de115cddec25afb21697502)
> [Extension::setRequestShutdownHandler 接口文档](/api/classzapi_1_1lang_1_1_extension.html#1aea833cab1b0659a1c27cb0653503e18d)