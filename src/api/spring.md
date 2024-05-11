---
outline: deep
---
# SpringMVC

### 配置类
1. 实现接口<code>*WebMvcConfigurer*</code>
```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer{

	private static final Logger log = LoggerFactory.getLogger(WebMvcConfig.class);

	//静态资源路径配置
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String path = "file:D:\\res\\";
		if (!PBUtils.isWindows()) {
			path = "file:/home/hnyun/res/";
		}
		log.error("path:{}",path);
		registry.addResourceHandler("/res/**").addResourceLocations(path);
	}

	//拦截器
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(getTokenIntercepter())
				.addPathPatterns("/api/**")
				.excludePathPatterns("/api/token/**").order(2);
		registry.addInterceptor(limiterIntercepter()).addPathPatterns("/**").order(1);
	}
	
}
```

### 启动扩展
1. 实现接口<code>*ApplicationRunner*</code> 顺序执行注解 <code>*@Order(1)*</code>
```java
	@Override
	public void run(ApplicationArguments args) throws Exception {
		log.error("ApplicationRunner");
		log.error("args:{}",args);
	}

```

2. 实现接口<code>*CommandLineRunner*</code>
```java
	@Override
	public void run(String... args) throws Exception {
		log.error("CommandLineRunner");
	}
```
3. 实现接口<code>*ApplicationListener*</code>
```java
public class ApplicationListenerTest implements ApplicationListener<ApplicationReadyEvent> {
	@Override
	public void onApplicationEvent(ApplicationReadyEvent event) {
		log.error("ApplicationReadyEvent");
		log.error("event:{}",event);
		log.error("event.getApplicationContext():{}",event.getApplicationContext());
	}
}

```
4. 实现接口<code>*SmartLifecycle*</code>



### 拦截器
1. 实现接口<code>*HandlerInterceptor*</code>
```java
public class LimiterIntercepter implements HandlerInterceptor {
	private static final Logger log = LoggerFactory.getLogger(LimiterIntercepter.class);
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String uri = request.getRequestURI();
		if (handler instanceof HandlerMethod) {
			HandlerMethod method = (HandlerMethod) handler;
		}
		if (uri.contains("token")) {
			return true;
		}
	}
}

```


