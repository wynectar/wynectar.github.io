import fe from '@/assets/imgs/fe.svg';
import ui from '@/assets/imgs/ui.svg';
import study from '@/assets/imgs/study.svg';
import echarts from '@/assets/imgs/echarts.svg';
import hexo from '@/assets/imgs/hexo.svg';

export default [
  {
    title: '学习文档',
    img: study,
    children: [
      {
        name: 'MDN Web中文文档',
        url: 'https://developer.mozilla.org/zh-CN/docs/Web/Guide'
      },
      {
        name: '菜鸟教程',
        url: 'https://www.runoob.com/'
      },
      {
        name: 'ES6入门',
        url: 'https://es6.ruanyifeng.com/'
      },
      {
        name: 'StackOverFlow',
        url: 'https://stackoverflow.com/questions'
      }
    ]
  },
  {
    title: '前端架构相关',
    img: fe,
    children: [
      {
        name: 'Vue',
        url: 'https://cn.vuejs.org/',
        tag: 'vue'
      },
      {
        name: 'Vuex',
        url: 'https://vuex.vuejs.org/zh/',
        tag: 'vue'
      },
      {
        name: 'Pinia',
        url: 'https://pinia.web3doc.top/',
        tag: 'vue'
      },
      {
        name: 'VueRouter',
        url: 'https://router.vuejs.org/zh/',
        tag: 'vue'
      },
      {
        name: 'React',
        url: 'https://zh-hans.react.dev/',
        tag: 'react'
      },
      {
        name: 'Vite',
        url: 'https://vitejs.cn/',
        tag: '开发构建工具'
      },
      {
        name: 'Webpack',
        url: 'https://www.webpackjs.com/',
        tag: '开发构建工具'
      },
      {
        name: 'Uniapp',
        url: 'https://uniapp.dcloud.net.cn/component/',
        tag: '小程序'
      },
      {
        name: 'Taro',
        url: 'https://docs.taro.zone/docs/',
        tag: '小程序'
      },
      {
        name: '微信小程序',
        url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/',
        tag: '小程序'
      },
      {
        name: '微信表情包',
        url: 'https://sticker.weixin.qq.com/cgi-bin/mmemoticonwebnode-bin/pages/home',
        tag: '表情包'
      },
      {
        name: 'Electron',
        url: 'https://www.electronjs.org/zh/docs/latest/',
        tag: '桌面应用'
      }
    ]
  },
  {
    title: 'UI 组件库',
    img: ui,
    children: [
      {
        name: 'Element',
        url: 'https://element.eleme.cn/#/zh-CN/component/installation'
      },
      {
        name: 'ElementPlus',
        url: 'https://element-plus.org/zh-CN/component/button.html'
      },
      {
        name: 'NaiveUI',
        url: 'https://www.naiveui.com/zh-CN/os-theme/components/button'
      },
      {
        name: 'ViewDesign',
        url: 'https://www.iviewui.com/view-ui-plus/guide/introduce'
      },
      {
        name: 'ArcoDesign',
        url: 'https://arco.design/react/docs/start'
      },
      {
        name: 'AntDesign',
        url: 'https://ant.design/components/overview-cn/'
      }
    ]
  },
  {
    title: '图形可视化',
    img: echarts,
    children: [
      {
        name: 'Echarts',
        url: 'https://echarts.apache.org/zh/index.html',
        tag: '图表'
      },
      {
        name: 'D3',
        url: 'https://d3js.org/',
        tag: '图表'
      },
      {
        name: 'Antv',
        url: 'https://antv.antgroup.com/',
        tag: '图表'
      },
      {
        name: 'Three',
        url: 'https://threejs.org/',
        tag: 'Web3D'
      },
      {
        name: 'Three中文',
        url: 'http://www.webgl3d.cn/pages/aac9ab/',
        tag: 'Web3D'
      },

      {
        name: 'Arcgis',
        url: 'https://desktop.arcgis.com/zh-cn/documentation/',
        tag: '地图'
      },
      {
        name: 'Cesium',
        url: 'https://www.cesium.com/',
        tag: '地图'
      },
      {
        name: '百度地图API',
        url: 'https://lbsyun.baidu.com/index.php?title=jspopularGL',
        tag: '地图'
      },
      {
        name: '高德地图API',
        url: 'https://lbs.amap.com/api/loca-v2/intro',
        tag: '地图'
      },
      {
        name: 'Echarts可视化社区',
        url: 'https://www.makeapie.cn/echarts',
        tag: '案例'
      },
      {
        name: 'Three编辑器',
        url: 'https://threejs.org/editor/',
        tag: '工具'
      },
      {
        name: '高德坐标拾取器',
        url: 'https://lbs.amap.com/tools/picker',
        tag: '工具'
      }
    ]
  },
  {
    title: '博客搭建',
    img: hexo,
    children: [
      {
        name: 'Hexo',
        url: 'https://hexo.io/zh-cn/'
      },
      {
        name: 'Vuepress',
        url: 'https://vuepress.vuejs.org/zh/'
      },
      {
        name: 'Vitepress',
        url: 'https://vitejs.cn/vitepress/'
      }
    ]
  }
];
