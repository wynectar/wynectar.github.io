<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import markedKatex from "marked-katex-extension";
import "katex/dist/katex.min.css";
import DOMPurify from "dompurify";
interface Heading {
  id: string;
  text: string;
  level: number | undefined;
}
type tokenParams = {
  type: string;
  text: string;
};
type markedParams = {
  text: string;
  header?: boolean;
  align?: "left" | "center" | "right" | null;
  lang?: string;
  depth?: number;
  tokens?: tokenParams[];
};
type markedTableParams = {
  header: markedParams[];
  rows: markedParams[][];
};
type markedRenderer = {
  [key: string]: any;
};

// props 声明
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
// 响应式变量声明
const contentRef = ref<HTMLElement | null>(null);
const parsedContent = ref("");
const headings = ref<Heading[]>([]);
const showCopyNotification = ref(false);
const copyNotificationTimeout = ref<number | null>(null);

// ******* 配置marked⬇️ ******
// 基础配置
marked.use({
  breaks: true, // 转换换行符为 <br>
  gfm: true, // 启用GitHub风格的Markdown
});
// render
// 初始化复制按钮
const initCopyButtons = () => {
  if (!contentRef.value) return;

  const buttons = contentRef.value.querySelectorAll(".copy-button");
  buttons.forEach((button) => {
    button.removeEventListener("click", handleCopyClick);
    button.addEventListener("click", handleCopyClick);
  });
};

// 处理复制
const handleCopyClick = async (event: Event) => {
  const button = event.currentTarget as HTMLElement;
  const code = decodeURIComponent(button.getAttribute("data-code") || "");

  try {
    await navigator.clipboard.writeText(code);
    showCopyNotification.value = true;

    if (copyNotificationTimeout.value) {
      clearTimeout(copyNotificationTimeout.value);
    }

    copyNotificationTimeout.value = window.setTimeout(() => {
      showCopyNotification.value = false;
    }, 2000);
  } catch (err) {
    console.error("复制失败:", err);
  }
};

// 滚动到标题
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    element.classList.add("highlight");
    setTimeout(() => element.classList.remove("highlight"), 300);
  }
};
const tablecell = ({ text, header, align }: markedParams) => {
  // header: boolean; align: "center" | "left" | "right" | null
  const tag = header ? "th" : "td";
  const style = align ? ` style="text-align:${align}"` : "";
  return `<${tag}${style}>${text}</${tag}>`;
};
const tablerow = (rows: markedParams[]) => {
  return `<tr>${rows.map((row) => tablecell(row)).join("")}</tr>`;
};
const renderer: markedRenderer = {
  // 自定义代码块渲染
  code({ text, lang }: markedParams) {
    const validLang = lang && hljs.getLanguage(lang) ? lang : "plaintext";
    const highlighted = hljs.highlight(text, {
      language: validLang,
      ignoreIllegals: true,
    }).value;
    return `
        <div class="code-block">
        <div class="code-header">
            <span class="language">${validLang}</span>
            <button class="copy-button" data-code="${encodeURIComponent(text)}">
            <svg viewBox="0 0 24 24" width="14" height="14">
                <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
            </svg>
            复制
            </button>
        </div>
        <pre><code class="hljs ${validLang}">${highlighted}</code></pre>
        </div>
    `;
  },
  // 标题
  heading({ text, depth }: markedParams) {
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.value.push({ id, text, level: depth });
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  },
  // table
  table({ header, rows }: markedTableParams) {
    const thead = tablerow(header);
    const tbody = rows.map((row) => tablerow(row)).join("");
    return `
          <div class="table-container">
            <table class="markdown-table">
              <thead>${thead}</thead>
              <tbody>${tbody}</tbody>
            </table>
          </div>
        `;
  },
  // 行内代码 `code`
  codespan({ text }: markedParams) {
    return `<code class="inline-code md-color">${text}</code>`;
  },
  // 加粗 **text**
  strong({ text, tokens }: markedParams) {
    if (!tokens || tokens.length === 1) {
      return `<strong  class="md-color">${text}</strong>`;
    } else {
      return `<strong  class="md-color">${tokens
        .map((v) =>
          v.type === "codespan"
            ? `<code class="inline-code md-color">${v.text}</code>`
            : v.text
        )
        .join("")}</strong>`;
    }
  },
  // 斜体 *text*
  em({ text }: markedParams) {
    return `<em class="md-color">${text}</em>`;
  },
};
marked.use({ renderer });
// ******* 配置marked⬇⬆️ ******

// 添加数学公式支持
marked.use(markedKatex({ throwOnError: false }));

// 解析 Markdown
const parseMarkdown = async () => {
  /**
   * 安全处理
   * - 使用 DOMPurify 对 HTML 进行净化处理
   * - 防止 XSS 攻击
   * */
  const result: string | Promise<string> = await marked.parse(props.content);
  parsedContent.value = DOMPurify.sanitize(result);

  nextTick(() => {
    initCopyButtons();
  });
};

// 监听 markdown 变化
watch(() => props.content, parseMarkdown, { immediate: true });
</script>

<template>
  <div class="markdown-preview">
    <!-- Markdown 内容 -->
    <div class="markdown-content" ref="contentRef" v-html="parsedContent"></div>
    <!-- 标题导航 -->
    <div v-if="headings.length > 0" class="toc-sidebar">
      <h3 class="toc-header">目录导航</h3>
      <ul class="toc-list">
        <li v-for="heading in headings" :key="heading.id" :class="`toc-item level-${heading.level}`">
          <a :href="`#${heading.id}`" @click.prevent="scrollToHeading(heading.id)" :title="heading.text">{{ heading.text
            }}</a>
        </li>
      </ul>
    </div>
    <!-- 复制成功提示 -->
    <transition name="fade">
      <div v-if="showCopyNotification" class="copy-notification">
        <span>✅ 代码已复制</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.markdown-preview {
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  gap: 10px;
}

.toc-sidebar {
  flex: 0 0 220px;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding-left: 10px;
  box-sizing: border-box;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 6px;
  font-size: 14px;
}

.toc-item a {
  color: #555;
  text-decoration: none;
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toc-item a:hover {
  background-color: #f0f0f0;
}

.level-2 {
  padding-left: 12px;
}

.level-3 {
  padding-left: 24px;
}

.level-4 {
  padding-left: 36px;
}

.level-5 {
  padding-left: 48px;
}

.level-6 {
  padding-left: 60px;
}

.markdown-content {
  flex: 1;
  min-width: 0;
}

.copy-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2c3e50;
  color: white;
  padding: 10px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 960px) {
  .toc-sidebar {
    display: none;
  }
}

/* 全局 Markdown 内容样式 */
.markdown-content :deep(.md-color) {
  color: #e83e8c;
}

.markdown-content :deep(.inline-code) {
  background: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
  margin: 1.5em 0 1em;
  color: #2c3e50;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
  margin: 1.3em 0 0.8em;
}

.markdown-content :deep(p) {
  margin: 1em 0;
  line-height: 1.6;
}

.markdown-content :deep(a) {
  color: #3498db;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(.code-block) {
  margin: 1em 0;
  border-radius: 6px;
  overflow: hidden;
  background: #282c34;
}

.markdown-content :deep(.code-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  background: rgba(0, 0, 0, 0.2);
  color: #aaa;
  font-size: 0.9em;
}

.markdown-content :deep(.copy-button) {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 0.25em 0.5em;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
  outline: none;
}

.markdown-content :deep(.copy-button:hover) {
  background: rgba(255, 255, 255, 0.2);
}

.markdown-content :deep(pre) {
  margin: 0;
  /* padding: 1em; */
  overflow: auto;
}

.markdown-content :deep(.highlight) {
  animation: highlight-fade 1s;
}

/* 添加表格样式 */
.markdown-content :deep(.table-container) {
  width: 100%;
  overflow-x: auto;
  margin: 1em 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.markdown-content :deep(.markdown-table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95em;
}

.markdown-content :deep(.markdown-table th),
.markdown-content :deep(.markdown-table td) {
  padding: 12px 15px;
  border: 1px solid #e1e4e8;
  text-align: left;
}

.markdown-content :deep(.markdown-table th) {
  background-color: #f6f8fa;
  font-weight: 600;
  color: #24292e;
}

.markdown-content :deep(.markdown-table tr:nth-child(even)) {
  background-color: #fafbfc;
}

.markdown-content :deep(.markdown-table tr:hover) {
  background-color: #f6f8fa;
}

@keyframes highlight-fade {
  0% {
    background-color: rgba(255, 255, 0, 0.3);
  }

  100% {
    background-color: transparent;
  }
}
</style>
