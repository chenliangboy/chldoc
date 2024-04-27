---
outline: deep
---
# SpringMVC

## 一、配置

### 静态资源配置
1. 实现接口<code>*WebMvcConfigurer*</code>
2. 实现方法<code>*addResourceHandlers*</code>
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
	
}
```