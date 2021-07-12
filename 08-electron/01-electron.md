# electron

简介：使用JavaScript、HTML和CSS构建跨平台的桌面应用程序

[官网](https://www.electronjs.org/)

### 流程模型

[官方文档](https://www.electronjs.org/docs/tutorial/process-model)

准确来讲，electron存在多个进程，这些进程又分为两大类，主进程以及渲染进程。

主进程：

- 每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 主进程在 Node.js 环境中运行，这意味着它具有 `require` 模块和使用所有 Node.js API 的能力。
- 人话：入口js文件

渲染进程;

- 每个 Electron 应用都会为每个打开的 `BrowserWindow` ( 与每个网页嵌入 ) 生成一个单独的渲染器进程。 洽如其名，渲染器负责 *渲染* 网页内容。 所以实际上，运行于渲染器进程中的代码是须遵照网页标准的 (至少就目前使用的 Chromium 而言是如此) 。

- 人话：页面js文件

### 通讯

主进程和渲染进程之间的通信。

比如在第一次加载时，主进程向渲染进程推送消息，为了确认页面渲染成功，那么必定：

```text
页面渲染成功（渲染进程告知主进程） ---> 主进程收到消息（将内容发送给渲染进程） 
```

以下以异步消息推送为例：

```javascript
// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})
```

主进程中，ipcMain 监听 `asynchronous-message` 事件，当该事件触发后（渲染进程触发），通过 event 去触发`asynchronous-reply`事件。

 ```javascript
 //在渲染器进程 (网页) 中。
 const { ipcRenderer } = require('electron')
 
 ipcRenderer.on('asynchronous-reply', (event, arg) => {
   console.log(arg) // prints "pong"
 })
 ipcRenderer.send('asynchronous-message', 'ping')
 ```

渲染进程确定页面加载后，触发`asynchronous-message`，同时渲染进程页面监听`asynchronous-reply`事件，当该事件触发后，进行相应操作。

- ipcRenderer可以主动推送消息
- 需要注意的是，如果主进程向渲染进程推送消息，那么第一次一定需要页面渲染完成后，才能进行推送

通过官方文档，**可以查看具体的 ipcMain 和 ipcRenderer，其实 ipcRenderer 是一个典型的 EventEmitter 的实例，也就是发布-订阅模式。**



