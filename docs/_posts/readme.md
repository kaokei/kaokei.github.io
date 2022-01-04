---
author: kaokei
title: 参考文章
date: 2021-12-19 16:52:54
permalink: /pages/5b7b92/
sidebar: auto
categories: 
  - 随笔
  - 技术
tags: 
  - null
---

这里记录一些我对前端某些知识点的理解

watch在vue中是不需要返回render函数的，而是返回的stopWatchHandler，是因为vue能完全控制模版的更新。
但是在react中，我们不能直接调用react组件的render函数，只能通过setState来间接触发组件更新。

svelte无法解决this问题，svelte无法解决依赖注入问题，因为导入的是store。而不是原始对象。但是在vue中因为使用的是proxy，所以导入的还是原始对象
