# Vue源码分析

## 定位

这里以浏览器完整版为例，即`src/platforms/web/entry-runtime-with-compiler`。

通过寻找 `Vue` 的来源，来定位整个项目的起始位置：

- `entry-runtime-with-compiler` 

- `./runtime/index.js` 

- `../../core/index.js`
- `../../instance/index.js`

## 准备

当我们引入Vue.js文件代码，其实就执行了Vue.js代码，这个执行过程会做如下事情：

### instance

**instance/index.js**

该文件代码代表着`Vue`项目的开端，那么通过代码我们来看看它做了哪些事情：

- **定义了`Vue`构造函数**
- **装载了`Vue.prototype`原型**

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
    Vue.prototype.$on = function(){} 
    Vue.prototype.$once = function(){}
    Vue.prototype.$off = function(){}
    Vue.prototype.$emit = function(){}
}
```

- `lifecycleMixin(Vue)`

```javascript
export function lifecycleMixin(Vue){ // 和生命周期有关
    Vue.prototype._update = function(){}
	Vue.prototype.$forceUpdate = function(){}
	Vue.prototype.$destroy = function(){}
}
```

- `renderMixin(Vue)`

```javascript
export function renderMixin(Vue){ // 和渲染函数有关
    installRenderHelpers(Vue.prototype)
    Vue.prototype.$nextTick = function(fn){}
    Vue.prototype._render = function(){}
}
```

### core

**core/index.js**

该文件主要是给**Vue这个构建函数添加全局方法**。

- **`initGlobalAPI(Vue)`**

InitGlobalAPI 来源于 global-api 文件夹中的 index.js 文件，相当于 core 的主文件。

- 补充定义原型

```javascript
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
```

- 定义 Vue 的版本

```javascript
Vue.version = '__VERSION__'
```

至此，整个 core 中的代码就基本完毕，这里我们看一下上面的 initGlobalAPI 方法。

#### global-api

- 给原型 config 属性配置访问器属性

```javascript
Object.defineProperty(Vue, 'config', configDef)
```

- 给 Vue 构造函数添加具体属性值

```javascript
Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
}

Vue.set = set
Vue.delete = del
Vue.nextTick = nextTick

Vue.observable = (){
    observe(obj)
    return obj
}
```

- **给 options 添加各种初始化属性**

```javascript
Vue.options = {
    components:{
        keepAlive
    },
    directives:Object.create(null),
    filters:Object.create(null),
    _base:Vue
}
```

##### initUse

- 给Vue构造函数添加use方法

```javascript
Vue.use = function(){} // 省略
```

##### initMixin

- 给Vue构造函数添加mixin方法

```javascript
Vue.mixin = function(){} // 省略
```

##### initExtend

- 给Vue构造函数添加extend方法

```javascript
Vue.extend = function(){} // 省略
```

##### initAssetRegisters

- 给Vue构造函数添加component、directive、filter方法

```javascript
ASSET_TYPES.forEach(type => {
    Vue[type] = function(){}
})
```

至此整个 core 文件对于Vue构造函数的加载已经完毕了。



### runtime

文件来源于`platforms/web/runtime/index`，通过文件来源，我们知道runtime主要是为Vue添加特点平台的代码。比如该文件夹web平台的代码，其余weex平台上的代码。

```javascript
// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue,.protoype.$mount = function(){}
```

注意其中的两行代码：

```javascript
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)
```

这两句代码是给Vue.options添加指令和组件，还记得上一次options出现在哪个地方么？

global-api

那么经过这两行代码，Vue.options结构如下：

```javascript
Vue.options = {
	components: {
		KeepAlive,
		Transition, // web平台的特定代码
		TransitionGroup // web 平台的特定代码
	},
	directives: {
		model, // web 平台的特定代码
		show // web 平台的特定代码
	},
	filters: Object.create(null),
	_base: Vue
}
```



到这里runtime文件对于Vue的加载也结束了。



### entry-runtime-with-compiler

通过文件名对比`entry-runtime-with-compiler`和`runtime/index.js`文件名对比，我们知道该文件主要是为了**给Vue添加编译模板的功能**。

这是因为，当我们在使用打包工具`webpack`或者`gulp`编译代码的时候，这些编译会自动编译模板代码，减少引入Vue的体积。

那么下面我们来看一下`entry-runtime-with-compiler`的主要代码：

```javascript
// 重写了$mount方法
Vue.prototype.$mount = function(){}
```

到这里，Vue的整个准备工作就做好了。

## 开始

下面就以一个简单的例子来开启整个Vue程序吧！

```javascript
let vm = new Vue(){
    data:{
        a:'hello'
    }
}.$mount('#app')
```

该程序分为两部分：

- 创建Vue实例
  - 处理options参数
- 调用$mount函数
  - 编译模板

**创建Vue实例**

创建一个实例的说白了就是执行该函数，下面是Vue构造函数：

```javascript
// Vue构造函数
function Vue(options){
 if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

可以看到该函数调用了`this._init(options)`方法，也就是实例的`_init`方法。

当实例没有`_init`方法的时候，它会向上查找到构造函数，即`Vue.prototype._init`。

**调用$mount函数**

通过此处代码，我们仅知道，传入了`#app`字符串。故这里就不做过多说明（后续再进行详细讲解）。

### 创建Vue实例

其本质也就是调用`_init`方法，必定后续所有操作都是在此处进行。

#### 性能计算

通过performance上的API，对初始化的性能（也就是耗时）进行计算。

具体查看 02-01-性能检测 文件夹中的详细说明。

#### 合并选项

options

#### 初始化

##### initProxy

- 对vm上的属性进行代理，后续渲染时使用

```javascript
initProxy = function initProxy (vm) {
    if (hasProxy) {
        // determine which proxy handler to use
        const options = vm.$options
        const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
        vm._renderProxy = new Proxy(vm, handlers)
    } else {
        vm._renderProxy = vm
    }
}
```



##### initLifecycle

- 处理继承关系，同时给vm添加一些属性

```javascript
// 省略
```

##### initEvens

- 添加事件相关属性

```javascript
// 省略
```

##### initRender

- 初始化渲染相关的函数，主要是渲染函数转变为虚拟DOM阶段

##### callHook(vm,'beforeCreate')

- 调用生命周期函数

##### initInjections

- 处理injections参数

##### initState

- **处理props、methods、data、computed、watch**
- **给数据添加响应式**

##### initProvide

##### callHook(vm,'created')

### 调用mount方法

