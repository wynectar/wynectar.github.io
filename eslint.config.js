// eslint.config.js
import vuePlugin from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      // 你的规则配置
      'vue/multi-word-component-names': 'off' // 如果需要关闭多单词组件名规则
    },
    ignores: ['**/node_modules/*', '**/dist/*', '**/build/*', '**/*.d.ts']
  }
];
