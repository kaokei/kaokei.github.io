---
title: circular_dependency
date: 2021-12-19 18:08:57
permalink: /pages/46748c/
sidebar: auto
categories: 
  - 随笔
  - 技术
tags: 
  - null
---

### 循环依赖

一般来讲循环依赖在不同的场景下有不同的含义。

举个例子：

小明眼睛看不见，小王腿走不了路。所以小明要看书时就需要小王来帮忙。小王要走路的时候就需要小明来帮忙。

这个例子中，可以很明显的看出来小明和小王之间是存在互相依赖的。但是这种互相依赖具体是不是循环依赖取决于具体的场景。

考虑这样的场景，就是循环依赖了。小明要看书，请求小王帮忙读书，小王说读书可以是可以，但是我一直坐在椅子上，没有力气读书，你背我走一走吧，小明说你先帮我读书，我再被你走路，小王说你先背我走路，我再帮你读书。

像这种同一时刻，两种资源同时互相依赖即可称为循环依赖。

再回归到 es6 中，在 es6 的模块定义的时候，一般“较少”有循环依赖的场景。但是互相依赖的场景则是非常常见的。

比如调用 A 模块中的 a 方法时，会调用 B 模块中的 b 方法。就算 b 方法再次调用 a 方法，只要这种循环调用会中止即可，这也只是互相依赖，而不是循环依赖。

上面说到的“较少”有循环依赖的场景。常见场景有这两个：

场景一：A extends B 同时 B extends A，即 extends 关键字会导致循环依赖。
场景二：@decorator(A) class B {} 同时 @decorator(B) class A {}。装饰器也是立即执行的，也会导致循环依赖。

### 对循环依赖的态度

业务中应该尽量避免循环依赖，如果实在避免不了，那么就需要仔细分析各个模块之间的依赖关系。需要手动解耦各个模块。使之变为互相依赖。

目前的 es6/babel/typescript 都不能直接帮我们解决这种循环依赖，但是应该有相应的提示信息辅助我们发现潜在的循环依赖。

### 关于循环依赖的讨论

看了半天，总结起来就是问题是客观存在的，只能具体问题具体分析。并不存在一劳永逸的方案。

[How to solve this basic ES6-module circular dependency problem?](https://esdiscuss.org/topic/how-to-solve-this-basic-es6-module-circular-dependency-problem)

[TypeScript needs to support circular references between classes in separate files.](https://github.com/Microsoft/TypeScript/issues/20361)

[Angular 2 Forward Reference](https://segmentfault.com/a/1190000008626276)

### 大佬怎么解决循环依赖的

我没能复现这种解决方案，感觉并不能解决问题

[How to fix nasty circular dependency issues once and for all in JavaScript & TypeScript](https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de)

[How to fix this ES6 module circular dependency?](https://stackoverflow.com/questions/38841469/how-to-fix-this-es6-module-circular-dependency)

[Known Limitation: Classes as identifiers and circular dependencies](https://github.com/inversify/InversifyJS/blob/master/wiki/classes_as_id.md#known-limitation-classes-as-identifiers-and-circular-dependencies)

[InversifyJS Circular dependencies](https://github.com/inversify/InversifyJS/blob/master/wiki/circular_dependencies.md)
