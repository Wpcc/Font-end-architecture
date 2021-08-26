# element问题

### 大图预览

大图预览添加点击遮罩层，预览图片消失。

```vue
<template>
	<el-image @click.stop="handleClickItem"/>
</template>
<script>
	handleClickItem(){
        this.$nextTick(() => {
        const dom = document.querySelector('.el-image-viewer__mask')
        console.log(dom)
        if (!dom) {
          return
        }
        dom.addEventListener('click', () => {
          document.querySelector('.el-image-viewer__close').click()
        })
      })
    }
</script>


```

### 表格

**自定义参数**

比如我们在使用表格事件时，该事件具有默认参数，但我们需要传递一个自定义参数，那么此时可以使用**回调**进行处理：

```javascript
@header-click="(column,event) => jump(column,event,1)"
```

**自定义事件**

属于JS范畴，比如我们需要使用该事件对象进行一些处理，同时需要传参的话：

```javascript
@click=some($event,1)
```



