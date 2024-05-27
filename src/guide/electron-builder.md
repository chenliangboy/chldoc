---
outline: deep
---

# electron-builder 打包

### 配置文件
``` json
{
"build": {
    "appId": "xxx",
    "productName": "xxx",
    "win": {
      "icon": "./static/images/icon/smart.ico",
      "artifactName": "${name}-${version}.exe",
      "requestedExecutionLevel": "requireAdministrator",
      "target": [
        "nsis",//windows安装包
        "portable"//windows免安装 直接运行
      ]
    },
    "extraResources": {// from 文件夹内容 安装后 复制到 to 文件夹下
      "from": "./src/ico/",
      "to": "../"
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "./static/images/icon/smart.ico",
      "uninstallerIcon": "./static/images/icon/smart.ico",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }
}

```


### 自定义命令
```sh
electron-builder --win --x64 
  -c.appId=xxx 
  -c.win.artifactName=xxx.exe  
  -c.productName=xxx 
  -c.directories.output=../xxx/xxx 
  -c.win.icon=./xxx.ico 
  -c.nsis.installerIcon=./xxx.ico 
  -c.nsis.uninstallerIcon=./xxx.ico 

```