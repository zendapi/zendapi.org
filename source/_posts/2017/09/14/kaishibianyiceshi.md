---
title: 小小里程碑，开始对主流平台进行编译测试
date: 2017-09-14 17:38:27
tags:
---
zendapi项目的爱好者大家好，谢谢大家对项目的关注，经过大概3个月的紧张开发，现在咱们的项目正式进入了一个小小的里程碑，正式进入主流平台的编译测试，详细计划如下：

**第一期测试我们的目标操作系统如下：(架构都为x86_64,不支持32位操作系统)**
1. openSUSE-Leap 42.3 
2. CentOS 7.0
3. ubuntu 16.04.3-desktop-amd64
4. debian-9.0.1-amd64
5. macOS Sierra 10.12.6

**编译器环境如下**
* gcc 7.1及其以上版本
* clang 3.9及其以上版本
* cmake 3.7.2及其以上版本

**php目标版本号**

php 7.1.5

编译选项如下
```
--prefix=/usr/local/php
--enable-embed=
--enable-maintainer-zts 
--with-tsrm-pthreads 
--enable-debug 
--with-config-file-path=/usr/local/etc/php 
--with-config-file-scan-dir=/usr/local/etc/php/conf.d/
```

好了，大家祝我好运吧，Let's go.