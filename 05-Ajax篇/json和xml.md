# JSON

### 资源

mdn：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON

### 描述

JSON是一种语法（数据类型/数据格式），用来序列化对象、数组、数值、字符串，布尔值和null。

- **属性和名称必须是双引号括起来的字符串**
- JSON没有变量，故没有undefined
- JSON提供两个方法：
  - **JSON.stringify()：将对象转换为JSON字符串**
    - 即属性和名称是双括号括起来的字符串
  - **JSON.parse()：解析JSON字符串**

```json
{
    "code":0,
    "msg":"success",
    "data":{
        "music":"see you again"
    }
}
```

### JSON和JSON字符串

- 在向服务器发数据时，一般是字符串，所以通常需要使用JSON.stringify()方法本身将JS对象转换为字符串
- .json格式的内容本身就是字符串

```javascript
// JSON.stringify的本质
console.log(JSON.stringify('hello')) // 输出"hello"
console.log(JSON.stringify('hello') === '"hello"') // 输出 true
```

```javascript
// JSON.parse 的本质
console.log(JSON.parse('"hello"')) // 输出 "hello"
console.log(JSON.parse("'hello'")) // 报错
console.log(JSON.parse('hello')) // 报错
console.log(JSON.parse("hello")) // 报错
```

