---
layout: manual
subtype: normal
title: 普通函数派发原理解析文档
---
大家对在`PHP`脚本中定义函数肯定很熟悉，定义一个函数肯定是信手拈来，简单的很，但是当我们定义一个扩展函数，然后我们在`PHP`脚本中调用我们定义的原生函数，这之间是一个什么过程？其实这个过程很简单，我们在这篇文章中就给大家详细介绍。
概括来说，主要的步骤主要有下面几个步骤：
1. 扩展被`Zend Engine`加载的时候将原生函数注册。
2. `Zend Engine`执行`PHP`编译成的`OP Code`，执行到我们原生函数时候就会调用`zendAPI`的`InvokeBridge`调用请求处理对象。
3. `InvokeBridge`为本次调用收集参数，将参数传递给原生函数并且将返回值返回给`Zend Engine`。

现在我们详细说说上面三个步骤

#### 原生函数的注册

在前面的章节，我们大概说了一下元信息描述类的作用，这里我们着重说说函数元信息描述类的注册过程。
首先我们通过`Extension::registerFunction`接口进行注册:
```cpp
// include/zapi/lang/Extension.h line number 218
﻿template <typename T, typename std::decay<T>::type callable>
Extension &Extension::registerFunction(const char *name, const Arguments &args)
{
   return registerFunction(name, &zapi::vm::InvokeBridge<T, callable>::invoke, args);
}
```
这个是个模板方法，您可以简单的认为这个函数将一个静态方法的指针注册到了扩展中，这个指针是由`zapi::vm::InvokeBridge<T, callable>::invoke`模板方法实例化得到的。
然后就是到了下一个重要的方法上场了：
```cpp
﻿zend_module_entry *ExtensionPrivate::getModule()
{
   if (m_entry.functions) {
      return &m_entry;
   }
   if (m_entry.module_startup_func == &ExtensionPrivate::processMismatch) {
      return &m_entry;
   }
   size_t count = getFunctionQuantity();
   if (0 == count) {
      return &m_entry;
   }
   int i = 0;
   zend_function_entry *entries = new zend_function_entry[count + 1];
   iterateFunctions([&i, entries](Function &callable){
      callable.initialize(&entries[i]);
      i++;
   });
   for (std::shared_ptr<Namespace> &ns : m_namespaces) {
      ns->m_implPtr->iterateFunctions([&i, entries](const std::string &ns, Function &callable){
         callable.initialize(ns, &entries[i]);
         i++;
      });
   }
   zend_function_entry *last = &entries[count];
   memset(last, 0, sizeof(zend_function_entry));
   m_entry.functions = entries;
   return &m_entry;
}
```
大家能清楚的看到，我们在这里遍历了刚才注册的函数信息，同时在这里我们动态初始化了`zend_function_entry`数组，这个是必须的我们必须根据函数的元信息描述类来设置这个数组，每一个函数初始化占用一项。
```cpp
m_entry.functions = entries;
```
然后我们把设置好的函数信息数组设置到扩展描述对象的`functions`字段上。
在上面的代码中，我们遍历的时候最终调用的都是:
```cpp
callable.initialize(ns, &entries[i]);
```
调用这个函数，我们传入了两个参数，第一个参数是当前的原生函数所在的命名空间，另一个参数是这个原生函数所对应的`zend_function_entry`对象。

```cpp
﻿void CallablePrivate::initialize(zend_function_entry *entry, 
                                 const char *className, int flags) const
{
   if (m_callable) {
      entry->handler = m_callable;
   } else {
      // install ourselves in the extra argument
      m_argv[m_argc + 1].class_name = reinterpret_cast<const char*>(this);
      // we use our own invoke method, which does a lookup
      // in the map we just installed ourselves in
      entry->handler = &Callable::invoke;
   }
   entry->fname = m_name.data();
   entry->arg_info = m_argv.get();
   entry->num_args = m_argc;
   entry->flags = flags;
   initialize(reinterpret_cast<zend_internal_function_info *>(m_argv.get()), className);
}

void CallablePrivate::initialize(zend_internal_function_info *info, 
                                 const char *className) const
{
   info->class_name = className;
   info->required_num_args = m_required;
   info->type_hint = static_cast<unsigned char>(m_return);
   // current we don't support return by reference
   info->return_reference = false;
   // since php 5.6 there are _allow_null and _is_variadic properties. It's
   // not exactly clear what they do (@todo find this out) so for now we set
   // them to false
   info->allow_null = false;
   info->_is_variadic = false;
}
```
上面的代码意思已经很明显了，在这里主要是设置`zend_function_entry`对象的函数名字，参数相关信息已经参数的格式等等相关信息，感兴趣的同学可以自己去研究相关代码，都是根据函数元信息描述对象去设置一些字段的繁琐的信息设置，这里我们就不再深入了。

#### `Zend Engine`将请求传递给`zapi::vm::InvokeBridge`然后调用对应的原生函数
在`zapi::vm::InvokeBridge`中我们将原生函数分成了下面的几种类型：
1. 有返回值，有可变参数
2. 有返回值，无可变参数
3. 无返回值，有可变参数
4. 无返回值，无可变参数

其中有无返回值处理的差距不是特别大，我们在这里着重介绍下情况1和情况2的两种情况：

#### 有返回值，无可变参数

```cpp
﻿template <typename CallableType, CallableType callable>
class InvokeBridgePrivate <CallableType, callable, false, true, false>
{
public:
   static void invoke(zend_execute_data *execute_data, zval *return_value)
   {
      try {
         // no variable param
         constexpr size_t paramNumber = zapi::stdext::CallableInfoTrait<CallableType>::argNum;
         if (!check_invoke_arguments(execute_data, return_value, paramNumber)) {
            return;
         }
         const size_t argNumber = ZEND_NUM_ARGS();
         zval arguments[argNumber];
         zend_get_parameters_array_ex(argNumber, arguments);
         InvokeParamGenerator generator(arguments);
         auto tuple = zapi::stdext::gen_tuple_with_type<paramNumber, CallableType>(generator);
         yield(return_value, zapi::stdext::apply(callable, tuple));
      } catch (Exception &exception) {
         zapi::kernel::process_exception(exception);
      }
   }
};

```
这个就是`zendAPI`对原生函数的派发的核心代码了，大致的意思其实并不复杂，首先我们是对参数进行收集，然后根据原生函数定义时候原型的参数个数生成一个同等数量的`tuple`对象，然后使用`apply`函数对我们注册的原生函数进行调用，并且将返回值保存到`return_value`中。
在这里我们简单介绍一下`zapi::stdext::apply`，这个函数其实就是`std::apply`，但是因为这个函数是`C++17`标准中才有的函数，我们依赖的`C++`标准是`C++11`，所以我们在这里自己实现了一个版本，这个函数跟`PHP`的`call_user_func_array`的用法是非常类似的。

> [std::apply 参考手册](http://en.cppreference.com/w/cpp/utility/apply)
> [call_user_func_array 参考手册](http://php.net/manual/en/function.call-user-func-array.php)

#### 有返回值，有可变参数
```cpp
﻿template <typename CallableType, CallableType callable>
class InvokeBridgePrivate <CallableType, callable, false, true, true>
{
public:
   static void invoke(zend_execute_data *execute_data, zval *return_value)
   {
      try {
         // variadic params
         constexpr size_t paramNumber = zapi::stdext::CallableInfoTrait<CallableType>::argNum;
         // for the first marker param
         if (!check_invoke_arguments(execute_data, return_value, paramNumber - 1)) {
            return;
         }
         const size_t argNumber = ZEND_NUM_ARGS();
         zval arguments[16];
         zend_get_parameters_array_ex(argNumber, arguments);
         // 15 arguments is enough ?
         auto tuple = zapi::stdext::gen_tuple<16>(
                  [&arguments, argNumber](size_t index){
            if (index == 0) {
               zval temp;
               ZVAL_LONG(&temp, static_cast<int32_t>(argNumber));
               return temp;
            } else if (index <= argNumber + 1){
               return arguments[index - 1];
            } else {
               zval temp;
               ZVAL_NULL(&temp);
               return temp;
            }
         });
         yield(return_value,  zapi::stdext::apply(callable, tuple));
      } catch (Exception &exception) {
         zapi::kernel::process_exception(exception);
      }
   }
};
```
其实大家仔细观察的话，您会发现跟无可变参数的情况其实是大同小异的，具体的差别在于参数的处理。因为我们这个时候处理的是可变参数，所以我们没有办法在编译时刻获取原生函数的参数的个数。
在这里我们采取一种折中的办法，就是我们假定每个函数都有15个参数，然后根据运行时`Zend Engine`传来的参数对这15个参数进行初始化设置，当然您会问如果可变参数的个数大于15个怎么办？我们当前没有好的处理办法，多于的参数会被忽略掉，其实这种情况很少出现，现实代码中很少有函数的参数个数大于15个的情况，所有影响不大。