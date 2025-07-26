<script setup lang="ts">
import {
  list1 as documentList,
  list2 as experienceList,
} from "@/mock/lesson.ts";
import { openWindow } from "@/utils/common";
</script>

<template>
  <div class="lesson">
    <n-card title="文档&使用" content-class="card-content">
      <div class="grid-item" v-for="doc in documentList" :key="doc.name">
        <div>
          <n-gradient-text :size="20" type="success">
            {{ doc.description }}
          </n-gradient-text>
        </div>
        <n-image width="80" height="80" preview-disabled :src="doc.img" />
        <n-flex>
          <n-button
            strong
            secondary
            type="info"
            v-for="child in doc.children"
            :key="child.name"
            @click="openWindow(child.url)"
          >
            {{ child.name }}
          </n-button>
        </n-flex>
      </div>
    </n-card>
    <n-card
      v-for="(exp, index) in experienceList"
      :key="index"
      :title="`${exp.question}🍎🍎🍎${exp.label}`"
      header-style="background:rgba(24, 160, 88, 0.2)"
      content-style="background:rgba(24, 160, 88, 0.1)"
    >
      <div v-html="exp.answer" class="answer"></div>
    </n-card>
  </div>
</template>

<style scoped>
.lesson > div {
  margin-bottom: 40px;
}
:deep(.card-content) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, auto));
  grid-gap: 20px 20px;
}
.grid-item {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #18a058;
}
</style>