<script setup lang="ts">
defineProps<{
  height: number
  width: number
  x: number
  y: number
}>()
</script>

<template>
  <image
    href="https://pngimg.com/d/battery_PNG102280.png"
    height="200"
    width="200"
    :x="x"
    :y="y"
  />
</template>
