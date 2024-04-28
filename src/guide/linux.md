---
outline: deep
---

# linux 常用命令


### 1. 后台启动 <code>*nohup*</code>
```sh

 nohup java -jar powerbox-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod >powerbox.log 2>&1 &

```

### 2. 查看进程 <code>*ps*</code>
```sh

ps -ef|grep `pwd`; \r

```

### 3. 强制重启 Tomcat <code>*kill -9*</code>
```sh

kill -9 $(ps -ef|grep java | grep `pwd` |grep -v grep | awk '{print $2}'); sleep 1;  ./bin/startup.sh ;tail -f ./logs/catalina.out ; \r

```

### 4. Tomcat日志 <code>*tail*</code>
```sh

tail -2000f ./logs/catalina.out; \r

```

