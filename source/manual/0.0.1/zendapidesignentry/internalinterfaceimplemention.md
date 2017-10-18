---
layout: manual
subtype: normal
title: PHP 内部相关常用接口实现文档
---
在`PHP`语言规范中，有一些约定的接口的定义，总结下来大概有下面几种：

1. 序列化和反序列化接口
2. 可数接口(`counable`)
3. 对象的数组运算符(`[]`)接口
4. 自定义类的比较大小接口
5. 自定义类的类型转换接口
6. 针对`var_dump`函数的类的`__﻿debuginfo`接口
7. 应用在`foreach`语言结构中的迭代器

下面我们就详细的说说每种情况：

#### 序列化和反序列化接口

我们在`PHP`脚本中定义的类，实例化之后得到的对象我们都可以通过`PHP`内置接口`serialize`进行序列化和`serialize`进行反序列化。那么我们的自定义原生类怎么提供相应的接口定义呢？
首先在我们的原生类必须实现实现接口`zapi::protocol::﻿Serializable`，比如:
```cpp
std::string MagicMethodClass::serialize()
{
   zapi::out << "MagicMethodClass::serialize is called" << std::endl;
   return "serialize data";
}

void MagicMethodClass::unserialize(const char *input, size_t size)
{
   zapi::out << "MagicMethodClass::unserialize is called" << std::endl;
   zapi::out << "serialize data : " << input << std::endl;
}
```
先后`zendAPI`在初始化自身的时候在方法`﻿AbstractClassPrivate::initialize`中的代码:
```cpp
﻿if (m_apiPtr->serializable()) {
    entry.serialize = &AbstractClassPrivate::serialize;
    entry.unserialize = &AbstractClassPrivate::unserialize;
}
```
在这里，我们的代码通过元信息定义类的`serializable`方法对原生类进行判断，判断其是否实现了`zapi::protocol::﻿Serializable`接口，其中的判断细节大家可以查阅相关源代码。如果实现了相关的接口，我们相应设置`﻿zend_class_entry`的如下字段：
1. zend_class_entry.serialize
`Zend Engine`内部序列化接口，类型是函数指针，将原生类的实例传递给`serialize`函数时候，由`Zend Engine`进行调用。
2. zend_class_entry.unserialize
`Zend Engine`内部反序列化接口，类型是函数指针，将由`serialize`返回的字符串传递给`unserialize`函数时候，由`Zend Engine`进行调用。

下面我们分析下`AbstractClassPrivate::serialize`方法和`AbstractClassPrivate::unserialize`方法的源码：
```cpp
﻿int AbstractClassPrivate::serialize(zval *object, unsigned char **buffer, 
                                    size_t *bufLength, zend_serialize_data *data)
{
   Serializable *serializable = dynamic_cast<Serializable *>
        (ObjectBinder::retrieveSelfPtr(object)->getNativeObject());
   try {
      std::string value = serializable->serialize();
      *buffer = reinterpret_cast<unsigned char *>(estrndup(value.c_str(), value.length()));
      *bufLength = value.length();
   } catch (Exception &exception) {
      process_exception(exception);
      return ZAPI_FAILURE;
   }
   return ZAPI_SUCCESS;
}

int AbstractClassPrivate::unserialize(zval *object, zend_class_entry *entry, 
                                      const unsigned char *buffer,
                                      size_t bufLength, zend_unserialize_data *data)
{
   object_init_ex(object, entry);
   Serializable *serializable = dynamic_cast<Serializable *>
        (ObjectBinder::retrieveSelfPtr(object)->getNativeObject());
   try {
      serializable->unserialize(reinterpret_cast<const char *>(buffer), bufLength);
   } catch (Exception &exception) {
      php_error_docref(NULL, E_NOTICE, "Error while unserializing");
      return ZAPI_FAILURE;
   }
   return ZAPI_SUCCESS;
}
```
这两个函数主体过程差不多，结构很相似，基本的过程大致是这样通过`ObjectBinder`获取原生类对象的指针然后使用`dynamic_cast`把其转换成`Serializable`类型的指针。
序列化情况：调用`serializable->serialize();`然后将结果通过指针`*buffer`返回，长度通过`*bufLength`返回。
反序列话情况：调用`serializable->unserialize(reinterpret_cast<const char *>(buffer), bufLength);`这个时候`Zend Engine`会将序列化时候返回的字符串数据和长度当成参数传进这个函数。
如果在调用接口方法时候如果抛出异常，`Zend Engine`会抛出`Fata Error`。

> [zapi::protocol::Serializable 编程手册](/api/classzapi_1_1protocol_1_1_serializable.html)

#### 可数接口

当我们在`PHP`脚本中定义的类的时候，我们继承`\Countable`然后实现`public function count();`接口方法之后，我们就可以把这个类实例化的对象传递到`count`函数，进行对象的计数功能了。
在`zendAPI`项目中我们如何为我们的原生类提供同样的功能呢？其实是很简单的，在使用上其实跟原生的`PHP`方式一样，我们在定义原生类的时候只需要继承`zapi::protocol::﻿Countable`接口，然后实现`﻿virtual zapi_long count() = 0;`接口方法就可以了。
那么您可能要问，`zendAPI`内部是如何处理的呢？现在我就为大家介绍：
首先我们先说一下: `﻿_zend_object_handlers.﻿count_elements`字段，这个字段是一个函数指针，定义如下：
```cpp
﻿typedef int (*zend_object_count_elements_t)(zval *object, zend_long *count);
```
在我们在`PHP`脚本中调用`count`函数的时候，`Zend Engine`最终会调用这个函数指针。在我们的初始化代码中我们把这个函数指针设置成了`AbstractClassPrivate::countElements`。
```cpp
﻿ m_handlers.count_elements = &AbstractClassPrivate::countElements;
```
现在我们详细介绍下`AbstractClassPrivate::countElements`函数，这个是`zendAPI`处理可数接口的核心：
```cpp
﻿int AbstractClassPrivate::countElements(zval *object, zend_long *count)
{
   Countable *countable = dynamic_cast<Countable *>
        (ObjectBinder::retrieveSelfPtr(object)->getNativeObject());
   if (countable) {
      try {
         *count = countable->count();
         return ZAPI_SUCCESS;
      } catch (Exception &exception) {
         process_exception(exception);
         return ZAPI_FAILURE;
      }
   } else {
      if (!std_object_handlers.count_elements) {
         return ZAPI_FAILURE;
      }
      return std_object_handlers.count_elements(object, count);
   }
}
```
这个方法通过`ObjectBinder`获取原生类对象的指针，然后将这个指针转换成`Countable *`指针，然后调用`countable->count();`方法把结果通过方法的参数`zend_long *count`传递给`Zend Engine`。

> [zapi::protocol::Countable 编程手册](/api/classzapi_1_1protocol_1_1_countable.html)

#### 对象的数组运算符([])接口

当我们定义一个类的时候，我们有时候希望使用`[]`数组运算符进行数据的访问，修改和删除等操作。在语言规范中规定实现`\ArrayAccess`接口，这个接口有如下几个方法：
1. abstract public boolean offsetExists (mixed $offset)
2. abstract public mixed offsetGet (mixed $offset)
3. abstract public void offsetSet (mixed $offset, mixed $value)
4. abstract public void offsetUnset (mixed $offset)

实现了上面几个方法，我们就可以将特定类的对象实例传递给函数:
1. isset() 调用 offsetExists 方法
2. unset() 调用 offsetUnset 方法

然后实现如下的数组方式使用:
```php
<?php
class obj implements arrayaccess {
    private $container = array();
    public function __construct() {
        $this->container = array(
            "one"   => 1,
            "two"   => 2,
            "three" => 3,
        );
    }
    public function offsetSet($offset, $value) {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }
    public function offsetExists($offset) {
        return isset($this->container[$offset]);
    }
    public function offsetUnset($offset) {
        unset($this->container[$offset]);
    }
    public function offsetGet($offset) {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
}

$obj = new obj;

var_dump(isset($obj["two"]));
var_dump($obj["two"]);
unset($obj["two"]);
var_dump(isset($obj["two"]));
$obj["two"] = "A value";
var_dump($obj["two"]);
$obj[] = 'Append 1';
$obj[] = 'Append 2';
$obj[] = 'Append 3';
print_r($obj);
?>
```
说完了`PHP`领域中的使用，下面我们说说`zendAPI`项目中是如何实现的细节：
首先我们在定义原生类的时候实现`zapi::protocol::ArrayAccess`接口, 比如：
```cpp
﻿bool IterateTestClass::offsetExists(Variant offset)
{
   auto begin = m_items.begin();
   auto end = m_items.end();
   std::string key = StringVariant(std::move(offset)).toString();
   while (begin != end) {
      if (begin->first == key) {
         return true;
      }
      begin++;
   }
   return false;
}

void IterateTestClass::offsetSet(Variant offset, Variant value)
{
   auto begin = m_items.begin();
   auto end = m_items.end();
   std::string key = StringVariant(std::move(offset)).toString();
   while (begin != end) {
      if (begin->first == key) {
         begin->second = StringVariant(std::move(value)).toString();
         return;
      }
      begin++;
   }
}

Variant IterateTestClass::offsetGet(Variant offset)
{
   auto begin = m_items.begin();
   auto end = m_items.end();
   std::string key = StringVariant(std::move(offset)).toString();
   while (begin != end) {
      if (begin->first == key) {
         return begin->second;
      }
      begin++;
   }
   return nullptr;
}

void IterateTestClass::offsetUnset(Variant offset)
{
   auto begin = m_items.begin();
   auto end = m_items.end();
   std::string key = StringVariant(std::move(offset)).toString();
   while (begin != end) {
      if (begin->first == key) {
         break;
      }
      begin++;
   }
   if (begin != end) {
      m_items.erase(begin);
   }
   
}
```
说完接口的定义，下面我们介绍一下`﻿_zend_object_handlers`中的如下几个字段：

1. zend_object_read_dimension_t read_dimension;
函数指针类型，当相关原生类对象通过数组运算符访问数据的时候，`Zend Engine`会调用这个函数指针。
2. zend_object_write_dimension_t write_dimension;
函数指针类型，当相关原生类对象通过数组运算符设置数据的时候，`Zend Engine`会调用这个函数指针。
3. zend_object_has_dimension_t has_dimension;
函数指针类型，当相关原生类对象传递给`isset`函数的时候，`Zend Engine`会调用这个函数指针。
4. zend_object_unset_dimension_t unset_dimension;
函数指针类型，当相关原生类对象传递给`unnset`函数的时候，`Zend Engine`会调用这个函数指针。

在`zendAPI`初始化的时候，系统会把这个几个字段初始化成`zendAPI`中自定义的方法指针：
```cpp
﻿m_handlers.write_dimension = &AbstractClassPrivate::writeDimension;
m_handlers.read_dimension = &AbstractClassPrivate::readDimension;
m_handlers.has_dimension = &AbstractClassPrivate::hasDimension;
m_handlers.unset_dimension = &AbstractClassPrivate::unsetDimension;
```
这四个接口方法主体的代码都差不多，我们以`AbstractClassPrivate::readDimension;`代码为例来讲解：
```cpp
﻿zval *AbstractClassPrivate::readDimension(zval *object, zval *offset, 
                                          int type, zval *returnValue)
{
   ArrayAccess *arrayAccess = dynamic_cast<ArrayAccess *>
        (ObjectBinder::retrieveSelfPtr(object)->getNativeObject());
   if (arrayAccess) {
      try {
         return toZval(arrayAccess->offsetGet(offset), type, returnValue);
      } catch (Exception &exception) {
         process_exception(exception);
         return nullptr;
      }
   } else {
      if (std_object_handlers.read_dimension) {
         return nullptr;
      } else {
         return std_object_handlers.read_dimension(object, offset, type, returnValue);
      }
   }
}
```
在这里我们首先通过`ObjectBinder`获取原生类对象指针，然后将这个指针转换成`ArrayAccess *`指针，最后调用`arrayAccess->offsetGet(offset)`并将相关结果返回给`Zend Engine`。假如相关接口方法抛出异常，我们将调用`Zend Engine`内置的`﻿std_object_handlers.read_dimension`函数。
其余几个方法跟这个方法结构差不多，大家可以自行去研究相关的代码。

> [zapi::protocol::ArrayAccess 编程手册](/api/classzapi_1_1protocol_1_1_array_access.html)

#### 自定义类的比较大小接口

比较大小不是数值类型和字符串类型的专利，自定义类也可以实现相互比较，比如特定自定义类的两个对象实例可以进行自定义的比较大小语义，跟`C++`的运算符重载比较类似。
要在`zendAPI`中实现这个功能很简单，在您编写原生类定义的时候实现`﻿__compare`方法就可以了，比如这个例子：
```cpp
﻿int MagicMethodClass::__compare(const MagicMethodClass &object) const
{
   zapi::out << "MagicMethodClass::__compare is called" << std::endl;
   if (m_length < object.m_length) {
      return -1;
   } else if (m_length == object.m_length) {
      return 0;
   } else {
      return 1;
   }
}
```
下面我们开始介绍`zendAPI`内部实现：
要实现这个特性我们依赖了`﻿_zend_object_handlers`结构的`﻿zend_object_compare_t compare_objects;`字段，在`Zend Engine`执行了原生类的比较大小的语句，会调用这个字段设置的函数指针。
在初始化过程中`zendAPI`对这个字段进行了如下设置：
```cpp
﻿m_handlers.compare_objects = &AbstractClassPrivate::compare;
```
现在我们详细看看`AbstractClassPrivate::compare`方法：
```cpp
﻿int AbstractClassPrivate::compare(zval *left, zval *right)
{
   try {
      zend_class_entry *entry = Z_OBJCE_P(left);
      if (entry != Z_OBJCE_P(right)) {
         throw NotImplemented();
      }
      AbstractClassPrivate *selfPtr = retrieve_acp_ptr_from_cls_entry(entry);
      AbstractClass *meta = selfPtr->m_apiPtr;
      StdClass *leftNativeObject = ObjectBinder::retrieveSelfPtr(left)->getNativeObject();
      StdClass *rightNativeObject = ObjectBinder::retrieveSelfPtr(right)->getNativeObject();
      return meta->callCompare(leftNativeObject, rightNativeObject);
   } catch (const NotImplemented &exception) {
      if (!std_object_handlers.compare_objects) {
         return 1;
      }
      return std_object_handlers.compare_objects(left, right);
   } catch (Exception &exception) {
      // a Exception was thrown by the extension __compare function,
      // pass this on to user space
      process_exception(exception);
      return 1;
   }
}

```
在上面代码中，我们首先判断两个对象实例的类是否一样，如果不一样就抛出异常，然后通过`ObjectBinder`分别获取需要比较的两个原生类对象的实例指针，然后通用原生类元信息描述类`callCompare`方法进行比较，最后将比较结果返回给`Zend Engine`。
原生类元信息描述类的`callCompare`是一个模板函数，在里面我们调用了我们在原生类中定义的`__compare`函数进行自定义比较逻辑：
```cpp
template <typename T>
int Class<T>::callCompare(StdClass *left, StdClass *right) const
{
   T *leftNativeObject = static_cast<T *>(left);
   T *rightNativeObject = static_cast<T *>(right);
   return leftNativeObject->__compare(*rightNativeObject);
}
```
*注意：在 PHP 里面我们的自定义对象实例的比较大小，参与比较的对象的类型必须一样。*

> [zapi::lang::StdClass::__compare 编程手册](/api/classzapi_1_1lang_1_1_std_class.html#1a60368096a858f62238c479f69d3d809f)

#### 自定义类的类型转换接口

有的时候我们相对一个类的对象实例进行数据转换，比如转换成字符串，整型或者布尔类型等等。这个看起来很复杂，其实不然，只要您在定义原生类的时候实现如下的接口方法就可以了:
1. __toString 向字符串转换时候调用的方法
2. __toInteger 向整型转换时候调用的方法
3. __toDouble 向浮点型转换时候调用的方法
4. __toBool 向布尔型转换的时候调用的方法

比如下面这个例子：
```cpp
﻿Variant MagicMethodClass::__toString() const
{
   zapi::out << "MagicMethodClass::__toString is called" << std::endl;
   return "hello, zapi";
}

Variant MagicMethodClass::__toInteger() const
{
   zapi::out << "MagicMethodClass::__toInteger is called" << std::endl;
   return 2017;
}

Variant MagicMethodClass::__toDouble() const
{
   zapi::out << "MagicMethodClass::__toDouble is called" << std::endl;
   return 3.14;
}

Variant MagicMethodClass::__toBool() const
{
   zapi::out << "MagicMethodClass::__toBool is called" << std::endl;
   return true;
}
```
下面介绍`zendAPI`内部是怎么进行实现类型转换的机制。
首先我们介绍`﻿_zend_object_handlers`的`﻿zend_object_cast_t cast_object;`字段，这个是一个函数指针，当`Zend Engine`执行到类型转换相关的`OP Code`的时候会调用这个函数所指定的函数。
在`zendAPI`初始化的时候针对这个字段进行了如下的设置：
```cpp
﻿m_handlers.cast_object = &AbstractClassPrivate::cast;
```
我们现在看看`AbstractClassPrivate::cast`代码：
```cpp
﻿int AbstractClassPrivate::cast(zval *object, zval *retValue, int type)
{
   ObjectBinder *objectBinder = ObjectBinder::retrieveSelfPtr(object);
   AbstractClassPrivate *selfPtr = retrieve_acp_ptr_from_cls_entry(Z_OBJCE_P(object));
   AbstractClass *meta = selfPtr->m_apiPtr;
   StdClass *nativeObject = objectBinder->getNativeObject();
   try {
      zval temp;
      switch (static_cast<Type>(type)) {
      case Type::Numeric:
         temp = meta->castToInteger(nativeObject).detach(false);
         break;
      case Type::Double:
         temp = meta->castToDouble(nativeObject).detach(false);
         break;
      case Type::Boolean:
         temp = meta->castToBool(nativeObject).detach(false);
         break;
      case Type::String:
         temp = meta->castToString(nativeObject).detach(false);
         break;
      default:
         throw NotImplemented();
         break;
      }
      ZVAL_COPY(retValue, &temp);
      return ZAPI_SUCCESS;
   } catch (const NotImplemented &exception) {
      if (!std_object_handlers.cast_object) {
         return ZAPI_FAILURE;
      }
      return std_object_handlers.cast_object(object, retValue, type);
   } catch (Exception &exception) {
      process_exception(exception);
      return ZAPI_FAILURE;
   }
}
```
这个代码看着很复杂，其实内在逻辑很简单，通过`ObjectBinder`获取原生类对象的实例指针，同时获取特定的原生类元信息描述类然后根据需要转化的类型调用相关的转换函数，最后把转换后的结果返回给`Zend Engine`。
支持的类型有如下的类型：
1. Type::Numeric 对应 __toInteger
2. Type::Double 对应 __toDouble
3. Type::Boolean 对应 __toBool
4. Type::String 对应 __toString

> [zapi::lang::StdClass::__toInteger 编程手册](/api/classzapi_1_1lang_1_1_std_class.html#1a3ec4774babe619aab4fc8eae3bf80846)
> [zapi::lang::StdClass::__toDouble 编程手册](/api/classzapi_1_1lang_1_1_std_class.html#1abbb4ca67b787d9fa4af97b944dd5dae6)
> [zapi::lang::StdClass::__toBool 编程手册](/api/classzapi_1_1lang_1_1_std_class.html#1ac75d4c845203606a386f60fad4feea95)
> [zapi::lang::StdClass::__toString 编程手册](/api/classzapi_1_1lang_1_1_std_class.html#1a04eacfd027c404b287961377b90004e4)

#### 针对 var_dump 函数的类的 __debuginfo 接口

大家在日常的一些简单的调试的时候是不是经常使用`var_dump`函数进行变量的信息输出了，比如常见的数据类型。但是我们怎么针对我们的原生类对象实例做`var_dump`的自定义调试信息输出呢？
跟上面几种接口的使用其实是一样的，要实现自定义的信息输出，我们只需要在定义原生类的时候实现`__debuginfo`接口就可以了。
例如下面的代码：
```cpp
﻿ArrayVariant MagicMethodClass::__debugInfo() const
{
   ArrayVariant info;
   info.insert("name", "zapi");
   info.insert("address", "beijing");
   return info;
}
```
下面我们解释一下`﻿_zend_object_handlers`的`﻿zend_object_get_debug_info_t get_debug_info;`字段，这个字段是一个函数指针，当我们将一个原生类实例对象传入`var_dump`函数的时候，`Zend Engine`会调用这个函数指着所指的函数。
在初始化的时候这个指针被如下代码初始化：
```cpp
﻿m_handlers.get_debug_info = &AbstractClassPrivate::debugInfo;
```
下面我们来看看`AbstractClassPrivate::debugInfo`：
```cpp
﻿HashTable *AbstractClassPrivate::debugInfo(zval *object, int *isTemp)
{
   try {
      ObjectBinder *objectBinder = ObjectBinder::retrieveSelfPtr(object);
      AbstractClassPrivate *selfPtr = retrieve_acp_ptr_from_cls_entry(Z_OBJCE_P(object));
      AbstractClass *meta = selfPtr->m_apiPtr;
      StdClass *nativeObject = objectBinder->getNativeObject();
      zval infoZval = meta->callDebugInfo(nativeObject).detach(true);
      *isTemp = 1;
      return Z_ARR(infoZval);
   } catch (const NotImplemented &exception) {
      if (!std_object_handlers.get_debug_info) {
         return nullptr;
      }
      return std_object_handlers.get_debug_info(object, isTemp);
   } catch (Exception &exception) {
      process_exception(exception);
      // this statement will never execute
      return nullptr;
   }
}
```
代码主要的步骤首先通过`ObjectBinder`获取原生类对象的实例指针和对应的元信息描述类的对象实例指针然后调用元信息描述对象的`callDebugInfo`方法，将方法返回的数组返回给`Zend Engine`。如果抛出`NotImplemented`异常的话，系统还会尝试调用`std_object_handlers.get_debug_info`函数指针进行数据获取。

> [zapi::lang::StdClass::__debuginfo 编程手册](/api/classzapi_1_1lang_1_1_std_class.html#1a683628bc3a7710cc8281194fc1628e27)

#### 应用在 foreach 语言结构中的迭代器
在`PHP`编程中`foreach`循环应该用的是相当多的，比如迭代数组，获取键跟值。下面我们讲讲怎么让我们自定义的原生类也支持`foreach`语言结构。
首先在定义原生类的时候需要实现`zapi::protocol::﻿Traversable`接口。
```cpp
﻿class ZAPI_DECL_EXPORT Traversable
{
public:
   virtual AbstractIterator *getIterator() = 0;
};
```
`Zend Engine`在执行`foreach`的时候如果原生类实现了这个接口`Zend Engine`通过`getIterator`方法获取一个`AbstractIterator`类型的迭代器，一般而言我们原生类会同时继承`zapi::protocol::AbstractIterator`抽象类。
```cpp
﻿class ZAPI_DECL_EXPORT AbstractIterator
{
public:
   AbstractIterator(StdClass *nativeObject);
   virtual ~AbstractIterator();
   
   virtual bool valid() = 0;
   virtual Variant current() = 0;
   virtual Variant key() = 0;
   virtual void next() = 0;
   virtual void rewind() = 0;
   
protected:
   ZAPI_DECLARE_PRIVATE(AbstractIterator)
   std::unique_ptr<AbstractIteratorPrivate> m_implPtr;
};
```
> [zapi::protocol::AbstractIterator 编程手册](/api/classzapi_1_1protocol_1_1_abstract_iterator.html)
> [zapi::protocol::Traversable 编程手册](/api/classzapi_1_1protocol_1_1_traversable.html)

为了便于解释，我直接上一个例子:
#### C++ 类声明代码
```cpp
﻿class IterateTestClass : 
      public StdClass, 
      public zapi::protocol::Traversable, 
      public zapi::protocol::AbstractIterator,
{
   using IteratorType = std::vector<std::pair<std::string, std::string>>::iterator;
public:
   IterateTestClass();
   virtual AbstractIterator *getIterator();
   virtual bool valid();
   virtual Variant current();
   virtual Variant key();
   virtual void next();
   virtual void rewind();
   
   virtual ~IterateTestClass();
protected:
   // save iterator object
   std::shared_ptr<AbstractIterator> m_iterator;
   IteratorType m_currentIter;
   std::vector<std::pair<std::string, std::string>> m_items;
};
```

#### C++ 类定义代码
```cpp
﻿IterateTestClass::IterateTestClass()
   : AbstractIterator(this)
{
   m_items.push_back(std::make_pair<std::string, std::string>("key1", "value1"));
   m_items.push_back(std::make_pair<std::string, std::string>("key2", "value2"));
   m_items.push_back(std::make_pair<std::string, std::string>("key3", "value3"));
   m_items.push_back(std::make_pair<std::string, std::string>("key4", "value4"));
   m_currentIter = m_items.begin();
}

void AbstractTestClass::normalMethod()
{
   
}

AbstractIterator *IterateTestClass::getIterator()
{
   return this;
}

bool IterateTestClass::valid()
{
   zapi::out << "IterateTestClass::valid called" << std::endl;
   return m_currentIter != m_items.end();
}

Variant IterateTestClass::current()
{
   zapi::out << "IterateTestClass::current called" << std::endl;
   return m_currentIter->second;
}

Variant IterateTestClass::key()
{
   zapi::out << "IterateTestClass::key called" << std::endl;
   return m_currentIter->first;
}

void IterateTestClass::next()
{
   zapi::out << "IterateTestClass::next called" << std::endl;
   m_currentIter++;
}

void IterateTestClass::rewind()
{
   zapi::out << "IterateTestClass::rewind called" << std::endl;
   m_currentIter = m_items.begin();
}
```
然后我们就可以在`PHP`脚本中的`foreach`语言结构中使用原生类实例对象了，是不是也不是很复杂啊？
```php
<?php
﻿$data = new IterateTestClass();
foreach ($data as $key => $value) {
    echo "key: $key value: $value\n";
}
```
下面我们介绍下`zendAPI`是怎么实现这个迭代功能的。
在初始化原生类元信息描述类的时候有这样一段代码：
```cpp
﻿if (m_apiPtr->traversable()) {
    entry.get_iterator = &AbstractClassPrivate::getIterator;
    entry.iterator_funcs.funcs = IteratorBridge::getIteratorFuncs();
}   
```
这个代码首先是判断原生类时候实现了`zapi::protocol::Traversable`接口，如果实现了相关的接口，则对`﻿_zend_class_entry.get_iterator`和`﻿_zend_class_entry.iterator_funcs.funcs`两个字段进行设置。
1. _zend_class_entry.get_iterator
函数指针类型，当特定的原生类对象实例被`foreach`迭代的时候由`Zend Engine`进行调用, 然后将需要被迭代的对象返回给`Zend Engine`。
2. _zend_class_entry.iterator_funcs.funcs
在这个字段保存了所有`Zend Engine`在迭代过程中需要调用的所有的函数指针，下面我们再详细介绍。

现在我们看看`IteratorBridge::getIteratorFuncs`方法：
```cpp
﻿zend_object_iterator_funcs *IteratorBridge::getIteratorFuncs()
{
   static zend_object_iterator_funcs funcs;
   static bool initialized = false;
   if (initialized) {
      return &funcs;
   }
   funcs.dtor = &IteratorBridge::destructor;
   funcs.valid = &IteratorBridge::valid;
   funcs.get_current_data = &IteratorBridge::current;
   funcs.get_current_key = &IteratorBridge::key;
   funcs.move_forward = &IteratorBridge::next;
   funcs.rewind = &IteratorBridge::rewind;
   funcs.invalidate_current = &IteratorBridge::invalidate;
   initialized = true;
   return &funcs;   
}
```
在这个方法里面，我们针对性的将`Zend Engine`完成自定义迭代的函数指针接口都设置成了`IteratorBridge`类的对应的方法，这样的话当迭代进行的时候，请求首先会到`IteratorBridge`类中。
`IteratorBridge`里面的类都很简单，只是将相关请求派发到我们定义的`zapi::protocol::AbstractIterator`迭代器对象相应的方法中，比如`IteratorBridge::key`:
```cpp
﻿Variant IteratorBridge::key()
{
   return m_userspaceIterator->key();
}
```
其余的方法详细的实现代码，如果大家有兴趣可以自行查阅相关源码。
