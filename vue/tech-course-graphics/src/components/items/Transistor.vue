<script setup lang="ts">
const props = defineProps<{
  height: number
  width: number
  x: number
  y: number
  angle?: number
}>()

const transform = props.angle !== undefined
  ? `rotate(${props.angle}, ${props.x}, ${props.y})`
  : ''
</script>

<template>
  <g :transform="transform">
    <rect
      :width="props.width"
      :height="props.height"
      :x="props.x - props.width / 2"
      :y="props.y - props.height / 2"
      rx="5"
      ry="5"
      fill="blue"
    />
    <rect
      :width="props.width / 3"
      :height="props.height"
      :x="props.x - props.width / 2 + props.width / 3"
      :y="props.y - props.height / 2"
      fill="orange"
    />
  </g>
</template>
