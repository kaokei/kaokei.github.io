---
title: json schema入门
date: 2021-12-30 14:58:16
permalink: /pages/8ab175/
sidebar: auto
categories:
  - 随笔
tags:
  - todo
---
# json schema 入门

## 一句话介绍 json schema 的作用

校验输入的 json 是否符合预期的格式。

可以考虑存在这样的一个函数 validate(inputJson, inputJsonSchema) => boolean;

需要注意 json 的定义。json 包含以下这些类型。`object array string integer number boolean null`。

关键是要意识到基本类型也属于 json 的定义。

另一方面，json schema 的则一定是 object。当然 json schema 也是一个 json。

比如描述字符串的 json schema 则是`{"type": "string"}`。
可以看出来描述基本类型的 json 已经需要一个 object 类型的 json schema 类描述了。

json schema 同时也是一个 json 文件。这既是它的优势，也是它的劣势。因为 json 非常容易序列化，所以在跨语言方面表现的非常好。
但是 json 本身的逻辑表达能力非常欠缺，不能表达非常复杂的逻辑关系。

json schema 主要用于验证 json 的类型结构。

## 一篇文章入门 json schema

[原始入门文章](https://json-schema.org/learn/getting-started-step-by-step.html)

```json
{
  // 可选字段，指定schema版本
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  // 可选字段，指定当前schema文件的uri
  "$id": "https://example.com/product.schema.json",
  // 可选字段，指定当前schema文件的短描述
  "title": "Product",
  // 可选字段，指定当前schema文件的长描述
  "description": "A product in the catalog",
  // 必填字段，指定输入json的类型
  "type": "object",
  // 因为当前json是一个object，所以需要指定有哪些属性
  "properties": {
    // 声明字段名productId
    "productId": {
      // 描述字段含义
      "description": "The unique identifier for a product",
      // 描述字段类型
      "type": "integer"
    },
    // 声明字段名productName
    "productName": {
      "description": "Name of the product",
      "type": "string"
    },
    // 声明字段名price
    "price": {
      "description": "The price of the product",
      "type": "number",
      // 价格必须大于0
      "exclusiveMinimum": 0
    },
    // 声明字段名tags，是一个数组
    "tags": {
      "description": "Tags for the product",
      "type": "array",
      // tags数组中的元素都是字符串
      "items": {
        "type": "string"
      },
      // tags数组最少有一个tag
      "minItems": 1,
      // tags数组中元素必须唯一
      "uniqueItems": true
    },
    // 声明字段名dimensions，是一个对象
    // 这里演示了嵌套对象的json schema
    "dimensions": {
      "type": "object",
      "properties": {
        "length": {
          "type": "number"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": ["length", "width", "height"]
    },
    // 声明字段名dimensions，是一个对象
    // 这里演示了使用$ref来引用一个外部json schema
    "warehouseLocation": {
      "description": "Coordinates of the warehouse where the product is located.",
      "$ref": "https://example.com/geographical-location.schema.json"
    }
  },
  // 指定哪些属性是必填字段
  "required": ["productId", "productName", "price"]
}
```

以下是另一个 json schema 文件，被上面的 json schema 文件通过`$ref`指向`$id`引用

```json
{
  "$id": "https://example.com/geographical-location.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Longitude and Latitude",
  "description": "A geographical coordinate on a planet (most commonly Earth).",
  "required": ["latitude", "longitude"],
  "type": "object",
  "properties": {
    "latitude": {
      "type": "number",
      "minimum": -90,
      "maximum": 90
    },
    "longitude": {
      "type": "number",
      "minimum": -180,
      "maximum": 180
    }
  }
}
```

## 深入理解 json schema

[原始官方文章](https://json-schema.org/understanding-json-schema/)

#### 顶层关键字

`$schema` `$id` title description type required properties

`$schema`只能在顶层使用。而且一旦使用就不能被外部引用，这里有点疑问，因为上面的例子展示了外部引用???

#### string 类型的关键字

minLength maxLength pattern format

#### number 类型的关键字

multipleOf minimum maximum exclusiveMinimum exclusiveMaximum

#### object 类型的关键字

除了使用 type 指定属性类型，还可以使用 enum 来指定枚举类型

除了使用 properties 来描述属性，还可以通过 patternProperties 来指定非特定的属性。

additionalProperties 控制是否可以有多余属性

unevaluatedProperties ???

if then

propertyNames

minProperties maxProperties

#### array 类型的关键字

items prefixItems minItems maxItems uniqueItems contains minContains maxContains

#### 通用关键字

title description default examples deprecated readOnly writeOnly

`$comment` 相当于代码注释，是给后续修改该 json schema 的人看的，而不是给使用 json schema 的工具使用的。

type enum const 指定属性类型的 `3` 种方式。

#### 媒体类型关键字

相当于是 string 类型的子类型，更加详细的描述了 string 类型。

```json
{
  "type": "string",
  "contentMediaType": "text/html"
}
```

```json
{
  "type": "string",
  "contentEncoding": "base64",
  "contentMediaType": "image/png"
}
```

## schema 组合

allOf anyOf oneOf not

注意到 oneOf 是严格限制只能是满足其中一个 subschema，anyOf 则可以是 1 个或者多个 subschema

#### 组合错误

```json
// 不可能同时存在既是string又是number
{
  "allOf": [{ "type": "string" }, { "type": "number" }]
}
```

#### 组合重构

```json
{
  "oneOf": [
    { "type": "number", "multipleOf": 5 },
    { "type": "number", "multipleOf": 3 }
  ]
}
```

```json
// 上面的json schema可以重构成这样的
{
  "type": "number",
  "oneOf": [{ "multipleOf": 5 }, { "multipleOf": 3 }]
}
```

## 条件关键字

dependentRequired，默认是单向的，如果需要双向依赖，则需要手动维护依赖关系。含义是当输入的 json 数据包含某个字段 A，则必须包含对应的字段 B、C、D...

dependentSchemas 功能类似，只是语法不一样。

if-then-else，单纯的 if-then-else 只能判断一个条件，不能实现 else-if 的效果。可以配置 allOf 和多个 if-then 来达到这个效果。

## 引用 schema

首先需要注意区分`$schema`和`$id`的区别。

[参考这里](https://json-schema.org/understanding-json-schema/reference/schema.html?highlight=schema#schema)介绍了`$schema`应该在顶层使用，类似于 html 中的 dtd 文件，是一种 meta-schema。

[参考这里](https://json-schema.org/understanding-json-schema/structuring.html#schema-identification)介绍了`$id`不是必须的，如果不存在则代表是一个匿名 schema。虽然`$id`是一个 URI，但是不代表具体实现会通过这个 URI 来获取这个 schema，它只是一个 ID 而已。
虽然只是一个 ID，但是在计算相对路径时，还是和 URL 的计算规则时相似的。

#### Retrieval URI

代表具体实现获取 schema 的 URI。如果具体实现并不是通过网络获取，而是直接访问的匿名 schema，那么就没有 Retrieval URI。

#### Base URI

Base URI 是参考的[rfc3986](https://datatracker.ietf.org/doc/html/rfc3986#section-5.4.1)的概念。

一般就是 Retrieval URI 或者 根据 $id 来计算生成。

Base URI 是非常重要的概念，因为后续在计算外部 schema 的路径时，就是根据 Base URI 来计算的。

#### $id

如果$id是一个绝对URI，那么Base URI就是$id。如果$id 是一个相对路径，那么需要根据 Retrieval URI 来生成一个 Base URI。

#### subschema

可以使用 JSON Pointer 来指向 subschema。

其实就是利用 URI 中的 fragment 来定位 json schema 中的片段。[https://example.com/schemas/address#/properties/street_address](https://json-schema.org/understanding-json-schema/structuring.html#json-pointer)

另一种不常见的方式时使用`$anchor`关键字来定义一个命名 fragment。[https://example.com/schemas/address#street_address](https://json-schema.org/understanding-json-schema/structuring.html#anchor)

#### $defs

可以在当前 schema 内部定义可以复用的 subschema。

```json
{
  "$defs": {
    "name": { "type": "string" }
  }
}
```

#### $ref

上面都是在说定义 schema 和 subschema，这里说一下怎么引用外部 schema。

`$ref`可以时绝对 URI，也可以时相对 URI，如果是相对 URI，那么就需要借助 Base URI 来计算出绝对 URI。

当然，如果缺少 Base URI，同时`$ref`同时又是一个相对 URI，那么就会导致计算失败。

`$ref`还可以引用`$defs`，比如`"$ref": "#/$defs/name"`

`$ref`还可以递归引用自身 schema，语法是`"$ref": "#"`，当然需要避免循环引用。

#### 打包

开发 schema 的时候，将多个 schema 分开到多个文件是一个最佳实践。但是发布一个 schema，最佳实践最好是打包成一个文件。

主要还是利用的`$defs`来声明 embedded schema。然后利用`$ref`来指向 embedded schema 的`$id`。注意这里需要区分 embedded schema 和 subschema 的区别。

## 示例

[参考这里](https://json-schema.org/learn/)

## 各种实现

[参考这里](https://json-schema.org/implementations.html)

## 注意事项

type 可以是数组，表示满足任意一个类型定义即可

最简单的 json schema 是{}，可以接受任意合法 json

json schema 可以区分整数和数字，integer 和 number

如果输入属性在满足 json schema 的基础上还有多余的属性，默认是可以通过校验的。通过 additionalProperties 关键字来控制。

object 的属性默认不是必填的，需要在 required 数组中声明必填字段

json schema 中出现了非关键字，不会有任何影响，也不会自动参与 validate 的过程，这是显然的，因为 validate 函数是别人实现的。除非我们自己实现自己的 validate 函数。 那么就可以处理新增加的关键字。
