/**
 * Commitlint 配置文件
 * Git 提交信息规范检查
 */
const emojiMap = {
  feat: '🚀',
  fix: '🐛',
  docs: '📝',
  style: '💄',
  refactor: '♻️',
  test: '✅',
  chore: '🔧',
  revert: '⏪'
};
// [
//   'feat 🚀',    // 新增功能
//   'fix 🐛',      // 修复bug
//   'docs 📝',     // 文档变更
//   'style 💄',    // 代码样式
//   'refactor ♻️', // 代码重构
//   'test ✅',     // 测试相关
//   'chore 🔧',    // 构建/工具变更
//   'revert ⏪'    // 回滚提交
// ]
export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'emoji-rule': ({ type }) => {
          const emoji = emojiMap[type];
          return [
            emoji !== undefined,
            `类型 ${type} 必须使用表情符号: ${emojiMap[type] || '未知类型'}`
          ];
        }
      }
    }
  ],
  rules: {
    // 限制主题最大长度为 72（推荐范围）
    'subject-max-length': [2, 'always', 72],
    'emoji-rule': [2, 'always'],
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
