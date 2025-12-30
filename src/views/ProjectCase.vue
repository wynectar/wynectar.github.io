<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { openWindow } from "@/utils/common";
import MiniCode from "@/components/projects/MiniCode.vue";

const elementRef: any = ref(null);
const width = ref(0);

/**
 * ResizeObserver 是一个用于异步监听元素尺寸变化的 JavaScript API，适用于响应式布局、动态内容调整等场景。‌
 * 
 * @onMounted 开始观察
 * @onBeforeUnmount 停止观察
 * */
onMounted(() => {
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      width.value = entry.contentRect.width;
    }
  });

  if (elementRef.value?.[0]) {
    observer.observe(elementRef.value[0]);
    // 保存 observer 以便卸载时断开
    elementRef.value[0]._resizeObserver = observer;
  }
});
onBeforeUnmount(() => {
  if (elementRef?.value) {
    elementRef.value.forEach((ele: any) => {
      if (ele._resizeObserver) ele._resizeObserver.disconnect();
    });
  }
});

const projectList = ref([
  {
    name: "微信小程序",
    url: "",
    compoent: MiniCode
  },
  {
    name: "可视化大屏自适应DEMO",
    url: "/dashboard/#/adaptive-screen",
  },
]);
</script>

<template>
  <div class="grid">
    <div class="grid-item" v-for="pro in projectList" :key="pro.name" @click="openWindow(pro.url)">
      <!-- 标题 -->
      <div class="title" ref="elementRef">{{ pro.name }}</div>
      <!-- 容器 -->
      <div class="iframe-box" :style="{ height: `${(width * 9) / 16}px` }">
        <iframe v-if="pro.url" :src="pro.url" frameborder="0" :style="{ transform: `scale(${width / 1920})` }"></iframe>
        <component v-else :is="pro.compoent"></component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, auto));
  grid-gap: 20px 20px;
}

.grid-item {
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  background: linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%);
  cursor: pointer;
}

.iframe-box {
  overflow: hidden;
  position: relative;
}

.iframe-box::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
}

iframe {
  width: 1920px;
  height: 1080px;
  transform-origin: 0 0;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #fff;
}
</style>