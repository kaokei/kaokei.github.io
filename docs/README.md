## 浏览器兼容性

最低可用版本chrome64
建议最低版本chrome69

## 禁止在template中使用对象字面量和函数

这会导致组件的无意义的重新渲染

```
class
style
作用域插槽：<template #renderItem="{ item }">

a-textarea
auto-size

a-form和a-form-item
:label-col="{ span: 5 }"
:wrapper-col="{ span: 14, offset: 5 }"

a-table
:row-selection="{
  selectedRowKeys: listService.selectedRowKeys,
  onChange: handleSelectedRowChange,
}"
:scroll="{ x: listService.TABLE_SCROLL_X }"

a-select
:remove-icon="() => null"

a-pagination
:show-total="(total: any) => t('common.total_items', [total])"
```

## 解决的问题

1. 构建时找不到 reflect-metadata
2. 构建和预渲染时 NODE_ENV 被覆盖导致ant-design-vue生成错误类名前缀（待解决）
3. ant-design-vue需要提前生成ssr样式，而且需要定制extractStyle只提取使用到的样式
4. 使用style-provider并hash-priority="high"取消where选择器
5. 可选择的页面预渲染，而不是所有页面预渲染，因为需要登录授权的页面没有办法直接预渲染
6. message.error不生效
7. import { extractStyle } from 'ant-design-vue/lib/\_util/static-style-extract/index';
   建议增加白名单和黑名单，以及增加StyleProvider的props
