<script setup lang="ts">
const props = defineProps<{
  text: string
  size: number
  x: number
  y: number
  color?: string
}>()
</script>

<template>
  <text
    :x="props.x"
    :y="props.y"
    :font-size="props.size"
    :fill="color || 'white'"
  >
    {{ props.text }}
  </text>
</template>
