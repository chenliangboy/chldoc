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

### 3.本地存储 <code>*ElectronStore*</code>

```js
const ElectronStore = require("electron-store");
const store = new ElectronStore({
    name: "app", // 存储的文件名
    cwd:'' //文件路径
});
store.set("foo", "bar");
store.get("foo");

```

### 4.更新升级 <code>*electron-updater*</code>

```js
const { autoUpdater } = require('electron-updater')
autoUpdater.setFeedURL('');//更新下载地址
autoUpdater.checkForUpdates();//检查更新

// 更新提示消息
let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
};

// 正在检测
autoUpdater.on('checking-for-update', function () {
    
});
// 有更新
autoUpdater.on('update-available', function () {
    
});
//无更新
autoUpdater.on('update-not-available', function () {
    
});
//下载进度
autoUpdater.on('download-progress', (progressObj) => {
    
})
//更新下载完成
autoUpdater.on('update-downloaded', function (event) {
    autoUpdater.quitAndInstall();//退出并安装
});
```

