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

#### 2. <code>*CyclicBarrier*</code>







