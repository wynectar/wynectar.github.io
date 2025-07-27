<script setup lang="ts">
import { ref, onMounted } from "vue";
import MarkdownPreview from "@com/MarkdownPreview.vue";
import posts from "@/mock/posts.ts";
import { useNBRouter } from "@/utils/router";
const { navigateToError, route } = useNBRouter();
const id = posts.find((v: any) => new Date(v.time).getTime() == route.params.id)?.id;

import axios from "@/api/";
const source = ref("");
function getSource() {
  if (!id) navigateToError();
  axios.get(`/assets/md/${id}.md`).then((data: any) => {
    source.value = data;
  });
}
onMounted(() => {
  getSource();
});
</script>
<template>
  <MarkdownPreview :content="source" />
</template>
