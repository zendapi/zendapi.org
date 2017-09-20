---
layout: manual
subtype: normal
title: 版本库分支标准说明
---

zendAPI 的 git 分支模型借鉴 llvm 的分支模型

分为以下分支
1. master 分支
2. devel 分支
3. branch 大特性分支
3. release 标签

### master 分支职责
这个分支主要是保存经过严格测试的代码，不做开发分支使用，这个分支不接受 pull request 请求。

### devel 分支说明
日常的开发都提交到这个分支，当提交达到一个版本发布的时候，这个分支将会把自己合并到 master 分支。

### 大特性分支
当 master 上面的特性积累到可以发布一个新的版本的时候我们会从 master 分支上 checkout 一个 branch 分支，比如 zapi-1_2-branch。

### release 分支说明
当生成一个大特性分支之后，这个分支进入维护状态，每当有bug修复和安全漏洞修复的时候，我们会在大特性分支上搭上 release 标签，例如 zapi-1_2_2-release。

**目前这个为草案，可能以后会进行相应的调整。**