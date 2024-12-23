<script lang="ts" setup>
import { definePageMeta, ref, useSeoMeta } from '#imports';

definePageMeta({
  name: 'p_malicious',
  key: (route) => route.name as string,
});

useSeoMeta({
  title: 'kaokei',
});

const data = ref([
  {
    title: '恶意讨薪',
    href: 'https://baike.baidu.com/item/%E6%81%B6%E6%84%8F%E8%AE%A8%E8%96%AA/62724858',
  },
  {
    title: '恶意普法',
    href: 'https://www.bilibili.com/video/BV1wb4y1378g/',
  },
  {
    title: '恶意守法',
    href: 'https://www.bilibili.com/video/BV1wb4y1378g/',
  },
  { title: '恶意返乡', href: 'https://m.thepaper.cn/baijiahao_16417564' },
  {
    title: '恶意上访',
    href: 'https://www.thepaper.cn/newsDetail_forward_13049960',
  },
  {
    title: '恶意捐款',
    href: 'https://www.163.com/dy/article/IC68LIEL05489QEO.html',
  },

  { title: '恶意躺平', href: 'https://zhuanlan.zhihu.com/p/487743813' },
  {
    title: '恶意打假',
    href: 'https://315law.chinalaw.org.cn/portal/article/index/id/26.html',
  },
  {
    title: '恶意断供',
    href: 'https://www.163.com/dy/article/HKF2QR1405534DYX.html',
  },
  {
    title: '恶意诉讼',
    href: 'https://baike.baidu.com/item/%E6%81%B6%E6%84%8F%E8%AF%89%E8%AE%BC/4578836',
  },
  { title: '恶意分享' },
  { title: '恶意救人' },
]);
</script>

<template>
  <div class="px-6 py-10">
    <article class="prose lg:prose-xl mb-4">
      <h2>这个世界充满着恶意</h2>
      <p>好好学习，天天向上</p>
    </article>

    <div
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <div
        v-for="(item, index) in data"
        :key="index"
        class="shadow-6 flex h-32 items-center justify-center bg-white"
      >
        <a
          v-if="item.href"
          class="group link-hover link flex items-center justify-center"
          :href="item.href"
          target="_blank"
        >
          <span class="text-4xl">{{ item.title }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="invisible size-4 group-hover:visible"
          >
            <path
              fill-rule="evenodd"
              d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <span v-else class="text-4xl">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
