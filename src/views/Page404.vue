<script setup lang="ts">
/*************引入***************/
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useNBRouter } from "@/utils/router";
const { navigateToDefault, pathDefault } = useNBRouter();

/*************数据***************/
const count = ref(10);
let timer: number | null = null;

/*************生命周期***************/
onMounted(() => {
  timer = setInterval(() => {
    count.value -= 1;
    if (count.value === 0) {
      clearTimer();
      navigateToDefault();
    }
  }, 1000);
});
onBeforeUnmount(() => {
  clearTimer();
});

/*************函数***************/
function clearTimer() {
  if (timer) clearInterval(timer);
}
</script>

<template>
  <n-result status="404" title="404 资源不存在" description="" class="p-center">
    <template #footer>
      <n-button><router-link :to="pathDefault">{{ count }}s 后跳转到首页</router-link></n-button>
    </template>
  </n-result>
</template>