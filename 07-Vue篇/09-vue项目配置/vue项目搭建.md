# Vue项目搭建

以下项目搭建，基于 Vue CLI3.0 +，你可以通过命令语句`vue -V`查看当前Vue CLI版本。

### 项目创建

输入命令语句：`vue create <项目名>`，具体选择项查看[这里](https://github.com/Wpcc/studyVue02)

### webpack配置

在根目录下创建`vue.config.js`文件，该文件本质上是 Vue CLI3.0 对 webpack 的封装。

[Vue官方文档](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)

[webpack基础](https://github.com/Wpcc/studyWebpack)

```javascript
'use strict'
const path = require('path')
function resolve(dir){ // 加上完整路径
    return path.join(__dirname,dir)
}

module.exports = {
    
}
```



### 压缩可视化

**BundleAnalyzerPlugin**

安装：`npm install webpack-bundle-analyzer --save-dev`

配置vue.config.js：

```javascript
module.exports = {
    configureWebpack:{
        new BundleAnalyzerPlugin()
    }
}
```

详细配置：https://segmentfault.com/a/1190000017716736