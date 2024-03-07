# mount挂载函数

### 主要功能

获取DOM节点，编译 template 模板并挂载到 render 函数中。具体查看platforms/web/runtime/index.js 或 platforms/web/entry-runtime-with-compiler.js

如下：

```javascript
options.render = render
options.staticRenderFns = staticRenderFns
```

