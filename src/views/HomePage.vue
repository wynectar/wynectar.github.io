<script setup lang="ts">
import postList from "@/mock/posts.ts";
import { useNBRouter } from "@/utils/router";
const { routerPush } = useNBRouter();
function navigateToRouter(id: string) {
  routerPush(`/BlogPost/${id}`);
}
</script>
<template>
  <div class="grid">
    <n-card v-for="p in postList" :key="p.id" hoverable @click="navigateToRouter(p.id)">
      <template #header>
        <n-ellipsis>{{ p.title }}</n-ellipsis>
      </template>
      <template #header-extra>
        <span style="color:cyan">
          {{ p.readingTime }} min
        </span>
      </template>
      <n-flex justify="space-between">
        <span>{{ p.createTime }}</span>
        <n-gradient-text gradient="linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)">
          {{ p.tag }}
        </n-gradient-text>
      </n-flex>
    </n-card>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(580px, auto));
  grid-gap: 20px 20px;
}

.top {
  height: 260px;
  background-size: 100% 100%;
  padding: 220px 10px 0;
  box-sizing: border-box;
}
</style>