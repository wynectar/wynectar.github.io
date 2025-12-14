---
outline: deep
navbar: false
sidebar: false
---

# 基于 VitePress 把 Markdown 编写的内容构建成静态页面并利用 iframe 集成到 Web 页面的实践

## 什么是 VitePress ？

VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

[参考官网](https://vitejs.cn/vitepress/guide/what-is-vitepress)

> ⚠️因为官方网站的原因，此文所有的链接地址可能会进入 404 页面，此时需要我们从官网的根目录地址进入[https://vitejs.cn/vitepress/](https://vitejs.cn/vitepress/)

## VitePress 的配置 ⚙️
::: tip 配置需要达到的目标
- 静态页面只包含内容区域和文档侧边栏
- 静态页面路由可以在Web中正常访问 🔥
- 根据需求进行基本配置
:::

### 基本准备

::: info
- [Node.js](https://nodejs.org/zh-cn) 18 及以上版本
- [初始准备参考](https://vitejs.cn/vitepress/guide/getting-started#installation)
:::

1. 项目根目录安装 vitepress

    ::: code-group

    ```sh [npm]
    npm add -D vitepress
    ```

    ```sh [pnpm]
    pnpm add -D vitepress
    ```

    ```sh [yarn]
    yarn add -D vitepress
    ```

    ```sh [yarn(pnp)]
    yarn add -D vitepress vue
    ```

    ```sh [bun]
    bun add -D vitepress
    ```

    :::

2. vitepress 初始化及安装向导

    ::: code-group

    ```sh [npm]
    npx vitepress init
    ```

    ```sh [pnpm]
    pnpm vitepress init
    ```

    ```sh [yarn]
    yarn vitepress init
    ```

    ```sh [bun]
    bun vitepress init
    ```

    :::

    ```js
    ┌  Welcome to VitePress!
    │
    ◇  Where should VitePress initialize the config?
    │  ./docs // [!code focus] [!code warning]
    │
    ◇  Site title:
    │  My Awesome Project
    │
    ◇  Site description:
    │  A VitePress Site
    │
    ◆  Theme:
    │  ● Default Theme (Out of the box, good-looking docs)
    │  ○ Default Theme + Customization
    │  ○ Custom Theme
    └
    ```

    ::: warning
    在 `./docs` 或 `./自定义目录` 中搭建 VitePress 项目，以便与 Web 项目源码区分开来。
    :::

### 文件配置
我们要知道 `config` 文件中包含了所需的大部分配置，`.md` 文件顶部包含部分配置和需要覆盖 `config` 文件的配置，也就是说 `.md` 文件显示可以做定制化配置。[配置参考](https://vitejs.cn/vitepress/reference/site-config)

1. `config.mts` 或 `config.ts` 或 `config.js`：尤其要关注代码高亮部分的注释🔥
    ```js{8-11,23,33,46}
    import { defineConfig } from 'vitepress'

    // https://vitepress.dev/reference/site-config
    export default defineConfig({
        title: "My Awesome Project",
        description: "A VitePress Site",
        lang: 'zh-CN', // 站点的 lang 属性
        base: '/markdown/', // 🔥基于主路径的站点访问路径
        outDir: '../public/markdown', // 🔥项目的构建输出位置，相对于 Vitepress 项目的根目录
        lastUpdated: true, // 🔥启用 Git 获取每个页面的最后更新时间戳
        markdown: { // 🔥markdown 扩展
            lineNumbers: true, // 代码块启用行号
            math: true, // 支持数学方程，需要下载 markdown-it-mathjax3 插件
            image: { // 默认禁用图片懒加载
            lazyLoading: true
            },
            // config: (md) =>{
            //   // 使用更多的 Markdown-it 插件！
            //   // md.use(?)
            // }
        },
        themeConfig: {
            outline: { // 🔥文档侧边栏配置
            level: [2, 6],
            label: '页面导航'
            },
            // https://vitepress.dev/reference/default-theme-config
            nav: [ // 可忽略配置
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
            ],

            sidebar: [ // 🔥如果需要上下翻页，则必须把所有的文件配置在里面，但不拘泥于层级结构
            {
                text: 'Examples',
                items: [
                { text: 'Markdown Examples', link: '/markdown-examples' },
                { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
            ],

            socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
            ],

            docFooter: { // 🔥用于自定义出现在上一页和下一页链接上方的文本
              prev: '上一篇',
              next: '下一篇'
            }
        }
    })

    ```

2. `xxx.md`：`navbar: false` 隐藏导航栏，`sidebar: false` 隐藏项目侧边栏
    ```md
    ---
    navbar: false
    sidebar: false
    ---
    ```

3. `package.json`：
    - 在执行初始化 `npx vitepress init` 命令后，脚本中会自动添加三条 `docs` 命令。
    - 如果 Web 与 Vitepress 相应程序已配置好，只需要驱动数据就可以更新视图，则项目打包时可以定义一个复合指令 `mdbuild`；如果 `md` 内容发生变化时需要先 `yarn docs:build`，则不需要复合指令。
    - 相应的指令可根据项目灵活配置，目前配置已满足此实践的需求。 
    ```json
    {
        "scripts": {
            "docs:dev": "vitepress dev docs", // [!code ++]
            "docs:build": "vitepress build docs", // [!code ++]
            "docs:preview": "vitepress preview docs", // [!code ++]
            "mdbuild": "yarn docs:build && yarn build"
        }
    }
    ```


## Web 页面组件配置 ⚙️
::: tip 配置需要达到的目标
- 定义一个展示 Markdown 内容的容器组件
- 防止 Vitepress 页面不存在时，iframe 嵌套死循环
- 响应 Web 页面主题切换
:::

组件不拘泥于 Vue、React 亦或者原生 html 写法，以下是以 Vue 组件为例。

假设定义一个 `MarkdownViewer.vue` 组件：

- `checkUrlExists` 方法：判断页面地址是否可访问，以此来防止 iframe 嵌套死循环。

- `changeTheme` 方法：通过增删 `dark` 类名来实现 Vitepress 页面的主题切换。

- 🚀 如果还有展示 `word`、`pdf` 等静态文件可把 `iframe` 替换或结合 `object` 标签使用。

```vue{45-53,56-70}
<template>
  <div>
    <button @click="changeTheme">切换主题</button>
    <div v-if="checking" class="loading">检查页面是否存在...</div>
    <div v-else-if="pageExists">
      <iframe
        :src="url"
        @load="onLoad"
        @error="onError"
        width="100%"
        height="800"
        frameborder="0"
        ref="iframe"
      ></iframe>
    </div>
    <div v-else class="not-found">
      <h3>页面不存在</h3>
      <p>请求的页面 <code>{{ url }}</code> 不存在</p>
      <button @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreCheckedIframe',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checking: true,
      pageExists: false,
      loadError: false,
      initClassName: '',
    }
  },
  async mounted() {
    await this.checkUrlExists();
  },
  methods: {
    changeTheme() {
      const iframeHtml = this.$refs.iframe?.contentDocument?.querySelector('html')
      if (!iframeHtml) return
      if (!this.initClassName) this.initClassName = iframeHtml.className
      if (iframeHtml.className?.includes('dark')) {
        iframeHtml.className = this.initClassName
      } else {
        iframeHtml.className += ' dark'
      }
      console.log(iframeHtml.className)
    },
    async checkUrlExists() {
      try {
        const response = await fetch(this.url, {
          method: 'HEAD',
          mode: 'no-cors', // 如果是跨域请求
          cache: 'no-cache'
        });
        this.pageExists = response.ok;
      } catch (error) {
        console.error('检查 URL 失败:', error);
        this.pageExists = false;
      } finally {
        this.checking = false;
      }
    },
    
    onLoad() {
      console.log('iframe 加载成功');
      this.loadError = false;
    },
    
    onError() {
      console.error('iframe 加载失败');
      this.loadError = true;
      this.pageExists = false;
    }
  },
  
  watch: {
    async url() {
      this.checking = true;
      await this.checkUrlExists();
    }
  }
}
</script>
```

到此为止，项目所需的功能已经实现。👇是 Markdown 语法的扩展可忽略阅读，可直接[参考官网](https://vitejs.cn/vitepress/guide/markdown)。


## Markdown 语法扩展 🚀

::: tip
- [VitePress 中的 Markdown 支持 vue 语法](https://vitejs.cn/vitepress/guide/using-vue)

- [语法扩展参考](https://vitejs.cn/vitepress/guide/markdown)，总结常用的内置语法。
:::

### [支持表情 Emoji 🎉](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)

输入
```
:tada: :100:
```
输出

:tada: :100:

### 常用提示容器，标题可自定义

输入
```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details 参考答案
🔥举个加标题的🌰
:::
```
输出

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details 参考答案
🔥举个加标题的🌰
:::

### 代码块相关

1. **实现行高亮的方式**
    - `{}` 语法高亮
        - 多行：例如 `{5-8}`、`{3-10}`、`{10-17}`
        - 多个单行：例如 `{4,7,9}`
        - 多行与单行：例如 `{4,7-13,16,23-27,40}`
    
        如果需要第`4`行高亮，则需要：
        ``````
        ```js{4}
        ```
        ``````
    - `// [!code highlight]` 注释高亮
        ```
        msg: 'Highlighted!' // [!code highlight]
        ```
    


    ```js{4}
    export default {
        data () {
            return {
                msg: 'Highlighted!'
            }
        }
    }
    ```

2. **代码块中聚焦**

    `// [!code focus]`注释将聚焦当前行代码并模糊其他部分
    ```
    msg: 'Focused!' // [!code focus]
    ```

    ```js
    export default {
        data () {
            return {
                msg: 'Focused!' // [!code focus]
            }
        }
    }
    ```

3. **代码块中增删的提示**

    `// [!code --]` 或 `// [!code ++]`注释将会为该行创建 diff，同时保留代码块的颜色。

    ```
    msg: 'Removed' // [!code --]
    msg: 'Added' // [!code ++]
    ```

    ```js
    export default {
        data () {
            return {
                msg: 'Removed' // [!code --]
                msg: 'Added' // [!code ++]
            }
        }
    }
    ```

4. **代码块中错误警告的提示**

    `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色

    ```
    msg: 'Error', // [!code error]
    msg: 'Warning' // [!code warning]
    ```

    ```js
    export default {
        data () {
            return {
                msg: 'Error', // [!code error]
                msg: 'Warning' // [!code warning]
            }
        }
    }
    ```

5. **对多个代码块进行分组**

    ``````md
    ::: code-group

    ```js [config.js]
    const config = {
    // ...
    }
    ```

    ```ts [config.ts]
    import type { UserConfig } from 'vitepress'

    const config: UserConfig = {
    // ...
    }
    ```

    :::
    ``````

    ::: code-group

    ```js [config.js]
    const config = {
    // ...
    }
    ```

    ```ts [config.ts]
    import type { UserConfig } from 'vitepress'

    const config: UserConfig = {
    // ...
    }
    ```

    :::