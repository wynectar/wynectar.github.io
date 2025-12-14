<script setup lang="ts">
import { ref } from "vue";
import lessons from "@/mock/lessons.ts";
import QueryFunction from '@/components/QueryFunction.vue'
/**
 * @experienceList 问题列表
 * @opts QueryFunction 的 options
 * 
 * @queryBlog 根据条件查询文章函数
 * */
const experienceList = ref(lessons)
const uniqObj: any = {}
const opts: any = []
lessons.forEach((v: any) => {
  if (uniqObj[v.tag]) return
  uniqObj[v.tag] = true
  opts.push({ label: v.tag, value: v.tag })
})
function queryBlog(val: any) {
  let list = val.selectVal ? lessons.filter((v: any) => v.tag === val.selectVal) : lessons
  const input = val.inputVal || ''
  experienceList.value = list.filter((v: any) => v.answer.includes(input) || v.tag.includes(input))
}
</script>

<template>
  <div class="lesson">
    <QueryFunction :options="opts" style="margin-bottom: 20px;" top="20px" @query="queryBlog"></QueryFunction>
    <n-card v-for="(exp, index) in experienceList" :key="index" :title="`${exp.question}🍎🍎🍎${exp.tag}`"
      header-style="background:rgba(24, 160, 88, 0.2)" content-style="background:rgba(24, 160, 88, 0.1)">
      <div v-html="exp.answer" class="answer"></div>
    </n-card>
  </div>
</template>

<style scoped>
.lesson>div {
  margin-bottom: 40px;
}
</style>