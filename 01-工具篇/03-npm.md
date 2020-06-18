# npm

npm 其实就是 node 中内置的一个包安装软件，各种关于 js 的插件放在 npm 平台上进行统一管理，这样通过 npm 就能安装各种插件而省去了寻找官方网站进行下载的麻烦。

### npm5.0之前版本

- package.json
  - 包描述文件，描述着node-modules中的包文件。这是因为我们下载的包文件（如art-template）本身有很多依赖文件，光看node-modules文件夹很难分清安装了那些文件，通过package.json便一目了然。
  - package.json充当着包文件说明书的作用（按照package.json下载的文件，在大版本固定会自动升级最新版本，如8.2.1------>8为大版本）。

```
npm install 包名
#文件不会出现在package.json当中

npm install 包名 --save
#文件才会出现在package.json当中
```

### npm5.0之后版本

在package.json的基础上又补充了package-lock.json文件：

- package-lock.json
  - 补充package.json无法固定版本的缺陷出现。
  - 加快了npm install 的速度，因为 package-lock.json 文件中已经记录了整个 node_modules 文件夹的树状结构，甚至连模块的下载地址都记录了，再重新安装的时候只需要直接下载文件即可
  - 安装之后锁定包的版本，手动更改package.json文件安装将不会更新包，想要更新只能使用 npm install xxx@1.0.0 --save 这种方式来进行版本更新package-lock.json 文件才可以

故在安装包文件的时候，最好调用初始化命令，从而自动生成package.json和package-lock.json文件。

```
npm install
//文件会自动出现在package.json和package-lock.json当中

npm init
//建议的命令行操作
```

常用命令：

- npm init
  - npm init -y 可以跳过向导，快速生成
- npm install
  - 安装dependencies选项中的依赖项
- npm install 包名
  - 在5.0之前的版本只下载包名，不存储进package.json
  - 简写：npm i 包名
- npm install --save 包名
  - 在5.0之前的版本，下载并且保存依赖项（package.json）
  - 简写：npm install -S
- npm uninstall 包名
  - 在5.0版本之前只删除，如果有依赖项会依然保存
  - 在5.0版本之后，会删除依赖项
  - 简写：npm un 包名
- npm uninstall --save 包名
  - 在5.0版本之前删除的同时会删除依赖信息
  - 简写：npm un -S 包名
- npm --help
  - 查看使用帮助
  - npm 特定命令 --help：查看特定命令的使用帮助

### npm安装额外命令

```
# 安装模块到项目目录下
npm install moduleName

#安装特定版本
npm install moduleName@版本号

# -g 将模块安装到全局
npm install -g moduleName

# -save 的意思：安装模块的同时，在package文件的dependencies节点写入依赖
npm install --save moduleName

#--save-dev:安装模块的同时，在package文件的devDependecies节点写入依赖
npm install --save-dev moduleName

#npm的全局仓库路径前缀配置在prefix，查看prefix配置即可。
npm config get prefix
```

说明：

- 在5.0版本之后，--save 和没有 --save之间已经没有区别，所有npm安装的包都会安装在package文件中

### npm被墙问题

http://npm.taobao.org/淘宝的开发团队把npm在国内做了一个备份。

安装淘宝的cnpm：

```
npm intall --global cnpm
```

如果不想安装cnpm又想使用淘宝的服务器来下载：

```
npm install jquery --registry=https://registry.npm.taobao.org
```

但是每一次手动这样加参数很麻烦，所以我们可以把这个选项加入到配置文件中：

```
npm config set registry https://registry.npm.taobao.org

#检验是否配置成功
npm config list
```

只要经过上面命令的配置，则以后所有的`npm install`都会默认通过淘宝的服务器来下载。