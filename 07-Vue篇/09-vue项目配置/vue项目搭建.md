# Vue项目搭建

以下项目搭建，基于 Vue CLI3.0 +，你可以通过命令语句`vue -V`查看当前Vue CLI版本。

### 准备

- 代码规范
  - ESLint + VSCode
- 

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
// 根据不同的全局变量，修改不同的端口号
const port = process.env.port || process.env.npm_config_port || 9528 
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败
  lintOnSave: true,
  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: true, //关键点在这  
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  chainWebpack: () => { },
  configureWebpack: {
  	resolve:{ // 路径配置
        alias:{
            '@':resolve('src')
        }
    }
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    // open: false, // 本地服务器构建完成后，是否打开默认浏览器
    host: '0.0.0.0',
    port: port,
    // nginx代理配置
    proxy: {
      '/o2cPesm/': {
        target: process.env.VUE_APP_URL, // 需在全局变量中定义
        changeOrigin: true,
      },
      '/rbsm-api/': {
        target: process.env.VUE_APP_URL, // 需在全局变量中定义
        changeOrigin: true,
        pathRewrite: {
          '^/Resource': ''
        }
      },
    },
    before: app => { }
  }
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