---
layout: manual
subtype: normal
title: 原生类方法派发原理详细文档
---
在上一篇中我们介绍的普通函数的派发原理，这一篇我们开始介绍类中的方法派发原理，大家可能会有一种想法，就是觉得类中的方法派发比普通函数的派发要复杂很多，其实复杂肯定是要复杂点，但是也没有复杂多少。
在原生类方法派发中主要有如下几个步骤：
1. 原生类元信息的注册，让`Zend Engine`知道我们自定义的原生类的存在
2. 类的实例的创建过程
3. 基于`InvokeBridge`的类方法的派发

现在我们详细说说上面三个步骤:
#### 原生类元信息的注册，让`Zend Engine`知道我们自定义的原生类的存在

在初始化扩展的时候，我们一般会调用相关的接口进行类的元信息的注册，主要有两个接口进行类元信息的注册：
1. 在`zapi::lang::Extension`中注册原生类元信息描述类
2. 在`zapi::lang::Namespace`中注册原生类元信息描述类

这个两个地方的接口定义是一样的，只不过情况1是在全局名称空间中注册一个原生类，一个是在是在指定的名称空间中注册一个原生类，下面我们以情况1为例讲解下相关代码：
```cpp
﻿template <typename T>
Extension &Extension::registerClass(const Class<T> &nativeClass)
{
   ZAPI_D(Extension);
   if (implPtr->m_locked) {
      return *this;
   }
   // just shadow copy 
   implPtr->m_classes.push_back(
        std::shared_ptr<AbstractClass>(new Class<T>(nativeClass)));
   return *this;
}
```

代码很清晰，主要的作用就是将原生类元信息描述对象加入到扩展对象的内部存储起来。
然后我们看看元信息对象是在哪里加入到`Zend Engine`中的：
```cpp
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
这段代码在我们讲《[zendAPI 初始化流程详解](zendapiinitcycle.html)》中出现过，我们在这里的重点就几行代码：
```cpp
// here we register all global classes and interfaces
iterateClasses([moduleNumber](AbstractClass &cls) {
    cls.initialize(moduleNumber);
});
```
在这里我们遍历我们注册的元信息描述对象，然后依次调用`initialize`方法。
下面我们分析下`initialize`方法，这个方法还是有一点小复杂
```cpp
﻿zend_class_entry *AbstractClassPrivate::initialize(
    AbstractClass *cls, 
    const std::string &ns, int moduleNumber)
{
   m_apiPtr = cls;
   zend_class_entry entry;
   if (ns.size() > 0 && ns != "\\") {
      m_name = ns + "\\" + m_name;
   }
   // initialize the class entry
   INIT_CLASS_ENTRY_EX(entry, m_name.c_str(), m_name.size(), 
                       getMethodEntries().get());
   entry.create_object = &AbstractClassPrivate::createObject;
   entry.get_static_method = &AbstractClassPrivate::getStaticMethod;
   // check if traversable
   if (m_apiPtr->traversable()) {
      entry.get_iterator = &AbstractClassPrivate::getIterator;
      entry.iterator_funcs.funcs = IteratorBridge::getIteratorFuncs();
   }
   
   if (m_apiPtr->serializable()) {
      entry.serialize = &AbstractClassPrivate::serialize;
      entry.unserialize = &AbstractClassPrivate::unserialize;
   }
   // check if serializable
   if (m_parent) {
      if (m_parent->m_implPtr->m_classEntry) {
         m_classEntry = zend_register_internal_class_ex(
            &entry, 
            m_parent->m_implPtr->m_classEntry);
      } else {
         std::cerr << "Derived class " << m_name 
                   << " is initialized before base class " 
                   << m_parent->m_implPtr->m_name
                   << ": base class is ignored" << std::endl;
         // ignore base class
         m_classEntry = zend_register_internal_class(&entry);
      }
   } else {
      m_classEntry = zend_register_internal_class(&entry);
   }
   // register the interfaces of the class
   
   for (std::shared_ptr<AbstractClass> &interface : m_interfaces) {
      if (interface->m_implPtr->m_classEntry) {
         zend_do_implement_interface(m_classEntry, 
                                     interface->m_implPtr->m_classEntry);
      } else {
         // interface that want to implement is not initialized
         std::cerr << "Derived class " << m_name 
                   << " is initialized before base class "
                   << interface->m_implPtr->m_name
                   << ": interface is ignored"
                   << std::endl;
      }
   }
   m_classEntry->ce_flags = static_cast<uint32_t>(m_type);
   for (std::shared_ptr<AbstractMember> &member : m_members) {
      member->initialize(m_classEntry);
   }
   AbstractClassPrivate *selfPtr = this;
   m_self.reset(zend_string_alloc(sizeof(this), 1));
   // make the string look like empty
   ZSTR_VAL(m_self)[0] = '\0';
   ZSTR_LEN(m_self) = 0;
   std::memcpy(ZSTR_VAL(m_self.get()) + 1, &selfPtr, sizeof(selfPtr));
   // save into the doc_comment
   m_classEntry->info.user.doc_comment = m_self.get();
   return m_classEntry;
}
```
这个方法简单的来说，就是生成一个`zend_class_entry`对象，然后根据类的元信息描述对象的信息对`zend_class_entry`进行相关设置，然后将这个对象返回给`Zend Engine`。
首先简单介绍下`zend_class_entry`(`PHP 7.1.5`)一下几个重要的字段:
1. `name`
类的名字，需要遵守`PHP`类的名字的命名规范，在`PHP`脚本中进行实例化就是使用这个类名字。
2. `create_object`
这个字段类型是函数指针类型，当`PHP`脚本中对类进行实例化的时候`Zend Engine`会首先调用这个函数指针所指的函数，这个函数必须创建`zend_object`对象并且返回其指针。这个对象就是`PHP`脚本里面类实例化后的对象的底层实现。
3. `get_static_method`
这个字段类型是函数指针类型，当`PHP`脚本中调用原生类的静态方法的时候`Zend Engine`会首先调用这个函数指针所指的函数，这个函数必须创建`_zend_function`对象并且返回其指针，`Zend Engine`会根据返回的`_zend_function`调用相关的原生类的静态方法。
4. `get_closure`
这个字段类型是函数指针类型，当`PHP`脚本中对一个对象进行类似函数调用的操作的时候`Zend Engine`会首先调用这个函数指针所指的函数，这个函数接受如下几个参数:(在这个函数里面我们主要通过`retfunc`指针将设置结果返回给`Zend Engine`)
   1. zval *object
   2. zend_class_entry **entry
   3. zend_function **retFunc
   4. zend_object **objectPtr
5. `get_iterator`
这个字段类型是函数指针类型，当在`PHP`脚本中，我们对原生类实例化的对象进行`foreach`调用的时候，`Zend Engine`会首先调用这个指针所指的函数，这个函数必须返回一个`﻿zend_object_iterator`对象的指针，`Zend Engine`会根据返回的迭代器对象对原生类的对象进行相关的迭代。
6. `serialize/unserialize`
这个两个字段的类型是函数指针类型，当在`PHP`脚本中对我们的原生类对象实例进行序列化和反序列化的时候`Zend Engine`会调用这两个函数指针所指的对象的函数。
7. `ce_flags`
这个字符主要是保存原生类的类型的是否是抽象类，是否`final`等等。目前主要支持如下几种类型：
 1. Regular
 普通原生类，绝大数情况都是这种情况
 2. Abstract
 抽象类，这种类型是不能直接实例化的
 3. Final
 Final类型的类不能被继承
 4. Interface
 接口类型
 5. Trait
 为了共用一些代码而发明的一种代码共用的类型
 
> [PHP Traits 参考文档](http://php.net/manual/en/language.oop5.traits.php)

#### 类的实例的创建过程

大家都知道，我们要获取一个类的对象实例，在`PHP`脚本中调用`new`运算符就可以了，但是当我们实例化一个我们在扩展中定义的原生扩展函数的时候都进行了那些步骤，大家有了解过吗？如果没有的话，您可以好好阅读下本节知识，了解这个过程对我们开发扩展有好处。
大致的步骤可以分为三个步骤:
1. `Zend Engine`遇到对象实例化的请求代码，开始执行相关类型实例化的`OP Code`
2. `Zend Engine`调用我们预先注册的`entry.create_object`
```cpp
entry.create_object = &AbstractClassPrivate::createObject;
```
3. 创建对象回调函数将创建的对象指针返回给`Zend Engine`
4. `Zend Engine`将对象封装成`zval`，然后赋值给相关的`PHP`变量

在这里步骤1, 3, 4都是通用的过程，没有什么好展开的，大家有兴趣可以去查阅`PHP`的相关源码，在这里我给大家详细说说`zendAPI`项目中的对象创建回调方法`AbstractClassPrivate::createObject`。
```cpp
﻿zend_object *AbstractClassPrivate::createObject(zend_class_entry *entry)
{
   if (!(entry->ce_flags & (ZEND_ACC_TRAIT|ZEND_ACC_EXPLICIT_ABSTRACT_CLASS|
                            ZEND_ACC_INTERFACE|ZEND_ACC_IMPLEMENT_INTERFACES|
                            ZEND_ACC_IMPLEMENT_TRAITS))) {
      verify_abstract_class(entry);
   }
   AbstractClassPrivate *abstractClsPrivatePtr = retrieve_acp_ptr_from_cls_entry(entry);
   std::shared_ptr<StdClass> nativeObject(abstractClsPrivatePtr->m_apiPtr->construct());
   if (!nativeObject) {
      zend_error(E_ERROR, "Unable to instantiate %s", entry->name->val);
   }
   ObjectBinder *binder = new ObjectBinder(entry, 
                                           nativeObject, 
                                           abstractClsPrivatePtr->getObjectHandlers(), 
                                           1);
   return binder->getZendObject();
}
```
在这段代码中，我们首先根据参数`zend_class_entry *entry`中的相关标志位去做抽象类合法性检查，如果是抽象类则不让其进行实例化，`zendAPI`会抛出一个`Fata Error`。如果满足条件接下来代码会根据请求的原生类的类型去实例化一个`C++`的原生类对象。
*注意：这个对象不是 PHP 代码中的对象，他是 C++ 中的对象，是为 PHP 中的对象提供底层实现支持*
接下来我们创建一个绑定对象`ObjectBinder`, 绑定对象的作用是将`Zend Engine`里面的`﻿zend_object`对象与`zendAPI`中的原生类对象做一个连接，将两者进行绑定，让两者具有相同的生命周期。
最后将绑定对象中的`zend_object`指针返回给`Zend Engine`。大家如果对`ObjectBinder`有兴趣，可以自行阅读`src/vm/ObjectBinder.cpp`文件。
`Zend Engine`在获取`zend_object`对象之后，如果对应的原生类注册了`__construct`方法，那么`Zend Engine`会自动调用, 这里的原生类的`__construct`方法用于实现在`PHP`脚本里面的构造函数的功能。

#### 基于`InvokeBridge`的类方法的派发
在类的方法派发中有如下三种类型：

1. 正常的实例方法(`instance method`)的派发
2. 类的静态方法的派发
3. 类的`invoke`的派发

#### 正常的实例方法的派发

当`Zend Engine`遇到正常的实例方法调用的`OP Code`，然后就会调用`﻿m_handlers.get_method = &AbstractClassPrivate::getMethod;`，这个方法返回`﻿zend_function`对象，`Zend Engine`根据`﻿zend_function`进行相关原生方法的调用。
下面我们看看`AbstractClassPrivate::getMethod`函数，这个方法是`zendAPI`与`Zend Engine`的结合之处。
```cpp
﻿zend_function *AbstractClassPrivate::getMethod(zend_object **object, 
                                               zend_string *methodName, 
                                               const zval *key)
{
   zend_function *defaultFuncInfo = std_object_handlers.get_method(object, methodName, key);
   if (defaultFuncInfo) {
      return defaultFuncInfo;
   }
   zend_class_entry *defClassEntry = (*object)->ce;
   assert(defClassEntry);
   std::string contextKey(defClassEntry->name->val, defClassEntry->name->len);
   contextKey.append("::");
   contextKey.append(methodName->val, methodName->len);
   CallContext *callContext  = nullptr;
   auto targetContext = sm_contextPtrs.find(contextKey);
   if (targetContext != sm_contextPtrs.end()) {
      callContext = targetContext->second.get();  
   } else {
      std::shared_ptr<CallContext> targetContext(
         reinterpret_cast<CallContext *>(emalloc(sizeof(CallContext))), 
                                         std_php_memory_deleter);
      callContext = targetContext.get();
      std::memset(callContext, 0, sizeof(CallContext));
      zend_internal_function *func = &callContext->m_func;
      func->type = ZEND_INTERNAL_FUNCTION;
      func->module = nullptr;
      func->handler = AbstractClassPrivate::magicCallForwarder;
      func->arg_info = nullptr;
      func->num_args = 0;
      func->required_num_args = 0;
      func->scope = defClassEntry;
      func->fn_flags = ZEND_ACC_CALL_VIA_HANDLER;
      func->function_name = methodName;
      callContext->m_selfPtr = retrieve_acp_ptr_from_cls_entry(defClassEntry);
      sm_contextPtrs[contextKey] = std::move(targetContext);
   }
   return reinterpret_cast<zend_function *>(callContext);
}

```
这个函数主要作用就是生成一个`﻿zend_function`对象，然后设置相关的字段，首先我们先查看请求的方法是否在`std_object_handlers`里面，如果在的话就直接返回, `std_object_handlers`是`Zend Engine`为类定义的很多标准的方法处理器。
*注意：一般情况下 std_object_handlers.get_method(object, methodName, key) 返回的值不是空指针，如果返回为空指针的情况，有两种情况，一种是方法不存在，另一种是本身就是调用魔术方法。*
如果我们没有从`std_object_handlers`没有获取`zend_function`对象，这个时候我们开始准备一次标准的魔术方法调用需要的上下文环境，接下来的代码首先在静态字段`sm_contextPtrs`中先判断是否有准备调用的方法的上下文信息，如果没有的话生成一个，然后在上下文中获取`m_func`对象，对其进行相关字段的设置。最后将调用上下文对象强制转换成`zend_function`返回给`Zend Engine`。
在上面的代码中有一句核心的代码:
```cpp
func->handler = AbstractClassPrivate::magicCallForwarder;
```
这行代码主要将`zendAPI`的内置的魔术方法派发器设置到魔术方法调用上下文中的`zend_function`对象中。
下面我们分析一下`AbstractClassPrivate::magicCallForwarder`方法，这个是魔术方法派发器处理函数：
```cpp
﻿void AbstractClassPrivate::magicCallForwarder(INTERNAL_FUNCTION_PARAMETERS)
{
   CallContext *callContext = reinterpret_cast<CallContext *>(execute_data->func);
   assert(callContext);
   bool isStatic = false;
   AbstractClass *meta = callContext->m_selfPtr->m_apiPtr;
   zend_class_entry *defClassEntry = callContext->m_selfPtr->m_classEntry;
   zend_internal_function *func = &callContext->m_func;
   zend_string *funcName = func->function_name;
   std::string contextKey(defClassEntry->name->val, defClassEntry->name->len);
   contextKey.append("::");
   contextKey.append(funcName->val, funcName->len);
   if (!func->scope) {
      contextKey.append("static");
   }
   ScopedFree scopeFree(sm_contextPtrs, contextKey);
   const char *name = ZSTR_VAL(funcName);
   try {
      Parameters params(getThis(), ZEND_NUM_ARGS());
      StdClass *nativeObject = params.getObject();
      if (nativeObject) {
         zval temp = meta->callMagicCall(nativeObject, name, params).detach(false);
         ZVAL_COPY(return_value, &temp);
      } else {
         isStatic = true;
         zval temp = meta->callMagicStaticCall(name, params).detach(false);
         ZVAL_COPY(return_value, &temp);
      }
   } catch (const NotImplemented &exception) {
      if (isStatic) {
         zend_error(E_ERROR, "Undefined static method %s::%s", 
                    meta->getClassName().c_str(), name);
      } else {
         zend_error(E_ERROR, "Undefined instance method %s of %s", 
                    name, meta->getClassName().c_str());
      }
   } catch (Exception &exception) {
      process_exception(exception);
   }
}

```
这个函数看着很复杂，其实意思很简单。这个函数首先获取魔术函数的调用上下文。然后通过调用上下文获取相关的原生类的元信息描述类，然后调用元信息描述类同名的模式方法，如果出现异常`zendAPI`抛出`Fata Error`。
在进行处理的时候会通过相关调用上下文中的信息判断是调用静态魔术方法或者实例魔术方法调用。在调用完之后，我们会通过:
```cpp
﻿ScopedFree scopeFree(sm_contextPtrs, contextKey);
```
这行代码完成对调用上下文信息的释放，具体的详细步骤大家可以阅读这个函数的源码进行学习。

#### 类的静态方法的派发

类的静态方法调用跟类的实例方法方法的调用其实是一样的，当`Zend Engine`遇到静态方法调用的`OP Code`，然后就会调用`﻿m_handlers.﻿get_static_method = &AbstractClassPrivate::﻿getStaticMethod;`，这个方法返回`﻿zend_function`对象，`Zend Engine`根据`﻿zend_function`进行相关原生方法的调用。
下面我们看看`AbstractClassPrivate::﻿getStaticMethod`函数，这个方法是`zendAPI`与`Zend Engine`的结合之处。
```cpp
﻿zend_function *AbstractClassPrivate::getStaticMethod(zend_class_entry *entry, 
                                                     zend_string *methodName)
{
   zend_function *defaultFuncInfo = zend_std_get_static_method(entry, methodName, nullptr);
   if (defaultFuncInfo) {
      return defaultFuncInfo;
   }
   // if exception throw before delete the memory will be relase after request cycle
   std::string contextKey(entry->name->val,  entry->name->len);
   contextKey.append("::");
   contextKey.append(methodName->val, methodName->len);
   contextKey.append("static");
   CallContext *callContext  = nullptr;
   auto targetContext = sm_contextPtrs.find(contextKey);
   if (targetContext != sm_contextPtrs.end()) {
      callContext = targetContext->second.get();  
   } else {
      std::shared_ptr<CallContext> targetContext(
        reinterpret_cast<CallContext *>(emalloc(sizeof(CallContext))), std_php_memory_deleter);
      callContext = targetContext.get();
      std::memset(callContext, 0, sizeof(CallContext));
      zend_internal_function *func = &callContext->m_func;
      func->type = ZEND_INTERNAL_FUNCTION;
      func->module = nullptr;
      func->handler = &AbstractClassPrivate::magicCallForwarder;
      func->arg_info = nullptr;
      func->num_args = 0;
      func->required_num_args = 0;
      func->scope = nullptr;
      func->fn_flags = ZEND_ACC_CALL_VIA_HANDLER | ZEND_ACC_STATIC;
      func->function_name = methodName;
      callContext->m_selfPtr = retrieve_acp_ptr_from_cls_entry(entry);
      sm_contextPtrs[contextKey] = std::move(targetContext);
   }
   return reinterpret_cast<zend_function *>(callContext);
}

```
这个方法跟我们上面分析的`AbstractClassPrivate::getMethod`其实是大同小异，两处的区别是：
作用域，静态方法没有作用域
```cpp
func->scope = nullptr;
```
方法的`flag`设置多了静态标志
```cpp
func->fn_flags = ZEND_ACC_CALL_VIA_HANDLER | ZEND_ACC_STATIC;
```
其余的处理跟实例方法一样。

#### 类的`invoke`的派发
在开始介绍这一节之前，我先来大致介绍下在`PHP`中什么是类的`invoke`的派发。简单来说就是定义类的时候定义一个`__invoke`的方法，然后我们把类实例化得到的对象进行类似函数调用的操作，这点跟`C++`里面的函数对象的意义是很类似的。
当`Zend Engine`执行到实例对象的函数方式调用的`OP Code`的时候，然后执行下面这行代码设置的字段:
```cpp
﻿m_handlers.get_closure = &AbstractClassPrivate::getClosure;
```
这个字段的具体意思我们在本篇的**[原生类元信息的注册，让Zend Engine知道我们自定义的原生类的存在](commonmethoddispatch.html#yuan-sheng-lei-yuan-xin-xi-de-zhu-ce-rang-zend-engine-zhi-dao-wo-men-zi-ding-yi-de-yuan-sheng-lei-de-cun-zai)**有介绍，大家可以查看。
下面我们具体看看`AbstractClassPrivate::getClosure`函数：
```cpp
﻿int AbstractClassPrivate::getClosure(zval *object, 
                                     zend_class_entry **entry, z
                                     end_function **retFunc, 
                                     zend_object **objectPtr)
{
   // @mark is this really right ?
   zend_class_entry *defClassEntry = Z_OBJCE_P(object);
   assert(defClassEntry);
   std::string contextKey(defClassEntry->name->val, defClassEntry->name->len);
   contextKey.append("::__invoke");
   CallContext *callContext  = nullptr;
   auto targetContext = sm_contextPtrs.find(contextKey);
   if (targetContext != sm_contextPtrs.end()) {
      callContext = targetContext->second.get();  
   } else {
      std::shared_ptr<CallContext> targetContext
      (reinterpret_cast<CallContext *>(emalloc(sizeof(CallContext))), std_php_memory_deleter);
      callContext = targetContext.get();
      std::memset(callContext, 0, sizeof(CallContext));
      zend_internal_function *func = &callContext->m_func;
      func->type = ZEND_INTERNAL_FUNCTION;
      func->module = nullptr;
      func->handler = &AbstractClassPrivate::magicInvokeForwarder;
      func->arg_info = nullptr;
      func->num_args = 0;
      func->required_num_args = 0;
      func->scope = *entry;
      func->fn_flags = ZEND_ACC_CALL_VIA_HANDLER;
      func->function_name = nullptr;
      callContext->m_selfPtr = retrieve_acp_ptr_from_cls_entry(Z_OBJCE_P(object));
      sm_contextPtrs[contextKey] = std::move(targetContext);
   }
   *retFunc = reinterpret_cast<zend_function *>(callContext);
   *objectPtr = Z_OBJ_P(object);
   return ZAPI_SUCCESS;
}
```
在这个方法里面其实跟`AbstractClassPrivate::getMethod`和`AbstractClassPrivate::getStaticMethod`很像，区别是前两个函数是通过正常的函数返回值进行`zend_function`对象指针的返回，而在这个方法中，我们是通过参数指针进行返回的，至于您如果问，为什么要这么做，我想说其实我也不知道，这个得问`PHP`内核开发者了。
上面的语句的作用基本就是创建一个`invoke`调用所需要的上下文信息，然后对上下文信息中的`m_func`字段进行相应的设置，然后通过`retFunc`参数指针将结果返回给`Zend Engine`。在代码中的这行：
```cpp
func->handler = &AbstractClassPrivate::magicInvokeForwarder;
```
我们通过这行设置了`invoke`调用的派发器，下面我们看看这个派发器是怎么实现的：
```cpp
﻿void AbstractClassPrivate::magicInvokeForwarder(INTERNAL_FUNCTION_PARAMETERS)
{
   CallContext *callContext = reinterpret_cast<CallContext *>(execute_data->func);
   assert(callContext);
   zend_internal_function *func = &callContext->m_func;
   AbstractClass *meta = callContext->m_selfPtr->m_apiPtr;
   zend_class_entry *defClassEntry = callContext->m_selfPtr->m_classEntry;
   assert(defClassEntry);
   std::string contextKey(defClassEntry->name->val, defClassEntry->name->len);
   contextKey.append("::__invoke");
   ScopedFree scopeFree(sm_contextPtrs, contextKey);
   try {
      Parameters params(getThis(), ZEND_NUM_ARGS());
      StdClass *nativeObject = params.getObject();
      zval temp = meta->callMagicInvoke(nativeObject, params).detach(false);
      ZVAL_COPY(return_value, &temp);
   } catch (const NotImplemented &exception) {
      zend_error(E_ERROR, "Function name must be a string");
   } catch (Exception &exception) {
      process_exception(exception);
   }
}
```
哈哈，是不是似成相识啊，对的，这个派发器其实跟`﻿magicCallForwarder`很相似，大致的过程都是先获取调用上下文信息对象的指针，进一步获取类的元信息定义类然后通过对应的元信息定义类调用对应的原生类的`__invoke`方法, 如果出现相应的异常我们会抛出`Fata Error`，因为`invoke`作用与对象实例上，所有不会有`static`类型的相关处理。
调用完成，上小文信息对象会被`scopeFree`对象的析构方法进行释放。

> [类的 invoke 魔术方法 编程手册](http://php.net/manual/en/language.oop5.magic.php#object.invoke)