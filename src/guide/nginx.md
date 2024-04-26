---
outline: deep
---

# 部署vue项目 https证书

### https
```nginx
server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name  _;

        ssl_certificate "/home/hnyun/https/hnyun.vip.pem";
        ssl_certificate_key "/home/hnyun/https/hnyun.vip.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers PROFILE=SYSTEM;
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        location / {
                root /home/hnyun/web;
                index  index.html index.htm;
                try_files  $uri $uri/ /index.html;
        }
        location /AiyL7M02i3.txt {
                root /home/hnyun;
                index AiyL7M02i3.txt;
        }
        location /pb/ {
               proxy_pass http://127.0.0.1:8866/;
               proxy_set_header Host $host;                                                                                                  
        }
   }
```


### gzip缓存
``` nginx
    gzip  on;                     #开启gzip
    gzip_min_length  1k;          #最小压缩大小
    gzip_buffers     4 16k;       #压缩缓冲区
    #gzip_http_version 1.0;        #压缩版本
    gzip_comp_level 9;            #压缩等级
    gzip_types   text/plain application/x-javascript text/css application/xml application/javascript text/javascript application/x-httpd-php image/jpeg image/gif image/png;  #压缩类型
    gzip_vary off;
    gzip_disable "MSIE [1-6]\.";
```