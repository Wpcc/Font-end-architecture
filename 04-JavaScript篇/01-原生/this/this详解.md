# this详解

### 为什么要使用this

如果没有 this，而只使用参数传递，会出现层层传递的结果，就好比以下的代码，函数 say 本身与参数 person 并没有关联，但内部中的 upperCase 函数用到了参数。

```javascript
var zhangsan = {
    name:'zhangsan'
}
var lisi = {
    name:'lisi'
}
function upperCase(person){
    return person.name.toUpperCase()
}
function say(person){
    console.log('Hello i am ' + upperCase(person))
}
say(zhangsan)
say(lisi)
```

如果改写成this的话：

```javascript
var zhangsan = {
    name:'zhangsan'
}

var lisi = {
    name:'lisi'
}
function upperCase(){
    return this.name.toUpperCase()
}
function say(){
    console.log('Hello i am ' + this.upperCase())
}

zhangsan.fn = say //
zhangsan.fn() //      这里可以用 apply 或 call 代替
delete zhangsan.fn //

lisi.fn = say
lisi.fn()
delete lisi.fn
```



### 定义

简单的理解：

- 谁调用this，this指向谁，单独调用 this 指向window。

----

要正确的理解上面这句话，需要知道：**函数中的this并不在声明中绑定，而是在调用时绑定。**

并且遵循以下四条规则：

- 默认绑定：当函数独立调用时，this指向全局属性 window
  - 在严格模式下，默认绑定中的 this 会指向 undefined
- 隐式绑定：当函数有上下文对象，隐式绑定会将 this 绑定到上下文对象。
  - 在进行函数赋值时，会丢失 this 绑定
- 显示绑定：使用 call 和 apply 方法，可以直接进行 this 绑定
  - 显示绑定的本质其实是隐式绑定
- new 绑定：通过构造函数创建的对象会自动绑定函数中的 this

### 默认绑定

假设有一个函数，当在全局作用域中直接调用，可以看到输出 global，即使用了默认绑定：

```javascript
var name = 'global'
function foo(){
    var name = 'foo'
    console.log(this.name)
}
foo() // global
```

可以看到函数 foo 不带任何修饰，属于独立调用。

**需要注意的是**，在严格模式下（strict mode），默认绑定中的 this 会指向 undefined。

```javascript
var name = 'global'
function foo(){
    "use strict"
    console.log(this.name)
}
foo() // TypeError:this is undefined
```

### 隐式绑定

同样是下面一串代码，函数 foo 被 obj 调用：

```javascript
function foo(){
    console.log(this.name)
}

var obj = {
    name:'obj',
    foo:foo
}
obj.foo() // 2
```

也就是说函数 foo 通过上下文对象 obj 调用，故隐式绑定会把函数中的 this 绑定到这个上下文对象中。

需要注意地是，对象属性调用中只有上一层或者说最后一层在调用位置中起作用。

如：

```javascript
function foo(){
    console.log(this.name)
}
var obj2 = {
    name:'obj2',
    foo:foo
}
var obj1 = {
    name:'obj1',
    obj2:obj2
}
obj1.obj2.foo() // obj2
```

#### 隐式丢失

函数进行**赋值**操作的时候，本质上是将函数代码所在的地址传递给变量，这个时候调用变量执行函数，相当于直接执行原始函数，所以运用隐式绑定的 this 也就随之丢失。

具体可以查看下面代码：

```javascript
// 第一种丢失：函数赋值
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
var bar = obj.foo // 函数别名:本质上将函数的地址赋值给bar,故bar相当于foo
var name = 'global'

bar() // global
```

```javascript
// 第二种丢失：函数回调
function foo(){
    console.log(this.a)
}
function doFoo(fn){
    fn()
}
var obj = {
    name:'obj',
    foo:foo
}
var name = 'global'

doFoo(obj.foo) // global
```

```javascript
// 第三种丢失：内置函数
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
var name = 'global'
setTimeout(obj.foo,100) // global
```

内置函数之所以也会出现这种情况，是因为 JavaScript 环境中内置的 setTimeout() 函数实现和下面伪代码类似，所以函数进行执行时，内部也就进行了**赋值**：

```javascript
function setTimeout(fn,delay){
    // 等待delay毫秒后，也就是setTimeout调用函数，内部存在赋值
    fn()
}
```

### 显示绑定

**call 和 apply ：**

- 使用方法：
  - `fn.call(obj)` || `fn.apply(obj)`

- 区别：
  - call 中的参数需要展开，apply中的参数为一个数组或伪数组

下面代码，是通过 JavaScript 中提供的 call 函数，进行显示的 this 绑定：

```javascript
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj'
}
foo.call(obj) // obj
```



---

解决隐式丢失问题：比如常见的函数回调。

```javascript
// 内置函数回调：丢失this
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
var name = 'global'
setTimeout(obj.foo,100) // global 
```

```javascript
// 用另一个函数封装一下显示绑定
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
var name = 'global'
function foo2(){ // 用foo2函数进行包裹
    foo.call(obj) 
}
setTimeout(foo2,100)
```

之所以上面代码需要用foo2函数进行包裹，而不直接调用`setTimeout(foo.call(obj),100)`进行语句执行，是因为直接使用`foo.call(obj)`当参数，是将该语句的结果赋值给`setTimeout`的形参。

故可以使用赋值函数，如 bind 进行直接赋值：

```javascript
function foo(){
    console.log(this.name) 
}
// 简单的辅助绑定函数
function bind(fn,obj){
    return function(){
        return fn.apply(obj,arguments)
    }
}
var obj = {
    name:'obj'
}

setTimeout(bind(foo,obj),1000)
```

基于此，javaScript 提供内置方法`bind`，不过它的用法和上面有稍许不同：

```javascript
foo.bind(obj) // 返回绑定好的函数
```

或许你可以尝试 bind 的源码书写。

### new 绑定

当使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面几个操作：

- 创建（或者说构造）一个全新的对象
- 这个新对象会被执行[[Prototype]]连接
- 这个新对象会绑定到函数调用的 this
- 如果函数没有返回值，那么 new 表达式中的函数调用会自动返回这个新对象。

```javascript
function foo(name){
    this.name = name
}
var bar = new foo('zhangsan')
console.log(bar.name)
```

### apply 和 call 源码

**apply 和 call 本质上其实运用了隐式绑定。**

#### call源码

在解析源码之前，先看一下 call 改变 this 指向的实现：

```javascript
var obj = {
    name:'obj'
}
function foo(){
    console.log(this.name)
}
foo.call(obj) // obj
```

既然 call 本质上运用的是隐式绑定，那么可以将它的内部实现分为下面三个步骤：

- 将函数设为对象的属性
- 执行该函数
- 删除该函数

**第一次实现：**

```javascript
var obj = {
    name:'obj'
}
Function.prototype.call1 = function(context){
    context.fn = this // 后续foo会调用它，故this会指向它
    context.fn()
    delete context.fn
}
function foo(){
    console.log(this.name)
}
foo.call1(obj) // obj
```

上面的 call2 函数如果使用原型调用，则会指向原型，如`Function.prototype.call2()`，前提需要你在内部打印 this 。

**第二次实现：**

解决 call 参数问题：

```javascript
var obj = {
    name:'obj'
}
Function.prototype.call2 = function(context){
    context.fn = this
    var args = []
    for(var i = 1;i < arguments.length; i++){
        args.push('arguments[' + i + ']')
    }
    eval('context[' + args + ']')
    delete context.fn
}
function foo(age){
    console.log(this.name,age)
}
foo.call2()
```

这里需要注意两个点：

- 第一个点：args 直接做参数，与字符串拼接会存在隐形转换，即`args.toString()`

- 第二个点： args.push 的参数为什么是字符串
  - 首先，eval 能够执行字符串，就好比`<script></script>`标签一样
  - 其次这句代码最终转换可以看成这种形式`context[参数，参数]`，也就是 args 里面的内容如果不是`argumetns[i]`而是`age`会被直接当做变量，显然不存在这个变量。

**第三次实现：**

解决给 call 传递 null 和 undefined 的问题，以及返回值的问题

```javascript
var obj = {
    name:'obj'
}
Function.prototype.call2 = function(context){
    context = context || window // 01 解决参数为null 和 undefined
    context.fn = this
    var args = []
    for(var i = 1;i < arguments.length; i++){
        args.push('arguments[' + i + ']')
    }
    var result = eval('context[' + args + ']')
    delete context.fn
    return result // 解决返回值的问题
}
function foo(age){
    console.log(this.name,age)
}
foo.call2()
```

#### apply源码

```javascript
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```

### 参考

https://juejin.im/post/5907eb99570c3500582ca23c

http://www.ruanyifeng.com/blog/2018/06/javascript-this.html