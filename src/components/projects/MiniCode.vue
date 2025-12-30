<script setup lang="ts">
import code from '@docs/assets/mini-code.jpg'
import code2 from '@docs/assets/mini-code2.jpg'

const miniList = [
    { name: "寓教于乐猜灯谜", url: code2 },
    { name: "Today 幸运色", url: code },
]
</script>


<template>
    <n-carousel class="carousel">
        <div v-for="(m, index) in miniList" :key="index" class="mini">
            <div>{{ m.name }}</div>
            <img :src="m.url">
        </div>
    </n-carousel>
</template>


<style scoped>
.carousel {
    z-index: 11;
}

.carousel .mini {
    text-align: center;
    font-size: 24px;
    height: 100%;
}

.carousel .mini div {
    line-height: 60px;
    color: #FF9800;
}

.carousel .mini img {
    height: calc(100% - 120px);
}
</style>