---
outline: deep
---

# Java 原生

### 一、观察者模式
1. 被观察者 <code>*Weather*</code> 继承 <code>*Observable*</code> 

```java
public class Weather extends Observable {

    public void sendWeather() {
        setChanged();
        notifyObservers("天气晴朗");
    }
}

```

2. 观察者 <code>*Person*</code> 实现 <code>*Observer*</code>

```java
public class Person implements Observer {
    @Override
    public void update(Observable o, Object arg) {
        System.out.println("收到通知：" + arg);
        System.out.println("收到通知：" + o);
    }
}
```

3. <code>*Weather*</code> 数据发送变化，通知 <code>*Person*</code> 

```java
public static void main(String[] args) {
    Weather weather = new Weather();
    Person person = new Person();
    weather.addObserver(person);
    weather.sendWeather();
}
```

### 二、并发编程

#### 1.  <code>*CountdownLatch*</code>
```java
//自定义线程类
class ExecRunnable implements Runnable{
	private int number;
	private Consumer<Integer> consumer;
	private CountDownLatch latch;
	
	public static ExecRunnable init(int number,Consumer<Integer> consumer,CountDownLatch latch) {
		return new ExecRunnable(number, consumer,latch);
	}
	
	private ExecRunnable(int number,Consumer<Integer> consumer,CountDownLatch latch) {
		this.number = number;
		this.consumer = consumer;
		this.latch = latch;
	}
	@Override
	public void run() {
		try {
			latch.await();
			consumer.accept(number);
		} catch (Exception e) {
			
		}
	}
}
//定义执行方法
public static <T> void run(int count,Consumer<Integer> consumer) {
	CountDownLatch latch = new CountDownLatch(1);
	ExecutorService executorService = Executors.newFixedThreadPool(count);
	for (int i = 0; i < count; i++) {
		executorService.submit(ExecRunnable.init(i, consumer,latch));
	}
	latch.countDown();
	executorService.shutdown();
}
private static Integer a = 1;
//定义业务方法
public static void execute(int number) {
	if (a > 0) {
		System.err.println("第" + number + "位命中目标！");	
		a --;
	}else {
		System.err.println("第" + number + "位未命中目标！");	
	}
}
//执行
int count = 10;
AppUtils.run(count, CountApp::execute);
System.err.println("执行完毕！");

```

#### 2. <code>*ReentrantLock*</code>

```java
Lock lock = new ReentrantLock();
lock.lock();
lock.unlock();

```



## 三、函数式编程
### 1. <code>*Consumer*</code> 
一个参数无返回值
```java
public static void say(String msg){
	System.out.println(msg);
}

Consumer<String> consumer = AppUtils::say;
consumer.accept("hello world");


```

### 2. <code>*Function*</code> 
一个参数一个返回值
```java
public static String say(String msg){
	return "now saying" + msg;
}
Function<String,String> function = AppUtils::say;
System.out.println(function.apply("hello world"));

```

### 3. <code>*Predicate*</code> 
一个参数返回boolean
```java
public boolean isTrue(String msg){
	return msg.equals("hello world");
}
Predicate<String> predicate = AppUtils::isTrue;
System.out.println(predicate.test("hello world"));

```

### 4. <code>*Supplier*</code> 
无参数返回值
```java
public static String say(){
	return "hello world";
}
Supplier<String> supplier = AppUtils::say;
System.out.println(supplier.get());


```

### 5. 过滤器 <code>*Filter*</code>

```java
@WebFilter(urlPatterns="/septers/**",filterName="initFiter")
public class InitFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		//System.err.println("过滤器执行方法-----------");
		chain.doFilter(request, response);
	}
	
}

```






