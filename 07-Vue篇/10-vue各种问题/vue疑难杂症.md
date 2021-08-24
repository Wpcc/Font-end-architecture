# Vue疑难杂症

### vscode类型检测错误

`Code -> preferences -> Settings -> User`，或者直接搜索`javascript.validate`，默认是`Enable`，把勾选去掉。

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

