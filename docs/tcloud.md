# 腾讯云

## 参考：
> * 腾讯云大学 https://cloud.tencent.com/edu
> * 腾讯云计算学习路径课：https://cloud.tencent.com/edu/paths/series/cloudcomputing
> * Node开发环境部署到腾讯云 https://juejin.im/post/5abb32d2f265da23a141f35c


## 登陆服务 
* 购买腾讯云容器，购买后会把账号信息通过腾讯云站内信发给你，里面有公网ip和初始密码，后面ssh登陆会用到。
* 登陆云linux。本地Mac命令行输入：ssh root@xx.xx.xx.xx，根据提示输入密码即可。

## 搭建Node环境
* `cd /root && mkdir download && cd download`
* 下载node： `wget https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.xz`


## 技巧篇
* 如何保持ssh服务连接不断开？
使用ssh命令时，可以增加ServerAliveInterval参数设置心跳时间，比如设置60秒发送一次心跳包：`ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx`
详见：https://ngwind.github.io/2019/01/25/%E4%BF%9D%E6%8C%81ssh%E6%9C%8D%E5%8A%A1%E8%BF%9E%E6%8E%A5%E4%B8%8D%E6%96%AD%E5%BC%80%E7%9A%84%E6%96%B9%E6%B3%95/