<script setup lang="ts">
import { ref } from "vue";

/**
 * @options 下拉列表 {label: '', value: ''}
 * @top sticky 的 top值
 * @bg 背景颜色
 * */
defineProps({
    options: Array,
    top: String,
    bg: String,
});
const emit = defineEmits(["query"]);
const selectVal = ref(null);
const inputVal = ref(null);
</script>

<template>
    <n-flex :style="{ '--top': top, '--bg': bg }" class="sticky">
        <!-- select 选择 -->
        <n-select v-model:value="selectVal" :options="options" placeholder="请选择类型"
            style="max-width: 200px; margin-right: 10px" clearable />
        <!-- 模糊检索 -->
        <n-input v-model:value="inputVal" type="text" placeholder="请输入检索的文本"
            style="max-width: 200px; margin-right: 20px" clearable />
        <!-- 查询按钮 -->
        <n-button type="primary" @click="emit('query', { selectVal, inputVal })">
            搜索
        </n-button>
    </n-flex>
</template>

<style scoped>
.sticky {
    position: sticky;
    --top: 0px;
    --bg: var(--n-color);
    top: var(--top);
    background-color: var(--bg);
    box-shadow: 0 var(--top) var(--bg), 0 calc(var(--top) * -1) var(--bg);
    z-index: 1;
}
</style>
