## 为什么前端项目需要配置Git提交规范

- `标准化格式`：使用如Conventional Commits规范(如feat:, fix:, docs:等前缀)，使提交信息清晰一致
- `强制代码检查`：通过pre-commit钩子运行ESLint/Prettier等，确保提交的代码符合规范
- `跨团队协作`：当多个团队协作时，统一的提交规范使协作更顺畅
- `长期维护性`：项目长期维护时，规范的提交历史价值会愈发明显
- `.....`

## 安装依赖

```bash
npm install -D prettier @commitlint/cli @commitlint/config-conventional husky lint-staged @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-vue
```

这里需要注意各个插件的版本，因为版本不同，属性兼容性不同，此次版本如下：

- "prettier": "^3.6.2"
- "@commitlint/cli": "^19.8.1"
- "@commitlint/config-conventional": "^19.8.1"
- "husky": "^9.1.7"
- "lint-staged": "^16.1.2"
- "@typescript-eslint/eslint-plugin": "^8.38.0"
- "@typescript-eslint/parser": "^8.38.0"
- "eslint-plugin-vue": "^10.3.0"

## 初始化 Husky

```bash
npx husky init
```

执行命令后会在 package.json 中添加 prepare 脚本（项目安装依赖后自动启用 Husky）。

创建 .husky 目录，并生成一个示例 `pre-commit` 钩子。

## 文件配置

### 钩子文件

- `pre-commit`

```bash
npx lint-staged
```

- `commit-msg`
  如果文件不存在，在`.husky`文件下面手动创建`commit-msg`

```bash
npx --no -- commitlint --edit ${1}
```

### package.json

可以配置需要格式化的文件

```json
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint --fix --ext .js,.ts,.vue src",
    "format": "prettier --write src/**/*.{js,ts,vue,json}"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### prettierrc相关文件

- `.prettierrc.mjs`

```js
/**
 * Prettier 配置文件
 * 代码格式化规则配置
 */
export default {
  printWidth: 100, // 每行最大字符数
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 使用空格而不是制表符
  semi: true, // 语句末尾添加分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 对象属性仅在需要时添加引号
  bracketSpacing: true, // 对象大括号内添加空格
  bracketSameLine: false, // HTML 标签的 > 换行显示
  arrowParens: 'avoid', // 箭头函数参数使用括号
  endOfLine: 'lf', // 使用 Unix 换行符
  trailingComma: 'none', // 不添加尾随逗号
  vueIndentScriptAndStyle: false, // Vue 文件 script/style 不额外缩进
  singleAttributePerLine: false, // HTML 属性不强制每行一个
  htmlWhitespaceSensitivity: 'css', // HTML 空格敏感度
  embeddedLanguageFormatting: 'auto' // 自动格式化嵌入代码
};
```

- `.prettierignore`
  格式化忽略的文件

```
# Lock files
package-lock.json
pnpm-lock.yaml
yarn.lock

# Build outputs
dist/
build/
.turbo/
.nuxt/

# Dependencies
node_modules/

# Generated files
*.d.ts
coverage/
.nyc_output/

# IDE and OS files
.DS_Store
.vscode/settings.json
.idea/

# Log files
*.log
logs/

# Temporary files
tmp/
temp/
```

### commitlint.config.mjs

提交配置

```js
/**
 * Commitlint 配置文件
 * Git 提交信息规范检查
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 限制主题最大长度为 72（推荐范围）
    'subject-max-length': [2, 'always', 72],

    // 类型必须是下列之一
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档改动
        'style', // 代码格式（不影响功能）
        'refactor', // 代码重构
        'perf', // 性能优化
        'test', // 添加测试
        'build', // 构建相关
        'ci', // CI 配置
        'chore', // 杂项（依赖更新等）
        'revert' // 回滚
      ]
    ],

    // 提交 message 必须以小写字母开头
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']]
  }
};
```

### eslint.config.js

[参考文档](https://eslint.org/docs/latest/use/configure/migration-guide#)

```js
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
```

## 其他问题

- 当校验不通过，想跳过钩子检查，使用 `--no-verify` 参数
  项目中不建议使用

```bash
git commit -m "紧急修复" --no-verify
```

- 批量格式化现有代码

```bash
npx prettier --write .
```
