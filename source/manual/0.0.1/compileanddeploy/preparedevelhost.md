---
layout: manual
subtype: normal
title: 开发环境构建
---

### 操作系统
对于开发友好的操作系统，我们首先推荐 MacOS 操作系统，首先 MacOS 是 Unix 环境对开发者非常友好，另外是图形界面非常稳定。
其次如果想用 GNU/Linux 操作系统作为开发环境，推荐使用最新版的 openSUSE/Ubuntu/deepin 等图形用户接口友好的操作系统。

### PHP 环境编译
在开发 zendAPI 项目时候，我们没有使用 PHP 其他的扩展，所以我们编译的时候使用的是默认的选项，zendAPI 单元测试需要内置使用 embed SAPI，同时为了避免不必要的麻烦，我们开启了线程安全选项。

MacOS 平台 PHP 编译选项

```
--prefix=/usr/local/php-7.1.5 
--enable-embed=dylib 
--enable-maintainer-zts 
--with-tsrm-pthreads 
--enable-debug 
--with-config-file-path=/usr/local/php-7.1.5/etc/ 
--with-config-file-scan-dir=/usr/local/php-7.1.5/etc/conf.d/
```

Linux 平台 PHP 编译选项

```
--prefix=/usr/local/php-7.1.5 
--enable-embed=shared 
--enable-maintainer-zts 
--with-tsrm-pthreads 
--enable-debug 
--with-config-file-path=/usr/local/php-7.1.5/etc/ 
--with-config-file-scan-dir=/usr/local/php-7.1.5/etc/conf.d/
```