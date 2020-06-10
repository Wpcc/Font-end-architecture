# ES6

### 参考资料

- https://es6.ruanyifeng.com/#docs/async

### 什么是ES6

- 2015年6月正式发布的JavaScript语言标准，ES2015有称呼为ES6。
- JavaScript语言的一个版本

### 变量

**let,const**

- let 增加了块级作用域
- 无法进行变量提升
- 无法重复声明

```javascript
// javascript 没有块级作用域，只有全局作用域和函数作用域
if(true){
    var a = 2 
    let b = 3
}
console.log(a) // 输出3
console.log(b) // b is not defined
```

```javascript
// 无法变量提升
console.log(a) // undefined
console.log(b) // Cannot access 'b' before initialization
var a = 2
let b = 3
```

```javascript
// 同一个作用域下无法重复声明
let a = 2
let a = 3
// Identifier 'a' has already been declared
```



- const：在let的基础上，声明的变量内容无法修改

```javascript
// 定义的变量可以修改
var a = 5
a = 6
console.log(a) // 6
```

```javascript
// const定义的变量不可以修改
const a = 5
a = 6
console.log(a) // Assignment to constant variable
```


### 字符串

**template string：模板字符串**

- 简化变量和字符串连接

```javascript
var a = 'i'
var b = 'love'
var c = 'you'
console.log(a + ' ' + b + ' ' + c) // ES5
console.log(`${a} ${b} ${c}`) // ES6
```

- 允许字符串之间的回车键

```javascript
var a = 'hello 
world!' 
console.log(a) // 报错
```

```javascript
var a = `hello
world!`
console.log(a) // 带回车格式的 hello world！
```

### 函数

**arrow function 又名箭头函数**

- 匿名函数简写
  - 注意有返回值
- 解决this指向问题

```javascript
// 匿名函数的简化问题
function(i){ // ES5
    return i + 1
}
(i) => { return i + 1} // ES6
```

```javascript
// ES5 匿名函数指向window
var person = { // ES5
    name:'zhangsan',
    say:function(){
        setTimeout(function(){
            console.log('hello world!')
            console.log(this)
        },2000)
    }
}
person.say() // window
```

```javascript
// ES6 箭头函数this指向上一层对象
var person = {
    name:'zhangsan',
    say:function(){
        setTimeout(()=>{
            console.log('hello world!')
            console.log(this)
        },2000)
    }
}
person.say() // person
```

### 参数

**default，rest**

- default，意思就是默认值，当我们给函数定义参数而没有传参使用的数值。

```javascript
function person(name){
    name = name || 'zhangsan'
    console.log(name)
}
person() // ES5
```

```javascript
function person(name = 'zhangsan'){
    console.log(name)
}
person() // ES6
```

- rest，剩余参数。
  - 代替arguments，让代码更加清晰明了。
  - arguments是**类数组**：具有数组的形态但无法调用数组的方法

```javascript
// ES5
function biggest(num){
    console.log(num)
    console.log(arguments)
    console.log(arguments.sort())  // 报错
}
biggest(3,2,1,4)
```

```javascript
// ES6
function biggest(...num){
    console.log(num)
    console.log(num.sort())
}
biggest(3,2,1,4)
```
### 解构

**destructuring**

- ES6允许按照一定的模式，对数组和对象提取值，这种提取的方式被称呼为解构。
  - 简化写法
  - 需要注意的是解构的变量名必须一致
- 赋值

```javascript
let zs = 'zhangsan'
let ls = 'lisi'
let person = {zs:zs,ls:ls} // ES5

let person = {zs,ls}  // ES6
```

- 取值

```javascript
let person = {zs:'zhangsan',ls:'lisi'}
let zs = person.zs
let ls = person.ls // ES5

let {zs,ls} = zoo // ES6
```

### 类

**class,extends,super：类，继承，super关键字（超类）**

- ES5
  - 构造函数
    - 如同一个模子，用来快捷的创建对象。
    - 对象：能够挂载属性（变量）和方法（函数）
  - 原型
    - 类似于作用域，让对象可以实现层级查找
  - 原型实现继承

```javascript
// 创建一个对象
var person1 = { // 01.对象字面量的方式
    name : 'zhangsan',
    say:function(){
        console.log(`hello i am ${this.name}`)
    }
}
person1.say()
```

```javascript
// 创建多个对象
function Person(name){ // 01.构造函数
    this.name = name
    this.say = function(){
        console.log(`hello i am ${this.name}`)
    }
}
var person1 = new Person('zhangsan')
var person02 = new Person('lisi')
```

```javascript
// 节省内存
function Person(name){ // 02.构造函数 + 原型
    this.name = name
}
Person.prototype.say = function(){
    console.log(`hello i am ${this.name}`)
}
var person01 = newPerson('zhangsan')
var person02 = newPerson('lisi')
```

```javascript
// 继承
function Person(name){ // 02.构造函数 + 原型
    this.name = name
}
Person.prototype.say = function(){
    console.log(`hello i am ${this.name}`)
}
var person01 = newPerson('zhangsan')

function Animal(name){
    this.name = name
}
Animal.prototype = person01

var dog = new Animal('jake')
dog.say() // 
```



- ES6
  - class 关键字
  - constructor 构造函数
  - super 关键字
    - 调用父类constructor函数，固定this

```javascript
class Person {
    constructor(name){ // 构造函数
        this.name = name
    }
    say(){ // 原型
        console.log(`hello i am ${this.name}`)
    }
}
let person1 = new Person('zhangsan')
person1.say()

class Animal extends Person { // 原型链
    constructor(name){
        super(name) // 必须调用 super() 函数
    }
}
let animal1 = new Animal()
animal1.say() // 
```

### 模块化

**两种规范：AMD规范和CommonJS规范**

- AMD规范代表的是：require.js（浏览器端）
  - 下载：[https://requirejs.org/](https://requirejs.org/)
  - 语法
  - 用法
    - 1.在html页面中引入`require.js`文件，并用`data-main`引入主文件
      - `<script data-main="./main.js" src="./require.js">`
    - 2.用`define`定义模块
    - 3.用`require`引入模块

```javascript
// 具体案例查看code代码中的modules文件夹require.js的使用
```



- ConmonJS规范代表：node.js（服务端）
  - 加载（require）
  - 导出（exports）
  - **核心是导出`exports`对象**
  - `exports`是`module.exports`的简写，之所有在这里提出来，主要有两种导入方式
    - 第一种：导出exports对象
    - 第二种：替换export对象，由于`exports`对象是`module.exports`的引用，顾需要用`module.exports`

```javascript
// comment.js 导出
let a = 'hello'
exports.a = a

// main.js
let e = require('./comment.js')
console.log(e.a) // hello
```



- import（ES6）
  - 导出`export`
  - 导入`import`
  - es6模块是通过`export`命令显式输出指定的代码，再通过`import`输入
  - **导入导出的并不是对象，而是指定代码**

```javascript
// comment.js
// 1.写在前面
export let a = 'zhangsan'
export function say(name){
    console.log(name)
}
export let person = {
    name:'zhangsan',
    say:function(){
        console.log(this.name)
    }
}
// 2.写在后面
let a = 'zhangsan'
function say(name){
    console.log(name)
}
export let person = {
    name:'zhangsan',
    say:function(){
        console.log(this.name)
    }
}
export {a}
export {say}
export {person}
// 综合写法
export {a,say,person}
```

```javascript
// main.js 导入
import {a,say,person} from './content.js'
```

**默认导入导出：**

- ES6模块中只有一个默认导出
- 默认导出的值无法从内部修改（经代码验证）

```javascript
// 默认导出 comment.js
export default let content = 'hello'
```

```javascript
// export 写在底部
let content = 'hello'
export default {content}
```

```javascript
// 默认导入 main.js : 默认导出的代码可以随意命名，并且无需加大括号
import some from './comment.js'
```

当使用浏览器加载模块时，需要设置`type="module"`，并且无法使用本地文件，需要用服务器代理，这是因为设置`type="module"`后，script存在跨越。

### Promise 

### async 和 defer



# 附加：

## CommonJS详解

node 也就是运行在服务器中的 javascript 代码，相对于浏览器中的 javascript ，它剔除了其中的 DOM、BOM 操作，增加了模块这一概念划分，对不同功能的代码进行封装。

模块就是文件的意思，node 中存在三种不同的模块划分：

- 核心模块

- 第三方模块

- 用户自定义模块

  - **在引用自定义模块时，需要明确地使用相对地址，即加 ./；如果省略会被编辑器当成**

    **核心模块**

  - 可以省略路径名

```javascript
// 核心模块:通常以二进制的形式存储在node代码内部
const http = require('http')
// 第三方模块：通常用 npm 包安装在 node_modules 目录下的模块
const express = require('express')
// 自定义模块：用户自己定义的文件，当然需要用 commonjs 规范进行模块定义
const userModule = require('./userModule')
```

### 模块化

通过require方法可以加载执行模块，相当于js文件的引用，**不同于浏览器html页面**用script引用，**node引用的模块存在模块作用域**，即在a.js定义的变量或方法通过require引用b.js，但b.js文件并无法使用a.js定义的变量。

故require方法会有一个返回值，该值是加载执行文件中定义的exports对象，在引用文件中通过exports对象便对外提供了接口。

```javascript
//a.js
var b = require('./b.js');
console.log(b.name); //输入 b

//b.js
var name = b;
exports.name = name;

```
#### 什么是模块化

模块化一般具有两种特性：

 - 文件作用域
 - 通信规则
    - 加载（require）
    - 导出（exports）

说白了就是彼此文件可以相互引用，彼此的作用域又不产生影响。

### 加载

语法:

```javascript
var 自定义变量名称 = require('模块')；
```

两个作用：

 - 执行被加载模块中的代码
 - 得到被加载模块中的exports（模块导出对象）



#### 导出

- node中有模块作用域，默认文件中的所有成员只在当前文件模块有效

- 对于希望可以被其它模块访问的成员，往往需要将其挂载到exports对象上。


exports挂载：

```javas
exports.a = 123;
exports.b = 'hello';
exports.c = function(){
    console.log('hello world');
}
```

exports替换：

```javascript
module.exports = 123;

//modules.exports只能导出一个函数、对象或字符串
module.exports = 'hello';

```

简而言之：一种是导出exports对象，另一种是将exports替换进行导出。

```javascript
//假设引入的文件是a.js 而导出的文件是b.js，那么第一种方法
var b = require('./b.js');
console.log(b);  //输出的是exports对象

//假设引入的文件是b.js，而导出的文件是b.js,那么第二种方法
var b = require('./b.js');
console.log(b); //输出hello

```





#### exports解析

为什么替换exports对象是module.exports = XX 而不是 exports = XX ？

准确来讲exports是module.exports的一个引用（感觉在js中引用便是指针的意思，这和C++的引用不是一个类型）。

在模块中其实隐藏封装了如下代码：

```js
var module = {
    var exports = {};
}
/*
	module.exports.a = 123;(点操作符太麻烦)
	为了方便给导出对象添加属性、方法做了一个赋值操作
*/
var exports = module.exports;
return module.exports;
```

故：

	如果我们对exports变量赋值，实际上只是改变exports的内容或指向，并没有改变最后返回的module.exports的指向。



#### require.js加载规则

模块种类：

- 核心模块
  - 模块名
- 第三方模块
  - 模块名
- 用户自己写的模块
  - 模块名

规则：

- 优先加载缓存，并且不重复加载：
  - 比如，有main.js/a.js/b.js三个文件，a.js引入了b.js，mian.js引入了a.js和b.js，在引入a.js的时候，main已经引入了b，故再次引入并不去加载b中的内容。

```javascript
//main.js
require('./a');
require('./b');

//a.js
require('./b');
console.log('this is a.js');

//b.js
console.log('this is b.js');

/*
	执行main.js，仅仅只打印一次b.js，这是因为为了模块加载效率考虑，require并不重复的引用包。但是引用会得到模块导出的内容：即赋给module.exports的值。
*/
```

- 加载核心模块
  - node中的核心模块被编译成二进制文件存储在运行文件中，故加载核心模块仅仅只需要引入模块名即可。
- 加载第三方模块
  - 第三方模块的加载不是通过路径，这点和加载我们自己定义的模块不同，任何第三方模块的名字和核心模块都不一样。
  - 第三方模块加载，会找到目录中的node-modules文件，如果没有会找上一级目录下的node-modules，直到根文件为止。
  - 在找到node-modules文件后，会进入到指定文件当中（如：art-template），在该指定目录中，通过main定位到引用文件，如果main错误，或者main中定义的文件不错在，会自动调用当前文件中的index.js文件，否则报错。

### 区别

CommonsJS值输出的是**值的拷贝**，这样当值为简单的数据类型的话，改变原始模块中的值，当前模块的值并不会有所变化，当然数据类型为引用类型（对象，数组，函数）则另算。

ESM输出的则是值的**引用**。需要注意地是默认导出的值，内部无法修改（很奇怪）。

ESM导出的值，在外部模块中无法修改，相当于用const定义。

```javascript
// comment.js
```

