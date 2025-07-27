<script setup lang="ts">
import { ref, onMounted } from "vue";
import MarkdownPreview from "@com/MarkdownPreview.vue";
import posts from "@/mock/posts.ts";
import { useNBRouter } from "@/utils/router";
const { navigateToError, route } = useNBRouter();
const id = posts.find((v: any) => new Date(v.time).getTime() == route.params.id)?.id;

import axios from "axios";
const source = ref("");
function getSource() {
  if (!id) navigateToError();
  axios.get(`/api/assets/md/${id}.md`).then((res) => {
    source.value = res.data;
  });
}
onMounted(() => {
  getSource();
});
</script>
<template>
  <MarkdownPreview :content="source" />
</template>
