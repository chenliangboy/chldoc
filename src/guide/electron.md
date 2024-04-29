---
outline: deep
---

### 1.全局变量 <code>*global*</code>
```js

global.a = 1;
console.log(global.a);

```


### 2.进程通讯
主进程<code>*ipcMain*</code>
```js

const {ipcMain,BrowserWindow} = require('electron');

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg);
    event.reply('asynchronous-reply', 'pong');
    envent.sender.send('asynchronous-reply', 'pong');
})
ipcMain.handle('asynchronous-message', (event, arg) => {
    console.log(arg);
    return 'pong';
});

BrowserWindow.getCurrentWindow().webContents.send('asynchronous-message', 'ping');

```

渲染进程<code>*ipcRenderer*</code>
```js
const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.send('asynchronous-message', 'ping');
ipcRenderer.sendSync('synchronous-message', 'ping');

ipcRenderer.invoke('asynchronous-message', 'ping').then((result) => {
    console.log(result);
});

ipcrenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg);
});


```
