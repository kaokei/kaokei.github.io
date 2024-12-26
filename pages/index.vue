<script lang="ts" setup>
import { definePageMeta, useSeoMeta } from '#imports';

definePageMeta({
  name: 'index',
  key: (route) => route.name as string,
});

useSeoMeta({
  title: 'kaokei',
});
</script>

<template>
  <div class="prose ps-6 pt-10 lg:prose-xl">
    <h1>有趣的网页</h1>
    <p>积累一些有趣的网页。包含工具集、游戏集和背单词等。</p>
    <p>
      <NuxtLink class="link-hover link" to="/malicious"
        >这个世界充满着恶意，也充满着善意。</NuxtLink
      >
    </p>
  </div>
</template>
