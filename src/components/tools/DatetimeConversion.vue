<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    // 第二栏
    const startTimestamp: any = ref(null)
    const endTimestamp = ref(null)
    const timeDifference = computed(() => {
      if (!startTimestamp.value || !endTimestamp.value) {
        return [
          { label: '正常计算', value: '', unit: '', over: false },
          { label: '按天计算', value: '', unit: '天', over: false },
          { label: '按时计算', value: '', unit: '时', over: false },
          { label: '按分计算', value: '', unit: '分', over: false },
          { label: '按秒计算', value: '', unit: '秒', over: false },
        ]
      } else {
        let td = endTimestamp.value - startTimestamp.value
        let over = false
        if (td < 0) {
          td *= -1
          over = true
        }
        const time = [24 * 3600 * 1000, 3600 * 1000, 60 * 1000, 1000];
        const d = Math.floor(td / time[0]);
        const h = Math.floor((td % time[0]) / time[1]);
        const m = Math.floor(((td % time[0]) % time[1]) / time[2]);
        const s = Math.floor((((td % time[0]) % time[1]) % time[2]) / time[3]);
        let str = "";
        if (d) str += `${d}天`;
        if (h) str += `${h}时`;
        if (m) str += `${m}分`;
        if (s) str += `${s}秒`;

        return [
          { label: '正常计算', value: str, unit: '', over },
          { label: '按天计算', value: Number((td / time[0]).toFixed(2)), unit: '天', over },
          { label: '按时计算', value: Number((td / time[1]).toFixed(2)), unit: '时', over },
          { label: '按分计算', value: Number((td / time[2]).toFixed(2)), unit: '分', over },
          { label: '按秒计算', value: Number((td / time[3]).toFixed(0)), unit: '秒', over },
        ]
      }
    })
    const checked = ref(false)
    let timer: any = null
    function changeSwitch(val: boolean) {
      checked.value = val
      if (val) {
        timer = setInterval(() => {
          startTimestamp.value = Date.now()
        }, 1000)
      } else {
        if (timer) clearInterval(timer)
      }
    }

    // 第三栏
    const spaceStartDate = ref(Date.now());
    const spaceEndDate: any = ref();
    const spaceNumber = ref(null);
    const spaceType = ref("h");
    function conversionEnd() {
      if (!spaceStartDate.value || !spaceNumber.value) return;
      const tsMap: any = {
        y: 365 * 24 * 3600 * 1000,
        month: 30 * 24 * 3600 * 1000,
        d: 24 * 3600 * 1000,
        h: 3600 * 1000,
        m: 60 * 1000,
        s: 1000,
      };
      spaceEndDate.value =
        spaceStartDate.value + spaceNumber.value * tsMap[spaceType.value];
    }
    return {
      // 第一栏
      timestamp: ref(null),
      timestamp2: ref(null),
      // 第二栏
      startTimestamp,
      endTimestamp,
      timeDifference,
      checked,
      changeSwitch,
      // 第三栏
      spaceStartDate,
      spaceEndDate,
      spaceNumber,
      spaceType,
      options: [
        { label: "年", value: "y" },
        { label: "月", value: "month" },
        { label: "日", value: "d" },
        { label: "时", value: "h" },
        { label: "分", value: "m" },
        { label: "秒", value: "s" },
      ],
      conversionEnd,
    };
  },
});
</script>

<template>
  <!-- 第一栏 -->
  <n-flex align="center" class="flex-bg">
    <n-date-picker v-model:value="timestamp" type="datetime" placeholder="请选择日期时间" clearable style="width:216px" />
    <span>日期转时间戳：</span>
    <span class="text-color">{{ timestamp }} 毫秒</span>
  </n-flex>
  <n-flex align="center" class="flex-bg flex-margin">
    <n-input-number v-model:value="timestamp2" type="text" placeholder="请输入时间戳" step="1000" />
    <span>时间戳转日期：</span>
    <n-date-picker v-model:value="timestamp2" type="datetime" :show="false" disabled class="timestamp" placeholder="" />
  </n-flex>
  <!-- 第二栏 -->
  <n-flex align="center" class="flex-bg flex-margin">
    <n-flex vertical justify="center" class="flex-border">
      <n-switch size="large" :value="checked" @update:value="changeSwitch">
        <template #checked>
          此时此刻
        </template>
        <template #unchecked>
          开始时间
        </template>
      </n-switch>
      <n-date-picker v-model:value="startTimestamp" type="datetime" placeholder="开始时间" clearable :disabled="checked" />
    </n-flex>
    <span>与</span>
    <n-date-picker v-model:value="endTimestamp" type="datetime" placeholder="结束时间" clearable />
    <span>相差</span>
    <n-flex vertical justify="center" class="flex-border">
      <div v-for="(v, i) in timeDifference" :key="i">
        <span>{{ v.label }}:</span>
        <span :style="{ margin: '0 5px', color: v.over ? '#f0a020' : '#18a058' }">{{ v.value }}</span>
        <span>{{ v.unit }}</span>
      </div>
    </n-flex>
  </n-flex>
  <!-- 第三栏 -->
  <n-flex align="center" class="flex-bg">
    <n-date-picker v-model:value="spaceStartDate" type="datetime" placeholder="开始时间" clearable />
    <n-input-number v-model:value="spaceNumber" type="text" placeholder="间隔" :min="0" class="space" />
    <n-select v-model:value="spaceType" :options="options" style="width: 80px" />
    <n-button type="primary" class="space" @click="conversionEnd">
      计算间隔后的时间
    </n-button>
    <n-date-picker v-model:value="spaceEndDate" type="datetime" placeholder="结束时间" clearable disabled />
  </n-flex>
</template>

<style scoped>
.flex-border {
  border: 1px dashed;
  padding: 10px;
}

.flex-bg {
  background-color: rgba(26, 160, 88, 0.1);
  padding: 20px;
}

.flex-margin {
  margin: 20px 0;
}

.text-color {
  color: #18a058;
}

.timestamp :deep(.n-input.n-input--disabled) {
  background-color: transparent;
}

.timestamp :deep(.n-input.n-input--disabled) .n-input__input-el {
  color: #18a058;
}

.timestamp :deep(.n-input.n-input--disabled) .n-input__suffix {
  display: none;
}
</style>
