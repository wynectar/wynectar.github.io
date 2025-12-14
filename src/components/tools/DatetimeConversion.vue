<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // 第二栏
    const spaceText = ref("");
    const isGoover = ref(false);
    function spaceTimestampConfirm(ts: any) {
      if (!ts) ts = Date.now();
      const residueTs = ts - Date.now();
      isGoover.value = residueTs < 0 ? true : false;
      const times = Math.abs(residueTs);
      const time = [24 * 3600 * 1000, 3600 * 1000, 60 * 1000, 1000];
      const d = Math.floor(times / time[0]);
      const h = Math.floor((times % time[0]) / time[1]);
      const m = Math.floor(((times % time[0]) % time[1]) / time[2]);
      const s = Math.floor((((times % time[0]) % time[1]) % time[2]) / time[3]);
      let str = "";
      if (d) str += `${d}天`;
      if (h) str += `${h}小时`;
      if (m) str += `${m}分钟`;
      if (s) str += `${s}秒`;
      spaceText.value = str;
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
      isDatetime: ref(true),
      // 第二栏
      spaceTimestamp: ref(null),
      spaceText,
      isGoover,
      spaceTimestampConfirm,
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
  <n-flex :style="{ flexDirection: isDatetime ? 'row' : 'row-reverse' }">
    <n-date-picker v-model:value="timestamp" type="datetime" placeholder="请选择日期时间" :disabled="!isDatetime" clearable />
    <n-button type="primary" @click="isDatetime = !isDatetime">切换</n-button>
    <n-input-number v-model:value="timestamp" type="text" placeholder="请输入时间戳" :disabled="isDatetime" />
  </n-flex>
  <!-- 第二栏 -->
  <n-flex align="center" style="margin: 20px 0">
    <span>当前时间距离某个时间的时长：</span>
    <n-button type="primary" ghost> 距离 </n-button>
    <n-date-picker v-model:value="spaceTimestamp" type="datetime" placeholder="某个日期时间" clearable
      :on-confirm="spaceTimestampConfirm" :on-clear="spaceTimestampConfirm" />
    <n-button type="primary" ghost>
      {{ isGoover ? "已过去" : "还有" }}
    </n-button>
    <n-button type="primary" dashed>
      {{ spaceText }}
    </n-button>
  </n-flex>
  <!-- 第三栏 -->
  <n-flex align="center">
    <span>某个时间选择间隔后的时间：</span>
    <n-date-picker v-model:value="spaceStartDate" type="datetime" placeholder="开始日期时间" clearable />
    <n-input-number v-model:value="spaceNumber" type="text" placeholder="间隔" :min="0" class="space" />
    <n-select v-model:value="spaceType" :options="options" style="width: 80px" />
    <n-button type="primary" class="space" @click="conversionEnd">
      查询
    </n-button>
    <n-date-picker v-model:value="spaceEndDate" type="datetime" placeholder="结束日期时间" clearable disabled />
  </n-flex>
</template>
