---
title: zendAPI 项目是什么以及存在的意义
date: 2017-10-08 14:08:50
tags:
---
<img style="width:400px; height: 100px; margin-bottom:30px;" src="/statics/images/zendapi.svg" />

#### 项目的使命：
**让 PHP 扩展开发成为一种享受**

#### 项目的简介：
zendAPI 是对 Zend Engine 的 C 接口使用 C++ 的最新标准 C++11 进行而面向对象的封装，从而屏蔽了底层 Zend Engine API 的接口复杂性，加快开发 PHP 扩展的效率。从而让 PHP 的扩展开发成为一种享受，不用在考虑不同 PHP 版本带来的差异性，彻底将开发者从 Zend Engine 底层接口的细节中解放出来，让开发者专注于自身的业务逻辑。

#### 项目结构图：
{% asset_img zendAPIstructure.png This is an example image %}
</br>

#### zendAPI 的特性：

1. 完全面向对象，对 Zend Engine API 进行二次定义
2. 使用现代的 C++11 语法进行开发，便于维护
3. 最大化屏蔽 PHP 版本对扩展开发的影响，zendAPI 将对 Zend Engine API 不同版本带来的差异屏蔽掉
4. 高覆盖的单元测试，保证代码质量
5. 在封装的时候，尽最大能力保证性能
6. 致力于项目库的二进制兼容