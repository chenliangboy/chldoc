---
outline: deep
---

# JavaScript 原生方法
###  1. <code>fetch</code> 用法
```js
var url = ``;
fetch(url)
    .then(res=> {return res.json()})//转化json格式
    .then(data=>{
        if (data.state && data.state > 0) {  
            //TODO 处理逻辑
        }
    });
```

###  2. <code>replace</code> 用法
```js

var str = "Hello World!";
var res = str.replace("World", "JavaScript");
console.log(res);

// 输出：Hello JavaScript!

var str = "Hello World!";
var res = str.replace(/World/g, "JavaScript");
console.log(res);
// 输出：Hello JavaScript!

var str = "Hello World!";
var host = 'o'
str = str?.replace(new RegExp(host, 'g'),'a');

console.log(str);
// 输出：Hella Warld!

```

###  3. <code>*EventEmitter*</code> 用法
```js
class App extends EventEmitter {}

const app = new App();
app.on('event', function (a, b) {
    console.log(a, b);
});

app.emit('event', 'a', 'b');

```

###  4. 自定义 <code>*Event*</code> 用法
```js
class Event {
    constructor() {
        this.events = {};
    }
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return this;
    }

    emit(event, data) {
        if (!this.events[event]) {
            return this;
        }
        this.events[event].forEach(callback => {
            callback(data);
        });
        retrurn this;
    }
}

class App extends Event {}

const app = new App();
app.on('event', function (a, b) {
    console.log(a, b);
});
app.emit('event', 'a', 'b');

```

###  5. <code>*dragable*</code> 监听拖拽移动事件
```js
document.getElementById('dragable').addEventListener('mousedown', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    document.onmousemove = function (e) {
        e.preventDefault();
        //鼠标移动 距离
        var moveX = e.clientX - x;
        var moveY = e.clientY - y;
        //通知客户端移动
        window.electron.ipcRenderer.send('moveWindow',{x:moveX,y:moveY});
    }
    document.onmouseup = function () {
        //鼠标松开
        document.onmousemove = null;
    }
});

```
