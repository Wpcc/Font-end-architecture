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
    open: true,
    host: '0.0.0.0',
    port: port,
    before: app => { }
  }
}