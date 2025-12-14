<script setup lang="ts">
import { ref } from "vue";
import QueryFunction from '@/components/QueryFunction.vue'
import posts from "@/mock/posts.ts";
import { useNBRouter } from "@/utils/router";
const { routerPush } = useNBRouter();
// 跳转博客详情
function navigateToRouter(id: string) {
  routerPush(`/blog-detail/${id}`);
}

/**
 * @postList 文章列表
 * @opts QueryFunction 的 options
 * 
 * @queryBlog 根据条件查询文章函数
 * */
const postList = ref(posts)
const uniqObj: any = {}
const opts: any = []
posts.forEach((v: any) => {
  if (uniqObj[v.tag]) return
  uniqObj[v.tag] = true
  opts.push({ label: v.tag, value: v.tag })
})
function queryBlog(val: any) {
  let list = val.selectVal ? posts.filter((v: any) => v.tag === val.selectVal) : posts
  const input = val.inputVal || ''
  postList.value = list.filter((v: any) => v.title.includes(input) || v.tag.includes(input))
}
</script>
<template>
  <QueryFunction :options="opts" style="margin-bottom: 20px;" top="20px" @query="queryBlog"></QueryFunction>
  <div class="grid">
    <n-card v-for="p in postList" :key="p.id" hoverable @click="navigateToRouter(p.id)">
      <!-- 标题 -->
      <template #header>
        <n-ellipsis>{{ p.title }}</n-ellipsis>
      </template>
      <!-- 阅读时间 -->
      <template #header-extra>
        <span style="color:#38bdf8">
          📖 {{ p.readingTime }} min
        </span>
      </template>
      <!-- 日期、标签 -->
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