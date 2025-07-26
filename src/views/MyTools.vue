<script setup lang="ts">
import { ref, defineAsyncComponent, markRaw } from "vue";
import { list1 as thirdTools, list2 } from "@/mock/tool.ts";
import { openWindow } from "@/utils/common";

const toolList = ref(
  list2.map((v: any) => {
    v.component = markRaw(
      defineAsyncComponent(() => import(`@com/tool/${v.componentName}.vue`))
    );
    return v;
  })
);
</script>

<template>
  <div class="tools">
    <n-card title="第三方工具" content-class="card-content">
      <div class="grid-item" v-for="third in thirdTools" :key="third.name" @click="openWindow(third.url)">
        <n-image width="80" height="80" preview-disabled :src="third.img" />
        <div>
          {{ third.name }}
        </div>
      </div>
    </n-card>
    <n-card v-for="tool in toolList" :key="tool.componentName" :title="tool.name">
      <component :is="tool.component"></component>
    </n-card>
  </div>
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