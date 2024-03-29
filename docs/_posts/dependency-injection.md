---
author: kaokei
title: 依赖注入
date: 2021-12-19 16:52:54
permalink: /pages/6bada4/
sidebar: auto
categories: 
  - 随笔
  - 技术
tags: 
  - todo
---

## 什么是依赖注入

关于依赖注入的概念可以参考 Angular 的文档，[Angular 中的依赖注入](https://angular.cn/guide/dependency-injection)。

首先不得不提到的一点是什么是依赖注入，我在网上搜索了很多文章，专业术语也有很多，看的我迷迷糊糊的。我尝试记录一下我自己的理解。

首先从名字入手，依赖注入可以分成依赖和注入。

#### 什么是依赖？

在讨论依赖之前，必须先了解什么是服务，不考虑边界情况下，可以把服务理解为数据和方法的集合，即一个对象既包含数据又包含方法就可以称为为服务。

一般我们会通过实例化一个类来得到这个对象。我们可以想象的到这个类的某个实例属性有可能又是另一个类的实例对象。这个过程可以一直进行下去。比如这样的依赖关系图：

```
A --> B、C、D
B --> C、D
C --> D、E
D --> E、F
E --> F
F 没有依赖
```

上面的依赖图代表 A 这个类有三个实例属性`b、c、d`分别是`B、C、D`这三个类的实例对象。意味着`A`类是依赖`B、C、D`这 3 个类的。
而`B`类又是依赖`C、D`这两个类的。依次类推我们可以知道`C、D、E`这三个类的依赖，注意到`F`类是没有依赖的。

具体从类的角度来讲，可以在 2 个地方来描述这种依赖关系。
第 1 个地方是在实例属性上声明该属性是另一个类的实例。
第 2 个地方就是在类的构造函数中声明参数是某个类的实例属性。
示例代码如下：

```ts
import { Injectable } from "@kaokei/use-vue-service";

@Injectable()
export class LoggerService {
  public log(...msg: any[]) {
    console.log("from logger service ==>", ...msg);
  }
}

@Injectable()
export class CountService {
  public count = 0; // 该属性是普通属性，不是依赖

  @Inject(LoggerService)
  public logger!: LoggerService; // 该属性是依赖

  constructor(
    private logger2: LoggerService // 该参数是依赖
  ) {}

  public addOne() {
    this.count++;
    this.logger.log("from logger addOne ==> ", this.count);
    this.logger2.log("from logger2 addOne ==> ", this.count);
  }
}
```

#### 什么是注入呢？

在谈论注入之前，我们先来看看，如果没有依赖注入框架，我们怎么实例化 CountService 呢？

显然在我们调用构造函数之前，我们需要提前准备好参数。即`const logger = new LoggerService();`。

然后就可以调用构造函数了，`const countService = new CountService(logger);`。此时我们就完成了 CountService 的实例化。

但是似乎还有一个缺陷，就是现在这个实例仍然缺少一个实例属性`logger`。最简单的解决办法就是`countService.logger = logger;`。

这样我们终于完成了全部的实例化过程。注意到这里我们复用了`logger`对象。即 logger 属性和 logger2 属性指向了同一个对象。

这个例子只是演示实例化过程。实际业务中应该很少会有两个属性指向同一个对象。

其实无意中我们已经介绍了两种注入服务的方式的手动实现版本，即`构造函数参数注入`和`属性注入`。

这里再顺嘴提一句还存在另一种注入方式，就是`setter注入`，简单介绍就是在类中定义一个方法，在方法内设置属性值。然后再调用该方法。类似这样：`countService.setLogger(logger);`。在有些依赖注入框架中优先建议使用`setter注入`，而不建议使用`属性注入`。不过本库只是实现了`属性注入`，而不支持`setter注入`。

书归正传，上面详细介绍了`依赖注入`的手动实现过程。那么依赖注入框架的作用就是把上面的过程自动化。

通过依赖注入框架，我们可以这样来获取 countService 实例对象。

```ts
const countService = useService(CountService);
```

和上面的手动的实例化过程对比，是不是发现这样写的代码就简单多了，这就是依赖注入框架的魅力，实际上依赖关系越复杂，依赖注入框架的优势就越明显。

这里再多嘴说一句，从上面的分析来看，useService 这个函数是用来获取实例的，但却不一定是必须的。

比如在 angular 中，就不需要这样一个函数来获取实例。因为 angular 应用中组件的形式只能是类，在这个组件类中就可以直接使用@Inject 来注入服务了。

但是在 Vue 中，Vue 组件的形式有两种，一种是类组件，这种情况我们也可以不使用 useService，可以直接使用@Inject 来注入服务；另一种情况则是 Option 组件，因为 Option 组件不是类，所以不能使用装饰器。只能使用 useService 这种类似 hooks 的方法类获取实例对象。

我的总结是依赖注入实在没有什么技术含量，也没有什么高大上的地方。不要被陌生的技术名词给吓到了。
本质上就是 Key-Value 的魔法。比如：

```ts
defineKeyValue("tokenA", "valueA"); // 内部使用map来记录对应关系
const value = getValueByKey("tokenA"); // 再通过map.get(key)获取数据即可
```

可以说这就是最简单的依赖注入的简单实现。但是它实在是太简单了，处理的场景有限，所以价值不大。至少要再加上类的实例化能力。

```ts
defineKeyValue("tokenA", ClassA); // 内部使用map来记录对应关系
const value = getValueByKey("tokenA"); // 再通过map.get(key)获取到ClassA，然后实例化一个实例返回
```

当然如果要处理 ClassA 依赖 ClassB 这种场景，就需要其他方面的支持。比如 typescript 以及 decorator。因为这属于技术问题，不属于概念问题，这里不再细述。

现在我们这个简易的依赖注入库实现了两种能力，如果判断是类，则去实例化；否值直接返回。我们可以沿着这个思路继续添加新能力。比如如果是普通函数，那么就当作普通函数来执行，然后把这个函数的返回值当作服务返回，这样我们就有三种能力了。

主要是介绍这种扩展的思路，只要有这种扩展的思路，我们就可以继续扩展更多的能力，无非就是添加一个`if-else`分支的事情。

排除掉这种扩展思路本身，我们的依赖注入框架还有什么局限性吗？

其实还有命名空间单一的问题。显然上面所有的数据都处于同一个全局命名空间下。因为`defineKeyValue`和`getValueByKey`是一个全局函数。那么所有的配置信息就只有一份。这种状况在大多数场景应该也没有什么问题。但是确实还可以继续提升一下。

我们需要继续引入一个新的概念，就是`Injector`。通过下面的伪代码我们可以快速了解什么是 Injector。

```ts
const parentInjector = new Injector();
const childInjector = new Injector();
childInjector.parent = parentInjector;

parentInjector.defineKeyValue("tokenA", ClassA);
childInjector.defineKeyValue("tokenB", ClassB);

// 注意到childInjector中并没有定义tokenA，但是仍然可以获取到服务实例
const serviceA = childInjector.getValueByKey("tokenA");
const serviceB = childInjector.getValueByKey("tokenB");
```

从以上伪代码中可以看出，之所以引入 Injector 这个概念主要是为了避免只有全局一份配置信息。我们可以做到每次实例化一个 Injector 对象，这个 Injector 对象就具有依赖注入的能力；除此之外我们还可以给 Injector 对象增加一个 parent 属性，从而可以把 Injector 对象关联起来，如果当前 Injector 对象中找不到某个服务，就会从其 parent Injector 对象中寻找服务，直到根 Injector 为空。

以上是从依赖注入框架的角度来思考的，和具体业务是无关的。考虑到在前端的场景下，应该怎样去结合呢？

本库参考 angular 把 Injector 绑定在组件上，默认根 Injector 是绑定在根组件上，可以理解为公共的全局的命名空间。

如果在业务上认为某个数据和某个组件是绑定的，就需要用到 `declareProviders([CountService])`。这行代码意味着当前组件会关联一个 Injector，并且配置了一个 CountService 服务。同时也意味着，在当前组件及其子孙组件中调用 useService 时，一定会从这个 Injector 中获取到 CountService 服务实例（前提是子孙组件不再定义同样的服务`declareProviders([CountService])`）。

这种寻找机制和原型链寻找属性的机制非常相似，也就是底层的命名空间中的同名属性会覆盖上层命名空间的同名属性。

## 依赖注入 vs import/export

1. import/export 适合单例
2. import/export 强制依赖某个实例/具体的数据，不存在干预服务创建过程的可能性。
3. 依赖注入解藕了依赖声明和依赖的实例化。比如声明依赖 LoggerService，但是可以通过配置修改为 OtherLoggerService 的实例
4. [Vue3 跨组件共享数据，为何要用 provide/inject？直接 export/import 数据行吗？](https://www.zhihu.com/question/391394082/answer/1188254737)
5. [前端什么时候用 import 什么时候用依赖注入?](https://www.zhihu.com/question/374161373/answer/1034772082)

## 图解

通过图片中不同的颜色可以区分出 declareProviders 划分出来不同的命名空间，这也是本库的 logo 的来源。

![hello logo](/assets/image/project/demo.png)

## 什么是 provider

因为本库的依赖注入的思想是来自于 angular，所以大家可以直接查看[angular 的官方文档](https://angular.cn/guide/dependency-injection-providers#using-an-injectiontoken-object)。这里我再说说我的理解。

provider 字面意思就是提供者，这里具体一点就是服务的提供者。提到服务，我们必须了解两个概念：服务名字和服务来源。最常见的 provider 如下：

```ts
{
  provide: AppleService, // 这是服务名字
  useClass: AppleService, // 这是服务来源
}
```

服务提供者是用来解决一个问题：服务是怎么来的？

最简单的场景就是配置的是什么，就把这个当作服务。还可以实例化一个类来当作服务，还可以执行某个函数，把返回值当作服务。这些在上面已经介绍过了。

总结起来就是 provider 是一种规范，从 provider 中我们可以获取服务标识符、服务创建机制、创建服务所需要的东西。

服务标识符意味着当我们获取服务时需要提供的标识符。

服务创建机制也是必须的，因为我们可能是没有办法只从服务标识符中推导出如何创建一个服务的，比如我们没有办法准确区分一个类和一个普通函数，也就没有办法知道怎么去创建这个服务，是应该 new 这个函数，还是直接调用这个函数。

当我们指定`useClass`时，显然是想要通过类的实例化来创建一个服务，虽然我们可以直接把服务标识符来当作类来使用，但是我们仍然支持`useClass:AnotherService`，从而达到实际提供服务的类和服务标识符的类的解耦。
