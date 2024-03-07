# vue3源码

### 调用createApp


`const app = ensureRenderer().createApp(...args)`

createApp中最关键的是以上代码，其中ensureRender主要返回一个对象，即：
```javascript
    return {
        render,
        hydrate,
        createApp:createAppAPI(render,hydrate)
    }
```

这里看一下`createAppAPI`函数：
```javascript
export function createAPI(render,hydrate?){
    return function createApp(rootComponent,rootProps = null){
        // 省略部分代码
    }
}
```
可以看出，`createAppAPI`主要将render,hydrate添加到createApp中，并返回一个`createApp`函数。

那么来看一下具体的`createApp`函数：
```javascript
    function createApp(rootComponent,rootProps = null){
       
        const app = (context.app = {
            get config(){},
            set config(){},
            use(){},
            mixin(){},
            component(){},
            directive(){},
            mount(){},
            unmount(){},
            provide(){},
            runWithContext(){}
        })

        return app
    }
```
可以看到，createApp函数主要创建一个app对象，该对象有诸多方法，并将该对象返回。


那么`const app = ensureRenderer().createApp(...args)`这段代码的作用就很容易理解了，**通过我们传递的参数，创建一个app对象。**

接下来看一下`createApp`整体代码：
```javascript
export const createApp = ((...args) => {
    // 通过...args 创建一个 app，并添加各种方法
    const app = ensureRenderer().createApp(...args)

    // 储存mount，并重写mount
    const {mount} = app

    app.mount = (containerOrSelector) => {}

    return app
})
```

### 调用mount
Here, let's go back to the very beginning of the code:
```javascript
const { createApp, reactive, ref } = Vue

  const app = createApp({
    setup() {
      const count = ref(0)
      const add = () => {
        count.value++
      }
      return {
        count,
        add
      }
    }
  }).mount('#app')

```
we can see that we done the createApp function and then we will call mount function.

because of vue rewrite mount function in createApp function, call mount function where is there.

let's see what the rewrite function does.

```javascript
app.mount = (containerOrSelector) => {
    // get root dom
    const container = normalizeContainer(containerOrSelector)

    const component = app._component

    // set template to component
    component.template = container.innerHTML

    container.innerHTML = ''
    
    const proxy = mount(container,false,container instanceof SVGElement)

    return proxy
}

```
the most important thing here is the mount function, we need to look at the specific implementation of the mount function.

```javascript
    mount(rootContainer,isHydrate,isSVG){
        if(!isMounted){
            // generated dom
            const vnode = createVNode(rootComponent,rootProps)

            if(isHydrate && hydrate){
                hydrate(vnode,rootContainer)
            }else{
                render(vnode,rootContainer,isSVG)
            }
        }
    }
```





