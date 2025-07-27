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
