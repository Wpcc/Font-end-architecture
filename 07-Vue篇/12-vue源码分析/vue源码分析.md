# Vue源码分析

### 装载

**给原型添加方法和属性：**

`instance/index.js`文件主要是给Vue的原型添加方法和属性



**给构造函数添加方法和属性：**

`core/index.js`文件主要是给Vue构造函数本身添加方法和属性



**给特定平台添加方法和属性：**

`platforms/web/runtime/index.js`给浏览器平台添加特定的方法和属性



**给Vue添加编译器：**

`platforms/web/entry-runtime-with-compiler.js`给Vue添加编译器用来编译vue模板
