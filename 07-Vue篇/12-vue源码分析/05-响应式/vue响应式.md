# vue响应式

### 实例

假设我们有以下数据：

```javascript
new Vue({
    data:{
        obj:{
            name:'zhangsan'
        }
    }
})
```

那么当Vue内部对数据进行响应化的时候会进行以下步骤：

**`observe(data,true)`**



### 调用observe

observe代码：

```javascript
export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```



- 首先看`observe(data,true)`函数的返回
  - 不为对象的话，直接**return**
  - 否则返回内部定义的变量`ob`

- 接下来看一下observe函数做了哪些重要的事儿：
  - 即我们传递的数据data是否存在`__ob__`属性
    - 如果存在变量`ob`等于我们传递数据data中的`__ob__`属性
    - 如果不存在则执行代码`ob = new Observer(value)`



### 生成Observer实例

```javascript
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

先来看Observer类的三个参数：

- value：我们传递的数据，通过constructor构造器可以得知
- dep：此刻未知
- vmCount：observe函数中作为ob属性出现过

再来看一下constructor构造器，此处回忆一下Observer是怎么执行的，`ob = new Observer(value)`，即ob为Observer的实例。

#### constructor

- **给ob添加三个属性**

```javascript
ob.value = value // 即我们传递过来的参数，也就是data
ob.dep = new Dep() // 创建了个Dep实例，看不懂，先放一放
ob.vmCount = 0 // 这里我们记得vmCount在observer出现过，即做了自增运算
```

好，接下来继续看，调用`def(value, '__ob__', this)`函数，看一下def函数内容：

```javascript
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val, // 内容
    enumerable: !!enumerable, // 是否枚举，也就是for……in
    writable: true, // 是否可以改写
    configurable: true // 是否配置，即是否能够调用defineProperty进行配置
  })
}
```

由于enumerable没有传参，flow在检测maybe类型时会给该参数补充undefined，undefined为false，故此处的`!!undefined`为false。

那么def的作用：

- **给value即我们传递的参数添加`__ob__`属性，并设置该属性为不可枚举，内容指向自己为ob**

此处我们以最上面的实例为例，那么指向到这里，ob如下：

```javascript
ob = {
    value:{
        obj:{
            name:'zhangsan'
        },
        __ob__:this // 即自身 ob
    },
    dep:new Dep(),
    vmCount:1, // observe处执行自增，此处为1
}
```



接下来判断我们传递的参数是数组还是对象，并用不同的函数进行处理，此处我们先来看对象，因为我们的实例使用的就是对象。

```javascript
this.walk(value)
```

这段代码很简单，循环对象中的属性，并使用每个属性调用`defineReactive`。

代码如下：

```javascript
 walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
```







