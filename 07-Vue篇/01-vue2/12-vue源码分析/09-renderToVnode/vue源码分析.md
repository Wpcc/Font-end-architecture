# 源码分析

这一节主要讲`render`到`Vnode`的过程：

在core/instance/lifecycle.js中，会触发`render`函数，从而生成虚拟DOM。

那么怎么触发渲染函数呢？

core/instance/render.js

```javascript
vnode = render.call(vm._renderProxy, vm.$createElement)
```

## with和has代理

with 语句，扩展一个语句的作用域链。

- 该作用域中的变量会触发 proxy 代理的 has 函数

比如：

```javascript
let obj = {
    name:'zhangsan',
    age:'18'
}
let name = 'lisi'
let age = '19'
with(obj){ // with里面将使用obj的作用域
    console.log(name) // zhangsan
    console.log(age) // 18
}
```

has函数，ES6中的代理函数，用来拦截 in 语句

- 需要注意的是对 for……in 不生效

```javascript
let obj = {
    name:'zhangsan',
    age:'18'
}
let objProxy = new Proxy(obj,{
    has(target,key){
        console.log('触发has函数')
        if(key in target){
            return true
        }else{
            return false
        }
    }
})
console.log('name' in objProxy);

for(let i in obj){ // 对 for……in 不生效
    console.log(i)
}
```



