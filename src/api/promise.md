---
outline: deep
---

# Promise用法

### 1、定义
<code>*new Promise(executor)*</code>

```js
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data')
        },1000);
        reject('error');
    })
}
```

### 2、使用
<code>*async await then*</code> 

```js
async function getPromiseData() {
    const data = await getData();
    console.log(data);
}

getData().then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
```
