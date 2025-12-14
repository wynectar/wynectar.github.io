<script setup>
defineProps({
  value: {
    type: Number,
    default: 8
  }
});

import { ref, computed } from "vue";
import GuageBox from "./GaugeBox.vue";

const color = "#a29bfe";
const maxValue = 30;
</script>

<template>
  <GuageBox title="风速计" :value="value" :maxValue="maxValue" :color="color" unit="km/h">
    <!-- 风车图标 -->
    <g style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2))">
      <!-- 风车杆 -->
      <rect x="173" y="40" width="5" height="70" fill="#b2bec3" />
      <!-- 风车叶片 -->
      <g transform="translate(175, 40)">
        <g class="windmill"  fill="#a29bfe" :style="{'--dur': `${3 - (value / 15)}s`}">
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(0)" />
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(90)" />
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(180)" />
          <path d="M 0,0 L 25,-5 L 0,-25 Z" transform="rotate(270)" />
        </g>
      </g>
      <!-- 风吹线条 -->
      <line class="wind-line" x1="120" y1="25" x2="140" y2="25" />
      <line class="wind-line" x1="110" y1="35" x2="130" y2="35" />
      <line class="wind-line" x1="125" y1="45" x2="145" y2="45" />
    </g>
  </GuageBox>
</template>

<style scoped>
.wind-line {
  stroke: #a29bfe;
  stroke-width: 2;
  animation: wind 3s infinite linear;
}

.windmill {
  animation: spin var(--dur) linear infinite;
}

@keyframes wind {
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(20px);
    opacity: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>