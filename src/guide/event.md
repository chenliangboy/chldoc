---
outline: deep
---

# Event 事件通知模式

## 一.自定义注解
1. <code>*@AppEventListener*</code> 注解标记监听回调对象
```java
@Retention(RUNTIME)
@Target(TYPE)
@Import({com.septer.event.EventRegister.class,com.septer.event.AppEventUtils.class})
public @interface AppEventListener {
	//主题
	String topic();
	//标签
	String tag();
}
```
<code>@Import</code> Spring 动态注入类注解

2. <code>*@OnEventMessage*</code> 注解标记监听方法
```java
@Retention(RUNTIME)
@Target(ElementType.METHOD)
public @interface OnEventMessage {
	//数值
	String name() default "";
}
```

## 二.管理类
1. <code>*AppEventService*</code> 
2. 定义map集合,类名集合：<code>*beanNameMap*</code>,方法集合：<code>*methodMap*</code>
```java
	public static Map<String, String> beanNameMap = new HashMap<>();
	public static Map<String, Method> methodMap = new HashMap<>();
```
3. 定义方法 写入 获取
```java
	public static void putBeanName(String key, String beanName) {
		
	}
	
	public static String getBeanName(String key) {
		return null;
	}
	
	public static void putMethod(String key, Method method) {
		
	}
	
	public static String putMethod(String key) {
		return null;
	}

```
## 三.Spring 注入类 <code>*EventRegister*</code>
1. 实现接口<code>*ImportBeanDefinitionRegistrar*</code>,方法<code>*registerBeanDefinitions*</code>
```java
public class EventRegister implements ImportBeanDefinitionRegistrar{

	@Override
	public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
		
	}
}
```
1. 获取加入注解<code>*@AppEventListener*</code>的类
```java
	String[] beanDefinitionNames = registry.getBeanDefinitionNames();
	for (int i = 0; i < beanDefinitionNames.length; i++) {
		String beanName = beanDefinitionNames[i];
		BeanDefinition beanDefinition = registry.getBeanDefinition(beanName);
		String beanClassName = beanDefinition.getBeanClassName();
		if (StringUtils.isEmpty(beanClassName)) continue;
		Class<?> class1;
		try {
			class1 = Class.forName(beanClassName);
			this.handleClass(class1, beanName);
		} catch (ClassNotFoundException e) {
			throw new NullPointerException("当前Class不存在");
		}
	}
	private void handleClass(Class<?> class1,String beanName) {
		if (class1 == null) return;
		AppEveneListener annotation = class1.getAnnotation(AppEveneListener.class);
		if (annotation == null) return;
		String topic = annotation.topic();
		String tag = annotation.tag();
		String classKey = topic + tag;
		if (AppEventService.isClassExist(classKey)) throw new NullPointerException("事件监听类不能重复！");
		
		AppEventService.beanNameMap.put(classKey, beanName);
		log.info("Class 装配成功！");
		this.handleMethod(class1, classKey);
	}
```
1. 获取加入注解<code>*@OnEventMessage*</code>的方法
```java
	private void handleMethod(Class<?> class1,String key) {
		Set<Method> methods = this.getMethodWithAnnotation(class1, OnEventMessage.class);
		for (Method method : methods) {
			OnEventMessage annotation2 = method.getAnnotation(OnEventMessage.class);
			if (annotation2 == null) continue;
			String name = annotation2.name();
			String methodKey = key + name;
			if (AppEventService.isMethodExist(methodKey)) throw new NullPointerException("事件监听方法不能重复！");
			AppEventService.methodMap.put(methodKey, method);
			log.info("Method 装配成功！");
		}
		
	}
	//解析加入注解的所有方法
	private Set<Method> getMethodWithAnnotation(Class<?> class1,Class<? extends Annotation> annotationClass){
		Set<Method> set = new HashSet<>();
		Method[] declaredMethods = class1.getDeclaredMethods();
		if (declaredMethods.length > 0) {
			for (Method method : declaredMethods) {
				Annotation annotation = method.getAnnotation(annotationClass);
				if (annotation != null) {
					set.add(method);		
				}
			}
		}
		return set;
	}
```
## 四.工具类 <code>*AppEventUtils*</code>  
```java
	public class AppEventUtils implements BeanFactoryAware{

	public static BeanFactory beanFactory;
	
	
	public static void sendEvent(AppEvent<?> appEvent) {
		//根据appEvent的信息 找到监听类和方法，反射执行
		String topic = appEvent.getTopic();
		String tag = appEvent.getTag();
		String message = appEvent.getMessage();
		
		String  beanName = AppEventService.beanNameMap.get(topic+tag);
		Object object = beanFactory.getBean(beanName);
		Method method = AppEventService.methodMap.get(topic+tag+message);
		try {
			method.invoke(object, appEvent);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void setBeanFactory(BeanFactory beanFactory) {
		AppEventUtils.beanFactory = beanFactory;
	}
	
	}
```

## 五.事件消息类 <code>*AppEvent*</code>  
```java
public abstract class AppEvent<T> {

	private String topic;
	private String tag;
	private String message;
	private T data;
	
	public AppEvent(String topic,String tag,String message, T data) {
		this.topic = topic;
		this.tag = tag;
		this.message = message;
		this.data = data;
	}

	public boolean execute(T t) {
		return false;
	};
}
```

## 六.使用
1. 监听类<code>*MessageAppEventListioner*</code>,注解<code>*@AppEventListener*</code>
2. 定义topic和tag
3. 监听方法<code>*message*</code>,注解<code>*@OnEventMessage*</code>
4. 回调<code>*AppEvent*</code>子类
```java
@Service
@AppEveneListener(topic = "septer", tag = "tag1")
public class MessageAppEventListioner {

	private static final Logger log = LoggerFactory.getLogger(MessageAppEventListioner.class);
	
	@OnEventMessage(name = "message")
	public void message(MessageAppEvent messageAppEvent) {
		boolean execute = messageAppEvent.execute(messageAppEvent.getData());
		//Message data = messageAppEvent.getData();
		
		if (execute) {
			log.info("执行成功！");
		}
	}
}
``` 
5. 继承<code>*AppEvent*</code>
```java
public class MessageAppEvent extends AppEvent<Message>{

	public MessageAppEvent(String topic, String tag,String message, Message data) {
		super(topic, tag,message, data);
	}

	@Override
	public boolean execute(Message message) {
		@SuppressWarnings("unused")
		String content = message.getContent();
		//TODO 处理业务逻辑
		return true;
	}
}
```
6. 自定义消息 <code>*Message*</code>内容
```java
public class Message implements Serializable{
	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private String content;
}

```