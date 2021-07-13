# this

### 概念

**谁调用 this ，那么 this 指向谁。如果函数单独执行，那么 this 指向 window。**

要弄清楚这句话，需要明白函数执行过程的两个概念，即函数声明，和函数调用。

```javascript
function foo(){ // 函数声明：内部代码不执行
    console.log('foo')
}
foo() // 函数调用：执行内部代码
```

this 的指向，取决于函数调用，和函数声明无关。

---

如果对 this 的指向做更清晰的划分，可以分为四个层面，即：

- 默认绑定：**函数单独执行**。这个时候会打印 window
  - 如果执行代码使用的是严格模式`use strict`的话，this 执行 undefined
- 隐式绑定：**函数被谁调用，则指向谁**。这个时候会指向调用自己的对象，换言之也就是执行环境对象。
  - 隐式绑定在函数赋值过程中，会存在this丢失问题，这和函数是引用类型有关
- 显式绑定：使用 JavaScript 提供的内置方法进行绑定（call，apply，bind），本质上其实属于隐式绑定。
- new 绑定：用构造函数创建对象时，this 会自动绑定到该对象上。



### 默认绑定

用更深奥的话来解释，函数单独执行的环境是全局环境，所以自然而然也就执行了 window。

```javascript
var name = 'global'
function foo(){
    var name = 'foo'
    console.log(this.name)
}
foo() // this 指向 window 也就是打印出 global
```

#### 严格模式

严格模式下，this 指向 undefined

```javascript
var name = 'global'
function foo(){
    'use strict'
    var name = 'foo'
    console.log(this.name)
}
foo() // 严格模式下 this 指向 undefined
```



### 隐式绑定

**谁调用 this ，则 this 指向谁。**需要注意地是隐式绑定过程中的 this 丢失问题。

先来看一个简单的隐式绑定案例吧！

```javascript
var name = 'global'
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
obj.foo() // obj
```

可以看出，上面代码，将函数 foo 赋值给对象 obj，通过 obj 调用 foo 去执行。

#### this丢失

那什么是隐式绑定中的 this 指向丢失，这其实涉及到函数赋值问题，先看下面一串代码吧！

```javascript
var name = 'global'
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
var foo2 = obj.foo
foo2() // window
```

**这里其实涉及到函数赋值**，我们都知道函数、数组、对象属于引用类型，**函数名是指针，函数是对象。**（这里就不画图做解释了）。foo2 本质上是 foo，那么自然而然也就指向了 window。

除了直接赋值外，在使用函数传参或使用JavaScript内置函数调用函数时也会出现该问题，如下面代码：

```javascript
// 函数传参
var name = 'global'
function foo(){
	console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
function foo2(fn){ // 它会传一个函数，然后指向函数
    fn()
}
foo2(obj.foo) // 打印 global
```

```javascript
// 内置函数
var name = 'global'
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
setTimeout(foo,1000) // 'global'
```

那么现在我们来看另一种情况：

```javascript
function foo(){
    console.log(this)
}
var obj = {
    foo:foo
}

document.addEventListener('click',obj.foo) // 打印document
```

这里可以看出，函数在赋值后，由document调用，故最终指向的是document。



### 显式绑定

使用 call、apply、bind 内置方法显式绑定 this。需要注意地是call 和 apply 返回的是函数的执行结果，bind 返回的是绑定后的函数。

```javascript
var name = 'global'
function foo(){
    return this.name
}
var obj = {
    name:'obj'
}
console.log(foo.call(obj)) // 输出 obj
console.log(foo.apply(obj)) // 输出 obj
console.log(foo.bind(obj)) // 输出绑定后的函数
```

其中 bind 最适用的一个场景：

```javascript
var name = 'global'
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj'
}
setTimeout(foo.bind(obj),1000) // 传入绑定后的函数，故此时this不会随函数赋值而丢失
```



### new 绑定

用构造函数创建一个对象，this 会自动绑定到该对象上，如下面代码：

```javascript
function Person(name,age){
    this.name = name
    this.age = age
}
var zs = new Person('zhangsan',16)

console.log(zs.name) // zhangsan
console.log(zs.age) // 16
```



### 源码解析

#### call源码

**这个代码实现的核心：一是隐式传递，二是解决内部参数为数组问题**

call 实现的功能：

- 显式绑定的本质是隐式绑定

- 当 call 的参数是 undefined 或 null 的时候，this 指向 window
- call 绑定的函数有返回值

call 函数实现的方法：

- eval：最古老
- join 或  toString：解决参数为数组问题（**存在问题，会将数组里面的值转换为字符串**）

```javascript
// eval
Function.prototype.call2 = function(context){
    context = context || window
    context.fn = this
    var arr = []
    var result
    for(var i = 1;i <arguments.length;i++){
        arr.push('arguments[' + i + ']')
    }
    result = eval('context.fn(' + arr + ')')
    
    delete context.fn
    return result
}
```

```javascript
// join
Function.prototype.call3 = function(context){
    context = context || window
    context.fn = this
    var arr = []
    var result
    for(var i = 0;i < arguments.length;i++){
        arr.push(arguments[i])
    }
    result = context.fn(arr.join(','))
    
    delete context.fn
    return result
}
```

#### apply源码

- 本质是隐式绑定
- 当传递undefined或null时，this指向window
- 参数只有两个：第一个是绑定对象，第二个是数组
- 不直接使用arr（**字符串与数组拼接，本质上调用了数组的toString方法，也就是将数组中的参数转换为字符串**）

```javascript
// eval
Function.prototype.apply2 = function(context,arr){ // arr可以是数组也可以是类数组
    context = context || window
    context.fn = this
    var result
    if(!arr){
        result = context.fn()
    }
    else{
        var args = []
        for(var i = 0;i < arr.length ;i++){
       		args.push('arr[' + i + ']')     
        }
        result = eval('context.fn(' + args + ')')
    }
    
    delete context.fn
    return result
}
```

```javascript
// join
Function.prototype.apply2 = function(context,arr){
    context = context || window
    context.fn = this
    var result
    if(!arr){
        result = context.fn()
    }
    else{
        context.fn(arr.join(','))
    }
    
    delete context.fn
    return result
}
```

#### eval

**eval执行过程中的详细解释。**

为什么要 push 一个字符串在数组里面

- eval 就好像一个`script`标签，里面的字符串最终会转换成执行代码，如果只将参数push到数组里，这些参数其实对应着变量。

eval执行为什么要直接放一个数组。

- 这里其实涉及到隐式转换，字符串和数组连接，数组相当于调用了`toString()`方法。





