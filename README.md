## Font-end-architecture

**前端体系结构归纳**

### 工具篇

**怎么去构建一个项目？**

- 编译器的选择
  - vscode or  webstorm 或其他
- 前端框架的选择
  - vue or react or angular移动端的话Flutter or uniapp，小程序等
- 脚手架的选择
  - 如vue：VueCLI or Vite
- 语法规范的选择
  - 执行哪个规范：standard or airbnb 或各个大厂规范
  - 使用哪个语法检测工具：eslint 或 prettier（可以通过工具篇查看两者之间的区别）
- 包管理工具
  - npm(npx) / yarn / pnpm
- 是否使用monorepo
  - https://fed.taobao.org/blog/taofed/do71ct/uihagy/

### HTML

#### HTML语义化

便于浏览器、搜索引擎解析，css失效时，页面结构更清晰

#### async和defer

js语言分为下载和执行

#### HTML页面适应手机移动端

`<meta name='viewport' content='width=device-width,initial-scale=1'>`

### CSS

#### 标准盒模型和IE盒模型

标准：with(content) + padding + border + margin

IE: width(content + padding + border) + margin

#### 什么是BFC？

全称block formatting context（块级格式化上下文），意思创建一个独立的区域，让里面的布局与外部布局相互隔离

- 常见创建BFC的方式
  - 比如：文档根元素（html）
  - 比如：`overflow:hidden|auto|scroll`，这也是为什么`overflow:hidden`可以清除浮动，因为创建了一个BFC
  - 比如：绝对/固定定位：`position:absolute|fixed`
  - 比如：`display:flex`

#### 水平居中

- 水平居中
  - `margin:0 auto`
  - `text-align:center`

- 水平垂直居中
  - absolute(绝对定位) + margin，缺点需要知道元素的宽高
  - abosulte(绝对定位) + translate，缺点css3属性，兼容性
  - flex，给父元素添加`display:flex;justify-content:center;align-items:center`，缺点css3属性，兼容性

#### flex布局

- `justify-content`定义主轴对齐方式
- `align-items`定义交叉轴对齐方式
- 用的比较多：
  - `flex-wrap:wrap/nowrap`定义是否换行
  - `flex:1`平分剩余空间，需要注意的是该属性设置在本身元素上而不是父元素，为`flex-grow`

#### 浮动

- 为什么要清除浮动？清楚浮动的方式？

  - 由于浮动会使元素脱离文档流，故原本布局的父元素将会出现高度塌陷的问题。为了让页面更加合理，我们需要清除浮动。
  - 常用清除浮动的方法：
    - `both:clear`：一种是在最后一个元素添加清除，另外一种方式是创建一个伪元素，添加浮动方式
    ```css
    // 伪元素
    .clearfix::after{
      content:'';
      height:0;
      display:block;
      clear:both;
    }
    ```
    - 创建一个BFC：通常是通过`overflow:hidden`进行清除
    ```css
    // 浮动元素的父元素
    .container{
      overflow:hidden;
    }
    ```

#### margin塌陷

- 相邻元素的margin塌陷（垂直方向）
  - 一种是父元素包含子元素，这个时候通常是`margin-top`塌陷，通过设置父元素为BFC，让两个margin互相不干扰，或设置border让margin不进行接触
  - 另一种是相邻元素的margin塌陷，这种比较复杂，只能设置`dispaly:absolute|fixed`绝对定位，或通过更改元素的`margin-bottom|top`进行调试

#### 字体小于12px

- 如何让字体小于12px？
  - 一般使用`transform:scale(0.8)`做转换，如果是内联元素，需要将内联元素转换成块级元素`display:block|inline-block`

#### 伪类和伪元素

- 什么是伪类和伪元素？
  - 最新规范通常用`:`表示伪类，用`::`表示伪元素。借用MDN关于伪类和伪元素的描述，伪类就相当于你向文档上添加类，而伪元素则是向现有的文档上添加元素
  - 伪类：`:hover|:active|:first-child`
  - 伪元素：`::before|::after|::first-line`

#### 媒体选择器

- 什么是媒体选择器？
  - 通过media查询设备，设定一定的区间做自适应布局。

#### css单位

- 常见的CSS单位
  - px：像素点，绝对单位
  - em：相对于浏览器默认字体，如果设置父（祖）级字体单位，则会相对于父（祖）级字体单位
  - rem：相对于html字体
  - vw：相当于设备宽度
  - vh：相当于设备高度
  ```css
  // 如果浏览器的默认字体为16px，可以设置font-size:62.5%(16*62.5% = 10)
  // 这样：1em = 10px 1rem = 10px，方便书写和使用
  ```

#### css属性

- 什么是css属性（变量）

  - 当整个项目存在某些相同属性设置时，比如背景色，这个时候可以通过变量进行全局设置，以便后续维护。
    - 通过伪类`:root`设置根元素节点上的变量，一般以`--`开头
    - 在具体样式里通过`var()`进行引用
  ```css
  :root{ // 根元素，相当于设置html元素属性
    --main-bg-color: brown;
  }
  item{ // 具体使用的元素
    background-color:var(--main-bg-color)
  }
  ```

### Javascript

#### 原理知识

- 执行上下文栈
  - 执行代码的栈空间
- 执行上下文
  - 变量对象（variable object VO）
  - 作用域链（Scope chain）
  - this
- 变量对象（活动对象）
  - arguments
  - 参数
  - 变量
  - 函数
- 作用域
  - 词法作用域和动态作用域的区别
    - 主要取决于作用域是函数声明时定义还是函数调用时定义
- 作用域链
  - 内部通过[[scope]]指向外层作用域，从而实现对外层变量访问
- 更改this指向
  - call和apply，两者的参数不同
    - call需要一个个传递
    - apply则是传递一个数组

- 闭包
  - 能够访问外部变量的函数
  - 所在区域的上下文销毁后，依旧能够访问外部变量的函数
  - 实践：解决js没有块级作用域的问题
- 构造函数、原型、原型链
  - 在js中通过构造函数创建对象，为了实现公用属性和方法，便有了原型。构造函数通过`prototype`指向原型，对象通过`__proto__`指向原型。由于原型本身也是一个对象，那么通过`__proto__`便可以执行另一个原型，从而实现链式继承。

#### 基础知识

**基本数据类型**

- Sting
- Number
- Boolean
- Null
- Undefined
- Object
- Symbol
- BigInit

**数据类型判断**

- typeof
  - 缺点无法判断引用类型：如数组和对象都为`object`
  - 函数为`function`
- instanceof
  - 是否是一个构造函数的实例
- Object.prototype.toString
  - 封装一个类型判断：需要注意的是输出
  - 如对象`[object Object]`

**数组判断？**

- Array.isArray()
- 原型判断`arr.__proto__ === Array.prototype`
- Object.prototype.toString()

**对象判断？**

- Object.prototype.toString()

**空对象判断？**

- `JSON.stringify`
  - 转字符串判断是否为`{}`
- `Object.keys`
  - 判断keys是否为空数组

**数组操作方法？**

- 不更改原数组
  - forEach/map/filter/every/some
  - slice
- 更改原数组
  - push/pop/unshift/shift
  - splice/sort
- 转字符串
  - join

**字符串操作方法？**

- 不更改字符串
  - slice
- 转数组
  - split

**数组去重**

- indexOf
- Set
- Object
  - 可以用来去重对象

**深浅拷贝**

数组：

- slice
- JSON.stringify
  - 不能拷贝函数
- 递归

对象：

- 深拷贝
  - `Object.create`

### vue

#### vue2和vue3区别

vue2和vue3有哪些区别？

- 格式方面
  - vue2采用的是选项式`options`的写法
  - vue3采用的是`composition`组合式写法，为了兼容处理，vue3也支持`options`写法
  
- 在响应式方面
  - vue2是基于`definePropertype`这个API的getter、setter进行依赖收集和依赖触发
  - vue3则是基于`proxy`以及对象本身的getter、setter进行依赖收集和触发
  
- 在渲染层面
  - vue2主要使用的是双端diff算法
  - vue3主要使用的快速diff算法
  
- api
  
  - 生命周期（composition API生命周期没有create，并在前面添加了`on`）
  - watch添加了flush（`flush:post`表示dom节点渲染后）、once（watch只触发一次）功能
  - 样式穿透deep写法也有变化（`::v-deep`更改为`:deep()`）
  - 删除了`$children`获取dom子节点操作（这个主要是当涉及到UI组件，并且需要操作里面相关节点）
  - vue3不支持过滤器
  - 自定义model的写法也发生了变化
  - vue3中写jsx语法的话，必须在`script`中声明`<script lang='jsx'>`
  
  