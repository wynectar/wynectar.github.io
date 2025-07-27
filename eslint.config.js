// eslint.config.js
import vuePlugin from 'eslint-plugin-vue';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'warn'
      // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    },
    languageOptions: {
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly'
      }
    }
  }
];
