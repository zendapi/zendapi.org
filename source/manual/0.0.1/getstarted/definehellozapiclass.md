---
layout: manual
subtype: normal
title: 来一点更高级的试试，定义我们的第一个原生 Class
---
说到 `Class` 大家是不是首先就想到两个字？复杂？哈哈，有这种想法其实真的很正常，因为在面向对象这个领域不得不说的就是类，随便一想就有以下的知识点：
1. 字段定义
2. 方法定义
3. 父类
4. 继承
5. 访问控制
6. 多态

一想头就大，用 `PHP` 实现这些都挺麻烦的，更别是用 `C++` 去实现了，如果大家使用过原生的 `PHP` 扩展开发技术去定义个类，应该就知道我说的意思了，但是还是那句话，在 `zendAPI` 中实现一个 `Class` 真的不复杂，当然我说特别简单那是骗子。
考虑到咱们是新手入门教程，我们在本篇教程只实现一个简单的类的定义，没有继承，不实现接口，没有魔术方法，方法不使用引用传参数也没有可变参数。
我们在本文中要实现的原生类原型用 `PHP` 描述大概是这样的：
```php
<?php
class Person
{
    protected $name;
    protected $age;
    protected $address;
    public function __construct($name, $age, $address)
    {
        $this->name = $name;
        $this->age = $age;
        $this->address = $address;
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    public function setAge($age)
    {
        $this->age = $age;
    }
    public function setAddress($address)
    {
        $this->address = $address;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getAge()
    {
        return $this->age;
    }
    public function getAddress()
    {
        return $this->address;
    }
}
```
总的看来这个类很简单，很适合我们进行演示。下面我们对我们即将使用的一些关于定义原生类的知识点进行简单的解说，学习完这些知识点之后，有助于我们理解实现原生类的代码。

#### 实现原生类涉及的知识点

#### zapi::lang::StdClass

在 `zendAPI` 中，当我们给 `PHP` 空间定义一个类的时候，您自己定义的 `C++` 类必须继承自 `zapi::lang::StdClass`, 这个类定义了很多以跟 `PHP` 空间同名的魔术函数供您使用。
比如:

1. void __destruct() const;
2. void __unset(const std::string &key);
3. Variant __invoke(Parameters &params) const;

使用范例:
```cpp
#include "zapi/lang/StdClass.h"

class SomeCustomCls : public zapi::lang::StdClass
{};

```

> [zapi::lang::StdClass 参考手册](http://www.zendapi.org/api/classzapi_1_1lang_1_1_std_class.html)

#### zapi::lang::Class
在 `zendAPI` 项目里面我们用 `zapi::lang::Class` 去描述一个 `PHP` 类的元信息，比如类的名字，有哪些字段有什么方法，是否 `final` 等等信息。基本上 `zapi::lang::Class` 有你实现 `PHP` 的类所需要的一切。

使用范例: (定义一个名叫 `SomeCustomCls` 的 `PHP` 类的元信息对象)
```cpp
#include "zapi/lang/StdClass.h"

class SomeCustomCls : public zapi::lang::StdClass
{};
﻿zapi::lang::Class<SomeCustomCls> someCustomCls("SomeCustomCls");
```

> [zapi::lang::Class 参考手册](http://www.zendapi.org/api/classzapi_1_1lang_1_1_class.html)

#### zapi::lang::Extension::registerClass
我们主要使用这个接口将类注册到 `zend engine` 中，`registerClass` 是一个模板函数，接受各种自定义类型的原生类的对象。
使用范例: (假设 `ext` 是 `zapi::lang::Extension` 类型的对象，`someCustomCls` 是 `﻿zapi::lang::Class<SomeCustomCls>` 类型的对象)
```cpp
﻿zapi::lang::Class<SomeCustomCls> someCustomCls("SomeCustomCls");
ext.registerClass(someCustomCls);
```
> [zapi::lang::Extension::registerClass 参考手册](http://www.zendapi.org/api/classzapi_1_1lang_1_1_extension.html#1a0694f7f433033831dce669f02ede49ea)

背景知识介绍完毕现在我们开始定义我们的 `Person` 类。

#### 第一步，定义 `C++` 原生类

声明原生类结构
```cpp
﻿#include "zapi/ZendApi.h"
#include <string>

using zapi::ds::Variant;
using zapi::ds::NumericVariant;
using zapi::ds::StringVariant;

﻿class Person : public zapi::lang::StdClass
{
public:
   void __construct(const StringVariant &name, const NumericVariant &age, 
                    const StringVariant &address);
   void setName(const StringVariant &name);
   void setAge(const NumericVariant &age);
   void setAddress(const StringVariant &address);
   Variant getName();
   Variant getAge();
   Variant getAddress();
protected:
   int m_age;
   std::string m_name;
   std::string m_address;
};
```

实现原生类方法
```cpp
﻿#include "defs.h"

﻿void Person::__construct(const zapi::ds::StringVariant &name, 
                         const zapi::ds::NumericVariant &age, 
                         const zapi::ds::StringVariant &address)
{
   m_name = name.toString();
   m_age = age.toLong();
   m_address = address.toString();
}

void Person::setName(const zapi::ds::StringVariant &name)
{
   m_name = name.toString();
}

void Person::setAge(const zapi::ds::NumericVariant &age)
{
   m_age = age.toLong();
}

void Person::setAddress(const zapi::ds::StringVariant &address)
{
   m_address = address.toString();
}

Variant Person::getName()
{
   return m_name;
}

Variant Person::getAge()
{
   return m_age;
}

Variant Person::getAddress()
{
   return m_address;
}

```
到这里我们的原生类就实现完了，除了继承自 `zapi::lang::StdClass` 没有什么不一样的。

#### 第二步, 实例化 `zapi::lang::Class` 对象，注册原生方法
为了节省篇幅，这里我们假设这个代码段定义在 `﻿get_module` 函数体里，如果没有印象了，请点击
> [定义模块入口](/manual/0.0.1/getstarted/definehellozapientry.html)

```cpp
Class<Person> personClass("Person");
personClass.registerMethod<decltype(&Person::__construct), &Person::__construct>
  ("__construct", {
     ValueArgument("name", Type::String),
        ValueArgument("age", Type::Long),
        ValueArgument("address", Type::String)
  });
personClass.registerMethod<decltype(&Person::setName), &Person::setName>
  ("setName", {
     ValueArgument("name", Type::String)
  });
personClass.registerMethod<decltype(&Person::setAge), &Person::setAge>
  ("setAge", {
     ValueArgument("age", Type::Long)
  });
personClass.registerMethod<decltype(&Person::setAddress), &Person::setAddress>
  ("setAddress", {
     ValueArgument("address", Type::String)
  });
personClass.registerMethod<decltype(&Person::getName), &Person::getName>("getName");
personClass.registerMethod<decltype(&Person::getAge), &Person::getName>("getAge");
personClass.registerMethod<decltype(&Person::getAddress), &Person::getName>("getAddress");
```
在这里我就不解释注册方法的使用了，基本上跟我们上一篇中注册函数是一样的，大家找找规律就能看懂了。

#### 第三步, 将 `zapi::lang::Class` 对象注册到扩展中
```cpp
hellozapi.registerClass(personClass);
```
到这里我们就完整实现了我们的 `Person` 原生类，现在让我们在 `PHP` 代码中使用我们的 `Person` 类吧。

```php
<?php
if (class_exists("Person")) {
    echo "Person class exists\n";
    $p1 = new Person("xiaomi", 22, "beijing");
    $p2 = new Person("xiaohong", 27, "shanghai");
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
// you will output
// xiaomi
// 22
// beijing
// xiaohong
// 27
// shanghai
// zzu_softboy
// 33
```