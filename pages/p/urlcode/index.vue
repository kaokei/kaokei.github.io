<script lang="ts" setup>
import { definePageMeta, ref, useSeoMeta } from '#imports';

definePageMeta({
  name: 'p_urlcode',
  key: (route) => route.name as string,
});

useSeoMeta({
  title: 'kaokei',
});
</script>

<template>
  <div class="px-6 py-10">
    <article class="prose mb-4 lg:prose-xl">
      <h2>URL格式化</h2>
      <p>好好学习，天天向上</p>
    </article>

    <div></div>
  </div>
</template>
