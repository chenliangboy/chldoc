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

## 二.Spring 注入类