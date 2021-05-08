# restful api

### 参考文档

知乎： https://www.zhihu.com/question/28557115/answer/48094438

阮一峰：http://www.ruanyifeng.com/blog/2014/05/restful_api.html

URI和URL：https://www.zhihu.com/question/21950864/answer/154309494

restful格式：https://blog.csdn.net/kebi007/article/details/102927209?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task



### URI和URL

- URI：统一资源标识符
- URL：统一资源定位符
- 两者的区别：
  - URI：以人为例，能够证明一个人是独一无二的存在，那么这个方法就可以称作为URI，比如说身份证号码，DNA，指纹，瞳膜
  - URL：同样以人为例，比如身份下面的地址，在标准人独一无二的同时，能够准备的寻找、定位到人，那个这种方式就称作为URL

### 协议

- API与用户的通讯协议，总是使用HTTPS协议



### 域名

- API放在主域名之下，复杂的话，可以专门开通一个单独的域名

```text
# 简单
https://example.com/api

# 复杂
https://api.example.com
```



### 版本

- 应该将API的版本号放入URL
  - 另一种做法，是将版本号放在HTTP头信息中，缺点是没有URL中直观
  - [github](https://developer.github.com/v3/media/#request-specific-version)采用这种做法

```text
https://api.example.com/v1/
```



### 路径

路径又称“终点”（endpoint），表示API的具体网址。

在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所有的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的“集合”（collection），所以API中的名词也应该使用复数。

举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样：

```text
https://api.example.com/v1/zoos
https://api.example.com/v1/animals
https://api.example.com/v1/employees
```



### HTTP动词

对于资源的具体操作类型，由HTTP动词表示。

常用的HTTP动词有下面五个（括号里是对应的SQL命令）

```text
GET(SELECT): 从服务器取出资源（一项或多项）
POST(CREATE): 在服务器新建一个资源
PUT(UPDATE): 在服务器更新资源（客户端提供改变后的完整资源）
PATCH(UPDATE): 在服务器更新资源（客户端提供改变的属性）
DELETE(DELETE): 从服务器删除资源
```

还有两个不常用的HTTP动词

```text
HEAD: 获取资源的元数据
OPTIONS: 获取信息，关于资源的哪些属性是客户端可以改变的
```

下面是一些例子

```text
GET /zoos: 列出素有动物园
POST /zoos: 新建一个动物园
GET /zoos/ID: 获取某个指定动物园的信息
PUT /zoos/ID: 更新某个指定动物园的信息（提供该动物园的全部信息）
PATCH /zoos/ID: 更新某个指定动物园的信息（提供该动物园的部分信息）
DELETE /zoos/ID: 删除某个动物园
GET /zoos/ID/animals: 列出某个指定动物园的所有动物
GET /zoos/ID/animals/ID: 删除某个指定动物园的指定动物
```



### 状态码

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

```text
200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
204 NO CONTENT - [DELETE]：用户删除数据成功。
400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
```

状态码的完全列表参见[这里](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

### 错误处理

如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

```text
{
    error: "Invalid API key"
}
```

### 返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范。

```text
GET /collection：返回资源对象的列表（数组）
GET /collection/resource：返回单个资源对象
POST /collection：返回新生成的资源对象
PUT /collection/resource：返回完整的资源对象
PATCH /collection/resource：返回完整的资源对象
DELETE /collection/resource：返回一个空文档
```

### 常用格式

- code：包含一个整数类型的HTTP响应状态码或内部制定的状态码
- status：包含文本：”success”，”fail”或”error”。HTTP状态响应码在500-599之间为”fail”，在400-499之间为”error”，其它均为”success”（例如：响应状态码为1XX、2XX和3XX）。这个根据实际情况其实是可要可不要的。
- message（msg）：当状态值为”fail”和”error”时有效，用于显示错误信息。参照国际化（il8n）标准，它可以包含信息号或者编码，可以只包含其中一个，或者同时包含并用分隔符隔开。
- data：包含响应的body。当状态值为”fail”或”error”时，data仅包含错误原因或异常名称、或者null也是可以的
  

对于合法的请求应该统一返回数据格式，以json为例：

```javascript
{
    "code":200 // 也可以是自己定义的状态码
    "message":"success" 
    "data":{
        "userName":"123456",
        "age":16,
        "address":"beijing"
    }
}
```

返回失败的响应json格式：

```javascript
{
    "code":401,
    "message":"error message",
    "data":null
}
```

