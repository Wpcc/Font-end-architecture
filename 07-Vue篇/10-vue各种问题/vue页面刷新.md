# Vue页面刷新

### vue页面刷新解决方案

我们在写项目的时候，经常会遇到，用户执行完某个动作，改变了某些状态，需要重新刷新页面，以此来重新渲染页面。如：用户登录成功、增加、删除、更新等。

- 原始方法：

```javascript
location.reload()
```

- vue自带路由跳转：

```javascript
this.$router.go(0)
```

这两种方式会重新加载页面，也就是整个页面，包括vuex中的数据都会丢失，从而会造成闪屏效果。

那么可以选择第三种方式，对路由载体`router-view`进行隐藏显示，这样仅仅是该载体所呈现的组件会重新加载，页面仅缓慢的加载并不会造成闪屏效果。

具体代码如下：

```vue
// app.vue 页面，使用provide提供变量
<template>
    <div id="app">
    	<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>
<script>
    export default {
        name: 'App',
        // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。 
        provide () {                                             
            return {
                reload: this.reload                                 
            }
        },
        data() {
            return{
                isRouterAlive: true  //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;  //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true; //再打开
                }) 
            }
        }，
    }
</script>
```

在刷新的组件中写如下代码：

```javascript
export default {
    inject:['reload'],
    data(){
        return {
            
        }
    },
    method:{
        loadPage(){
            this.reload() // 调用父元素注册方法
        }
    }
}
```

**provide 和 inject 不支持数据响应式。**

如果需要传递响应式数据，则需要将数据包裹在对象中（这是因为对象是引用类型）：

```javascript
provide(){
    return {
        proObj
    }
},
data(){
    return {
        proObj:{}
    }
}
// 设置数据
this.$set(proObj,'',)
```

```javascript
inject:['proObj']
```

