<script setup lang="ts">
import { reactive, defineAsyncComponent, markRaw, computed } from "vue";
import tools from "@/mock/tools.ts";

const toolList = reactive(tools.map((v: any) => {
  v.component = markRaw(
    defineAsyncComponent(() => import(`@/components/tools/${v.componentName}.vue`))
  );
  return v;
}));
</script>

<template>
  <div class="tools">
    <n-tabs type="line" animated>
      <n-tab-pane :name="t.componentName" :tab="t.name" v-for="(t, index) in toolList" :key="index">
        <component :is="t.component"></component>
      </n-tab-pane>
    </n-tabs>

  </div>
</template>

<style scoped>
.tools :deep(.n-tabs-nav) {
  position: sticky;
  z-index: 1;
  top: 20px;
  background: var(--n-color);
  box-shadow: 0 12px 0 var(--n-color), 0 -20px 0 var(--n-color);
}
</style>