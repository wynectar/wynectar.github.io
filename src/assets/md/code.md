# 前端项目代码质量配置Prettier + Commitlint + Husky + Lint-staged

为什么需要这套配置？

🎨 统一代码风格：告别团队成员间的代码格式争论
🔒 强制规范检查：提交前自动检查，确保代码质量
📝 规范提交信息：标准化 Git 提交信息，便于版本管理
⚡ 高效检查：只检查待提交的文件，提升检查速度
🛠️ 零配置上手：复制粘贴即可使用，开箱即用

代码提交
Husky pre-commit
Lint-staged

ESLint 检查
Prettier 格式化

commit-msg 钩子
Commitlint 检查
提交成功

## 安装依赖

```
npm install -D prettier @commitlint/cli @commitlint/config-conventional husky lint-staged
```

## 初始化 Husky

```
# 初始化 husky
npx husky init

# 或者在 package.json 中添加 prepare 脚本
npm pkg set scripts.prepare="husky"
npm run prepare

```

在 package.json 中添加以下配置：

```
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}

```

.prettierrc.mjs

```
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

.prettierignore

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

commitlint.config.mjs

```
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

创建 .husky/pre-commit 文件：

```
npx lint-staged

```

创建 .husky/commit-msg 文件

```
npx --no -- commitlint --edit ${1}

```

日常开发流程
编写代码：正常开发，无需担心格式问题
提交代码：
bash 体验AI代码助手 代码解读复制代码git add .
git commit -m "feat: 添加用户登录功能"

自动处理：
pre-commit 钩子自动格式化代码
commit-msg 钩子检查提交信息格式
检查通过后完成提交

常用类型说明：
类型说明示例feat新功能feat: 添加用户登录功能fix修复 bugfix: 修复用户头像显示问题docs文档更新docs: 更新 API 文档style代码格式调整style: 格式化代码refactor代码重构refactor: 重构用户模块test添加测试test: 添加登录功能测试chore构建/工具变动chore: 更新依赖版本

🔧 手动执行命令

```
# 格式化所有文件
npx prettier --write .

# 检查提交信息
echo "feat: 测试提交" | npx commitlint

# 手动执行 lint-staged
npx lint-staged

```

{
"lint-staged": {
"_.{js,ts}": ["eslint --fix", "prettier --write"],
"_.css": ["stylelint --fix", "prettier --write"],
"\*.md": ["prettier --write"]
}
}

https://juejin.cn/post/7513492533638889506
