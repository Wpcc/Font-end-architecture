# Vue疑难杂症

### vue按钮样式切换

通过HTML5提供的classList进行css类的添加和删除，代码如下：

```javascript
handleClick(e) {
    // 删除所有btn类中的clicked类，也就是点击后的样式
    document.querySelectorAll('.nav .btn').forEach(item => {
        item.classList.remove('clicked')
    })
    // 添加当前点击dom节点的样式
    e.target.classList.add('clicked')
}
```



### lodash

vue 使用lodash中的节流和防抖，需要将节流防抖直接定义在对象上，传入的函数应该为普通函数，这样this才会绑定到vue上。

```javascript
import _ from 'lodash'
export default{
  methods:{
    click:_.throttle(function(){
      console.log('hello')
      console.log(this)
    },1000)
  }
}
```



### 路由权限

- 第一种方法

  - 前端定义一个总路由表，从后台获取一个树形结构（路由权限），遍历树形结构生成左边的动态菜单（通过 name 去跳转）
  - 为了防止用户通过 url 访问没有权限的菜单，在路由拦截中`router.beforeEach`，遍历后台传过来的路**由权限**，如果用户访问的地址没有，则跳转到登录页面或显示无权限
  - 缺点：url 路径无法和菜单访问路径相对应

- 第二种方法

  - 后台无需修改菜单结构

    - 前端定义两个路由，静态路由（所有用户可以访问的路由）和动态路由（需要权限才能访问的路由），根据用户传递过来的**树形结构**或者**用户标识**，去匹配拥有的动态路由。使用`addRoutes`挂载静态路由 + 动态路由
    - 动态菜单根据路由去做渲染

  - 后台需要修改菜单结构

    - 前端定义两个路由，静态路由和动态路由（无值），根据用户传递过来的**树形结构**，去生产动态路由。使用`addRoutes`挂载静态路由 + 动态路由
    - 动态菜单根据路由去做渲染

    ```javascript
    /*
    	会遇到的问题，import无法导入动态组件
    	component: () => import('@/views/demo') 更改为
    	component: (resolve) => require([`@/views${item.path}`], resolve)
    */ 
    
    ```

    

vue使用动态路由，注销用户后，重新登录，该用户会拥有之前用户的路由页面，这是因为`addRoutes`并不会清除上一次用户的路由状态，刷新后才会清除。

所以，在用户注销时，需要调用路由中的方法（自己定义一个清除路由的方法）：

```javascript
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
  // 此处matcher官方没有说明，通过打印可以知道该字段包含所有路由：动态路由和静态路由
  // 具体查看 https://segmentfault.com/q/1010000018874231
}
```



