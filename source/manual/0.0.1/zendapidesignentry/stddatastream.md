---
layout: manual
subtype: normal
title: 标准数据输出流说明文档
---
为了在我们的扩展开发方便进行数据输出，我们定义了`zapi::kernel::StreamBuffer`对`Zend Engine`的输入输出进行封装，提供一种面向对象的使用方式，类的声明如下：
```cpp
﻿class ZAPI_DECL_EXPORT StreamBuffer : public std::streambuf
{
public:
   StreamBuffer(int error);
   StreamBuffer(const StreamBuffer &buffer) = delete;
   StreamBuffer(StreamBuffer &&buffer) = delete;
   StreamBuffer &operator=(const StreamBuffer &buffer) = delete;
   StreamBuffer &operator=(StreamBuffer &&buffer) = delete;
   virtual ~StreamBuffer();
protected:
   virtual int overflow(int c = EOF) override;
   virtual int sync() override;
   
private:
   int m_error;
   std::array<char, 1024> m_buffer{};
   static std::mutex m_mutex;
};
```
然后我们根据`PHP`的错误等级定义了几个全局`StreamBuffer`的实例对象：
```cpp
﻿StreamBuffer bufferOut(0);
StreamBuffer bufferError(E_ERROR);
StreamBuffer bufferWarning(E_WARNING);
StreamBuffer bufferNotice(E_NOTICE);
StreamBuffer bufferDeprecated(E_DEPRECATED);
```
然后我们对这几个流对象进行标准输出流的封装：
```cpp
﻿std::ostream out(&bufferOut);
std::ostream error(&bufferError);
std::ostream warning(&bufferWarning);
std::ostream notice(&bufferNotice);
std::ostream deprecated(&bufferDeprecated);
```
这样我们就可以在我们的扩展开发中愉快的按照`C++`的输出流的操作方式进行数据输出了，例如：
```cpp
zapi::out << "some message info" << std::endl;
zapi::error << "some fata error message" << std::endl;
zapi::warning << "some warning message" << std::endl;
zapi::notice << "some notice message" << std::endl;
zapi::deprecated << "some deprecated message" << std::endl;
```
> [zapi::kernel::StreamBuffer 编程手册](/api/classzapi_1_1kernel_1_1_stream_buffer.html)

Enjoy it!
到本篇文章，zendAPI 设计解析序列文章完成，感谢您的阅读。
