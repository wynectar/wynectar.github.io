<script setup>
const props = defineProps({
  value: {
    type: Number,
    default: 28
  }
});

import { ref, computed } from "vue";
import GuageBox from "./GaugeBox.vue";

const color = "#ff7675";
const maxValue = 40;
const height = computed(() => {
  return ((props.value || 0) / maxValue) * 56;
});
const y = computed(() => {
  return 98 - height.value;
});
</script>

<template>
  <GuageBox title="温度计" :value="value" :maxValue="maxValue" :color="color" unit="°C">
    <!-- 温度计图标 -->
    <g style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2))">
      <!-- 温度计主体 -->
      <rect x="15" y="40" width="10" height="60" rx="5" fill="#a9a9a9" />
      <!-- 温度计底部 -->
      <circle cx="20" cy="110" r="6" fill="#ff7675" />
      <!-- 温度计液体 -->
      <rect x="17" :y="y" width="6" :height="height" rx="3" :fill="color" />
      <!-- 太阳 -->
      <g stroke="#fdcb6e" stroke-width="3">
        <circle cx="150" cy="40" r="15" fill="#fdcb6e" stroke-width="0" />
        <line class="sun-ray" x1="150" y1="20" x2="150" y2="15" />
        <line class="sun-ray" x1="165" y1="35" x2="170" y2="35" />
        <line class="sun-ray" x1="150" y1="60" x2="150" y2="65" />
        <line class="sun-ray" x1="135" y1="35" x2="130" y2="35" />
        <line class="sun-ray" x1="140" y1="25" x2="137" y2="22" />
        <line class="sun-ray" x1="160" y1="25" x2="163" y2="22" />
        <line class="sun-ray" x1="160" y1="55" x2="163" y2="58" />
        <line class="sun-ray" x1="140" y1="55" x2="137" y2="58" />
      </g>
    </g>
  </GuageBox>
</template>

<style scoped>
.sun-ray {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style>