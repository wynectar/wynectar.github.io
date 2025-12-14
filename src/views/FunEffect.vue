<script setup lang="ts">
import { ref, defineAsyncComponent, markRaw } from "vue";
import demos from "@/mock/demos.ts";
const demoList = ref(
  demos.map((v: any) => {
    v.component = markRaw(
      defineAsyncComponent(() => import(`@/components/demos/${v.componentName}.vue`))
    );
    return v;
  })
);
</script>

<template>
  <div class="grid">
    <n-card v-for="d in demoList" :key="d.componentName" :title="d.name" class="grid-item" content-class="card-content"
      header-class="card-header">
      <!-- 动态组件显示 -->
      <component :is="d.component"></component>
    </n-card>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(356px, auto));
  grid-gap: 20px 20px;
}

:deep(.card-header) {
  background: linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%);
}

:deep(.card-content) {
  flex: auto;
  height: 328px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}
</style>