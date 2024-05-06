---
outline: deep
---

# 文件加密

### 1、定义秘钥
```js
const crypto = require('crypto');
const key = Buffer.from('12efghyuio098uio14568745dfrgygvd');
const iv  = Buffer.from('xxaassasswsdfghj');
```

### 2、加密文件 
<code>*encryptFile*</code>

```js
var inputFilePath = 'D:/test.txt';
var outputFilePath = inputFilePath+'.enc'
let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let input = fs.createReadStream(inputFilePath);
let output = fs.createWriteStream(outputFilePath);
input.pipe(cipher).pipe(output);
cipher.on('error', function(err) {
    console.log(err);
})
input.on('end', function() {
    console.log('done');
})
```



### 3、解密文件
<code>*decryptFile*</code>

```js
var inputFilePath = 'D:/test.txt';
var outputFilePath = inputFilePath + '.dec';
let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let input = fs.createReadStream(inputFilePath);
let output = fs.createWriteStream(outputFilePath);
input.pipe(decipher).pipe(output);
decipher.on('error', function(err) {
    console.log(err);
});
input.on('end', function() {
    console.log('done');
});
```