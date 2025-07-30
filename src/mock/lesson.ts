import vue from '@ass/imgs/vue.svg';
import react from '@ass/imgs/react.svg';
import echarts from '@ass/imgs/echarts.svg';
import hexo from '@ass/imgs/hexo.svg';
import applet from '@ass/imgs/applet.svg';

export const list1 = [
  {
    name: 'vue',
    img: vue,
    description: 'Vue相关',
    children: [
      {
        name: 'vue',
        url: 'https://cn.vuejs.org/'
      },
      {
        name: 'Vuex',
        url: 'https://vuex.vuejs.org/zh/'
      },
      {
        name: 'Pinia',
        url: 'https://pinia.web3doc.top/'
      },
      {
        name: 'VueRouter',
        url: 'https://router.vuejs.org/zh/'
      },
      {
        name: 'Vite',
        url: 'https://vitejs.cn/'
      },
      {
        name: 'Element',
        url: 'https://element.eleme.cn/#/zh-CN/component/installation'
      },
      {
        name: 'ElementPlus',
        url: 'https://element-plus.org/zh-CN/component/button.html'
      },
      {
        name: 'ArcoDesign',
        url: 'https://arco.design/vue/docs/start'
      },
      {
        name: 'NaiveUI',
        url: 'https://www.naiveui.com/zh-CN/os-theme/components/button'
      },
      {
        name: 'ViewDesign',
        url: 'https://www.iviewui.com/view-ui-plus/guide/introduce'
      }
    ]
  },
  {
    name: 'react',
    img: react,
    description: 'React相关',
    children: [
      {
        name: 'react',
        url: 'https://zh-hans.react.dev/'
      },
      {
        name: 'Webpack',
        url: 'https://www.webpackjs.com/'
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
    name: 'echarts',
    img: echarts,
    description: '图形可视化',
    children: [
      {
        name: 'Echarts',
        url: 'https://echarts.apache.org/zh/index.html'
      },
      {
        name: 'Echarts案例',
        url: 'https://www.makeapie.cn/echarts'
      },
      {
        name: 'D3',
        url: 'https://d3js.org/'
      },
      {
        name: 'Antv',
        url: 'https://antv.antgroup.com/'
      },
      {
        name: 'Three',
        url: 'https://threejs.org/'
      },
      {
        name: 'Three辅助',
        url: 'http://www.webgl3d.cn/pages/aac9ab/'
      },
      {
        name: 'Three编辑器',
        url: 'https://threejs.org/editor/'
      },
      {
        name: 'Arcgis',
        url: 'https://desktop.arcgis.com/zh-cn/documentation/'
      },
      {
        name: 'Cesium',
        url: 'https://www.cesium.com/'
      },
      {
        name: '百度地图API',
        url: 'https://lbsyun.baidu.com/index.php?title=jspopularGL'
      },
      {
        name: '高德地图API',
        url: 'https://lbs.amap.com/api/loca-v2/intro'
      },
      {
        name: '高德坐标拾取器',
        url: 'https://lbs.amap.com/tools/picker'
      }
    ]
  },
  {
    name: 'applet',
    img: applet,
    description: '小程序&桌面应用',
    children: [
      {
        name: 'Uniapp',
        url: 'https://uniapp.dcloud.net.cn/component/'
      },
      {
        name: 'Taro',
        url: 'https://docs.taro.zone/docs/'
      },
      {
        name: 'Electron',
        url: 'https://www.electronjs.org/zh/docs/latest/'
      }
    ]
  },
  {
    name: 'hexo',
    img: hexo,
    description: '博客搭建',
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

export const list2 = [
  {
    question: 'nginx: [emerg] bind() to 0.0.0.0:port failed (98: Address already in use)',
    label: 'Nginx',
    answer: `<ol>
            <li>
                第一步检查端口占用情况：<green>netstat -apn  | grep  port</green>，以9090端口为例，输出结果如下：
                <div>[root@xxxs sbin]# netstat -apn  | grep  9090</div>
                <div>tcp        0      0 0.0.0.0:9090            0.0.0.0:*  </div>
                <div>LISTEN      9090/nginx: worker </div>
            </li>
            <li>第二步强制杀掉：<green>kill -9 port</green></li>
            <li>
                第三步重启nginx服务器：
                <green>
                    <div>cd /usr/local/nginx(nginx文件夹)/sbin</div>
                    <div>./nginx -s reload</div>
                </green>
            </li>
        </ol>`
  },
  {
    question: 'u盘或移动硬盘大于4GB的文件无法存储',
    label: '其它',
    answer: `<ol>
            <div>因为u盘或硬盘默认格式是<orange>FAT32</orange>，它的单个文件大小限制为4GB，所以需要格式化为其它格式，如下：</div>
            <li>格式化为<green>NTFS</green>，属于微软的专利，无法在Mac系统使用</li>
            <li>格式化为<green>exFAT</green>，兼容性好，单个文件上限可达16EB</li>
        </ol>`
  },
  {
    question: 'github master分支下的dist文件夹推送到gh-pages分支',
    label: 'Github',
    answer: `<ol>
            <li>第一步前提条件：dist需先提交到master分支</li>
            <li>第二步快捷命令：<green>git subtree push --prefix dist origin gh-pages</green></li>
            <li>强制推送快捷命令：<green>git push origin 'git subtree split --prefix dist main':gh-pages --force </green></li>
        </ol>`
  },
  {
    question: '为什么CSS中的calc函数可能会不生效？',
    label: 'CSS',
    answer: `<ol>
            <li>运算符之间没加空格，错误示例如：<red>width: calc(100%-50px);</red></li>
            <li>运算值没带单位，错误示例如：<red>width: calc(0 + 100px);</red></li>
            <li>低版本less处理calc冲突，代码编译前：<green>width: calc(100% - 50px);</green>编译后：<red>width: calc(50%);</red>，解决方法如下：<green>~'anything'</green></li>
        </ol>`
  },
  {
    question: 'MacOS上Node版本的管理工具 n',
    label: 'Node',
    answer: `<ol>
            <li>下载管理工具n：<green>npm i -g n</green> 或 <green>yarn global add n</green></li>
            <li>
                安装Node版本 <br/> 
                指定版本：<green>n version </green>，如：n 18.12.1 <br/>
                稳定版本：<green>n lts/stable</green> <br/>
                最新版本：<green>n latest/current</green> <br/>
            </li>
            <li>
                删除Node版本 <br/> 
                指定版本：<red>n rm/- version </red> <br/>
                当前版本：<red>n uninstall</red> <br/>
                当前以外的版本：<red>n prune</red> <br/>
            </li>
        </ol>`
  }
];
