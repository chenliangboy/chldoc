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

