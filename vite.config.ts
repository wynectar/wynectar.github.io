import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ass': path.resolve(__dirname, './src/assets'),
      '@com': path.resolve(__dirname, './src/components'),
    },
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // 导入时想要省略的扩展名列表
  },
  // optimizeDeps: {
  //   force: false // 强制进行依赖预构建
  // },
  // css: {
  //   // CSS 预处理器
  //   preprocessorOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       modifyVars: {
  //         hack: `true; @import (reference) "${path.resolve('src/assets/styles/global.less')}";`,
  //       },
  //     },
  //   },
  // },
})
