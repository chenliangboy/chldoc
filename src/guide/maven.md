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