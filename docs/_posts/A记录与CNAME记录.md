---
title: A记录与CNAME记录
date: 2022-01-10 17:10:12
permalink: /pages/51372a/
sidebar: auto
categories:
  - 随笔
tags:
  - todo
---
# A 记录与 CNAME 记录

不管是 A 记录，还是 CNAME 记录，都只是 DNS 解析域名到实际 IP 的一种方式。

对于 A 记录就是简单的关联域名和 ip 地址。

对于 CNAME 记录，则是关联域名 1 和域名 2。当访问域名 1 时，会通过域名 2 来解析实际 ip 地址。
注意这里的域名 2 也有可能是一个 CNAME 记录。

## 为什么我不能 CNAME 到百度

我已经有一个域名，然后期望把`baidu.mydomain.com`CNAME 到`www.baidu.com`这个域名。结果并不能正常访问。

这是因为 CNAME 只是负责域名到 ip 的解析过程。我们确实可以通过以上配置把`baidu.mydomain.com`解析到百度服务器的某个 ip 上了。但是这个服务器肯定不会允许人任意域名访问的。

有过 nginx 配置经验的，都知道 nginx 中有一个配置项是`server_name`，就是指定域名才能访问特定资源。

因为我们的域名肯定不在 baidu 的 nginx 配置文件中，所以就会返回 403/404 了。

对应的关于 vercel 和 github-page 也是同样的道理。
都需要做两件事，一件事是配置 dns 层的 CNAME 记录，另一件事就是配置域名白名单，其实就是把我们的域名加到对应的 nginx 配置文件中。
