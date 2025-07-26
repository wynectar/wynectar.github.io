```bash
人的一生总会与不同的人或者不同的物结下不解之缘，而与我们前端开发结下不解之缘的就有Nginx。
这篇文章不会告诉你详细的使用，只会让你完成Nginx环境的配置和项目代码的部署，我想这足以满足大部分人的需求。
```

# 简单了解 Nginx

Nginx 到底是什么？
- Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。
- Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。

Nginx 特点：
- 占有内存少
- 并发能力强

***Nginx 说白了就是我们前端需要部署代码的服务器，在这个服务器上我们可以两件事：1.获取数据的时候，可以对请求地址进行代理配置；2.把代码放在这个服务器上，别人就可以通过地址来访问我们的项目。*** 当然这个有个前提：网络环境要允许别人访问。

# Nginx 环境配置

Windows 系统下，我们可以随便放在一个位置，解压文件夹，通过双击nginx.exe启动，此过程简单易学，就不加以赘述。下面是Linux系统的配置情况：

## 安装依赖

俗话说，工欲善其事，必先利其器。在环境配置之前我们要下载好需要的依赖。

```bash
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```

下载压缩包（*nginx的某个版本*.tar.gz），[Nginx 下载地址](http://nginx.org/en/download.html)

```bash
建议下载稳定版本（Stable version），下面所讲内容以nginx-1.18.0为例
```

## 安装步骤
1. 进入到安装目录
```bash
cd /usr/local
```
2. 上传文件，选择下载的压缩包
```bash
rz
```
3. 解压压缩包
```bash
tar -zxvf nginx-1.18.0.tar.gz
```
4. 进入解压后的文件夹
```bash
cd nginx-1.18.0
```
5. 明确接下来编译文件的安装位置
```bash
./configure --prefix=/usr/local/nginx-1.18.0
```
6. 编译
```bash
make
make install
```
编译成功会出现*sbin*文件夹，若未出现，需检查是否报错。

## 启动服务
进入*sbin*文件夹，启动服务
```bash
cd sbin	
./nginx
```
执行以上命令后，通常会报以下错误，表示缺少日志文件。
```bash
nginx:  open() "/usr/local/nginx-1.18.0/logs/error.log" failed (2: No such file or directory)
open() "/usr/local/nginx-1.18.0/logs/access.log" failed (2: No such file or directory)
```
解决方案如下(通过以上报错，我们需要回退到*nginx-1.18.0*文件夹)：
```bash
mkdir logs		创建logs文件夹
touch error.log		创建error.log文件
touch access.log	创建access.log文件
```
再次进入 sbin 文件夹，输入 ./nginx 后就启动成功了。

## 代理配置

1. 配置步骤
```bash
cd /usr/local/nginx-1.18.0/conf    
vim nginx.conf		编辑nginx.conf文件
按键盘 a 键		开始编辑
按键盘 esc 键	        退出编辑
:wq			保存并退出
```
2. 配置内容(sever里面的部分配置，但这些足以满足大多数人的需求)
```js
server {
	# 端口号修改
        listen       8088;
        
	# 域名修改 默认：localhost
        server_name  xxx.yyy.com;

        location / {
            root   html;
            index  index.html index.htm;
        }

        # 配置代理 
	# /var 发送请求以此开头 例:axios.get(/var/api路径)  var是个变量，可以取任意名字
	# http://ip:port 代理地址
        location /var {
            rewrite  ^.+var/?(.*)$ /$1 break;
            include  uwsgi_params;
            proxy_pass   http://ip:port;
        }
}
```

3. 验证配置是否正确
```bash
cd /usr/local/nginx-1.18.0/sbin
./nginx -t
```
如出现以下信息，则表示配置成功，否则需要检查错误原因
```bash
nginx.conf syntax is ok
nginx.conf test is successful
```
# Code 部署

1. 首先找到部署目录
```bash
cd /usr/local/nginx-1.18.0/html
或
利用文件传输工具直接进入
```
2. 部署代码
```bash
rz   上传项目压缩包 xxx.zip
unzip xxx.zip
```

# 总结
1. 如果缺少命令，需要下载对应的命令
2. 常用的 Nginx 命令
```bash
./nginx -s stop			停止
./nginx -s quit			退出
./nginx -s reload		重启加载
```
3. 我实际碰到的问题，希望可以给你带来参考
- ping ip		机器是否可以ping通访问机器
- 防火墙		端口号是否允许被访问，默认80有防火墙设置
- 最基础的一点：ip地址有没有配置到可访问虚拟机上，比如阿里云，华为云等。！！！我当时因为这个原因校验了很久，其他的配置都是通的，然后外部机器不能访问，后来被通知，ip没有配置。

