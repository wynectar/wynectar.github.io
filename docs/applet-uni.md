---
outline: deep
navbar: false
sidebar: false
---

# 【寓教于乐猜灯谜】基于 uni-app + vue3 + pinia 的微信小程序

## 工欲善其事

1. [安装HBuilderX](https://www.dcloud.io/hbuilderx.html)，[HBuilderX 相关](https://hx.dcloud.net.cn/README)

2. [微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

3. [uni-app 快速上手官方指导](https://uniapp.dcloud.net.cn/quickstart-hx.html)

## uni-app 开发流程

### 创建uni-app

1. 在点击工具栏里的`文件 -> 新建 -> 项目`（快捷键 `Ctrl+N`）

2. 选择 `uni-app` 类型，输入`工程名`，选择`模板`，点击`创建`，即可成功创建。
   - 日常开发推荐使用 `uni ui项目模板`
   - Vue 版本选择

### 运行uni-app

#### 方式一：工具栏运行

`在微信开发者工具里运行`：进入hello-uniapp项目，点击工具栏的`运行 -> 运行到小程序模拟器 -> 微信开发者工具`，即可在微信开发者工具里面体验uni-app。

::: tip

- 🔥如果是第一次使用，HBuilderX 需要配置开发工具的相关路径。点击 `HBuilderX` 工具栏的`运行 -> 运行到小程序模拟器 -> 运行设置`，配置相应小程序开发者工具的路径。
- 🔥微信小程序工具需要配置允许权限。点击 `微信开发者工具` 工具栏的`设置 -> 安全设置`，开启服务端口。
- 如果自动启动小程序开发工具失败，请手动启动小程序开发工具并将 HBuilderX 控制台提示的项目路径，打开项目。
  :::

#### 方式二：快捷方式运行

1. 快捷键运行 `Ctrl+R`

2. HBuilderX `快捷运行菜单`，可以按数字快速选择要运行的设备

### 发布uni-app

1. [申请微信小程序AppID](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#%E7%94%B3%E8%AF%B7%E5%B8%90%E5%8F%B7)

2. 在HBuilderX中顶部菜单依次点击 `"发行" => "小程序-微信"`，输入`小程序名称`和`appid`点击发行即可

3. `微信开发者工具`工具中真机调试无误后，点击上传

## uni-app 配置

1. `settings.json`：即 HBuilderX 工具中`运行 -> 运行到小程序模拟器 -> 运行设置`，找到相应的小程序开发者工具配置位置，浏览工具路径并选择配置。

2. `开启服务端口`：即`微信开发者工具`工具中`设置 -> 安全设置`开启。

## 寓乐猜灯谜

### 项目结构

```bash
uni-guess-riddle/
├── pages/
│   ├── index/         # 首页
│   ├── review/        # 题目回顾
│   └── game/          # 游戏页面
├── static/
│   └── images/        # 静态图片
├── store/             # Pinia状态管理
└── uni.scss           # 全局样式
```

### 首页

可选择游戏模式：

- 简单模式：8道简单题，适合新手

- 普通模式：10道随机难度题（推荐）

- 困难模式：12道题，包含高难度题目

### 游戏页面

1. 🔄 随机题目系统
   - 灯谜库包含400+条谜语，分类丰富

   - 每次游戏随机抽取题目

   - 保证每次游戏体验都不同

2. 📊 智能评分系统
   - 基础分：简单10分/中等20分/困难30分

   - 时间奖励：答对越快，加分越多（最高30分）

   - 提示扣分：使用提示扣除5分

3. 📈 详细数据统计
   - 最终得分

   - 用时统计

   - 答对题数

   - 准确率

   - 游戏模式记录

### 题目回顾

展示了本局答题信息。

### 效果

1. 从git上下载代码后，导入 `HBuilderX` 后运行即可查看效果，代码如下：
   - [Github 地址](https://github.com/wynectar/uni-guess-riddle)
   - [Gitee 地址](https://gitee.com/wynectar/uni-guess-riddle)

2. 扫码查看小程序：

   ![微信小程序码](./assets/mini-code2.jpg)
