<script setup lang="ts">
import { ref } from "vue";
const height = ref(0);
const weight = ref(0);
const result = ref("");
const resultType = ref("success");
function equalTo() {
  result.value = "";
  resultType.value = "success";
  if (!height.value || !weight.value) return;
  result.value = (weight.value / height.value ** 2).toFixed(2);
  const rv: number = Number(result.value);
  if (rv <= 18.5 || (rv > 24 && rv <= 28)) {
    resultType.value = "warning";
  } else if (rv > 28) {
    resultType.value = "error";
  } else {
    resultType.value = "success";
  }
}
</script>
<template>
  <n-flex>
    <n-input-number v-model:value="weight" :min="0" :show-button="false">
      <template #suffix> kg </template>
    </n-input-number>
    <n-button type="primary" ghost> /</n-button>
    <n-input-number
      v-model:value="height"
      :min="0"
      :precision="2"
      :show-button="false"
    >
      <template #suffix> m </template>
    </n-input-number>
    <sup>2</sup>
    <n-button type="primary" @click="equalTo"> = </n-button>
    <n-button :type="resultType" dashed style="margin-left: 10px">
      {{ result }}
    </n-button>
  </n-flex>
  <div style="margin-top: 20px">
    计算公式为：BMI=体重÷身高<sup>2</sup>。（体重单位：千克；身高单位：米）
  </div>
  <n-flex align="center">
    <span>参考范围：</span>
    <n-button type="warning" ghost> (0, 18.5] 偏瘦 </n-button>
    <n-button type="success" ghost> (18.5, 24] 正常 </n-button>
    <n-button type="warning" ghost> (24, 28] 超重 </n-button>
    <n-button type="error" ghost> (28, 32] 肥胖 </n-button>
    <n-button type="error" ghost> (32, +∞) 重度肥胖 </n-button>
  </n-flex>
</template>
