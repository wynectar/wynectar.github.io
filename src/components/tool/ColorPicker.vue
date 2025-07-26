
<script setup lang="ts">
import { ref, computed } from "vue";

const convertToRgba = (color: string) => {
  // 处理 HEX 带透明度 (#RRGGBBAA)
  if (color.startsWith("#") && color.length === 9) {
    const hex = color.substring(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const a = parseInt(hex.substring(6, 8), 16) / 255;

    return `rgba(${r}, ${g}, ${b}, ${a < 1 ? a.toFixed(2) : a})`;
  } else {
    return color;
  }
};
const hexValue = ref("#18A058FF");
const rgbaValue = computed(() => convertToRgba(hexValue.value));
</script>
<template>
  <n-flex align="center">
    <n-color-picker
      v-model:value="hexValue"
      style="width: 240px; height: 100px"
    >
      <template #label>
        <div>HEX: {{ hexValue }}</div>
        <div>RGBA: {{ rgbaValue }}</div>
      </template>
    </n-color-picker>
    <n-flex>
      <n-input v-model:value="hexValue" type="text" />
      <n-input v-model:value="rgbaValue" type="text" />
    </n-flex>
    <a
      href="https://arco.design/palette/list"
      target="_blank"
      rel="noopener noreferrer"
    >
      <n-button type="primary"> 色板体系 </n-button>
    </a>
  </n-flex>
</template>