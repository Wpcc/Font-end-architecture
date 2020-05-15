# this详解

**函数中的this并不在声明中绑定，而是在调用时绑定。**

绑定所遵循的四条规则：

- 默认绑定：当函数独立调用时，this指向全局属性 window
  - 在严格模式下，默认绑定中的 this 会指向 undefined
- 隐式绑定：当函数有上下文对象，隐式绑定会将 this 绑定到上下文对象。
- 显示绑定：使用 call 和 apply 方法，可以直接进行 this 绑定
  - 显示绑定的本质其实是隐式绑定
- new绑定：通过构造函数创建的对象会自动绑定函数中的this

### 默认绑定

先看下面一个函数：

```javascript
var name = 'global'
function foo(){
    var name = 'foo'
    console.log(this.name)
}
foo() // global
```

此处的函数foo不带任何修饰，属于独立调用，顾此处使用**默认绑定**。

**需要注意的是**，在严格模式下（strict mode），默认绑定中的this会指向undefined。

```javascript
var name = 'global'
function foo(){
    "use strict"
    console.log(this.name)
}
foo() // TypeError:this is undefined
```

### 隐式绑定

同样看下面一个函数：

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

函数foo通过上下文对象obj进行调用，故隐式绑定会把函数中的this绑定到这个上下文对象中。

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

如下面代码：

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

之所以会这样，是因为JavaScript环境中内置的setTimeout（）函数实现和下面伪代码类似：

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

下面代码，是通过JavaScript中提供的 call 函数，进行显示的 this 绑定：

```javascript
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj'
}
foo.call(obj) // obj
```

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
function foo2(){ // 进行显示绑定
    foo.call(obj) 
}
setTimeout(foo2,100)
```

创建一个辅助函数 bind：

```javascript
function foo(something){
    console.log(this.a,something)
    return this.a + something
}
// 简单的辅助绑定函数
function bind(fn,obj){
    return function(){
        return fn.apply(obj,arguments)
    }
}
var obj = {
    a:2
}
var bar = bind(foo,obj)
var b = bar(3) // 2 3
console.log(b) // 5

```

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

需要注意两点：

- call 改变了 this 的指向
- foo 函数执行了

给予这两点的实现：

```javascript
function foo(){
    console.log(this.name)
}
var obj = {
    name:'obj',
    foo:foo
}
obj.foo() // obj
```

可以发现，this 指向了 obj，并且 foo 函数执行了。不过这个实现却有个问题？那就是 obj 对象本身增加了一个属性，这点可以通过 delete 删除。

基于此，可以将 call 函数实现分为三个步骤：

- 将函数设为对象的属性
- 执行该函数
- 删除该函数



