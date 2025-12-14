<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  title: String,
  value: {
    type: Number,
    default: 50
  },
  maxValue: {
    type: Number,
    default: 100
  },
  color: {
    type: String,
    default: "#000"
  },
  unit: {
    type: String,
    default: ""
  }
});
const dasharray = ref(188.5);
const dashoffset = computed(() => {
  return (
    dasharray.value - ((props.value || 0) / props.maxValue) * dasharray.value
  );
});
const transform = computed(() => {
  return `rotate(${-90 + ((props.value || 0) / props.maxValue) * 180})`;
});
</script>

<template>
  <div class="gauge-box">
    <div class="gauge-title">{{ title }}</div>
    <svg width="200" height="150" viewBox="0 0 200 150">
      <!-- 仪表盘背景 -->
      <path
        fill="none"
        stroke="#dfe6e9"
        stroke-width="20"
        stroke-linecap="round"
        d="M 40,110 A 60,60 0 1,1 160,110"
      />
      <!-- 仪表盘填充 -->
      <path
        fill="none"
        :stroke="color"
        stroke-width="20"
        stroke-linecap="round"
        transition="stroke-dashoffset 1s ease-in-out"
        d="M 40,110 A 60,60 0 1,1 160,110"
        :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset"
      />
      <slot />
      <!-- 指针 -->
      <g :fill="color">
        <path
          transform-origin="center 110"
          :transform="transform"
          style="transition: transform 1s ease-in-out"
          d="M100,90 l-4,20 l8,0 Z"
        />
        <circle cx="100" cy="110" r="4" />
      </g>
    </svg>
    <div class="gauge-value" v-if="unit">{{ value }} {{ unit }}</div>
  </div>
</template>

<style scoped>
.gauge-box {
  flex: 1;
  min-width: 200px;
  text-align: center;
}

.gauge-box svg {
  margin: auto;
}

.gauge-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #636e72;
}
.gauge-value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: #2d3436;
}
</style>