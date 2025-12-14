interface PostItem {
  id: string;
  title: string;
  tag: string;
  readingTime: string;
  createTime: string;
}

const posts: PostItem[] = [
  {
    id: 'screen-adapter',
    title: '谈一谈可视化大屏的适配方案',
    tag: '可视化',
    readingTime: '4',
    createTime: '2025-12-12'
  },
  {
    id: 'svg-weather',
    title: '【交互式天气仪表盘】项目带你快速了解 SVG 知识',
    tag: 'SVG',
    readingTime: '10',
    createTime: '2025-11-28'
  },
  {
    id: 'vitepress-web',
    title: '基于 VitePress 把 Markdown 编写的内容构建成静态页面并利用 iframe 集成到 Web 页面的实践',
    tag: 'VitePress',
    readingTime: '5',
    createTime: '2025-11-26'
  },
  {
    id: 'config-gitsubmit',
    title: '前端项目配置Git提交规范',
    tag: '提交规范',
    readingTime: '4',
    createTime: '2024-08-18',
  },
  {
    id: 'hosting-github',
    title: '如何使用GitHub Pages托管博客',
    tag: '代码托管',
    readingTime: '4',
    createTime: '2024-08-13',
  },
  {
    id: 'micro-qiankun',
    title: 'qiankun微前端架构使用hash路由从0到1的开发',
    tag: '微前端',
    readingTime: '12',
    createTime: '2022-01-22',
  },
  {
    id: 'config-nginx',
    title: '前端与Nginx的不解之缘——Nginx配置和Code部署',
    tag: 'Nginx',
    readingTime: '7',
    createTime: '2021-07-06',
  }
];

export default posts;
