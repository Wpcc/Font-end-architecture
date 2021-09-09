# Vue源码分析

### 各部分的作用

- `src/core/instance/index.js`
  - 主要是构造Vue.prototype，给原型添加各种属性和方法
- `src/core/index.js`
  - 主要用来构造Vue函数，给该函数添加属性和方法
  - 也会给Vue.prototype添加一些方法
- `src/platforms/web/runtime/index.js`
  - 主要是添加一些 web 平台上特点的指令
  - 这些指令添加到 Vue.prototype 和 Vue 上
- `src/platforms/web/entry-runtime.js`
  - 运行时
- `src/platforms/web/entry-runtime-with-compiler.js`
  - 运行时 + 编译

### 创建实例

创建一个vue实例，vue内部会做哪些事？

```javascript
let vm = new Vue({
	el: '#app',
	data: {
		test: 1
	}
})
```

