# img和a标签

### 资源

https://segmentfault.com/q/1010000008659208?_ea=1706610

oneNote笔记

### img间隙问题

- inline渲染时默认按照西方字体的基线对齐底部，多出来的高度由font和font-size共同决定。故img也遵循这个道理
- 设置元素为inline-block也有这个问题
- 解决方案
  - `img{display:block}`
  - `img{font-size:0}`
  - `img{vertical-align:middle/top/center}`

### a标签包裹问题

当用a标签包裹img或者`display:inline-block`时，a标签的高度会存在偏差，这主要是由于a标签时行内元素。

- 解决方案
  - `a{display:inline-block}`