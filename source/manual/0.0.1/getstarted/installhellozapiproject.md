---
layout: manual
subtype: normal
title: 终于快完成了，安装测试我们的 hellozapi 扩展
---
大家看到这篇文章的时候证明您已经基本掌握了`zendAPI`开发`PHP`扩展的基本知识了，我们已经完成了`hellozapi`的扩展开发，如果您是使用`CMake`进行编译的话，那么恭喜您，您再最后运行下面的代码：
```cmake
sudo make install
```
您的扩展就安装到当前依赖的`PHP`的扩展目录下面了。
如果您使用的是自定义的编译方式，您可以在您的`Makefile`里面定义好安装的目录。如果您不知道安装目录是什么，不用急，您可以这样获取。
首先找到您的`php-config`脚本，比如我的这个脚本的路径是：`/usr/local/php-7.1.5/bin/php-config`, 然后输入如下命令：
```shell
/usr/local/php-7.1.5/bin/php-config --extension-dir
```
如果没有出错，我获取了如下的输出：
```shell
/usr/local/php-7.1.5/lib/php/extensions/debug-zts-20160303
```
如果权限什么的都正确话，一个名为`hellozapi.so`的扩展就在扩展目录里面了。
打开您的`php.ini`文件，然后输入：
```ini
extension=hellozapi.so
```
在命令行中输入：
```shell
/usr/local/php-7.1.5/bin/php -m
```
如果一个名叫`hellozapi`的名字在输出中，那么恭喜您，我们的扩展就已经成功被`PHP`运行时正常加载了。 
Enjoy yourself！