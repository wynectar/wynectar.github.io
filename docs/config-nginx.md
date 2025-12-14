---
outline: deep
navbar: false
sidebar: false
---

# 前端与Nginx的不解之缘——Nginx配置和Code部署

Nginx 到底是什么？

- Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。
- Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。

Nginx 特点：

- 占有内存少
- 并发能力强

**_Nginx 说白了就是我们前端需要部署代码的服务器，在这个服务器上我们可以两件事：1.获取数据的时候，可以对请求地址进行代理配置；2.把代码放在这个服务器上，别人就可以通过地址来访问我们的项目。_** 当然这个有个前提：网络环境要允许别人访问。

## Nginx 的下载地址

下载安装包 [Nginx 的下载地址](http://nginx.org/en/download.html)

建议下载稳定版本（Stable version），以nginx-1.18.0为例：

```bash
linux环境："nginx-1.18.0"
windows环境："nginx/Windows-1.18.0 "
```

## Windows系统安装及配置

### 安装

Windows 系统下，我们可以随便放在一个位置，解压文件夹，通过双击nginx.exe启动，此过程简单易学，就不加以赘述。

### 启动服务

可以通过命令启动，也可以通过双击nginx.exe启动。

### 查看nginx是否启动成功

直接再网页输入：**127.0.0.1**，注意此时是默认端口号：80，如果你的端口号发生变化，请输入：**127.0.0.1:port**
页面有如下提示，则表示安装并启动成功：

```bash
Welcome to nginx!
If you see this page, the nginx web server is successfully installed and working. Further configuration is required.

For online documentation and support please refer to nginx.org.
Commercial support is available at nginx.com.

Thank you for using nginx.
```

### 代理配置

直接打开 **nginx-1.18.0/conf/nginx.conf** 进行修改。

## Linux系统安装及配置

### 安装依赖

俗话说，工欲善其事，必先利其器。在环境配置之前我们要下载好需要的依赖。

```bash
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```

### 安装步骤

一般放在 /usr/local 下面。

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

5. 明确接下来编译文件的安装位置，也可直接： "./configure" 此命令执行完会生成"Makefile"文件

```bash
./configure --prefix=/usr/local/nginx-1.18.0
```

6. 编译

```bash
make
make install
```

编译成功会出现*sbin*文件夹，若未出现，需检查是否报错。

### 启动服务

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

### 查看nginx是否启动成功

#### 查看进程

```bash
ps -ef|grep nginx
```

```bash
root      8268     1  0 Oct22 ?        00:00:00 nginx: master process ./nginx
nobody    8269  8268  0 Oct22 ?        00:00:00 nginx: worker process
root     21953 21923  0 10:00 pts/0    00:00:00 grep --color=auto nginx
```

有**master**，则表示启动成功。

#### 查看页面

```bash
curl 127.0.0.1 		默认端口80
或
curl 127.0.0.1:port 	修改端口后
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome to nginx!</title>
    <style>
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to nginx!</h1>
    <p>
      If you see this page, the nginx web server is successfully installed and working. Further
      configuration is required.
    </p>

    <p>
      For online documentation and support please refer to
      <a href="http://nginx.org/">nginx.org</a>.<br />
      Commercial support is available at
      <a href="http://nginx.com/">nginx.com</a>.
    </p>

    <p><em>Thank you for using nginx.</em></p>
  </body>
</html>
```

有此输出，则表示启动成功。

### 代理配置

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

4. 查看nginx.conf文件内容

```bash
cat nginx.conf
或
more nginx.conf
```

## Code 部署

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

## 防火墙修改

⚠️如果无需修改防火墙，跳过此步的浏览

iptables是centos7之前常用的防火墙，在centos7上使用了firewall。

防火墙常用命令：

```bash
# 查询防火墙状态
	service iptables status
# 关闭防火墙
	service iptables stop
# 开启防火墙
	service iptables start
# 重启防火墙
	service iptables restart
# 永久关闭防火墙
	chkconfig iptables off
# 永久关闭后开启防火墙
	chkconfig iptables on
# 查询当前iptables的规则
	iptables -L --line-numbers
```

**开放端口和关闭端口**

```bash
cd /etc/sysconfig/
vim iptables

添加信息一定要在 COMMIT 之前

-A INPUT -p tcp --dport 22 -j ACCEPT	  # 开放端口
-A INPUT -p tcp --dport 22 -j DROP		# 关闭端口
```

```bash
*filter
:INPUT ACCEPT [31:1840]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [21:5070]
-A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 8088 -j ACCEPT		开放8088端口
COMMIT
```

## 总结

1. 如果缺少命令，需要下载对应的命令
2. 常用的配置Nginx环境时的命令

```bash
yum -y install lrzsz    rz安装命令
ls                      查看
ls -a                   查看全部

# nginx相关命令
whereis nginx			查找nginx路径
service nginx start	  启动
nginx -s stop			停止
nginx -s quit			退出
nginx -s reload		  重启加载

如果nginx命令不能执行，请进行以下操作：
cd /usr/local/nginx-1.18.0/sbin
./nginx -s stop			停止
./nginx -s quit			退出
./nginx -s reload		  重启加载
```

3. 我实际碰到的问题，希望可以给你带来参考

- ping ip 机器是否可以ping通访问机器
- 防火墙 端口号是否允许被访问，默认80有防火墙设置
- 最基础的一点：ip地址有没有配置到可访问虚拟机上，比如阿里云，华为云等。！！！我当时因为这个原因校验了很久，其他的配置都是通的，然后外部机器不能访问，后来被通知，ip没有配置。
