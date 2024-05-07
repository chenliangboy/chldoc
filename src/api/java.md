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
