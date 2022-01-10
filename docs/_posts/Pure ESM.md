---
title: Pure ESM
date: 2022-01-10 18:09:19
permalink: /pages/29b8e0/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
# Pure ESM

纯 esm 的包越来越多了，但是很多框架还没有跟上脚步。就会导致这些包没有办法使用，是彻底的没有办法使用。

## 解决办法

[参考这里](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

总结就是要不就是把我们自己的项目改造成 esm 项目，要不就不要升级这个 npm 包，一直待在低版本，直到我们的项目支持 esm 包为止。

如果我们的项目只是一个简单的项目，比如就是一个简单的 npm 工具。那么我们可以改造我们的项目。但是如果我们的项目是依赖框架的，但是这个框架目前还不支持纯 esm 包，那就没有办法了。

比如 midwayjs 和 oclif 是我遇到的有问题的两个框架。当前时间 2022-01-10。

## 有哪些纯 esm 包

[chalk](https://github.com/chalk/chalk/releases/tag/v5.0.0)

[execa](https://github.com/sindresorhus/execa/releases/tag/v6.0.0)

[p-limit](https://github.com/sindresorhus/p-limit/releases/tag/v4.0.0)

[yocto-queue](https://github.com/sindresorhus/yocto-queue/releases/tag/v1.0.0)

我才发现原来这些包都来自于 sindresorhus，果然是大佬，就是任性。不想支持 cjs 就不支持 cjs。
