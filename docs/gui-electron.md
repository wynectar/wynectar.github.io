---
outline: deep
navbar: false
sidebar: false
---

# 基于 Vite + Electron + Vue-ts 的桌面应用模版

## 技术选型

嵌入 `Chromium` 和 `Node.js` 到 二进制的 Electron 是一个框架，使开发者能够将 Web 技术(HTML、JavaScript、CSS)、Node.js 及原生代码相结合，`构建适用于 macOS、Windows 和 Linux 的跨平台桌面应用程序`。 它`基于MIT开源许可证`，对商业和个人用途均免费。

`所需依赖：`

- ![Static Badge](https://img.shields.io/badge/Node-24.12.0-%235FA04E?style=flat&logo=node.js)

- ![Static Badge](https://img.shields.io/badge/Electron-39.2.7-%2347848F?style=flat&logo=electron)

- ![Static Badge](https://img.shields.io/badge/Vite-7.2.4-%236E9F18?style=flat&logo=vitest)

- ![Static Badge](https://img.shields.io/badge/Vue-3.5.24-%234FC08D?style=flat&logo=vue.js)

## 搭建项目模版

### 搭建 Vite 项目

搭建vite项目时，可以选择任意框架模版，比如react、vue等，本项目选择的是vue模版。

- 方式一：命令逐步创建
  1. 执行命令
     ::: code-group

  ```bash [npm]
  npm create vite@latest
  ```

  ```bash [Yarn]
  yarn create vite
  ```

  ```bash [pnpm]
  pnpm create vite
  ```

  ```bash [bun]
  bun create vite
  ```

  ```bash [Deno]
  deno init --npm vite
  ```

  :::
  2. 选择需要的框架模版，创建项目名称等

  ```bash
  │
  ◇  Project name:
  │  vite-electron
  │
  ◇  Select a framework:
  │  Vue
  │
  ◇  Select a variant:
  │  TypeScript
  │
  ◇  Use rolldown-vite (Experimental)?:
  │  No
  │
  ◆  Install with npm and start now?
  │  ● Yes / ○ No
  └
  ```

- 方式二：命令选项创建

  ::: code-group

  ```bash [npm]
  # npm 7+，需要添加额外的 --：
  npm create vite@latest vite-electron -- --template vue
  ```

  ```bash [Yarn]
  yarn create vite vite-electron --template vue
  ```

  ```bash [pnpm]
  pnpm create vite vite-electron --template vue
  ```

  ```bash [bun]
  bun create vite vite-electron --template vue
  ```

  ```bash [Deno]
  deno init --npm vite vite-electron --template vue
  ```

  :::

  查看 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) 以获取每个模板的更多细节：`vanilla`，`vanilla-ts`，`vue`，`vue-ts`，`react`，`react-ts`，`react-swc`，`react-swc-ts`，`preact`，`preact-ts`，`lit`，`lit-ts`，`svelte`，`svelte-ts`，`solid`，`solid-ts`，`qwik`，`qwik-ts`。

::: tip 提示

- Vite 需要 Node.js 版本 `20.19+`, `22.12+`。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。
- 使用 `.` 作为项目名称则表示在当前目录中创建项目脚手架。
- 要创建一个没有交互式提示的项目，你可以使用 `--no-interactive` 标志。
  :::

### 安装 electron 相关依赖

::: code-group

```bash [npm]
# --save-dev 可以简写为：-D
npm install electron electron-builder --save-dev
```

```bash [Yarn]
# --dev 可以简写为：-D
yarn add electron electron-builder --dev
```

:::

`electron-builder`：是一个强大的应用打包和分发工具，用于将 Electron 应用构建为平台特定的安装程序（如 `Windows 的 .exe`、`macOS 的 .dmg` 或 `Linux 的 .deb`）。它支持自动更新、代码签名、创建图标以及处理原生依赖，简化了跨平台分发流程。‌

### 安装其他依赖

::: code-group

```bash [npm]
npm install concurrently cross-env wait-on -D

# 类型声明
npm install @types/electron -D
```

```bash [Yarn]
yarn add concurrently cross-env wait-on -D

# 类型声明
yarn add @types/electron -D
```

:::

- `wait-on`：用于等待某个条件就绪后再执行后续命令。常见场景是监听HTTP端口（如`http://localhost:3000`）或文件，确保前端服务完全启动后再启动Electron，避免因服务未就绪导致的错误。‌

- `concurrently`：允许在单个终端命令中同时执行多个脚本。例如，在Electron开发中，可以并行启动前端开发服务器和Electron主进程，提升效率。‌

- `cross-env`：实现跨平台环境变量设置。它允许在package.json的scripts中统一设置环境变量（如BROWSER=none），避免在不同操作系统（如Windows和macOS）上因命令差异导致的问题

### 增加项目结构

```bash
vite-
├── package.json
├── vite.config.ts
├──            # Electron 主进程代码
│   ├── main.ts        # 主进程入口
│   ├── preload.ts     # 预加载脚本
│   ├── renderer.ts    # 版本信息
│   └── utils/         # 工具函数
├── src/               # 渲染进程代码（Vue/React）
│   ├── main.tsx/.vue  # 入口文件
│   └── App.vue/.tsx
└── dist/             # 构建输出目录
```

### 配置文件

`electron` 文件夹下面的配置文件，Electron 主进程核心代码。`renderer.ts` 结合 `index.html` 可以写入版本信息，以便于开发过程中查看。

::: code-group

```ts [main.ts]
/**
 * 主进程
 *
 * 以帕斯卡命名法 (PascalCase) 命名可实例化的类，以驼峰命名法 (camelCase) 命名不可实例化的函数、变量等
 * js从 'electron' 导入；ts从 'main' 导入，是为了在编写 TypeScript 代码时进行更好的类型检查
 *
 * @var { 变量 } app - 这个模块控制着您应用程序的事件生命周期
 * @var { 可实例化的类 } BrowserWindow - 这个模块创建和管理 app 的窗口
 *
 * @function ipcMain - 设置handle监听
 * */
import { app, BrowserWindow, ipcMain, shell, Menu } from 'main';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 环境判断
const isDev = process.env.NODE_ENV === 'development';
const isMac = process.platform === 'darwin';

/**
 * 动态导入文件
 * @return 返回结果是个对象
 * @export const xxx 获取信息：obj.xxx
 * @export default xxx 获取信息：obj.default
 * */
const loadModule = async (relativePath: String) => {
  try {
    const obj = await import(path.join(__dirname, relativePath));
    console.log('✅ 文件导入成功');
    return obj;
  } catch (error) {
    console.log('❌ 文件导入失败', error);
  }
};

// 设置菜单
const setupMenu = async win => {
  const { createAppTemplate, createContentTemplate } = await loadModule('./utils/menus.ts');
  createAppTemplate(app, shell, Menu);
  createContentTemplate(win.webContents, Menu);
};

/**
 * @function createWindow - 将您的页面加载到新的 BrowserWindow 实例中
 * @var { 正在执行脚本的路径 } __dirname - 在此处指electron文件夹
 * @function path.join - 关联路径
 * */
const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts')
    }
  });

  // 加载页面
  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 创建菜单
  await setupMenu(win);
};

/**
 * @event whenReady - 在应用准备就绪时调用函数 createWindow
 * @event activate - 监听 app 模组的 activate 事件，如果没有窗口打开则打开一个窗口 (macOS)
 * */
app.whenReady().then(() => {
  console.log('ready Electron 🚀');

  // 处理 ping 请求
  ipcMain.handle('ping', () => {
    console.log('Received ping from renderer');
    return 'pong';
  });

  // 创建窗口
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/**
 * 关闭所有窗口时退出应用 (Windows & Linux)
 * @var { Node.js 变量 } process - [process.platform 变量](https://nodejs.org/api/process.html#process_process_platform)，Electron 目前只支持三个平台：win32 (Windows), linux (Linux) 和 darwin (macOS)。
 * */
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
```

```ts [preload.ts]
const { contextBridge, ipcRenderer } = require('electron');

/**
 * 预加载渲染进程
 * @var versions - 全局变量
 * @var { Node.js 变量 } process - [process.versions 变量](https://nodejs.org/api/process.html#process_process_versions)
 *
 * @function ipcRenderer - 辅助函数
 * @function contextBridge - 是 Electron 中用于在渲染器进程（如 Web 页面）和主进程之间安全地暴露 API 的核心机制
 *
 * */
// 定义允许的 IPC 通道（安全最佳实践）
const ALLOWED_CHANNELS = ['ping'];

// 验证通道是否允许
function isValidChannel(channel) {
  return ALLOWED_CHANNELS.includes(channel);
}
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  v8: () => process.versions.v8,
  // IPC 调用（带安全检查）
  ping: () => {
    if (isValidChannel('ping')) {
      return ipcRenderer.invoke('ping');
    }
    return Promise.reject(new Error('Unauthorized IPC channel'));
  }
});
```

```ts [renderer.ts]
// 判断是在electron环境，还是普通浏览器环境
function isElectron() {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    return navigator.userAgent.toLowerCase().indexOf('electron') > -1;
  }
}
// 使用预加载脚本暴露的 API
async function displayVersions() {
  const infoDiv = document.getElementById('electron-info');
  if (!isElectron()) return;
  const versions = window.versions;
  infoDiv.innerHTML = `
        <p>Node.js: ${versions.node()}</p>
        <p>Chrome: ${versions.chrome()}</p>
        <p>Electron: ${versions.electron()}</p>
        <p>V8: ${versions.v8()}</p>
      `;
}

// 页面加载时显示版本信息
window.addEventListener('DOMContentLoaded', displayVersions);
```

```ts [menus.ts]
const isMac = process.platform === 'darwin';
export const createAppTemplate = (app, shell, Menu) => {
  let currentTheme = 'light';

  const macApp = [
    {
      label: app.name,
      submenu: [
        { role: 'about', label: `关于 ${app.name}` },
        { type: 'separator' }, // 分割线
        { role: 'services', label: '服务' },
        { type: 'separator' },
        { role: 'hide', label: `隐藏 ${app.name}` },
        { role: 'hideOthers', label: '隐藏其他应用' },
        { role: 'unhide', label: '显示所有应用' },
        { type: 'separator' },
        { role: 'quit', label: `退出 ${app.name}` }
      ]
    }
  ];

  const template = [
    // 应用菜单 (仅 macOS)
    ...(isMac ? macApp : []),
    // 文件菜单
    {
      label: '文件',
      submenu: [
        { label: '新建文件', accelerator: 'CmdOrCtrl+N' },
        { label: '打开文件', accelerator: 'CmdOrCtrl+O' },
        { type: 'separator' },
        { label: '保存', accelerator: 'CmdOrCtrl+S' },
        { label: '另存为', accelerator: 'CmdOrCtrl+Shift+S' },
        { type: 'separator' },
        { label: '打印', accelerator: 'CmdOrCtrl+P' },
        { type: 'separator' }
      ]
    },
    // 编辑菜单
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤销', accelerator: 'CmdOrCtrl+Z' },
        { role: 'redo', label: '重做', accelerator: 'CmdOrCtrl+Y' },
        { type: 'separator' },
        { role: 'cut', label: '剪切', accelerator: 'CmdOrCtrl+X' },
        { role: 'copy', label: '复制', accelerator: 'CmdOrCtrl+C' },
        { role: 'paste', label: '粘贴', accelerator: 'CmdOrCtrl+V' },
        { role: 'selectAll', label: '全选', accelerator: 'CmdOrCtrl+A' }
      ]
    },
    // 视图菜单
    {
      label: '视图',
      submenu: [
        {
          label: '主题',
          submenu: [
            {
              label: '浅色主题',
              type: 'radio',
              checked: currentTheme === 'light',
              click: () => {
                currentTheme = 'light';
              }
            },
            {
              label: '深色主题',
              type: 'radio',
              checked: currentTheme === 'dark',
              click: () => {
                currentTheme = 'dark';
              }
            },
            {
              label: '跟随系统',
              type: 'radio',
              checked: currentTheme === 'system',
              click: () => {
                currentTheme = 'system';
              }
            }
          ]
        },
        { type: 'separator' },
        { role: 'reload', label: '重新加载', accelerator: 'CmdOrCtrl+R' },
        { role: 'forceReload', label: '强制重新加载', accelerator: 'CmdOrCtrl+Shift+R' },
        {
          role: 'toggleDevTools',
          label: '开发者工具',
          accelerator: isMac ? 'Cmd+Alt+I' : 'Ctrl+Shift+I'
        },
        { type: 'separator' },
        { role: 'resetZoom', label: '重置缩放', accelerator: 'CmdOrCtrl+0' },
        { role: 'zoomIn', label: '放大', accelerator: 'CmdOrCtrl+=' },
        { role: 'zoomOut', label: '缩小', accelerator: 'CmdOrCtrl+-' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '切换全屏', accelerator: 'F11' }
      ]
    },
    // 窗口菜单
    {
      label: '窗口',
      submenu: [
        { role: 'minimize', label: '最小化', accelerator: 'CmdOrCtrl+M' },
        { role: 'zoom', label: '最大化', accelerator: 'CmdOrCtrl+Enter' },
        { type: 'separator' },
        isMac
          ? { label: '关闭窗口', role: 'close', accelerator: 'CmdOrCtrl+W' }
          : { label: '退出', role: 'quit', accelerator: 'Alt+F4' }
      ]
    },
    // 帮助菜单
    {
      label: '帮助',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://electronjs.org');
          }
        },
        {
          label: '关于',
          click: () => {
            console.log('显示关于信息');
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  console.log('应用菜单创建成功 🎉');
  return template;
};

export const createContentTemplate = (webContents, Menu) => {
  const template = [
    // 编辑功能组
    {
      role: 'undo',
      label: '撤销',
      accelerator: 'CmdOrCtrl+Z'
    },
    {
      role: 'redo',
      label: '重做',
      accelerator: isMac ? 'Cmd+Shift+Z' : 'Ctrl+Y'
    },
    { type: 'separator' },
    {
      role: 'cut',
      label: '剪切',
      accelerator: 'CmdOrCtrl+X'
    },
    {
      role: 'copy',
      label: '复制',
      accelerator: 'CmdOrCtrl+C'
    },
    {
      role: 'paste',
      label: '粘贴',
      accelerator: 'CmdOrCtrl+V'
    },
    {
      role: 'pasteAsPlainText',
      label: '粘贴为纯文本',
      accelerator: 'CmdOrCtrl+Shift+V'
    },
    {
      role: 'delete',
      label: '删除',
      accelerator: 'Delete'
    },
    { type: 'separator' },
    {
      role: 'selectAll',
      label: '全选',
      accelerator: 'CmdOrCtrl+A'
    },

    { type: 'separator' },
    // 检查功能
    {
      label: '检查元素',
      accelerator: isMac ? 'Cmd+Shift+C' : 'Ctrl+Shift+C',
      click: () => webContents?.inspectElement(0, 0)
    },
    {
      label: '重新加载',
      accelerator: 'F5',
      click: () => webContents?.reload()
    },
    {
      label: '强制重新加载',
      accelerator: isMac ? 'Cmd+Shift+R' : 'Ctrl+Shift+R',
      click: () => webContents?.reloadIgnoringCache()
    },
    {
      label: '打开控制台',
      accelerator: isMac ? 'Cmd+Alt+J' : 'Ctrl+Shift+J',
      click: () => webContents?.openDevTools({ mode: 'bottom' })
    }
  ];
  const menu = Menu.buildFromTemplate(template);

  webContents.on('context-menu', (_event, params) => {
    console.log(params);
    // 仅在元素可编辑时显示上下文菜单
    // if (params.isEditable) {}
    menu.popup({
      frame: params.frame
    });
    _event.preventDefault();
  });
  console.log('上下文菜单创建成功 🎉');
  return template;
};
```

:::

`vite` 项目其他的配置文件，`package.json` 新增 electron 操作命令；`index.html` 根据环境动态改变标题，并增加版本信息；新增环境变量文件。

::: code-group

```json [package.json]
{
  "name": "vite-electron",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "main": "electron/main.ts", // [!code focus]
  "scripts": {
    "serve": "concurrently -k \"npm run dev\" \"npm run electron:dev\"", // [!code focus]
    "electron:dev": "wait-on tcp:5173 && cross-env NODE_ENV=development electron .", // [!code focus]
    "electron:build": "npm run build && electron-builder", // [!code focus]
    "electron:build:win": "npm run build && electron-builder --win", // [!code focus]
    "electron:build:mac": "npm run build && electron-builder --mac", // [!code focus]
    "electron:build:linux": "npm run build && electron-builder --linux", // [!code focus]
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.24"
  },
  "devDependencies": {
    "@types/electron": "^1.6.12",
    "@types/node": "^24.10.1",
    "@vitejs/plugin-vue": "^6.0.1",
    "@vue/tsconfig": "^0.8.1",
    "concurrently": "^9.2.1",
    "cross-env": "^10.1.0",
    "electron": "^39.2.7",
    "electron-builder": "^26.4.0",
    "typescript": "~5.9.3",
    "vite": "^7.2.4",
    "vue-tsc": "^3.1.4",
    "wait-on": "^9.0.3"
  }
}
```

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>%VITE_APP_TITLE%</title>
    <!-- [!code focus] -->
  </head>
  <body>
    <div id="electron-info" style="display: none;"></div>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
    <script type="module" src="/electron/renderer.ts"></script>
    <!-- [!code focus] -->
  </body>
</html>
```

```bash [.env]
VITE_APP_TITLE=vite-electron-dev
```

```bash [.env.production]
VITE_APP_TITLE=vite-electron
```

:::

## Electron 打包

？？？
