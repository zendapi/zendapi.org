---
layout: manual
subtype: normal
title: zendAPI 的 CMake 参数详解
---
zendAPI 是采用 CMake 进行编译的，我们在项目中定义了一些 CMake 的函数，变量和选项，下面我们在这篇文章中对这些进行详细的说明，有助于节省大家的时间。

### CMake 内置重要变量
### CMAKE_INSTALL_PREFIX
类型：字符串
默认值：`/usr/local`
描述：编译完成之后，软件包安装的路径

### CMAKE_BUILD_TYPE
类型：字符串
默认值：空字符串
描述：控制软件编译的类型，可能的取值：
1. Debug 调试模式，开发的时候指定
2. Release 发布模式，发布软件包的时候指定
3. RelWithDebInfo
4. MinSizeRel

### BUILD_SHARED_LIBS
类型：布尔型
默认值：无
描述：指定为 `ON` 的时候，项目中的库默认编译成动态链接库，除非特定的库重新指定了这个选项。

### CMAKE_CXX_FLAGS
类型：字符串
默认值：无
描述：这个变量的值将会传递给 `C++` 编译器, 比如 `-std=c++11` 等等参数。

### 自定义选项 (option)
#### ZAPI_OPT_ENABLE_TESTS
类型：布尔型
默认值：`OFF`
描述：控制 `zendAPI` 是否编译单元测试，如果值为 `ON` 则开启，`OFF` 则关闭。

#### ZAPI_OPT_ENABLE_VERBOSE_DEBUG
类型：布尔型
默认值：`OFF`
描述：控制 `zendAPI` 是否输出一些调试信息，这个选项只在 `Debug` 模式下指定，在其他模式下请设置为 `OFF`。

#### ZAPI_OPT_PHPCFG_PATH
类型：字符串
默认值：无
描述：当我们开发的时候 `PHP` 的安装路径没有在标准的路径下，`zendAPI` 的编译系统可能探测不到您的 `php-config` 脚本， 这个时候您可以将您的自定义的 `php-config` 脚本路径指定到这个变量。
例如我们编译的 `PHP` 版本是 `7.1.5`, 我们的安装路径可能指定为 `/usr/local/php-7.1.5/bin/php-config`, 那么我们可以在 `CMake` 命令行指定 `cmake -DZAPI_OPT_PHPCFG_PATH=/usr/local/php-7.1.5/bin/php-config`。

### 高级
以下的文档如果不是研究 `zendAPI` 源码就不需要了解。
### 自定义选项 (option)
等待完善 ... 

### 自定义变量
等待完善 ... 

### 自定义函数
等待完善 ... 