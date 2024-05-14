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

### 5.单例 <code>*requestSingleInstanceLock*</code>

```js
const additionalData = { myKey: packageJson.cms_version }
const lock = app.requestSingleInstanceLock(additionalData);//锁定当前实例
if (!lock) {//锁定失败，已存在实例
    app.quit();//退出当前程序
}

```

### 6.清理缓存 <code>*clearStorageData*</code>

```js
const clearObj = {
  storages: ['appcache', 'cookies', 'filesystem', 'indexdb', 'localstorage', 'shadercache', 'websql', 'serviceworkers', 'cachestorage'],
};
BrowserWindow.getFocusedWindow().webContents.session.clearStorageData(clearObj);

```

### 7. 系统托盘 <code>*tray*</code>

```js
// 消息提示
window.flashFrame(true);
var count = 0;
var timer = setInterval(function () {
    if (count++ % 2 == 0) {
        tray.setImage(config.image.icon.tray);//正常图片
    } else {
        tray.setImage(nativeImage.createFromPath(null))//空图片
    }
    //循环播放声音
}, 600);

tray.on('mouse-move', () => {
    //鼠标移入托盘 闪烁时 显示飘窗
});

var trayBounds = tray.getBounds();//获取托盘图标位置
var point = screen.getCursorScreenPoint();//获取鼠标位置
if (point.x < trayBounds.x ...) {//鼠标移出托盘位置 隐藏飘窗

}
```

### 8. 接口桥接 <code>*preload.js*</code>
```js
var { contextBridge } = require('electron')
var { electronAPI } = require('@electron-toolkit/preload')
// 自定义接口
const api = {
  
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}


```

### 9. 自定义窗口移动 <code>*BrowserWindow*</code>
```js
const { ipcMain,BrowserWindow,screen } = require('electron')

ipcMain.on('moveWindow',(e,message)=>{
    const window = BrowserWindow.getFocusedWindow();
    var x = window.getBounds().x;
    var y = window.getBounds().y;
    window.setBounds({x:x+message.x,y:y+message.y});
})

```

### 10. 窗体隐藏显示 <code>*BrowserWindow*</code>

```js
// 监听窗体离开点击事件
mainWindow.on('blur',()=>{
    mainWindow.hide();
})
// 监听托盘点击事件
tray.on('click', () => {
  if (global.mainWindow) {
    global.mainWindow.show();
  }
})
// 解决窗口闪烁
app.commandLine.appendSwitch('wm-window-animations-disabled');

```

### 11. 注册快捷键 <code>*globalShortcut*</code>
```js
globalShortcut.register('Ctrl+Space', () => {
  global.mainWindow.isVisible() ? global.mainWindow.hide() : global.mainWindow.show();
})

```
