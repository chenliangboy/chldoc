---
outline: deep
---

# JavaScript 原生方法
###  1. <code>fetch</code> 用法
```js
// get 请求
var url = ``;
fetch(url)
    .then(res=> {return res.json()})//转化json格式
    .then(data=>{
        if (data.state && data.state > 0) {  
            //TODO 处理逻辑
        }
    });

// post 请求
var data = {};
fetch(url,{
    method: 'POST',//请求方式
    headers: {
        'Content-Type': 'application/json'//请求头
    },
    body: JSON.stringify(data)//请求体
}).then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
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

###  6. <code>*confirm*</code> 原生使用
```js
if (confirm('确定删除吗？')) {
    console.log('执行删除');
}else{
    console.log('取消删除');
}
```

###  7. <code>*confirm*</code> 自定义样式


```js
function customAlert(message, duration) {
    // 创建提示框元素
    var alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.textContent = message;
    
    // 将提示框添加到DOM中
    document.body.appendChild(alertBox);
    
    // 设置定时器自动关闭提示框
    setTimeout(function() {
        alertBox.style.opacity = 0;
        setTimeout(function() {
            document.body.removeChild(alertBox);
        }, 500); // 等待过渡效果完成后再移除
    }, duration);
}

// 使用示例
customAlert("这是一个自定义的提示信息，将在3秒后自动关闭。", 3000);

```

```css
.custom-alert {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px;
    background-color: #333;
    color: white;
    border-radius: 5px;
    opacity: 1;
    transition: opacity 0.5s ease-out;
    z-index: 1000;
    text-align: center;
}
```

### 8. <code>*prompt*</code> 原生使用
```js
var userInput = prompt("请输入您的名字:", "guest");

if (userInput !== null) {
    // 用户输入了内容并点击了确定
    console.log("欢迎，" + userInput + "！");
} else {
    // 用户点击了取消或直接关闭了对话框
    console.log("您没有输入名字。");
}

```

### 9. <code>*eval*</code> 动态执行
```js
function say(msg){
    console.log(msg);
}

var fnString = `say("Hello World!")`;

eval(fnString);


```

### 10. <code>*EventSource*</code> sse通讯
```js
var source = new EventSource('http://10.0.4.41:8099/api/sse/');
source.onmessage = function(e) {
    var content = document.getElementById('content');
    var newMessage = document.createElement('p');
    console.log(e);
    newMessage.textContent = e.data;
    content.appendChild(newMessage);
};

source.onerror = function(event) {
    console.error("Error occurred:", event);
};

```

### 11. 页面通讯 <code>*window.postMessage*</code> <code>*window.addEventListener*</code> 
```js
//发送
window.opener.postMessage('Hello from Page A', 'https://example.com');

// 监听
window.addEventListener('message', function(event) {
    if (event.origin !== 'https://example.com') return; // 确保消息来源安全
    console.log('Received message:', event.data);
}, false);

```

### 12. 页面通讯 <code>*BroadcastChannel*</code>
```js
    // 创建一个通道
   const bc = new BroadcastChannel('my-channel');

   // 发送消息
   bc.postMessage('Hello from Channel.');

   // 接收消息
   bc.onmessage = function(event) {
       console.log('Received message:', event.data);
   };
```

### 13. 地址解析 <code>*URL*</code>
```js
var url = new URL('https://example.com/path?query=string#hash');
console.log(url.protocol);
console.log(url.hostname);
console.log(url.pathname);
console.log(url.searchParams.get('query'));

top.window.getParam = (key) => new URL(window.location.href).searchParams.get(key);
console.log(getParam('query'));

```

## 14. 通讯 <code>*WebSocket*</code>
```js
var url = 'ws://10.0.4.41:8099/api/ws/';
var ws = new WebSocket(url);
ws.onopen = function() {
    console.log('WebSocket连接成功');
    ws.send('Hello, Server!');
}

ws.onmessage = function(event) {
    console.log('收到服务器消息：', event.data);
    ws.close();
}

ws.onclose = function() {
    console.log('WebSocket连接已关闭');
}

ws.onerror = function(error) {
    console.error('WebSocket连接发生错误：', error);
}

```

## 15. 数组队列 <code>*push && shift*</code>
```js
var datas = [];
// push 入队
datas.push('a');
datas.push('b');
datas.push('c');
console.log(datas); // [ 'a', 'b', 'c' ]
// shift 出队
console.log(datas.shift()); //a
console.log(datas); // [ 'b', 'c' ]
console.log(datas.shift()); //b
console.log(datas); // [ 'c' ]
datas.push('d');
console.log(datas); // [ 'c', 'd' ]

```

## 16. Function.prototype <code>*apply*</code> <code>*call*</code> <code>*bind*</code>
```js

function add(a, b) {
    return a + b;
}

add.apply(null, [1, 2]);//接收参数数组
add.call(null, 1, 2);//接收固定参数
add.bind(null, 1, 2)();//接收固定参数，切换this，返回函数
```

## 17. 函数防抖 <code>*debounce*</code>
```javascript
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// 使用示例
function handleInput(e) {
  console.log('Input event triggered with value:', e.target.value);
}

const debouncedHandleInput = debounce(handleInput, 300);

// 假设这是输入框的事件监听
document.getElementById('inputBox').addEventListener('input', debouncedHandleInput);

```

## 18. 事件触发 <code>*dispatchEvent*</code>
```js
var inputElement = document.getElementById('yourInputId');
inputElement.value = '模拟输入的文本';
inputElement.dispatchEvent(new Event('input', { bubbles: true }));
inputElement.dispatchEvent(new Event('change', { bubbles: true }));
```

## 19. 反射和代理 <code>*Reflect*</code> <code>*Proxy*</code>
```js
    var target = {
        foo: 1,
        bar: 2
    };
    var handler = {
        get: function(target, key, receiver) {
            console.log('getting ' + key);
            return Reflect.get(target, key, receiver);
        },
        set: function(target, key, value, receiver) {
            console.log('setting ' + key + ' to ' + value);
            return Reflect.set(target, key, value, receiver);
        }
    };
    var proxy = new Proxy(target, handler);
    proxy.foo;
    proxy.bar = 3;
    console.log(proxy.bar);
    console.log(target.bar);
    console.log(proxy.foo);

    Reflect.apply(console.log, console, ['hello world']);
```

## 20. 全局Event事件处理 <code>*EventEmitter*</code>

::: code-group
```js [GlobalEvent.js]
import { EventEmitter } from 'events';
export const event = new EventEmitter();

```
```js [sender.js]
import { event } from './GlobalEvent';
event.on('message', (data) => {
    console.log('Received message:', data);
})

```
```js [reciever.js]
import { event } from './GlobalEvent';
event.emit('message', 'Hello, World!');

```
:::