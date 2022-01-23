---
title: 通过api获取npm包的所有版本
date: 2022-01-14 11:30:27
permalink: /pages/942cef/
sidebar: auto
categories:
  - 随笔
tags:
  - todo
---
如果是官方的 npm 仓库，可以直接使用 npm.io 提供的 api。

这里研究的是私有仓库，是通过 Verdaccio 搭建的。

首先能想到的是通过命令行来获取相关数据。

```bash
npm view @someScope/packageName versions --json
```

但是不太喜欢命令行这种方式，猜测应该是存在相应的 rest api。最终发现是这个 API。

```
https://private.registry.com/@someScope/packageName
```

当然对于私有包，需要设置 token 来获取数据，注意这里的 token 并不是我们在仓库的官方网站登录后产生的 token。而是在命令行中`npm login`之后产生的 token，会存储在~/.npmrc 文件中。

```
需要设置https header
authorization: 'Bearer abcdefg123123123123123123123123123'
```

以上拿就是最终的结论，下面再记录一下调查过程。

首先我想到的是抓包来看看当我执行 npm view 命令时，到底发送了什么 api 请求，这样不就立即搞定了吗？

以前了解到的抓包都是代理抓包，但是我不知道怎么设置终端的代理。

后来调研到可以使用 httpry，ngrep，wireshark。但是都有一个问题就是不能分析 https 的包，就连请求的 URL 都看不见。本来以为不看数据体也行，至少要能看看请求头。最终抓包这个方案行不通。

没有办法，只能去看 npm view 的源代码。分析如下：

npm 源代码仓库是[这里](https://github.com/npm/cli)。

`npm view`文件再`lib/commands/view.js`，猜测应该是执行的`exec`方法，然后调用的是`getData`方法，然后关键的是`packument`方法。

注意到 packument 来源于`pacote`这个 npm 包，所以下载它的[源代码](https://github.com/npm/pacote)。

查看 pacote 的入口文件 index.js，其中 packument 方法依赖 get 方法，get 方法来源`fetcher.js`文件。

fetcher.js 文件中猜测应该走的是`RegistryFetcher`这个分支。然后看`registry.js`这个文件。终于找到了我们需要的`packument`方法，我们可以在这里打印`this.packumentUrl`，就能知道实际访问的 api 接口了。

继续观察到其中`packument`方法依赖`fetch`方法，本以为这个 fetch 方法就是常用的 fetch 方法，后来发现居然是专用的一个 npm 包`npm-registry-fetch`。

同样的下载[npm-registry-fetch](https://github.com/npm/npm-registry-fetch)，这里就是一个默认导出，主要是注意到其中的`pickRegistry`和`getHeaders`。

分析这两个方法并打印日志，就可以观察到实际使用的是`~/.npmrc`文件中的 token 作为授权 token，需要注意增加`Bearer`前缀。
