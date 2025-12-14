<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNBRouter } from "@/utils/router";
const { route } = useNBRouter();

// 根据路由参数获取文章文件名
const id = route.params.id
const url = `/docs/${id}.html`

/**
 * @checking 正在校验中。。。
 * @pageExists 页面是否存在
 * 
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
}

function onError() {
  console.error('iframe 加载失败');
}
onMounted(() => {
  checkUrlExists()
})
</script>
<template>
  <div>
    <div v-if="checking" class="loading">检查页面是否存在...</div>
    <div v-else-if="pageExists">
      <iframe :src="url" @load="onLoad" @error="onError" width="100%" height="800" frameborder="0"
        sandbox="allow-scripts allow-same-origin" ref="iframe"></iframe>
    </div>
    <div v-else class="not-found">
      <h3>页面不存在</h3>
      <p>请求的页面 <code>{{ url }}</code> 不存在</p>
    </div>
  </div>
</template>
