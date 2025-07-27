// eslint.config.js
import globals from 'globals';
import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';

export default [
  // 通用规则
  {
    files: ['**/*.{js,ts,vue}'],
    ignores: ['dist/**', 'node_modules/**'],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.browser
    }
  },

  // Vite 配置文件特殊规则
  {
    files: ['vite.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        defineConfig: 'readonly'
      }
    }
  },

  // Vue 文件规则
  {
    files: ['**/*.vue'],
    ...vuePlugin.configs['flat/recommended']
  }
];
