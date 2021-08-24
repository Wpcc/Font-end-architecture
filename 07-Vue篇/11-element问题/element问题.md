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

