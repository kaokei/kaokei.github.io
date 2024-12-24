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
    <h1>有趣的网页002</h1>
    <p>积累一些有趣的网页。纯前端实现，不依赖后端。不需要登录。</p>
    <p>
      <NuxtLink class="link-hover link" to="/p/malicious"
        >这个世界充满着恶意</NuxtLink
      >
    </p>
  </div>
</template>
