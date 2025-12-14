<script setup lang="ts">
import { ref } from "vue";
import logo from "@/assets/imgs/logo.jpeg";
import github from "@/assets/imgs/github.svg";
import gitee from "@/assets/imgs/gitee.svg";
import segmentfault from "@/assets/imgs/segmentfault.svg";
import { openWindow } from "@/utils/common";

const text = ref("yexiao1949@163.com");
// 基础学习 && 解决问题
import spaces from "@/mock/spaces";
</script>
<template>
  <n-split direction="vertical" :max="0.75" :min="0.25" pane1-style="padding-bottom:30px" pane2-style="padding-top:30px"
    class="split">
    <!-- 分割线上 -->
    <template #1>
      <n-card :title="s.title" v-for="(s, index) in spaces" :key="index" style="margin-bottom: 20px;">
        <!-- icon -->
        <template #header-extra>
          <n-image width="60" height="60" preview-disabled :src="s.img" />
        </template>
        <!-- 具体文档 -->
        <div class="grid">
          <div class="grid-item" v-for="(c, cindex) in s.children" :key="cindex" @click="openWindow(c.url)"><n-watermark
              :content="c.tag" cross selectable :font-size="16" :line-height="16" :width="180" :height="128"
              :x-offset="12" :y-offset="28" :rotate="-15">
              {{ c.name }}
            </n-watermark>
          </div>
        </div>
      </n-card>
    </template>
    <!-- 分割线下 -->
    <template #2>
      <!-- 个人邮箱 -->
      <n-card title="邮箱地址" style="margin-top: 20px;">
        <n-qr-code :value="text" :icon-src="logo" error-correction-level="H" />
      </n-card>
    </template>
    <!-- 分割线内容 -->
    <template #resize-trigger>
      <!-- 个人网站地址 -->
      <n-flex justify="space-around" size="large">
        <a href="https://github.com/wynectar" target="_blank"><n-image width="50" preview-disabled :src="github" /></a>
        <a href="https://gitee.com/wynectar" target="_blank"><n-image width="50" preview-disabled :src="gitee" /></a>
        <a href="https://segmentfault.com/u/wynectar/articles" target="_blank"><n-image width="50" preview-disabled
            :src="segmentfault" /></a>
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