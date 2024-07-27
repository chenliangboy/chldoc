---
outline: deep
---

# Netty

### 服务端
```java

public class NettyServer {
    public static void main(String[] args) throws Exception {
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline().addLast(new NettyServerHandler());
                            ch.pipeline().addLast(new NettyServerHandler2());
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
        bootstrap.bind(8080).sync().channel().closeFuture().sync();
        bossGroup.shutdownGracefully();
        workerGroup.shutdownGracefully();
        System.out.println("服务端启动成功");
    }

```

### 协议升级
```java


```
