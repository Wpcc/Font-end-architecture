# node起步

### 安装node环境

- 查看当前Node环境的版本号
- 下载：https://nodejs.org/en/download
- 安装
- 确认Node环境是否安装成功
  - 打开命令行输入`node -v`或者`node --version`
- 环境变量

### node API

- node.js 和 JavaScript 的区别
- 文件读写

### path

- path.join
  - 把各个path片段连接在一起
- path.resolve
  - 把'/'当成根目录，解析路径并返回

```javascript
// 案例一
path.join('/a','/b')
// outputs '/a/b'
path.resolve('/a','/b')
// outputs '/b'

// 案例二
path.join('a','b1','..','b2')
// outputs a/b2
path.resolve('a','b1','..','b2')
// outputs /home/myself/node/a/b2
```

### url

- url.parse
  - 解析浏览器地址

```javascript
var url = require('url')
url.parse('http://www.baidu.com/baike?name=zhangsan&age=27')

/*
Url {
  protocol: 'http',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname:'www.baidu.com,
  hash: null,
  search: '?name=zhangsan&age=27',
  query: 'name=zhangsan&age=27',
  pathname: '/baike',
  path: '/baike?name=wpc&age=27',
  href: 'www.baidu.com/baike?name=zhangsan&age=27' }
*/
```

### 中间件

- 程序本身所不具有的功能
  - 就比如一个对象，只有一个方法，然后给它添加一个方式就是中间件

```javascript
let person = {
    name:'zhangsan',
    say:function(){
        console.log('hello!')
    }
}
person.angry = function(){
    console.log('shut up!') // 类似于中间件
}
```

### cookie、session和token

- cookie
  - 4k大小
  - 同一个域名或同路径会继承cookie？

- session

  - 加密字符串

  - 下载express-session模块

  - 使用：

   ```javascript
    // app.js
    let express = require('express')
    let session = require('express-session')
    
    app.use(session({
        secret:'keyboard cat' // 加密字符串
        resave:false // 每次请求都重新设置cookie中的session
        saveUninitialized:true // 页面没有设置session值，是否生出sessionId给cookie
    }))
   ```

   ```javascript
    // router 模块
    let express = require('express')
    let router = express.Router()
    
    router.get('api/music',(req,res) => {
        // sql 语句
        req.session.id = userId // 设置session值
        req.session.id  // 获取session值
    })
   ```

  - session的流程解释
    - 服务器本身有个关于session的映像，如果不做持久化存储，一般会存在于内存中
    - 当浏览器通过cookie，将sessionID发送给服务器，服务器通过`req.session.id`从服务器存储的映射中拿出session的值，如果sessionID错误，则为空。
    - 缺点：当客户量大，服务器会开辟很大的空间用于存储sessionID的值。
  
- token

  - 为了解决服务器空间，以及集群的问题，出现了token。简而言之，就是将不重要的信息通过加密和该信息一起发给浏览器。
  - 浏览器将token值发送给服务器，服务器通过同样的方式加密该信息和之前的加密进行对比，从而验证浏览器的身份。
  - 插件使用：jsonwebtoken，express-jwt
  - https://www.jianshu.com/p/9b71a1582c40