---
layout: manual
subtype: normal
title: 编译 zendAPI
---

操作系统我们假定是类 `unix` 操作系统，采用非源码文件夹编译。

#### 创建工作目录

```
cd ~/
mkdir workspace
cd workspace
mkdir build-zendapi
```
#### 获取源码
您可以直接 `clone` 指定的分支，比如 `master` 分支。到目前为止 `zendAPI` 发布了一个版本 `zapi-0.0.2-snapshot`。
```
git clone https://github.com/qcoreteam/zendapi.git zendapidevel
git checkout master
```

#### 默认参数编译
如果您的 `PHP` 安装在标准路径，可以用下面的命令进行编译
```
cd build-zendapi
cmake ../zendapidevel
```
如果您想安装到特定的路径，可以使用下面的命名进行编译
```
cd build-zendapi
cmake -DCMAKE_INSTALL_PREFIX=/usr/local/zapi ../zendapidevel
```

如果您的 `PHP` 没有安装在标准路径，假定您安装在 `/usr/local/php-7.1.5` 目录下，那么您可以使用下面的命令进行编译
```
cd build-zendapi
cmake -DZAPI_OPT_PHP_ROOT_PATH=/usr/local/php-7.1.5 ../zendapidevel
```
如果您想给编译器指定额外的选项参数，比如您想用 `c++14` 标准进行编译，您可以使用下面的命令进行编译
```
cd build-zendapi
cmake -DCMAKE_CXX_FLAGS="-std=c++14" ../zendapidevel
```
如果您想使用特定版本的编译器进行编译，比如我自己，我自己编译了 `clang 3.5`， 按照路径为 `/usr/local/llvm-3.5/bin/clang++`，这个路径没有在 `PATH` 环境变量里面，那么我们可以使用下面的命令进行编译
```
cd build-zendapi
cmake -DCMAKE_C_COMPILER=/usr/local/llvm-3.5/bin/clang \
      -DCMAKE_CXX_COMPILER=/usr/local/llvm-3.5/bin/clang++ ../zendapidevel
```

现在我假定在我本机使用如下命令进行编译, `PHP` 安装在 `/usr/local/php7/`, 操作系统为 `MacOS`
```
cmake -DCMAKE_C_COMPILER=/usr/local/bin/gcc-6 \
      -DCMAKE_CXX_COMPILER=/usr/local/bin/g++-6 -DCMAKE_BUILD_TYPE=Debug ../zendapidevel
```
如果一切正常的话，您将看到如下的结果
```
-- --------------------------------------------------------------------------------------
-- Thank for using zendAPI project, have a lot of fun!
-- --------------------------------------------------------------------------------------
-- ZAPI_VERSION: 0.0.1-devel
-- PHP_INCLUDE_PATH: /usr/local/php7/include
-- PHP_LIB_PATH: /usr/local/php7/lib/libphp7.dylib
-- PHP_EXECUTABLE: /usr/local/php7/bin/php
-- PHP_CONFIG_EXECUABLE: /usr/local/php7/bin/php-config
-- CMAKE_BUILD_TYPE: Debug
-- CMAKE_BINARY_DIR: ~/workspace/build-zendapi
-- CMAKE_CURRENT_BINARY_DIR: ~/workspace/build-zendapi
-- CMAKE_SOURCE_DIR: ~/workspace/zendapidevel
-- PROJECT_BINARY_DIR: ~/workspace/build-zendapi
-- PROJECT_SOURCE_DIR: ~/workspace/zendapidevel
-- CMAKE_MODULE_PATH: ~/workspace/zendapidevel/cmake/modules
-- CMAKE_COMMAND: /usr/local/Cellar/cmake/3.7.2/bin/cmake
-- CMAKE_INSTALL_PREFIX: /usr/local
-- CMAKE_ROOT: /usr/local/Cellar/cmake/3.7.2/share/cmake
-- CMAKE_SYSTEM: Darwin-16.7.0
-- CMAKE_SYSTEM_NAME: Darwin
-- CMAKE_SYSTEM_VERSION: 16.7.0
-- CMAKE_SYSTEM_PROCESSOR: x86_64
-- CMAKE_SKIP_RPATH: NO
-- CMAKE_VERBOSE_MAKEFILE: FALSE
-- CMAKE_CXX_COMPILER: /usr/local/bin/g++-6
-- CMAKE_CXX_COMPILER_VERSION: 6.4.0
-- CMAKE_CXX_FLAGS: -Wa,-q -Wno-macro-redefined -Wno-deprecated-declarations
-- CMAKE_AR: /usr/bin/ar
-- CMAKE_RANLIB: /usr/bin/ranlib
-- --------------------------------------------------------------------------------------
-- Configuring done
-- Generating done
-- Build files have been written to: ~/workspace/build-zendapi
```
如果有错误，您可以根据具体的错误信息进行排查，如果不能解决，您可以到我们的 segmentfault 技术圈进行交流讨论
如果没有错误输入一下命名进行编译, `-j` 指定编译进程数，根据 `CPU` 线程数定
```
make -j 8
```
如果整个编译过程没有错误的话，您将看到如下的输出，如果有错误，麻烦您通知我们
```
[100%] Linking CXX shared library ../lib/libzapi.dylib
[100%] Built target zapi
```
最后输入以下命令进行安装
```
make install
```
安装完成后您将看到如下输出
```
Install the project...
-- Install configuration: "Debug"
-- Installing: /usr/local/lib/cmake/zendapi/ZendApiConfig.cmake
-- Installing: /usr/local/lib/cmake/zendapi/ZendApiConfigVersion.cmake
-- Installing: /usr/local/include/zapi
-- Installing: /usr/local/include/zapi/CompilerDetection.h
-- Installing: /usr/local/include/zapi/ds
-- Installing: /usr/local/include/zapi/ds/ArrayItemProxy.h
-- Installing: /usr/local/include/zapi/ds/ArrayVariant.h
-- Installing: /usr/local/include/zapi/ds/BoolVariant.h
-- Installing: /usr/local/include/zapi/ds/CallableVariant.h
-- Installing: /usr/local/include/zapi/ds/DoubleVariant.h
-- Installing: /usr/local/include/zapi/ds/internal
-- Installing: /usr/local/include/zapi/ds/internal/ArrayItemProxyPrivate.h
-- Installing: /usr/local/include/zapi/ds/internal/VariantPrivate.h
-- Installing: /usr/local/include/zapi/ds/NumericVariant.h
-- Installing: /usr/local/include/zapi/ds/ObjectVariant.h
-- Installing: /usr/local/include/zapi/ds/StringVariant.h
-- Installing: /usr/local/include/zapi/ds/Variant.h
-- Installing: /usr/local/include/zapi/Global.h
-- Installing: /usr/local/include/zapi/kernel
-- Installing: /usr/local/include/zapi/kernel/Exception.h
-- Installing: /usr/local/include/zapi/kernel/FatalError.h
-- Installing: /usr/local/include/zapi/kernel/Meta.h
-- Installing: /usr/local/include/zapi/kernel/NotImplemented.h
-- Installing: /usr/local/include/zapi/kernel/OrigException.h
-- Installing: /usr/local/include/zapi/kernel/StreamBuffer.h
-- Installing: /usr/local/include/zapi/lang
-- Installing: /usr/local/include/zapi/lang/Argument.h
-- Installing: /usr/local/include/zapi/lang/Class.h
-- Installing: /usr/local/include/zapi/lang/Constant.h
-- Installing: /usr/local/include/zapi/lang/Extension.h
-- Installing: /usr/local/include/zapi/lang/Function.h
-- Installing: /usr/local/include/zapi/lang/Ini.h
-- Installing: /usr/local/include/zapi/lang/Interface.h
-- Installing: /usr/local/include/zapi/lang/internal
-- Installing: /usr/local/include/zapi/lang/internal/ExtensionPrivate.h
-- Installing: /usr/local/include/zapi/lang/internal/NamespacePrivate.h
-- Installing: /usr/local/include/zapi/lang/internal/StdClassPrivate.h
-- Installing: /usr/local/include/zapi/lang/Method.h
-- Installing: /usr/local/include/zapi/lang/Namespace.h
-- Installing: /usr/local/include/zapi/lang/Parameters.h
-- Installing: /usr/local/include/zapi/lang/StdClass.h
-- Installing: /usr/local/include/zapi/lang/Type.h
-- Installing: /usr/local/include/zapi/PhpHeaders.h
-- Installing: /usr/local/include/zapi/ProcessorDetection.h
-- Installing: /usr/local/include/zapi/protocol
-- Installing: /usr/local/include/zapi/protocol/AbstractIterator.h
-- Installing: /usr/local/include/zapi/protocol/ArrayAccess.h
-- Installing: /usr/local/include/zapi/protocol/Countable.h
-- Installing: /usr/local/include/zapi/protocol/Interfaces.h
-- Installing: /usr/local/include/zapi/protocol/Serializable.h
-- Installing: /usr/local/include/zapi/protocol/Traversable.h
-- Installing: /usr/local/include/zapi/stdext
-- Installing: /usr/local/include/zapi/stdext/Functional.h
-- Installing: /usr/local/include/zapi/stdext/internal
-- Installing: /usr/local/include/zapi/stdext/internal/FunctionalPrivate.h
-- Installing: /usr/local/include/zapi/stdext/internal/TuplePrivate.h
-- Installing: /usr/local/include/zapi/stdext/Tuple.h
-- Installing: /usr/local/include/zapi/stdext/TypeTraits.h
-- Installing: /usr/local/include/zapi/SystemDetection.h
-- Installing: /usr/local/include/zapi/Typedefs.h
-- Installing: /usr/local/include/zapi/utils
-- Installing: /usr/local/include/zapi/utils/CommonFuncs.h
-- Installing: /usr/local/include/zapi/utils/PhpFuncs.h
-- Installing: /usr/local/include/zapi/Version.h.in
-- Installing: /usr/local/include/zapi/vm
-- Installing: /usr/local/include/zapi/vm/AbstractClass.h
-- Installing: /usr/local/include/zapi/vm/AbstractMember.h
-- Installing: /usr/local/include/zapi/vm/BoolMember.h
-- Installing: /usr/local/include/zapi/vm/Callable.h
-- Installing: /usr/local/include/zapi/vm/Closure.h
-- Installing: /usr/local/include/zapi/vm/Engine.h
-- Installing: /usr/local/include/zapi/vm/ExecStateGuard.h
-- Installing: /usr/local/include/zapi/vm/FloatMember.h
-- Installing: /usr/local/include/zapi/vm/internal
-- Installing: /usr/local/include/zapi/vm/internal/AbstractClassPrivate.h
-- Installing: /usr/local/include/zapi/vm/internal/AbstractMemberPrivate.h
-- Installing: /usr/local/include/zapi/vm/internal/CallablePrivate.h
-- Installing: /usr/local/include/zapi/vm/InvokeBridge.h
-- Installing: /usr/local/include/zapi/vm/IteratorBridge.h
-- Installing: /usr/local/include/zapi/vm/NullMember.h
-- Installing: /usr/local/include/zapi/vm/NumericMember.h
-- Installing: /usr/local/include/zapi/vm/ObjectBinder.h
-- Installing: /usr/local/include/zapi/vm/Property.h
-- Installing: /usr/local/include/zapi/vm/StringMember.h
-- Installing: /usr/local/include/zapi/vm/ZValMember.h
-- Installing: /usr/local/include/zapi/ZendApi.h
-- Installing: /usr/local/lib/libzapi.0.0.1.dylib
-- Installing: /usr/local/lib/libzapi.0.dylib
-- Installing: /usr/local/lib/libzapi.dylib
-- Installing: /usr/local/lib/cmake/zendapi/ZendApiTargets.cmake
-- Installing: /usr/local/lib/cmake/zendapi/ZendApiTargets-debug.cmake
```

到此我们整个安装过程就结束了， Have a lot of fun。