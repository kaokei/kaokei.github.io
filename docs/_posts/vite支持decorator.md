---
title: vite支持decorator
date: 2022-01-25 14:10:36
permalink: /pages/b11568/
sidebar: auto
categories:
  - 随笔
tags:
  - todo
---
## 官方态度

因为 vite 是强依赖 esbuild 的，而 esbuild 的最大特性就是速度快，所以也不愿意支持完整的 typescript type checker。

导致 vite 不能和 reflect-metadata 一起使用，比较有名的框架包括 typeorm，nestjs 等都不能很好的结合。

## walkaround

因为 vite 是依赖 esbuild 和 rollup 的，所以可以寻找相应的 esbuild 插件和 rollup 插件。

基本思路就是完全使用 swc/tsc 代替 esbuild。或者使用了装饰器的文件让 swc/tsc 处理，其他文件让 esbuild 来处理，这样速度更快。

## 遗憾

目前的在线 demo 网站，比如 codesandbox 和 stackblitz 基本都支持 vite 了，但是都还不支持 decorator。

## 参考文章

[极速 DX: Vite + Electron + esbuild](https://zhuanlan.zhihu.com/p/388168464)
[vite 项目支持 typescript 的 emitDecoratorMetadata 和 experimentalDecorators](https://my.oschina.net/linsk1998/blog/5135188)
[Support emitting typescript decorator metadata](https://github.com/evanw/esbuild/issues/257)
[decorators not support in js for prebuild](https://github.com/vitejs/vite/issues/2349)
[Ask for support of decortors in jsx! ](https://github.com/evanw/esbuild/issues/1392)
[How do i enable "@babel/plugin-proposal-decorators" with vite](https://stackoverflow.com/questions/66395054/how-do-i-enable-babel-plugin-proposal-decorators-with-vite)
[vite react 项目中使用装饰器 开启 decorators-legacy](https://zhuanlan.zhihu.com/p/417263788)
[Why can't reflect-metadata be used in vite](https://stackoverflow.com/questions/68570519/why-cant-reflect-metadata-be-used-in-vite)
[Reconsider about using swc as JS/TS transformer](https://github.com/vitejs/vite/issues/788)
