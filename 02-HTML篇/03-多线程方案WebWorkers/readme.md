# WebWorkers

### 环境

WebWorkers需要运行在服务器环境，故此处用express框架搭建了一个web服务器，public文件可以直接访问，便在此处建立WebWorkers。

运行项目`npm run start`

访问http:127.0.0.1:3000/webWorkers

### 说明

WebWorkers出现的原因：

- 无法利用多核CPU
- 错误会引起整个应用退出，应用健壮性值得考验
- 大量计算占用CPU导致无法继续调用异步I/O。比如JavaScript长时间执行会导致UI的渲染和响应被中断。

具体可以查看《深入浅出Node.js》第一章中单线程的描述。

### 使用

- 创建webWorker线程，该线程会执行JS代码
- 主线程监听message方法，webWorker线程通过postMessage与主线程通讯
- 调用terminate方法，关闭webWorker线程
