# vue2升vue3
通过vue3的脚手架建立整体框架，通过升级工具进行自动语法转换（大部分语法会转换），最后采用页面逐步迁移

### 升级工具的选择
- `gogocode-vue`
- `vue-codemod`

### 手动升级的地方
- 动态路由节点必须为component，不能为其他元素
- 自定义组件v-model，从 model+props 转变成 emit + props
- deep写法从::deep 转变为 deep
- 删除$children
  + 通过ref可以获取子元素
  + 如果子元素是第三方提供的，那么通过`this.ref[dom].state`可以获取内部数据
  + 通过`this.$.subTree`循环可以获取真个元素

### vue3常见问题

vue3样式穿透
vue3如果写setup函数，那么组件调用自己怎么调用
vue3生命周期created的
