---
outline: deep
---

# 指南

### 导出配置文件 
<code>*module.exports*</code>
``` js
module.exports = {
    appId: 'xxx',
    config:{},
    data:[{}]
}
```

### 自定义类
<code>*class*</code>
``` js
class Person {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getName(){
        return this.name;
    }
}
module.exports = Person;
```

### 工具类
<code>*util*</code>
``` js
class AppUtils {
    static getName(name){
        return name;
    }
}

module.exports = AppUtils;
```

