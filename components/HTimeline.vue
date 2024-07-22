<script lang="ts" setup></script>

<template>
  <div class="timeline w-full">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.timeline {
  width: 100%;

  &::before {
    background-color: #ddd;
    bottom: 0;
    content: "";
    left: 50%;
    margin-left: -2px;
    position: absolute;
    top: 0;
    width: 4px;
    z-index: 1;
  }
}

.timeline :deep(.timeline-item) {
  position: relative;
  width: 50%;
  padding-right: 100px;

  .timeline-item-title {
    position: absolute;
    color: red;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: translateX(50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timeline-item-content {
    position: relative;
    color: green;
    min-height: 100px;

    &::before {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      z-index: 1;
      border-bottom: 10px solid transparent;
      border-left: 12px solid rgb(229, 231, 235);
      border-top: 10px solid transparent;
      right: -12px;
    }

    &::after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      z-index: 2;
      border-bottom: 9px solid transparent;
      border-left: 11px solid #fff;
      border-top: 9px solid transparent;
      right: -10px;
    }
  }

  &:nth-child(even) {
    margin-left: 50%;
    padding-right: 0;
    padding-left: 100px;

    .timeline-item-title {
      right: auto;
      left: 0;
      transform: translateX(-50%);
    }

    .timeline-item-content {
      &::before {
        border-bottom: 10px solid transparent;
        border-left: none;
        border-right: 12px solid rgb(229, 231, 235);
        border-top: 10px solid transparent;
        left: -12px;
      }

      &::after {
        border-bottom: 9px solid transparent;
        border-left: none;
        border-right: 11px solid #fff;
        border-top: 9px solid transparent;
        left: -10px;
      }
    }
  }
}
</style>
