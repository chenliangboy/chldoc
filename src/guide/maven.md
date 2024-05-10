---
outline: deep
---

# Maven 

### 推送仓库
<code>*mvn deploy*</code>
```sh

mvn deploy:deploy-file -DgroupId=com.xxx -DartifactId=xxx -Dversion=0.0.1 -Dpackaging=jar 
-Dfile=D:\xxx.jar -Durl=http://xxx/repository/maven-snapshots/ -DrepositoryId=nexus-snapshots

```

### 导出使用的第三方jar
<code>*mvn dependency:copy-dependencies*</code>
```sh
mvn dependency:copy-dependencies -DoutputDirectory=E:\xxx\lib  -DincludeScope=runtime

java -jar -Dload.path=/lib xxx.jar
```
