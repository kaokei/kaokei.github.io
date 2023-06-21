<h2 align="center">kaokei's blog</h2>

# 我的博客

test001002003

目前所有项目的博客文章都放到这一个 git 仓库中维护。主要内容包括学习笔记，项目文档，游戏，demo 等。

## 写作方式

直接在`_posts`中新建 markdown 文件。运行`npm run fmt`，实际运行`vuepress fmt docs`。会自动添加 frontmatter。

`_posts`文件夹下不再区分技术和生活等子文件夹。就是所有的博客文章都放在`_posts`文件夹下。注意到这里的文件没有 sidebar。

可以在`_posts`文件夹下新建 2021 或者 2022 等归档文件夹。就是把`_posts`主目录中的博客文件转移到归档文件夹中。

后续还可以转移到`30.项目文档`这样的结构化目录中，会自动生成 sidebar。

主要思路是：`_posts主目录` --> `_posts归档目录` --> `结构化目录`。

页面结构是在`.vscode/config`文件中配置的，主要是 nav 导航栏和 sidebar 侧边栏配置。
也就是说如果没有配置 nav 和 sidebar，那么就是普通的文章内容展示，就没有 nav 和 sidebar。

nav 导航栏注意可以配置多层级的导航栏，还可直接配置外链到 github。

sidebar 可以配置多层级的侧边栏。sidebar 可以配置不相关的页面在同一个 sidebar，但是实际上没有必要。

本想实现通过提供配置功能，重构 sidebar，可以将根目录拆分开来。目前的 sidebar 是根据根目录来决定的，有多少个根目录，就有多少个 sidebar。
不能实现同一个根目录拆分成多个 sidebar。

## 域名规范

目前可访问域名由这些。

[https://kaokei.com](https://kaokei.com) 主域名，实际是指向了 github page 服务

[https://www.kaokei.com](https://www.kaokei.com) 会自动重定向到主域名

[https://kaokei.github.io](https://kaokei.github.io) 部署在 github page，会自动重定向到主域名

[https://kaokei.gitee.io](https://kaokei.gitee.io) 部署在 gitee，国内访问会快一些

## 在 vercel 中部署网站

**注意到目前已经不在 vercel 中部署了，但是部署流程是没有问题的，以下内容只是作为记录。**

首先默认部署在 github page 上，访问域名是`kaokei.github.io`。利用 github action 实现构建过程。其中源码是在 docs 分支，部署分支是 main。

注意到 vercel 上的部署流程并没有任何构建流程，只是订阅了当前项目的 main 分支，然后直接部署 main 分支的内容即可。vercel 中相关构建命令如下：

```
BUILD COMMAND: echo 'npm run build'
OUTPUT DIRECTORY: .
INSTALL COMMAND: echo 'npm install'
```

如果想要在 vercel 上配置自定义域名，需要在我们的域名所在 dns 中配置 CNAME 记录，如下：

```
CNAME www cname.vercel-dns.com
```

当然还需要在 vercel 中配置自定义域名`www.kaokei.com`，这个不用多说，简单配置一下即可。

## 许可证-禁止转载

Copyright (c) 2019-2022 kaokei
