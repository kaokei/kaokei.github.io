<script lang="ts" setup></script>

<template>
  <div class="timeline-item">
    <div class="timeline-item-title"><slot name="title"></slot></div>
    <div class="timeline-item-content border rounded"><slot></slot></div>
  </div>
</template>
