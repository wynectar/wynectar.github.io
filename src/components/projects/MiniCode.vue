<script setup lang="ts">
import codeTaro from '@docs/assets/mini-code-taro.jpg'
import codeUni from '@docs/assets/mini-code-uni.jpg'

const miniList = [
    { name: "寓教于乐灯谜", url: codeUni },
    { name: "Today 幸运色", url: codeTaro },
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