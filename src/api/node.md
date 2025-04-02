---
outline: deep
---

# Node 原生方法

###  1. *<code>exec</code>* cmd命令 
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

###  2. *<code>sqlite3</code>* 数据库

```js
// npm i sqlite3 --save
const sqlite3 = require('sqlite3').verbose();
var dbPath = path.join(StoreConstant.BASE_STATIC_RESOURCES_PATH,'./localfile.db');
const db = new sqlite3.Database(dbPath);
// 创建表
db.run(`CREATE TABLE IF NOT EXISTS files (
                name TEXT    PRIMARY KEY,
                path TEXT,
                type TEXT,
                size INTEGER
            );`);
// 保存数据 事务
db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    const stateMent = db.prepare("INSERT INTO files (name, path, type, size) VALUES (?, ?, ?, ?)");
    stateMent.run(fileName, filPath, fileType, stats.size);
    db.run('COMMIT');
});
// 查询数据
    async function search(key){
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM files where name like '%"+key+"%'", (err, rows) => {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(rows)
                }
            });
        });
    }
```

### 3. *<code>fast-glob</code>* 扫描磁盘 
```js
// npm i fast-glob --save
const fg = require('fast-glob');
// 忽略文件目录
const ignoreDirs = '!**/node_modules/**';
// 读取文件类型
const fileTypes = '{doc,docx,txt,xlsx,xls,ppt,mp4,png,jpg,pptx,pdf}';
// 扫描目录
const dirPath = '/Users/yangzhongwei/Downloads/';
const files = await fg([`**/*.${fileTypes}`, ignoreDirs], {
    cwd: dirPath
});
console.log(files);
```