# Vue项目搭建

以下项目搭建，基于 Vue CLI3.0 +，你可以通过命令语句`vue -V`查看当前Vue CLI版本。

### 项目准备

- 编译器
  - VSCode

- 代码规范
  - ESLint 

#### VSCode

- 安装插件
  - ESLint：语法检测
  - open in browser：编译器中打开项目文件
  - vue：Vue语法高亮
  - Vetur：Vue语法高亮
- 



### 项目创建

输入命令语句：`vue create <项目名>`，具体选择项查看[这里](https://github.com/Wpcc/studyVue02)

#### 必要依赖

- sass、sass-loader 
  - 用于翻译`<style lang="sass" scoped></style>`的样式文件
  - 安装方式`npm i sass sass-loader -D `



### ESLint配置

#### VSCode设置

文件-首选项-设置-Extensions-ESlint：

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint":true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue"
    ],
    "editor.tokenColorCustomizations": null
}
```

**注释：**

当我们想让单行代码跳过eslint检查规则时，通过以下注释：

```javascript
/* eslint-disable */
console.log('hello world')
/* eslint-disable */
```



#### 项目设置

可以参考手摸手系列的eslint规则[地址](https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js)，更多选项可以点击这里查看对应[篇章](https://segmentfault.com/a/1190000009275424?utm_source=tag-newest)。

**当进行以上设置后，我们用VSCode保存代码时，就可以根据根目录下的.eslintrc.js配置的eslint规则来检查和做一些简单的fix。**



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
const port = process.env.VUE_APP_PORT || 9528 
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
      // 这里需修改
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



### 多环境配置

#### 默认配置

在开发一个项目时，往往存在多个环境，比如开发环境（development），比如生产环境（production），等。在不同的环境，或许需要请求不同的接口或用到不同参数，vue便提供了这种模式。

通过运行 package.json 中的 scripts 语句，项目便可以加载不同环境下的变量。

默认情况下，vue 提供三种对应模式。

- `development` 模式用于 `vue-cli-service serve`
- `test` 模式用于 `vue-cli-service test:unit`
- `production` 模式用于 `vue-cli-service build` 和 `vue-cli-service test:e2e`

**package.json文件中的scripts语句：**

```json
"serve":"vue-cli-service serve",
"test":"vue-cli-service test:unit",
"production":"vue-cli-service build"
```

**Vue项目文件对应的环境文件：**

- .env.development
- .env.test
- .env.production

也就是说，当我们在命令行运行：

- `npm run serve`的时候，项目默认加载`.env.development`文件

- `npm run test`的时候，项目默认加载`.env.test`文件

- `npm run production`的时候，项目默认加载`.env.production`文件

  

环境文件说明如下：

```shell
.env                  # 在所有的环境中被载入
.env.local            # 在所有的环境中被载入，但会被git忽略
.env.[mode]           # 只在指定的模式中被载入
.env.[mode].local     # 只在指定的模式中被载入，但会被git忽略
```

#### 实际配置

在实际项目中为了简便，往往都简写环境文件，如下：

- .env  表示在所有环境中被载入
- .env.dev 表示在开发环境中被载入
- .env.test 表示在测试环境中被载入
- .env.prod 表示在生产环境中被载入

那么这个时候，我们则需要使用`--mode`去覆盖 package.json 中的默认参数：

```json
"serve": "vue-cli-service serve --mode dev",
"serve:test":"vue-cli-service serve --mode test",
"serve:prod":"vue-cli-service serve --mode prod",
"build": "vue-cli-service build --mode prod",
"lint": "vue-cli-service lint --mode prod"
```

#### node_env

`NODE_ENV`取决于选择的环境模式，通过 package.json 设置，可以更改默认`NODE_ENV`的值。

```json
// 注意 = 与&符号之间不能有空行 否则会被设置到NODE_ENV当中
"serve": "set NODE_ENV=dev&& vue-cli-service serve --mode dev",
```

#### 环境配置

包括：本地、DEV、测试、生产

```json
"serve": "set NODE_ENV=dev&&vue-cli-service serve --mode dev",
"serve:prod": "set NODE_ENV=prod&&vue-cli-service serve --mode prod",
"serve:test": "set NODE_ENV=test&&vue-cli-service serve --mode test",
"serve:local": "set NODE_ENV=local&&vue-cli-service serve --mode local",
"build": "set NODE_ENV=dev& vue-cli-service build --mode dev",
"build:dev": "set NODE_ENV=dev&& vue-cli-service build --mode dev",
"build:test": "set NODE_ENV=production&& vue-cli-service build --mode test",
"build:prod": "set NODE_ENV=production&& vue-cli-service build --mode prod"
```

**重点bug：华为云打包时`set NODE_ENV`不生效，只能在环境内设置。**



**配置文件内容：**

- .env 文件

```.env
# just a flag
ENV = 'env'

# base api
VUE_APP_TITLE = 'env title'
```

- .env.staging 文件

```.env.staging
# just a flag
ENV = 'env'

# base api
VUE_APP_TITLE = 'staging title'
```

**package.json启动项：**

```json
"scripts":{
    "serve":"vue-cli-service serve",
    "serve:staging":"vue-cli-service serve --mode staging"
}
```

**访问方式：**

```javascript
// 在vue组件的访问
created(){
    console.log(process.env.VUE_APP_TITLE)
}
```

#### 代理

为了简化，以及方便修改域名。在vue项目中通常使用代理，配置文件为`vue.config.js`，以下面配置为例：

```javascript
// 根据不同的全局变量，修改不同的端口号
const port = process.env.VUE_APP_PORT
const proxy_target = process.env.VUE_APP_PROXY_TARGET
const proxy_carInfo = process.env.VUE_APP_PROXY_CARINFO

// 配置 webpack-dev-server 行为。
  devServer: {
    open: true, // 本地服务器构建完成后，是否打开默认浏览器
    host: '0.0.0.0',
    port: port,
    // nginx代理配置
    proxy: {
      '^/map': {
        target: proxy_target, // 对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          '^/map': '/map'
        }
      },
      '^/pfsm': {
        target: proxy_carInfo, // 对应自己的接口
        changeOrigin: true
      }
    }
  }
```

当`webpack`打包工具在碰到以`/map`和`/pfsm`开头的时候，会去寻找定义在不同环境中的环境变量。

**但是在生产环境中，并不会使用代理**，这个时候需要我们配置axios，当在生产环境的时候，使用适当的域名，具体配置如下：

```javascript
import axios from 'axios'
import { Message } from 'element-ui'

const request2 = axios.create({
  baseURL: process.env.NODE_ENV === 'dev' ? '/' : process.env.VUE_APP_PROXY_CARINFO,
  withCredentials: true,
  timeout: 60000
})
```

查看配置文件中的`request.js`文件，可以了解到详细配置。



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

### 样式

#### 重置样式

使用normalize进行样式重置，具体方法如下：

- 安装[normalize](https://github.com/necolas/normalize.css/)

- 在vue项目中的main.js文件中引入normalize

  ```javascript
  import 'normalize.css/normalize.css'
  ```

  

#### 公用样式抽取

对于vue中关于css的一些公用样式，比如几个页面共用的某个样式，可以做如下处理：

- 在`src/assets/styles`创建`public.scss`文件（具体根据vue使用哪种css），将公用css样式写入该文件
- 在需要用到的vue文件样式中引入`@import '@/assets/styles/public.scss'`

#### 自适应样式

参考当前文件夹下的 variable.scss 文件

具体可查看 vant UI 对自适应的处理

关于移动端13.3333vw数值的说明：

- 移动端的设计稿一般是width：750px，height：auto（这里指的是不确定），100vw = 100%，这个也没有问题吧；那么，设计稿拿过来，我们可以得出：750px = 100vw，这个也没有问题吧，那么1px等于多少vw呢？ 是不是 1px = 100 / 750 vw = 0.13333vw；那么100px = 多少vw呢，这个应该知道了吧。100px = 13.33vw；
- 即13.33vw等于100px

#### 背景图

```css
background:url('~@/assets/images/left.png') no-repeat;
backgrond-size:100%;
```

- `@`符号一般为vue.config.js中配置的关于webpack的路径
- `~`符号，推测为固定定位的一种写法

#### 替换图标

替换public文件夹中的favicon.ico即可

### 请求

大多数请求都会安装axios。

```shell
npm i axios
```

具体请查看[官网](http://www.axios-js.com/zh-cn/docs/)

关于 axios 请求封装，请查看资源下的 request.js