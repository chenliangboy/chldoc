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
1. 服务器端 
```java
    @RequestMapping(value = {"/","index"},produces = "text/event-stream")
	public SseEmitter index() {
		SseEmitter emitter = new SseEmitter();
        int i = 0;
		executor.submit(()->{
			try {
                while (true) {
                    emitter.send(SseEmitter.event()
                            .name("message")
                            .data("Hello from the server! " + System.currentTimeMillis()));
                    Thread.sleep(3000); // 每3秒发送一次消息
                    if (i > 10) {
                        emitter.complete();
                        break;
                    }
                    i++;
                }
            } catch (IOException | InterruptedException e) {
                emitter.completeWithError(e);
            }
		});

		return emitter;
	}

```
2. 客户端请求 okhttp
```java
private final static OkHttpClient HTTP_CLIENT = new OkHttpClient.Builder().connectTimeout(90, TimeUnit.SECONDS) // 连接超时
            .readTimeout(90, TimeUnit.SECONDS) // 读取超时
            .writeTimeout(90, TimeUnit.SECONDS) // 写入超时
            .build();
public static void chat( String messages) throws IOException {
        String requestBody = new JSONObject().putOpt("prompt", messages).putOpt("stream", true).toString();
        
        Request okhttpRequest = new Request.Builder().url(CHAT_COMPLETION_URL).post(RequestBody.create(requestBody, MediaType.get(ContentType.JSON.toString()))).build();
        Call call = HTTP_CLIENT.newCall(okhttpRequest);
        Response okhttpResponse = call.execute();
        BufferedReader reader = new BufferedReader(okhttpResponse.body().charStream());
        String line;
        while ((line = reader.readLine()) != null) {
            if (StrUtil.isBlank(line)) {
                continue;
            }
            System.err.println(line);
        }
}

```

