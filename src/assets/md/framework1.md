因公司业务增加，造成整个项目包的体积逐渐增大，从而导致**平时开发响应慢**、**每次项目稍微有所变动都要全部打包，重新部署**、**效率低下**等问题。基于上述原因，要对项目进行优化，所以制定了两个方案：

1. **使用`vite`创建项目**
   因浏览器支持现在支持`ES 模块`，vite服务器提供了丰富的内键功能，如快速的模块热更新。这就解决了我们开发响应慢的问题，但是打包问题仍不可避免。

2. **qiankun微前端**
   既然要解决打包慢的问题，那我们不可避免的要对项目进行拆分。我们可以把一个项目拆分为多个项目，这样我们不仅可以独立开发，而且当前项目变动时只需要打包部署当前项目服务即可。综上所述，我们选择了`qiankun`，进行微前端的搭建。

# 前言

## 什么是微前端

微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。主要特点如下：

- **技术栈无关**\
  主框架不限制接入应用的技术栈，微应用具备完全自主权

- **独立开发、独立部署**\
  微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

- **增量升级**\
  在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

- **独立运行时**\
  每个微应用之间状态隔离，运行时状态不共享

## 选择qiankun

其实我们平时用`iframe`嵌入也是一种微前端的思想，iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不过它也有很多的限制，比如：

- url不同步
- 通信问题
- 加载慢
- iframe里面的弹窗不能覆盖浏览器窗口

基于上述问题，我们选择了[`qiankun`](https://qiankun.umijs.org/zh/guide)，它主要有两个优点：

1. 简单

如果只是像iframe使用而又解决iframe的痛点是简单的，但是如果你想做复杂的操作，也不是那么简单的。难易还是要看自己的需求与架构考虑，这个就仁者见仁，智者见智了。

2. 解耦/技术栈无关
   微前端可以做到项目与技术解耦，但是在实际开发中，一般还是会有耦合性的，要根据自己的需求和架构来考虑。

## 项目架构的考虑

### 耦合性

如果不是关联很大的项目可以完全解耦，最多考虑一个单点登录。如果是像运营管理平台，它的内部有很多模块，而且又有关联的项目我们就要做更多的考虑，如下：

1. **只考虑单点登录，基座项目是一个总的项目入口**

这种方式就是点击入口的时候，我们可以看到当前项目的内容，你可以选择在当前窗口展示，也可以选择另开一个窗口展示。特点：**耦合性低**

2. **考虑单点登录和菜单权限控制，基座项目负责登录和菜单权限的控制**

这种方式比较复杂，我们基座项目考虑登录后显示对应的菜单权限，然后点击菜单要显示对应子项目的路由内容。不过，这样做的好处是，子项目就不需要考虑权限问题，只需开发自己项目对应的模块。特点：**耦合性高**

以上两种方式，考虑到时间和耦合性问题我们选择了第一种方式。如果时间允许，不考虑单个项目也可以登录的话，我是建议选择第二种方式。

### Less 和 Sass

我们在项目中是用`less`，还是用`sass`呢？

如果只是一般的使用，我建议使用[less](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)，因为它简单易用，不需要复杂的环境。如果想使用更强大的功能，建议使用[sass](https://www.sass.hk/guide/)，但是使用sass我们需要注意的事情如下：

1. `node-sass`：不推荐使用

node-sass 是用 node(调用 cpp 编写的 libsass)来编译 sass，导致很多用户安装的特别的困难。在我们部署过程中，经常会因为这个问题导致部署失败，所有不推荐使用node-sass。

2. `dart-sass`：推荐使用

sass 官方目前主力推dart-sass 最新的特性都会在这个上面先实现，dart-sass 是用 drat VM 来编译 sass，其性能更好，不会再有**安装node-sass失败**的痛点。

### yarn 和 npm

npm5.0之前yarn的优势很大，在这之后，优势与npm相比虽然没那么大，但是还是有很大好处的，如下：

1. 速度快可并行安装
1. 安装版本统一
1. 更好的语义化

yarn和npm的安装与使用可进入传送门： [使用方法 | Yarn 中文文档](https://yarn.bootcss.com/docs/usage/) 和 [NPM 使用介绍](https://www.runoob.com/nodejs/nodejs-npm.html)。

其实我们再用淘宝镜像的时候可以解决大部分问题，但是安装版不能统一就会有很大的冗余，所以如果项目中有很多依赖插件的时候，还是建议使用yarn。

# qiankun微前端开发

qiankun官网是建议使用`history`的路由方式，查阅的文章也大不多是关于`history`路由相关。因为基座项目和子应用项目都是使用的vue，所有这篇文章主要讲的是：基座项目和子项目都是使用`vue`且路由是`hash`的实现。如果你想用history或react此篇文章只可作为参考，另外我们需要注意的是：基座项目、主项目、主应用的意思是相同的，子应用、子项目的意思也是相同的，下面我们的名词就用**主应用**和**子应用**。

## 搭建项目

### 创建 vue-qiankun 文件夹

此文件夹存放主应用、子应用以及一些配置文件。

### 创建主应用与子应用

这里使用vue-cli脚手架创建应用，如下：

```js
vue create main

vue create subapp-demo

vue create subapp-demo2
```

其中main为主应用（如果用不到router和vuex可以选择不安装），subdemo和subdemo2为子应用。如果需要用到其他技术的，比如react、jq等也是可以的，按照自己平时创建项目的步骤来就行了。

### 给 vue-qiankun 创建 package.json 文件

此文件是为后面一键安装、一键启动、一键打包做准备，如果你想单独的操作，可以跳过当前和下面的安装。

### 配置 vue-qiankun 下的 package.json 文件

修改文件信息如下：

```json
{
  "name": "vue-qiankun",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "install": "npm-run-all --serial install:*",
    "install:main": "cd main && npm install",
    "install:subapp-demo": "cd subapp-demo && npm install",
    "install:subapp-demo2": "cd subapp-demo2 && npm install",

    "start": "npm-run-all --parallel start:*",
    "start:subapp-demo2": "cd subapp-demo2 && npm run serve",
    "start:subapp-demo": "cd subapp-demo && npm run serve",
    "start:main": "cd main && npm run serve",

    "build": "npm-run-all build:* && bash ./scripts/bundle.sh",
    "build:main": "cd main && npm run build",
    "build:subapp-demo": "cd subapp-demo && npm run build",
    "build:subapp-demo2": "cd subapp-demo2 && npm run build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

这里我们需要注意的事情是：

1. 此处使用的npm命令，如果你想使用yarn命令，需要把文件中的：`npm install`、`npm run serve`、`npm run build`依次改为`yarn install`、`yarn serve`、`yarn build`。

1. 里面`subapp-demo`、`subapp-demo2`等信息一定要和创建项目名保持一致，路径不能错，如果你创建了其他的项目，需要添加或修改对应的路径名。

此外我们还需了解`npm-run-all` 提供了多种运行多个命令的方式，常用的有以下两个：

- `--parallel`: 并行运行多个命令
- `--serial`: 多个命令按排列顺序执行

### 安装npm-run-all

安装npm-run-all是为了一键操作，上文有提到，如下：

```js
npm i npm-run-all --save-dev
```

我们需要了解一下以下信息：

- `--save`：把配置信息保存在`package.json`的`dependencies`节点中。
- `--save-dev`：把配置信息保存在`package.json`的`devDependencies`节点中。

- `dependencies`：运行时的依赖，部署服务上仍需要的模块。
- `devDependencies`：开发时的依赖，部署服务时用不到的模块。

### 给 vue-qiankun 创建 scripts 文件夹

package.json 文件中有这样一行命令：

```json
"build": "npm-run-all build:* && bash ./scripts/bundle.sh"
```

它的作用是：为了在一键打包后，把打包后的文件抽离出来。如果你不想有此操作，scripts文件夹也不需创建，只要把这行命令替换掉，替换命令如下：

```json
"build": "npm-run-all --serial build:*"
```

如果想把打包后的文件抽离出来：

我们还需要在`scripts`文件夹下创建`bundle.sh`文件，bundle.sh内容如下：

```sh
#!/bin/bash

rm -rf ./dist

mkdir ./dist
mkdir ./dist/subapp

# subapp-demo子应用
cp -r ./subapp-demo/dist/ ./dist/subapp/subapp-demo/

# subapp-demo2子应用
cp -r ./subapp-demo2/dist/ ./dist/subapp/subapp-demo2/

# main基座
cp -r ./main/dist/ ./dist/main/

# cd ./dist
# zip -r mp$(date +%Y%m%d%H%M%S).zip *
# cd ..
echo 'bundle.sh execute success.'
```

执行的结果就是：在`vue-qiankun`文件夹下创建`dist`文件夹，dist里面包含`main`主应用文件夹和`subapp`子应用文件夹。上述的**地址和文件夹的名字**都是可以改变的，根据自己的项目来修改。

这个命令的时候如果用vscode或者cmd执行会报错，这是因为不支持 `bash` 命令，我们需要用安装git后自带的 `git bash`来执行。

### 项目结构图

![4642F84E-A3E5-41f1-9C64-805D5737EABC.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05e2e80312b64c2780aed9c1b8b9730c~tplv-k3u1fbpfcp-watermark.image?)

如果不需要本地一键操作，绿色配置部分我们是不需要的，也就是说我们可以省略上述提到的一些步骤。

## 配置主应用

主应用需要安装qiankun，子应用不需要。

### 安装qiankun

```sh
cd main
npm i qiankun --save
```

子应用的端口号必须固定，不然端口号不同导致匹配不上，所以我们可以先把主应用和子应用的一些配置信息改一下，增加 `vue.config.js` 文件，如下：

```js
module.exports = {
  publicPath: './',
  devServer: {
    port: 5001
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'vue-qiankun';
      return args;
    });
  }
};
```

在实际开发中，你可以加上一些其他的`webpack`配置，如使用：`terser-webpack-plugin`插件，此处我们可以跳过这个问题。

我们需要注意的是：每个应用要修改为不同的`port`。如果你是用react、jq等，也需要安装不同的技术配置不同的端口号。

### 主应用中注册子应用

因为项目中引入的是ts，所以我们在main主项目的src下新建micro-app.ts文件，内容如下：

```js
// 微应用的一些注册信息，必选
// const getActiveRule = (hash: any) => (location: any) => location.hash.startsWith(hash);
/**
 * name 必选，微应用的名称，微应用之间必须确保唯一。
 * entry 必选，微应用的入口。
 * container 必选，微应用的容器节点的选择器或者 Element 实例。
 * activeRule 必选，微应用的激活规则
 * props 可选，主应用需要传递给微应用的数据。
 * */
const microParams = [
    {
        name: 'subapp-demo',
        entry: process.env.VUE_APP_SUB_TEST || 'http://localhost:5002',
        activeRule: '#/subapp-demo'
    },
    {
        name: 'subapp-demo2',
        entry: process.env.VUE_APP_SUB_TEST || 'http://localhost:5003',
        activeRule: '#/subapp-demo2'
    },
]
const microApps = microParams.map(item => {
    return {
        ...item,
        container: '#subapp-viewport', // 主项目中挂载子项目容器的ID
        props: {
            routerBase: item.activeRule, // 下发基础路由，路由的base属性
        }
    }
})

// 全局的微应用生命周期钩子，可选
const lifeCycles = {
    beforeLoad: (app: any): any => console.log('before load', app.name),
    beforeMount: [(app: any): any => console.log('before mount', app.name)],
}

export { microApps, lifeCycles }
```

因为我们使用的是 `hash` 路由，所以 `activeRule` 一定要加前缀：`#`。这个字段是代表激活路由的意思，也就是说当你在主子应用跳转的时候，如果有这个字段，则表示是子应用路由状态。`activeRule`理论上你可以选择任意值，但是我们一般识别子应用的标识，如：

```js
activeRule: '#/subapp-demo'; // 代表的是subapp-demo子应用
```

另外值得注意的是：这个路径的定义不可以与线上部署额路径一致，比如：

线上访问地址是：`http://ip:port/subapps/subapp-demo/`

`activeRule`配置是：`#/subapps/subapp-demo/`

这种情况下是会有冲突的，因为网页识别不出来当前应用环境是qiankun环境还是独立环境。

我们还需要修改main.ts，如下：

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// qiankun
import { registerMicroApps, start } from 'qiankun';
import { microApps, lifeCycles } from './micro-app';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// qiankun 子应用注册
registerMicroApps(microApps, lifeCycles);
start();
```

我们需要注意的是：注册子应用的端口号要与子应用本身运行的端口号一致，另外建议`name`与子项目的`package.json`里的name字段保持一致，保持唯一性。

## 配置子应用

子应用需要修改三个文件: `vue.config.js`、`main.ts`、router文件夹下的`index.ts`。

### vue.config.js

除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置，即要修改`vue.config.js`文件，如下：

```js
const { name } = require('./package.json');
module.exports = {
  publicPath: './',
  devServer: {
    port: 5003,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
};
```

其他子应用也类似修改即可。

### router 文件夹下的 index.ts

此处修改只暴露出 `routes`，而且根据是否在qiankun环境下，进行路由前缀的配置，这样如果你想独自启动项目也是可以成功的。

```js
import { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import packageObj from "../../package.json"

const prefixPath = (window as any).__POWERED_BY_QIANKUN__ ? `/${packageObj.name}` : '/'
const routes: Array<RouteConfig> = [
  {
    path: `${prefixPath}`,
    name: 'Home',
    component: Home
  },
  {
    path: `${prefixPath}/about`,
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

export default routes
```

这里我们需要注意一点：如果不想在此处配置路由前缀，可通过**前置守卫**钩子统一配置，此时的前缀可由主应用传递过来。

因为此处用的是ts，所以我们还需要修改`shims-vue.d.ts`文件，如下：

```js
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.json' {
  const value: any;
  export default value
}
```

如果你是js文件则无需理会，如果感觉ts不适应，可以转为js文件。

### main.ts

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import routes from './router'
import VueRouter from "vue-router";
import packageObj from "../package.json"

Vue.config.productionTip = false

Vue.use(VueRouter)
// 根实例
let vm: any = null;
// 是否在qiankun项目
const isQiankun = (window as any).__POWERED_BY_QIANKUN__;

function render(props: any = {}) {
  // props 主应用传递过来的参数
  const { container, routerBase } = props;

  // 是否是qiankun项目中的判断
  const router = new VueRouter({
    mode: "hash",
    routes
  });
  // 是否在qiankun项目下的操作
  if(isQiankun){
    router.beforeEach((to,from,next)=>{
      if(!to.path.includes(`/${packageObj.name}`)){
        next({path:`/${packageObj.name}${to.path}`})
      }else{
        next()
      }
    })
  }

  vm = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 是否在qiankun项目下的操作
if (isQiankun) {
  // eslint-disable-next-line
  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('sub app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  console.log(vm);

  vm.$destroy();
  vm.$el.innerHTML = ""; // 子应用内存泄露问题
  vm = null;
}
```

此处操作主要是为了判断当前环境是否是qiankun，然后根据这个判断做相应的操作。这里的前缀是用的`package.json `的`name`值，我们也可以统一由主应用下放。

## 路由操作

主应用修改`App.vue`文件，让我们开始路由跳转的测试。

### html模板改变

```html
<template>
  <div id="app">
    <div id="nav">
      <span @click="goto('#/subapp-demo')">subapp-demo</span> |
      <span @click="goto('#/subapp-demo2')">subapp-demo2</span>
    </div>
    <router-view />
    <div id="subapp-viewport"></div>
  </div>
</template>
```

增加了一个子应用存放的容器，这里两个子应用都指向 `subapp-viewport`，所以只需一个容器。如果配置信息中有多个容器，就需要指向多个容器。

### 添加方法

```js
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    goto(path: string) {
      // 渲染在 subapp-viewport 容器中
      // this.$router.push(path);

      // 另开窗口
      const origin = (window as any).location.origin;
      window.open(`${origin}/${path}`);
    },
  },
});
</script>
```

这里我们选择可以在当前容器中渲染，也可以选择另开一个窗口渲染。

## 注意事项

### 主应用

qiankun环境下，当子应用自我路由跳转的时候，主应用的**前置守卫钩子**也会起作用，这时需要我们做判断，如下：

```js
// 获取所有子应用的基础路由
const subRouterBase = microApps.map(({ props }) => props.routerBase);

// 当前路由是否是子应用路由
const isChildRoute = (path: any) =>
	subRouterBase.some((item) => path.startsWith(item));

// 前置守卫
router.beforeEach((to: any, from: any, next: any) => {
	const token = sessionStorage.getItem('token');
	const loginPath = '/login';

	// 如果是子应用路由的跳转，直接放行
	if (isChildRoute(to.path) && isChildRoute(from.path)) {
		next();
	} else {
		// 主应用、主应用跳转子应用、子应用跳转主应用
		if (token) {
			next();
		} else {
			if (to.path === loginPath) {
				next();
			} else {
				next({ path: loginPath, query: { reason: 'disable' } });
			}
		}
	}
});
```

这里面的获取数据或者鉴权的方式可能需要根据自己的需求来做，主要声明的是：主应用前置守卫的判断需要考虑是否是子应用路由。

### 子应用

如果你不想在`router/index.js、main.ts`等都去配置路由前缀，我们可以在`main.ts`里面根据**主应用下发baseroute**统一配置前缀（建议使用此方法）。前面之所以每个文件都配置前缀，是为了在一开始配置的时候容易理解。`main.ts`前缀统一配置如下：

```js
// 根实例
let vm: any = null;
// 是否在qiankun项目
let router: any = null;
const isQiankun = (window as any).__POWERED_BY_QIANKUN__;

function render(props: any = {}) {
	// props 主应用传递过来的参数
	const { container, routerBase } = props;
	console.log(props);

	// 是否是qiankun项目中的判断
	const prefixPath = isQiankun ? routerBase : '';
	// 路由添加前缀并把前缀保存到store
	store.commit('setPrefixPath', prefixPath);
	routes.forEach((e: any) => {
		e.path = `${prefixPath}${e.path}`;
		if (e.redirect) e.redirect = `${prefixPath}${e.redirect}`;
	});

	router = new VueRouter({
		mode: 'hash',
		routes,
	});

	// 路由跳转
	router.beforeEach((to: any, from: any, next: any) => {
		const token = sessionStorage.getItem('token');
		const loginPath = `${prefixPath}/login`;

		if (token) {
			// qiankun环境路由,如果不含前缀则增加前缀
			const isQPrefix = isQiankun && !to.path.includes(`${prefixPath}`);
			if (isQPrefix) {
				next({ path: `${prefixPath}${to.path}`, query: { t: Date.now() } });
			} else {
				next();
			}
		} else {
			if (to.path === loginPath) {
				next();
			} else {
				next({ path: loginPath, query: { reason: 'disable' }, replace: true });
			}
		}
	});

	vm = new Vue({
		router,
		store,
		render: (h: any) => h(App),
	}).$mount(container ? container.querySelector('#app') : '#app');
}
```

这里的配置可覆盖前面讲到的子应用`main.ts`文件中，但是你要注意：

1. 我这里是把路由前缀给保存到`store`里面了，所以你在复制这段代码的时候要添加`store.commit`相关方法或者把相关代码给删除掉，否则会报错。
1. 这里给路由增加前缀，**只添加第一层**，此时我们有两种选择：

- `router/index.js`文件里面的`children`路由不能加`根路由`，它会随着父级路由的变化而变化
- `router/index.js`文件里面的`children`路由可以加`根路由`，但是我们要在`main.ts`文件中遍历每一层路由，添加前缀，需要修改的代码如下：

```js
// 当前添加一层，可以使用回调每一层都添加前缀
routes.forEach((e: any) => {
    e.path = `${prefixPath}${e.path}`;
    if (e.redirect) e.redirect = `${prefixPath}${e.redirect}`;
});
```

### 其他

`terser-webpack-plugin`的版本号要与`webpack`的版本号相对应（**若webpack@5，则terser-webpack-plugin@5；若webpack@4，则terser-webpack-plugin@4**），否则打包或编译会报错。

# 总结

1. 注意每个应用的路由都是hash模式。

1. 这里只说了主子应用都是hash模式的情况，当然你也可以用其他的路由模式组合，这需要你在研究一下。

1. README.md 文件很重要，这对不熟悉这个项目的同事很有帮助，大家应该有维护这个文件的意识。

1. 从开始写这篇文章，到目前的使用已经过去四个月了，在实战中遇到很多问题，希望对你架构有所帮助：

```bash
   开始架构考虑的是子应用可以独立访问并且希望每个人都了解架构，每个人去维护各自项目，
但实际操作中，子应用会有很多复用的模块，每个人并不能很好的去维护各自的项目模块，基于这个原因提出两个建议：

1. 主应用控制权限，所有通用部分放在主应用中，子应用之专注页面的开发，此时需要设置一个统一的入口路由
（这种模式子应用不能独立访问）

2. 把主子应用通用的部分放在私包上，甚至可以基于自己的项目把api请求等都发在私包上，子应用以组件的方式引入，
后面如果更新，只需重新拉下私包就好。
```

特别说明：这篇文章参考了**ZQ是水鱼**的[手把手实践qiankun微前端的开发和部署](https://www.cnblogs.com/wuzhiquan/p/14090485.html)。
