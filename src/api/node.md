---
outline: deep
---

# Node 原生方法

###  1. cmd命令执行 <code>exec</code> 用法
```js
const { exec } = require('child_process');
const command = 'mvn clean package';
const childCommand = '';
exec(command,{cwd:childCommand}, function (error, stdout, stderr) {
    if (error) {
        console.log(error);
    } else {
        console.log('start success ......')
    }
    console.log(stdout);    
})

```
