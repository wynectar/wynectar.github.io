<script setup lang="ts">
import { thirdTools } from "@/mock/tools.ts";
import { openWindow } from "@/utils/common";
</script>

<template>
    <div class="tools">
        <div class="grid-item" v-for="third in thirdTools" :key="third.name" @click="openWindow(third.url)">
            <n-image width="80" height="80" preview-disabled :src="third.img" />
            <div>
                {{ third.name }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.tools {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, auto));
    grid-gap: 20px 20px;
}

.grid-item {
    padding: 20px 0;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
    background-color: rgba(79, 186, 242, 0.5);
}

.grid-item:hover {
    background-color: rgba(79, 186, 242, 1);
}
</style>