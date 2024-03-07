# 选项合并

首先看选项合并的代码：

```javascript
// merge options
if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
} else {
    vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
    )
}
```

## _isComponent存在

没有学习Component，这里省略

## 不存在

```javascript
vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
)
```

### 解析构造函数参数

`resolveConstructorOptions(vm.constructor)`:

```javascript
function resolveConstructorOptions(){
    let options = Ctor.options
    if(Ctor.super){ // 这里同样涉及到组件，后续再讲
        
    }
    return options
}
```

故该函数的本质是返回构造函数上的 options，这里回顾一下options的具体结构，在runtime/index中章节。

```
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

### 用户传递的options

以一个简单的Vue为例：

```javascript
new Vue({
    data:{
        test:'1'
    }
})
```

则options为用户传入的对象。

### mergeOptions

