# 基于 Vite6 + Vue3.5 + Pinia + Ts + Naive UI + Vitepress

[vite](https://cn.vitejs.dev/config/)
[vue](https://cn.vuejs.org/)
[ts](http://tslang.cn/docs/home.html)
[pinia](https://pinia.vuejs.org/zh/core-concepts/)
[naive ui](https://www.naiveui.com/zh-CN/os-theme/components/button)
[marked](https://marked.js.org/)

# 项目启动命令

```bash
npm i
npm run dev
npm run build
```

# 项目目录

- 根据命令生成目录树，自定义标注每个文件或文件夹的作用
- 只记录主要目录，如果有特殊文件或文件夹，请在目录树下面单独标注
- 向上引用，

## 目录树

```
`项目名称`
├── src
│   ├── api  # 请求接口
│   ├── assets  # 静态资源，一般存放图片、音视频、css样式
│   │   └── vue.svg
│   ├── components  # 通用业务组件或元组件，组件中可能含有api
│   │   └── HelloWorld.vue
│   ├── directives # 指令集
│   ├── filters # 过滤器，一般用来数据转换
│   ├── router # 路由配置
│   ├── storage  # 前端存储数据，localStorage和sessionStorage的存取都在此文件夹
│   ├── store  # 状态管理中心
│   ├── types  # TypeScript 项目中的类型声明文件
│   ├── utils  # 工具库，自定义函数
│   ├── views  # 页面模版，路由页面或其他展示页面
│   ├── App.vue  # 试图入口
│   ├── main.ts  # 入口文件
│   ├── style.css  # 全局样式
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

## 特殊文件或文件夹标注区域

```

```
