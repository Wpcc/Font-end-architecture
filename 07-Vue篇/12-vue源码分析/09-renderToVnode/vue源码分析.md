# 源码分析

这一节主要讲`render`到`Vnode`的过程：

在core/instance/lifecycle.js中，会触发`render`函数，从而生成虚拟DOM。

那么怎么触发渲染函数呢？

core/instance/render.js

```javascript
vnode = render.call(vm._renderProxy, vm.$createElement)
```

- 这段代码会由`with`触发`Proxy`代理中的`has`
  - 用来判断调用的函数和变量是否存在于`vm.renderProxy`中
- 随后开始进行参数赋值，也就是处理参数

