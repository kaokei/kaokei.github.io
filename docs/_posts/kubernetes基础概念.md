---
title: kubernetes基础概念
date: 2022-02-16 17:09:11
permalink: /pages/acbdc0/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
## 硬件角度

cluster 由 node 组成。即集群由节点构成。

node 一般认为是一组 CPU 和 RAM。可以是台式电脑，笔记本电脑，也可以是机架服务器，甚至可以是虚拟机。

集群的优点是让程序员不再关心程序具体是运行在哪台机器上，不用再担心机器损坏导致服务不可用。

namespace 命名空间又叫作名字空间。用于创建虚拟集群，它们底层依赖于同一个物理集群。

Persistent Volumes 又叫作持久卷。可以看作是集群的硬盘。容易理解 node 自带的文件系统只能是作为临时缓存使用。所以要想实现持久化的功能，必须要持久卷来实现。

## 软件角度

Container 又叫作容器。容器是一种开放且广泛使用的标准，所以我们可以使用现有的很多容器。最常见的就是 docker 容器。这里需要注意 container 和 image 的区别。

Pod，不知道怎么翻译，一般也不说中文。注意到 Pod 可以包含多个 Container，但是一般也只有一个 Container，如果有其他 Container，一般称呼为 side-cars。

Deployment，一般翻译为部署。一个部署可以包含若干个 Pod，一般建议最少 2 个，互为备份。Pod 的数量又称为副本个数，英文是 Replicas。部署的好处是可以监控 Pod 的健康度，如果其中一个挂掉，部署会自动创建一个新的 Pod。

服务，一开始容易和部署这个概念混淆，因为都是一组 Pod。部署强调的是管理 Pod 的状态。服务则是强调外部 ip 和 Pod 的对应关系，因为 Pod 具有临时性，可能随时被删除或者替换掉。

## DNS

Kubernetes 为服务和 Pods 创建 DNS 记录。 你可以使用一致的 DNS 名称而非 IP 地址来访问服务。

## Ingress

可以理解为集群的 nginx。用于连接集群和外部网络。

[Kubernetes 101: Pods, Nodes, Containers, and Clusters](https://medium.com/google-cloud/kubernetes-101-pods-nodes-containers-and-clusters-c1509e409e16)
[Kubernetes 110: Your First Deployment](https://medium.com/google-cloud/kubernetes-110-your-first-deployment-bf123c1d3f8)
[Kubernetes 120: Networking Basics](https://medium.com/@sanche/kubernetes-120-networking-basics-3b903f13093a)
[使用 Service 连接到应用](https://kubernetes.io/zh/docs/concepts/services-networking/connect-applications-service/)
[Kubernetes 架构简介](https://www.redhat.com/zh/topics/containers/kubernetes-architecture)
[Kubernetes 词汇表](https://kubernetes.io/zh/docs/reference/glossary/?fundamental=true)
