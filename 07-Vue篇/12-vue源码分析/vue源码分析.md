# Vue源码分析

### 定位

这里以浏览器完整版为例，即`src/platforms/web/entry-runtime-with-compiler`。

通过寻找 `Vue` 的来源，来定位整个项目的起始位置：

- `entry-runtime-with-compiler` 

- `./runtime/index.js` 

- `../../core/index.js`
- `../../instance/index.js`

### 开始

**instance/index.js**

该文件代码代表着`Vue`项目的开端，那么通过代码我们来看看它做了哪些事情：

- 定义了`Vue`构造函数
- 装载了`Vue.prototype`原型

**1. 定义Vue构造函数**

```javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

即：当我们创建一个`Vue`的实例，会执行`this._init`方法。

**2. 装载Vue.prototype**

```javascript
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

- `initMixin(Vue)`：给原型添加`_init`方法

```javascript
export function initMixin(Vue){
    Vue.prototype._init = function(){ //省略
    }
}
```

- `stateMixin(Vue)`

```javascript
export function stateMixin(Vue){ // 主要和数据有关
   // 省略部分代码
    Object.defineProperty(Vue.prototype,'$data',dataDef) // $data为只读属性
    Object.defineProperty(Vue.prototype, '$props', propsDef) // $props为只读属性
    
    Vue.prototype.$set = set // 定义$set函数
    Vue.prototype.$delete = del // 定义$delete函数
    Vue.prototype.$watch = function(){} // 定义$watch函数
}
```

- `eventsMixin(Vue)`

```javascript
export function eventsMixin(Vue){ // 主要和事件有关
    Vue.prototype.$on = function(){} //
    Vue.prototype.$once = function(){}
}
```

