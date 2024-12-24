<script lang="ts" setup>
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import Utf16 from 'crypto-js/enc-utf16';
import { definePageMeta, reactive, ref, useSeoMeta } from '#imports';

definePageMeta({
  name: 'p_base64code',
  key: (route) => route.name as string,
});

useSeoMeta({
  title: 'kaokei',
});

const model = reactive({
  input: '',
  output: '',
});
const handleEncode = () => {
  const wordArray = Utf8.parse(model.input);
  model.output = Base64.stringify(wordArray);
};
const handleDecode = () => {
  console.log('handleDecode => 1')
  const parsedWordArray = Base64.parse(model.input);
  console.log('handleDecode => 2', parsedWordArray)
  model.output = parsedWordArray.toString(Utf8);
  console.log('handleDecode => 3', model.output)
};
</script>

<template>
  <div class="px-6 py-10">
    <article class="prose mb-4 lg:prose-xl">
      <h2>Base64编解码</h2>
    </article>

    <div class="flex w-full flex-col lg:flex-row">
      <div class="flex-grow place-items-center">
        <textarea
          v-model="model.input"
          placeholder="请输入任意文字"
          class="textarea textarea-bordered textarea-lg block h-full min-h-144 w-full"
        ></textarea>
      </div>
      <div class="divider h-12 lg:divider-horizontal lg:h-auto lg:w-16">
        <button class="btn btn-primary" @click="handleEncode">编码</button>
        <button class="btn btn-secondary" @click="handleDecode">解码</button>
      </div>
      <div class="flex-grow place-items-center">
        <textarea
          v-model="model.output"
          disabled
          class="textarea textarea-bordered textarea-lg block h-full min-h-144 w-full"
        ></textarea>
      </div>
    </div>
  </div>
</template>
