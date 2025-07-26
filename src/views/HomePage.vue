<script setup lang="ts">
import postList from "@/mock/posts.ts";
import { useNBRouter } from "@/utils/router";
const { routerPush } = useNBRouter();
function navigateToRouter(item: any) {
  const timestamp = new Date(item.time).getTime();
  routerPush(`/BlogPost/${timestamp}`);
}
</script>
<template>
  <div class="grid">
    <n-card v-for="post in postList" :key="post.id" class="grid-item" @click="navigateToRouter(post)">
      <template #cover>
        <div class="top" :style="{ backgroundImage: `url(${post.img})` }">
          <n-flex justify="space-between" align="center">
            <n-tag round size="small">
              {{ post.label }}
            </n-tag>
            <a :href="post.link" target="_blank" rel="noopener noreferrer" v-if="post.link">
              <n-button type="primary" size="small"> 关联 </n-button>
            </a>
          </n-flex>
        </div>
      </template>
      <template #header>
        <n-ellipsis>{{ post.title }}</n-ellipsis>
      </template>
      <template #header-extra>
        <n-tag round size="small"> 阅读{{ post.readTime }}min </n-tag>
      </template>
      <n-ellipsis line-clamp="2">{{ post.desc }}</n-ellipsis>
    </n-card>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(356px, auto));
  grid-gap: 20px 20px;
}

.top {
  height: 260px;
  background-size: 100% 100%;
  padding: 220px 10px 0;
  box-sizing: border-box;
}
</style>