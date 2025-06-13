<script setup lang="ts">
defineProps<{
  height: number
  width: number
  x: number
  y: number
}>()
</script>

<template>
  <rect
    :width="width"
    :height="height"
    :x="x - width / 2"
    :y="y - height / 2"
    rx="5"
    ry="5"
    fill="blue"
  />
  <rect
    :width="width / 3"
    :height="height"
    :x="x - width / 2 + width/3"
    :y="y - height / 2"
    fill="orange"
  />
</template>
