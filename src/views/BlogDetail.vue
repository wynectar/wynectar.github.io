<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from "vue";
import { useNBRouter } from "@/utils/router";
import { useThemeStore } from '@/stores/theme'

// 主题模式控制
const iframe = ref()
const theme = useThemeStore()
const show = ref(!theme.isDark)

console.log(show.value, theme.isDark)
const stop = watch(() => theme.isDark, () => {
  changeTheme()
})
function changeTheme() {
  const html = iframe.value?.contentDocument?.querySelector('html')
  if (!html) return
  if (theme.isDark) {
    iframe.value?.contentDocument?.querySelector('html').classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  nextTick(() => {
    show.value = true
  })
}
onBeforeUnmount(() => {
  stop()
})

// 根据路由参数获取文章文件名
const { route } = useNBRouter();
const id = route.params.id
const url = `/docs/${id}.html`

/**
 * @checking 正在校验中。。。
 * @pageExists 页面是否存在
 * @checkUrlExists 校验函数
 * */
const checking = ref(true)
const pageExists = ref(false)
async function checkUrlExists() {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors', // 如果是跨域请求
      cache: 'no-cache'
    });
    pageExists.value = response.ok;
  } catch (error) {
    console.error('检查 URL 失败:', error);
    pageExists.value = false;
  } finally {
    checking.value = false;
  }
}
function onLoad() {
  console.log('iframe 加载成功');
  changeTheme()
}

function onError() {
  console.error('iframe 加载失败');
}
onMounted(() => {
  checkUrlExists()
})
</script>
<template>
  <div class="full">
    <!-- 检查中 -->
    <n-result status="418" title="检查页面是否存在..." description="" v-if="checking">
    </n-result>
    <!-- iframe 主题切换 -->
    <div v-else-if="pageExists" class="full">
      <n-result status="418" title="主题切换中..." v-if="!show">
        <template #icon>
          <n-spin size="large" />
        </template>
      </n-result>
      <iframe v-show="show" :src="url" @load="onLoad" @error="onError" width="100%" height="100%" frameborder="0"
        ref="iframe"></iframe>
    </div>
    <!-- 页面不存在 -->
    <n-result status="403" title="页面不存在" v-else>
      <template #footer>
        请求的页面 <code>{{ url }}</code> 不存在!
      </template>
    </n-result>
  </div>
</template>

<style scoped>
.full {
  height: 100%;
}
</style>
