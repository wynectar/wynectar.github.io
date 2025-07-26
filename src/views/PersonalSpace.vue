
<script setup lang="ts">
import { ref } from "vue";
import logo from "@ass/imgs/logo.jpeg";
import github from "@ass/imgs/github.svg";
import gitee from "@ass/imgs/gitee.svg";
import { openWindow } from "@/utils/common";

const text = ref("yexiao1949@163.com");
// 基础学习 && 解决问题
import spaceList from "@/mock/spaces";
</script>
<template>
  <n-split
    direction="vertical"
    :max="0.75"
    :min="0.25"
    pane1-style="padding-bottom:30px"
    pane2-style="padding-top:30px"
    class="split"
  >
    <!-- 分割线上 -->
    <template #1>
      <div class="grid">
        <div
          class="grid-item"
          v-for="(space, index) in spaceList"
          :key="index"
          @click="openWindow(space.url)"
        >
          {{ space.name }}
        </div>
      </div>
    </template>
    <!-- 分割线下 -->
    <template #2>
      <n-card title="邮箱地址">
        <n-qr-code :value="text" :icon-src="logo" error-correction-level="H" />
      </n-card>
    </template>
    <!-- 分割线内容 -->
    <template #resize-trigger>
      <n-flex justify="space-around" size="large">
        <a href="https://chat.deepseek.com/" target="_blank"
          ><n-image width="50" preview-disabled :src="github"
        /></a>
        <a href="https://chat.deepseek.com/" target="_blank"
          ><n-image width="50" preview-disabled :src="gitee"
        /></a>
      </n-flex>
    </template>
  </n-split>
</template>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-gap: 20px 20px;
}
.grid-item {
  height: 108px;
  line-height: 108px;
  text-align: center;
  border-radius: 10px;
  background-color: rgba(24, 160, 88, 0.16);
  font-weight: bold;
  cursor: pointer;
}
.grid-item:hover {
  background-color: rgba(24, 160, 88, 0.5);
}
.split :deep(.n-split__resize-trigger-wrapper) {
  background: var(--n-resize-trigger-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.split :deep(.n-split__resize-trigger-wrapper) img {
  background-color: #fff;
  border-radius: 50%;
}
</style>