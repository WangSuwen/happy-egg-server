# 腾讯云

## 参考：
> * 腾讯云大学 https://cloud.tencent.com/edu
> * 腾讯云计算学习路径课：https://cloud.tencent.com/edu/paths/series/cloudcomputing
> * Node开发环境部署到腾讯云 https://juejin.im/post/5abb32d2f265da23a141f35c


## 登陆服务 
* 购买腾讯云容器，购买后会把账号信息通过腾讯云站内信发给你，里面有公网ip和初始密码，后面ssh登陆会用到。
* 登陆云linux。本地Mac命令行输入：ssh root@xx.xx.xx.xx，根据提示输入密码即可。

## 安装Node环境
* `cd && mkdir download && cd download`
* 下载node： `wget https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.xz`
* 解压node文件：`tar xvf node-v12.13.0-linux-x64.tar.xz`
* 把解压好的文件移动到/opt/node下：
    * `mkdir /opt/node` 
    * `mv ~/download/node-v12.13.0-linux-x64 /opt/node`
* 创建软连接：
    * `ln -s /opt/node/node-v12.13.0-linux-x64/bin/node /usr/local/bin/node`
    * `ln -s /opt/node/node-v12.13.0-linux-x64/bin/npm /usr/local/bin/npm`
* 验证node与npm已经安装成功： 
    * `npm -v`
    * `node -v`


## 安装git
* 安装： `yum -y install git`，这种安装方式快捷，但只能安装较低版本。下面安装新版本git
* 删除已有git：`yum remove git`
* 下载源码包： `wget -O ~/download/git-2.21.0.tar.gz https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.21.0.tar.gz`
* 安装编译依赖：`yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker`
* 解压：
    * `tar -zxf ~/download/git-2.21.0.tar.gz`
    * `cd ~/donwload/git-2.21.0`
* 检验相关依赖，设置安装路径：`./configure --prefix=/opt/git`
* 编译安装：`make && make install`
* 配置PATH变量：
    * `vi /etc/profile`
    ```bash
    GIT_HOME=/usr/local/git
    export PATH=$PATH:$GIT_HOME/bin
    ```
    * `source /etc/profile`
* 使用https的链接git clone代码是比较简单的，如果用ssh则需要在本地生成SSH Key，目前优先使用https的方式，但可能会报`fatal: Unable to find remote helper for 'https'`，如果遇到该问题则：
    ```
    yum install curl-devel
    # cd to wherever the source for git is
    cd /usr/local/src/git-1.7.9  
    ./configure
    make
    make install
    ```


## 安装mongodb
* 下载源码：`wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.9.tgz`，事实证明，wget比curl下载快多了，curl应该适合做请求不适合下载包。看到很多教程用curl下载mongo包，说明一下。
* 解压：`tar -zxvf mongodb-linux-x86_64-4.0.9.tgz`
* 移动到合适目录 `mv mongodb-linux-x86_64-3.0.6 /opt/mongodb`
* 配置PATH：`vi /etc/profile`
* 创建配置文件：`cd /opt/mongodb && touch mongodb.conf` 输入:
    ```
    # Store data in /opt/mongodb/data instead of the default /data/db
    dbpath = /opt/mongodb/data

    # Append logs to /opt/mongodb/log/mongodb.log
    logpath = /opt/mongodb/log/mongodb.log
    logappend = true

    # Only accept local connections
    bind_ip = 127.0.0.1

    ```
    其中的`data`目录与`mongodb.log`文件要自己手动创建
* 启动mongod服务：`mongod --config /opt/mongodb/mongod.conf &`，后面加&是为了服务在后台运行

## 安装pm2
* 安装：`npm install pm2@latest -g`
* 启动node：`pm2 start express/app.js`


## 技巧篇
* 如何保持ssh服务连接不断开？
使用ssh命令时，可以增加ServerAliveInterval参数设置心跳时间，比如设置60秒发送一次心跳包：`ssh -o ServerAliveInterval=60 root@49.233.152.8`
详见：https://ngwind.github.io/2019/01/25/%E4%BF%9D%E6%8C%81ssh%E6%9C%8D%E5%8A%A1%E8%BF%9E%E6%8E%A5%E4%B8%8D%E6%96%AD%E5%BC%80%E7%9A%84%E6%96%B9%E6%B3%95/