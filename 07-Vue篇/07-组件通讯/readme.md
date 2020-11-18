### 文件说明

### src

父子组件通讯：

- 父传子：props
- 子传父：emit

### src2

event-bus：

- 简而言之创建一个vue实例进行存值。

### src3

简单的store通讯：手写一个store进行数据的存取。

复杂的组件通讯，使用vuex

### src4

ref：通过ref可以给元素赋值一个特定的节点名，通过该节点名获取到该元素的DOM节点，从而可以获取或者触发该节点的数据或事件。**（两个节点属于同一个页面即可）**

```vue
<template>
  <div>
    <Show :initMsg="msg"></Show>
    <Click @callback="getData" ref="click"></Click>
    <button @click="submit">父元素的按钮</button>
  </div>
</template>
<script>
// 省略部分代码
export default {
  methods: {
    submit() {
      // 通过ref获取子元素的DOM节点
      // 然后触发该节点的函数，或者获取该节点的数据
      this.$refs.click.sub();
    },
  },
};
</script>
```

### src5

子元素往往只有一个父元素，故通过`$parent`可以访问父元素实例。

### src6

依赖注入：如果嵌套太深，那么后代元素访问祖元素依旧不方便，这个时候可以通过依赖注入的方式进行访问。

`provide`允许我们指定我们想要提供给后代组件的数据、方法。

```javascript
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

然后在任何后代组件里，都可以使用`inject`选项来接收指定的我们想要添加在这个实例上的property：

```javascript
inject:['getMap']
```

实际上，依赖主语可以看做一部分“大范围有效的prop”，除了：

- 祖先组件不需要知道哪些后代组件使用它提供的property
- 后代组件不需要知道被注入的propery来自哪里