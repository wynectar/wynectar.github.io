import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vitepress Project',
  description: '存储博客文章站点',
  lang: 'zh-CN', // 站点的 lang 属性
  base: '/docs/', // 🔥基于主路径的站点访问路径
  outDir: '../public/docs', // 🔥项目的构建输出位置，相对于 Vitepress 项目的根目录
  lastUpdated: true, // 🔥启用 Git 获取每个页面的最后更新时间戳
  markdown: {
    // 🔥markdown 扩展
    lineNumbers: true, // 代码块启用行号
    math: true, // 支持数学方程，需要下载 markdown-it-mathjax3 插件
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
    // config: (md) =>{
    //   // 使用更多的 Markdown-it 插件！
    //   // md.use(?)
    // }
  },
  themeConfig: {
    outline: {
      // 🔥文档侧边栏配置
      level: [2, 6],
      label: '页面导航'
    },
    docFooter: {
      // 🔥用于自定义出现在上一页和下一页链接上方的文本
      prev: '上一篇',
      next: '下一篇'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Entrance', link: '/vitepress-web' }
    ],

    sidebar: [
      {
        text: '忘忧博客',
        items: [
          {
            text: '【今日幸运色】项目带你快速完成 Taro 小程序开发和微信小程序发布',
            link: '/applet-taro'
          },
          { text: '谈一谈可视化大屏的适配方案', link: '/screen-adapter' },
          {
            text: '基于 VitePress 把 Markdown 编写的内容构建成静态页面并利用 iframe 集成到 Web 页面的实践',
            link: '/vitepress-web'
          },
          { text: '【交互式天气仪表盘】项目带你快速了解 SVG 知识', link: '/svg-weather' },
          { text: '如何使用GitHub Pages托管博客', link: '/hosting-github' },
          { text: '前端项目配置Git提交规范', link: '/config-gitsubmit' },
          { text: '前端与Nginx的不解之缘——Nginx配置和Code部署', link: '/config-nginx' },
          { text: 'qiankun微前端架构使用hash路由从0到1的开发', link: '/micro-qiankun' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/wynectar' }]
  }
});
