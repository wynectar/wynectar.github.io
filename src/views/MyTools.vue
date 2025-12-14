<script setup lang="ts">
import { reactive, defineAsyncComponent, markRaw } from "vue";
import tools from "@/mock/tools.ts";

const toolList = reactive(tools.map((v: any) => {
  v.component = markRaw(
    defineAsyncComponent(() => import(`@/components/tools/${v.componentName}.vue`))
  );
  return v;
}));
</script>

<template>
  <n-collapse default-expanded-names="1" accordion>
    <n-collapse-item :title="t.name" :name="String(index + 1)" v-for="(t, index) in toolList" :key="index">
      <!-- 具体某一个工具 -->
      <n-card v-if="t.component">
        <component :is="t.component"></component>
      </n-card>
    </n-collapse-item>
  </n-collapse>
</template>

<style scoped>
.tools>div {
  margin-bottom: 40px;
}

:deep(.card-content) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, auto));
  grid-gap: 20px 20px;
}

.grid-item {
  padding: 20px 0;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(79, 186, 242, 0.5);
}

.grid-item:hover {
  background-color: rgba(79, 186, 242, 1);
}
</style>