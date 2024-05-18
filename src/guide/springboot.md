---
outline: deep
---

### springboot maven 打包 jar 包

``` xml
<build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>${spring-boot.version}</version>
                <configuration>
                    <mainClass>com.pb.PowerboxApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

### sse通讯 <code>*SseEmitter*</code> 
```java
    @RequestMapping(value = {"/","index"},produces = "text/event-stream")
	public SseEmitter index() {
		SseEmitter emitter = new SseEmitter();
		executor.submit(()->{
			try {
                while (true) {
                    emitter.send(SseEmitter.event()
                            .name("message")
                            .data("Hello from the server! " + System.currentTimeMillis()));
                    Thread.sleep(3000); // 每3秒发送一次消息
                }
            } catch (IOException | InterruptedException e) {
                emitter.completeWithError(e);
            }
		});

		return emitter;
	}

```
