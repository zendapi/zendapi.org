---
title: Hello world, zendAPI 项目官方网站正式上线
date: 2017-06-26 10:03:32
tags:
---

经过紧张的开发，我们的 zendAPI 官网正式的与大家见面了，后续的开发动态和项目的文档，我们都会同步的更新到网站上，谢谢大家的支持。

zendAPI 的官网网站的源码托管在 : [zendAPI official Site](https://www.github.com/zendapi/zendapi.org)

下面我将介绍下我们官网开发使用的一些开源项目：
* Hexo 静态博客生成器
* React 框架
* UiKit 前端框架
* Webpack 打包工具
* Doxygen C++文档生成器

我们详细介绍下每一种技术在我们的网站制作中承担的任务

### Hexo 静态博客生成器
感谢 [Hexo.io](http://www.hexo.io) 项目研发团队为我们带来这么好用的博客生成器，官网主要是基于 Hexo 进行二次开发，在其基础之上我们实现了 zendAPI 自己的一套风格。
在开发过程中我们遇到的问题是 Hexo 本身是为博客而生成的，将其改造成一个官网的时候还是下了一点功夫。

### React 框架

为了让我们的网站后续维护简单，我使用 react 框架对整个网站进行了组件化设计，通过 webpack 进行编译生成 Hexo 所识别的 ejs 模板文件，采用 Hexo 静态生成数据写在网页中，react 进行读取然后渲染出来， 让 react 跟 Hexo 完美的结合在一起。

### UiKit 前端框架

首先我是一个后端开发工程师，我不是产品也不是设计也不是前端，所以我没有从零开始打造这个网站，而是经过了一些调研，在比较各种前端框架之后最终选择了 Uikit，这个框框非常轻量级，清爽的风格我很喜欢，我们整个网站界面就是基于它进行实现。
详情大家可以访问 Uikit 的官方网站：https://getuikit.com/ 

### Webpack 打包工具

我们在开发网站的时候，后端采用了 Hexo 引擎， 但是我不是很喜欢 Ejs 的嵌套方式，感觉很乱，所以采用了 Rect 作为前端渲染框架，顺便我们就使用了 webpack 对整个前端页面进行打包，事实证明选择是对的，webpack 解决了很多不必要的麻烦，让维护更简单。

### Doxygen C++ 文档生成器
Doxygen 是一个非常优秀的 C++ 文档生成器， 众所周知 C++ 的文法规则是相当复杂的，但是 Doxygen 识别的准确性还是相当高的，在我们官网中他主要承担的角色就是 zendAPI 的 api 栏目的生成。

为了与网站的整体风格做到和谐统一，我们没有使用 Doxygen 原本的 html 生成器，而是基于 xml 生成结果二次开发，根据 Doxygen 生成的 xml 文件，然后将数据进行解析之后暴露给 Hexo 博客生成器， 利用 Hexo 进行页面的生成，结果显示两者工作的非常完美，详情可以访问 [文档中心](http://www.zendapi.com/api) 进行体验。

但是在我们使用 Doxygen 过程中发现它其实在生成 xml 的时候有一些信息已经被探测出来了，但是没有在最终的 xml 中进行体现出来，针对这种情况我对 Doxygen 进行了二次修改，当然只是针对 zendAPI 项目有用的一些修改。修改之后的源码存放在 Github: [zendAPI Doxygen](https://www.github.com/zendapi/doxygen) 里面。