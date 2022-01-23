---
title: linux 命令
date: 2022-01-04 15:24:36
permalink: /pages/84b761/
sidebar: auto
categories:
  - 随笔
tags:
  - todo
---
## 查看文件第 n 行内容

一般应该用不到这个命令，我的使用场景是因为在分析巨型日志文件的时候，编辑器都不能正常工作，只能获取指定行数的日志内容来分析了。

方法一：

```shell
head -m  filename | tail -1
head -200 data.log | tail -1
```

方法二：

```shell
nl filename | sed -n 'mp'
nl data.log | sed -n '200p'
```

方法三：

```shell
sed -n 'mp' data.log
sed -n '200p' data.log
```

方法四：

```shell
awk 'NR==m' filename
awk 'NR==200' data.log
```

## 查看文件第 m...n 行的内容

方法一：

```shell
# 取前x行后再取后y行
# 也就是取x-y到x之间的内容
cat filename | head -n x | tail -n y
```

方法二：

```shell
# 取后y行内容后再取前x行内容
# 这里注意是获取整个文件的靠后面内容，所以没有办法确定是第几行到第几行
cat filename | tail -n y | head -n x
```

方法三：

```shell
# 取前x行内容后后再从y行开始取到最后
# 也就是取y到x之间的内容
cat filename | head -n x | tail -n +y
```

方法四：

```shell
# 从y行开始取到最后再取前x行
# 也就是取y到x+y之间的内容
cat filename | tail -n +y | head -n x
```

方法五：

```shell
# x,y是正整数
# 就是表面含义，取文件的第x行到第y行之间的内容
sed -n 'x,yp' filename
```
