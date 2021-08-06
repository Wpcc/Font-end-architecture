### prop-inject-directive

### prop

无需多述，组件之间用来传参使用，通常是父组件传参给子组件：

- 父组件

```vue
<template>
	<blog-post :title="post.title"></blog-post>
</template>
```

- 子组件
  - 数组的方式接受值
  - 对象的方式接受值

```javascript
props:['title']

props:{
    title:{
        type:String，
        default：''
    }
}
/*
	使用对象接受值需要注意的是，如果接受的值为对象或者数组.
	那么默认值应该是函数返回值，如下：
*/

props:{
    title:{
        type:Object,
            default:function(){
                return {}
            }
    }
}
```



### inject

inject翻译为注入，使用的场景通常是多个子组件会频繁的触发父组件中事件或数据，那么这个时候我们就可以将父组件中的事件或数据提供给vue，通过inject在子组件中使用。

具体使用，可参考10-vue各种问题中的vue页面刷新。



### directive

参考[官网](https://cn.vuejs.org/v2/guide/custom-directive.html)

directive有两种写法：

- 对象写法

```javascript
/* 
	focus 代表指令。  inserted 指令提供的钩子函数，于此同时还有bind update
	通过钩子函数提供的参数，可以进一步操作
*/
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

- 函数写法

```javascript
directives:{
    test2:function(){
        console.log('test2')
    }
}
// 通过查看源码可以得知，函数最终会被转化成
directives:{
    test2:{
        bind:function(){
            console.log('test2')
        },
        update:function(){
            console.log('test2')
        }
    }
}
```

