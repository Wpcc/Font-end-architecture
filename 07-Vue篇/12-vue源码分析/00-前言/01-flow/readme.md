### flow类型检测

该文件夹需要移到外面执行（主要是由于该文件夹存在中文文件夹目录中）。

### 安装

详细可参考[官网文档](https://flow.org/en/docs/install/)。

- 安装依赖

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-flow
```

- 配置`.babelrc`文件

```.babelrc
{
  "presets": ["@babel/preset-flow"]
}
```

- 配置`package.json`文件

```json
{
  "name": "my-project",
  "main": "lib/index.js",
  "scripts": {
    "build": "babel src/ -d lib/", // flow类型转换后存在的目录
    "prepublish": "npm run build" // npm 运行语句
  }
}
```

--------

除此之外我们也需要安装flow-bin，用来检测整个文件存在的flow类型错误。

- 安装

```javascript
npm install --save-dev flow-bin
```

- 配置`package.json`文件

```json
{
  "name": "my-flow-project",
  "version": "1.0.0",
  "devDependencies": {
    "flow-bin": "^0.159.0"
  },
  "scripts": {
    "flow": "flow"
  }
}
```

由于我们安装在项目下，并不是全局`npm i -g flow-bin`，所以我们运行flow的时候需要加npm，即：

```shell
npm run flow init ##  初始化flow：会在项目下生产.flowconfig配置文件
npm run flow ## 进行flow语句检测，会在命令行显示语句错误
```

### 文档

具体一些关于flow类型检测代表的含义，可以点击[这里](https://flow.org/en/docs/types/maybe/)

