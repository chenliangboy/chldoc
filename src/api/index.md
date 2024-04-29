---
outline: deep
---

# 第三方Api 文档


### <code>*axios*</code> 使用方法
1. 下载文件
```js
var path = '';
var url = '';
var writer = fs.createWriteStream(path);
axios.get(url,{responseType: 'stream'}).then(res=>{
    res.data.pipe(writer);
})
writer.on('finish',()=>{
    console.log('download success');
    writer.end();
});
```
2. 上传文件
```js
const FormData = require('form-data');
var filePath = '';
var url = '';
const formData = new FormData();
formData.append('file', fs.createReadStream(filePath), {
    filename: fileName,
});
const res = await axios.post(url,formData,{headers: {...formData.getHeaders()}});
console.log(res.data);
```
