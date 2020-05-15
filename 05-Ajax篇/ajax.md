# ajax

### 资源

菜鸟教程：https://www.runoob.com/ajax/ajax-tutorial.html

《javascript高级程序设计》

### 说明

AJAX：Asynchronous JavaScript and XML（异步的JavaScript和XML）

AJAX最大的优点就是在**不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。**

### 核心

Ajax的核心是XHR

- XMLHttpRequest

### 实例

创建一个Ajax实例，通常需要三步

- 创建一个XMLHttpRequest实例
- 监听onreadystatechange事件
  - readyState
    - 
  - status（状态码）
- 向服务器发送请求
  - open
    - methods参数：请求的方法
    - url参数：请求的地址
    - async参数：是否异步（true，false）

#### readystatechange写法

```javascript
// ajax
let xhr = new XMLHttpRequest() 
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        // TODO
    }
}
xhr.open('get','http://127.0.0.1:3000',true)
xhr.send()
```

#### load写法

Firefox在实现XHR对象的某个版本，致力于简化异步交互模型。最终，Firefox实现中引入了load事件，用以替代readystatechange事件。

响应接受完毕后将触发load事件，因此也就没有必要去检测readyState属性。

而onload事件处理程序会接受到一个event对象，其target属性指向XHR对象实例（可以使用this），然而，并非所有的浏览器都为这个事件实现了适当的事件对象。

结果开发人员依旧要使用XHR变量（现在应该好多了）。

```javascript
var xhr = createXHR()
xhr.onload = function(){
    // 该判断为了严谨，演示时可以省略
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        // console.log(xhr.responseText)
    }else{
        console.log('request was unsuccessful:' + xhr.status)
    }
}
xhr.open('get','http://127.0.0.1:3000',true)
xhr.send()
```

