<script lang="ts" setup>
import copy from 'copy-to-clipboard';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import {
  definePageMeta,
  nextTick,
  reactive,
  useSeoMeta,
  useTemplateRef,
} from '#imports';
import { isValidBase64 } from '~/utils/base64';

definePageMeta({
  name: 'p_base64code',
  key: (route) => route.name as string,
});

useSeoMeta({
  title: 'kaokei',
});

const containerRef = useTemplateRef<HTMLDivElement>('container');
const textarea1Ref = useTemplateRef<HTMLTextAreaElement>('textarea1');
const textarea2Ref = useTemplateRef<HTMLTextAreaElement>('textarea2');
const model = reactive({
  input: '',
  output: '',
  copyTooltipInput: '点击复制',
  copyTooltipOutput: '点击复制',
  decodeError: false,
});
const handleEncode = () => {
  const wordArray = Utf8.parse(model.input);
  model.decodeError = false;
  model.output = '';
  nextTick(() => {
    model.output = Base64.stringify(wordArray);
  });
};
const handleDecode = () => {
  // decode需要特殊处理，可能不是有效的base64字符串
  if (isValidBase64(model.input)) {
    try {
      const parsedWordArray = Base64.parse(model.input);
      model.output = parsedWordArray.toString(Utf8);
      model.decodeError = false;
    } catch (e) {
      model.decodeError = true;
      model.output = 'base64解码异常';
    }
  } else {
    model.decodeError = true;
    model.output = '无效的base64字符串';
  }
};
const handleSwap = () => {
  const tmp = model.input;
  model.input = model.output;
  model.output = tmp;
};
const handleEmpty1 = () => {
  model.input = '';
};
const handleCopy1 = () => {
  copy(model.input);
  model.copyTooltipInput = '复制成功';
  setTimeout(() => {
    model.copyTooltipInput = '点击复制';
  }, 2000);
};
const handleEmpty2 = () => {
  model.output = '';
};
const handleCopy2 = () => {
  copy(model.output);
  model.copyTooltipOutput = '复制成功';
  setTimeout(() => {
    model.copyTooltipOutput = '点击复制';
  }, 2000);
};

const handleMousedown1 = (e: any) => {
  if (textarea1Ref.value && textarea2Ref.value && containerRef.value) {
    const computedStyle = window.getComputedStyle(containerRef.value);
    if (computedStyle.getPropertyValue('flex-direction') === 'column') {
      return;
    }
    const h1 = textarea1Ref.value.style.height;
    const h2 = textarea2Ref.value.style.height;
    if (!h1 && h2) {
      textarea1Ref.value.style.height = h2;
    }
    textarea2Ref.value.style.height = '';
  }
};
const handleMousedown2 = (e: any) => {
  if (textarea1Ref.value && textarea2Ref.value && containerRef.value) {
    const computedStyle = window.getComputedStyle(containerRef.value);
    if (computedStyle.getPropertyValue('flex-direction') === 'column') {
      return;
    }
    const h1 = textarea1Ref.value.style.height;
    const h2 = textarea2Ref.value.style.height;
    if (h1 && !h2) {
      textarea2Ref.value.style.height = h1;
    }
    textarea1Ref.value.style.height = '';
  }
};
</script>

<template>
  <div class="px-6 py-10">
    <article class="prose mb-4 lg:prose-xl">
      <h2>Base64编解码</h2>
    </article>

    <div ref="container" class="flex w-full flex-col lg:flex-row">
      <div class="flex-grow lg:w-0">
        <div class="mb-2 flex justify-between gap-2">
          <button
            :disabled="!model.input"
            class="btn btn-success flex flex-1"
            @click="handleCopy1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
            <span>{{ model.copyTooltipInput }}</span>
          </button>
          <button
            :disabled="!model.input"
            class="btn flex flex-1"
            @click="handleEmpty1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <span>清空</span>
          </button>
        </div>
        <textarea
          ref="textarea1"
          v-model="model.input"
          placeholder="请输入任意文字"
          class="textarea textarea-bordered block h-[calc(100%-theme(space.14))] min-h-48 w-full lg:min-h-144"
          @mousedown="handleMousedown1"
        ></textarea>
      </div>
      <div class="divider h-12 lg:divider-horizontal lg:h-auto lg:w-16">
        <button class="btn btn-primary" @click="handleEncode">编码</button>
        <button class="btn btn-secondary" @click="handleDecode">解码</button>
        <button class="btn btn-neutral" @click="handleSwap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 rotate-90 lg:rotate-0"
          >
            <path
              fill-rule="evenodd"
              d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="flex-grow lg:w-0">
        <div class="mb-2 flex justify-between gap-2">
          <button
            :disabled="!model.output"
            class="btn btn-success flex flex-1"
            @click="handleCopy2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
            <span>{{ model.copyTooltipOutput }}</span>
          </button>
          <button
            :disabled="!model.output"
            class="btn flex flex-1"
            @click="handleEmpty2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <span>清空</span>
          </button>
        </div>
        <textarea
          ref="textarea2"
          readonly
          v-model="model.output"
          placeholder="这里是编码/解码的结果"
          class="textarea textarea-bordered block h-[calc(100%-theme(space.14))] min-h-144 w-full"
          :class="[
            model.decodeError ? 'textarea-error text-4xl text-danger' : '',
          ]"
          @mousedown="handleMousedown2"
        ></textarea>
      </div>
    </div>
  </div>
</template>
