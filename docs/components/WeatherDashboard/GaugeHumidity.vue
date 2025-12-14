<script setup>
defineProps({
  value: {
    type: Number,
    default: 40
  }
});
import { ref, computed } from "vue";
import GuageBox from "./GaugeBox.vue";

const color = "#74b9ff";
const maxValue = 100;
</script>

<template>
  <GuageBox title="湿度计" :value="value" :maxValue="maxValue" :color="color" unit="%">
    <!-- 水滴和云图标 -->
    <g style="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))">
      <!-- 云 -->
      <path
        fill="#dfe6e9"
        d="M 145,40 
          A 15,15 0 1,1 155,40
          A 10,10 0 1,1 170,40
          A 12,12 0 1,1 180,40
          A 8,8 0 1,1 190,40
          Z"
      />
      <!-- 小雨滴 -->
      <circle cx="150" y="40" r="3" fill="#74b9ff">
        <animate attributeName="cy" from="40" to="50" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" y="45" r="2" fill="#74b9ff">
        <animate
          attributeName="cy"
          from="45"
          to="55"
          dur="1.2s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
      <circle cx="170" y="43" r="2.5" fill="#74b9ff">
        <animate
          attributeName="cy"
          from="43"
          to="53"
          dur="1.8s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
    </g>
  </GuageBox>
</template>

<style scoped>
</style>