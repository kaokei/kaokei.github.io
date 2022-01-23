---
title: toke和cookie
date: 2022-01-07 10:24:08
permalink: /pages/fff5cd/
sidebar: auto
categories:
  - 随笔
tags:
  - todo
---

# token 和 cookie

## 不关心安全

无脑选择 jwt token。直接把 token 存储在 localstorage 中即可。

虽然会放大 xss 攻击的危害。但是都已经假设网站存在 xss 攻击了，危害又能小多少？

最大的优点是可以在不同的域名之间传递 token，使用方便。

最大的缺点时不够安全，主要是会放大 xss 攻击的危害。

一般使用 jwt token 不会直接只是使用 jwt token，因为 jwt token 还有一个缺点是不能在服务器端销毁。所以一般需要配合 refresh token 来实现服务器端销毁。

## 关心安全

选择普通 cookie 机制，设置 cookie 中的 cookieId 为 http-only,secure,same-site。

http-only 强制该 cookieId 不能被 js 读取。

secure 强制只能在 https 中使用该 cookie。

same-site 可以避免 csrf 攻击。但是对于低版本浏览器需要采用另一种方案 csrf-token。

最大的缺点是不能在不同的域名之间共享 cookieId。

另一种缺点就是服务器端消费 token 时强制指定从 header 中的 Authorization 字段获取。此时的 cookie 就无能为力了。

## 不建议的方案

第一种就是把 jwt token 写入到 cookie 中，虽然可以享受到 cookie 在安全方面的利益，但是损失了 jwt token 本身的便利性，关键是前端不能读取 cookie 中的 token，也就不能使用 jwt token 中的数据。这种使用方案本质上就是一个 cookieId。

第二种方案我称之为大聪明方案，就是把 jwt 的 refresh token 放到 cookie 中，然后每次刷新页面都会请求接口获取 access token，然后把 access token 存储在内存中。
因为没有持久化，所以刷新页面会丢失 access token。打开一个新页面和新的 tab 页面也会丢失 access token。导致每次都会通过 refresh token 获取新的 access token。
以上都没有问题。关键的问题时不能增加想象中的额外的安全性。因为只要网站存在 xss 漏洞，虽然不能读取 refresh token。但是只要调用一下接口，就能获取 access token。
这样就和把 access token 存储在 localstorage 中没有区别了。
我并不是完全反对这种方案，实际上我是反对这种方案标榜的安全性。我们完全可以把 refresh token 放到 cookie 中，然后把 access token 直接存储在 localstorage 中。分成两个 token 的好处就是缩短了 token 的有效期。比如本来设置 token 的有效期为 7 天，那么就只能等到 7 天后 token 才能失效，因为 token 本身是无状态的。但是分成两个 token 后，refresh token 还是 7 天有效期。但是每次获取的 access token 的有效期可以设置为 10 分钟，这样每隔 10 分钟，都需要通过 refresh token 获取新的 access token。此时需要校验该 refresh token 的有效性，因为 refresh token 是有状态的，服务器端可以设置改 refresh token 为无效 token，这样就算 token 还没有过期，也是无效 token。这样就达到一个效果就是把原来 7 天的有效期缩短到 10 分钟了。

## jwt 适用场景

适用于 server-to-server 类型的服务。比如我们开发了一套 api，想对外提供服务，那么可以采用 jwt token 和 refresh token 机制。

适用于移动端 app 中的接口，因为移动端 app 可以把 token 存储在移动端内部，而不依赖 localstorage。

## 服务器端让 jwt token 失效

除了采用 refresh token 和 access token 这种方案以外，还可以采用黑名单机制。正常的 cookieId 可以理解为白名单机制，每次判断这个 cookieId 是不是合法的 cookieId 时，都需要从 redis 中查询一次，只有查询到数据就说明这个 cookieId 是合法的。

类似的道理，当需要废弃一个 jwt token 时，我们可以把这个 token 假如到 redis 中作为黑名单。这样每次判断一个 jwt token 是否合法时，除了判断 token 本身是否合法以外，还需要去黑名单中查询一次。如果黑名单中有这个 token，那么就返回 token 已失效。

当然黑名单中的 token 生存时间至少要比 jwt token 剩余时间要长，简单一点可以直接统一设置为 token 的有效期。

## 参考文档

[Is it safe to store a JWT in localStorage with ReactJS?](https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs)

[Auth0 Token Storage](https://auth0.com/docs/security/data-security/token-storage#don-t-store-tokens-in-local-storage)

[大聪明方案](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id)

[same site 属性解释](https://dev.to/gkoniaris/how-to-securely-store-jwt-tokens-51cf)

[JWT authentication: Best practices and when to use it](https://blog.logrocket.com/jwt-authentication-best-practices/#tl-dr-what-are-they-good-for)

[中肯的建议](https://www.ducktypelabs.com/is-localstorage-bad/)
